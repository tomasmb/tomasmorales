terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }

  # Uncomment to use remote state (requires application-default credentials)
  # backend "gcs" {
  #   bucket = "personal-website-475721-terraform-state"
  #   prefix = "terraform/state"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable required APIs
resource "google_project_service" "run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "artifactregistry" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "compute" {
  service            = "compute.googleapis.com"
  disable_on_destroy = false
}

# Artifact Registry Repository
resource "google_artifact_registry_repository" "website" {
  location      = var.region
  repository_id = "website"
  description   = "Docker repository for personal website"
  format        = "DOCKER"

  depends_on = [google_project_service.artifactregistry]
}

# Cloud Run Service
resource "google_cloud_run_v2_service" "website" {
  name                = "personal-website"
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/website/website:latest"

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
        cpu_idle = true
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 10
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  depends_on = [
    google_project_service.run,
    google_artifact_registry_repository.website
  ]
}

# IAM policy to allow public access
resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_v2_service.website.name
  location = google_cloud_run_v2_service.website.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Reserve static IP for load balancer
resource "google_compute_global_address" "website" {
  name = "website-ip"
  depends_on = [google_project_service.compute]
}

# Create serverless NEG for Cloud Run
resource "google_compute_region_network_endpoint_group" "website_neg" {
  name                  = "website-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region

  cloud_run {
    service = google_cloud_run_v2_service.website.name
  }
}

# Backend service
resource "google_compute_backend_service" "website" {
  name                  = "website-backend"
  protocol              = "HTTP"
  port_name             = "http"
  timeout_sec           = 30
  enable_cdn            = true

  backend {
    group = google_compute_region_network_endpoint_group.website_neg.id
  }

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    max_ttl           = 86400
    client_ttl        = 7200
    negative_caching  = true
    serve_while_stale = 86400

    cache_key_policy {
      include_host         = true
      include_protocol     = true
      include_query_string = true
    }
  }
}

# URL map
resource "google_compute_url_map" "website" {
  name            = "website-url-map"
  default_service = google_compute_backend_service.website.id
}

# Managed SSL certificate
resource "google_compute_managed_ssl_certificate" "website" {
  name = "website-ssl-cert"

  managed {
    domains = [var.domain]
  }
}

# HTTPS proxy
resource "google_compute_target_https_proxy" "website" {
  name             = "website-https-proxy"
  url_map          = google_compute_url_map.website.id
  ssl_certificates = [google_compute_managed_ssl_certificate.website.id]
}

# Forwarding rule for HTTPS
resource "google_compute_global_forwarding_rule" "website_https" {
  name                  = "website-https"
  target                = google_compute_target_https_proxy.website.id
  port_range            = "443"
  ip_address            = google_compute_global_address.website.address
  load_balancing_scheme = "EXTERNAL"
}

# HTTP to HTTPS redirect
resource "google_compute_url_map" "website_http_redirect" {
  name = "website-http-redirect"

  default_url_redirect {
    https_redirect         = true
    redirect_response_code = "MOVED_PERMANENTLY_DEFAULT"
    strip_query            = false
  }
}

resource "google_compute_target_http_proxy" "website_http" {
  name    = "website-http-proxy"
  url_map = google_compute_url_map.website_http_redirect.id
}

resource "google_compute_global_forwarding_rule" "website_http" {
  name                  = "website-http"
  target                = google_compute_target_http_proxy.website_http.id
  port_range            = "80"
  ip_address            = google_compute_global_address.website.address
  load_balancing_scheme = "EXTERNAL"
}
