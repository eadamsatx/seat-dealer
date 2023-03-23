

resource "google_storage_bucket" "config_bucket" {
  name          = "seat-dealer-config-bucket"
  project       = "seat-dealer"
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}

terraform {
  required_providers {
    random = {
      version = "~> 2.2"
    }
  }
 backend "gcs" {
   bucket  = "seat-dealer-config-bucket"
   prefix  = "terraform/state"
 }
}
