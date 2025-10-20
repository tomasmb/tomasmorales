variable "project_id" {
  description = "GCP Project ID"
  type        = string
  default     = "personal-website-475721"
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "domain" {
  description = "Custom domain for the website"
  type        = string
  default     = "tomasmorales.dev"
}
