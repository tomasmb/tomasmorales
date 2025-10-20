output "cloud_run_url" {
  description = "Cloud Run service URL"
  value       = google_cloud_run_v2_service.website.uri
}

output "load_balancer_ip" {
  description = "Load balancer IP address - point your DNS A record to this"
  value       = google_compute_global_address.website.address
}

output "artifact_registry_url" {
  description = "Artifact Registry repository URL"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/website"
}
