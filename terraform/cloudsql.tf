/*
This is originally based on CloudSQL sample code found in their qwiklabs, but
uses more modern providers and removes a lot of unused variables.
 */
resource "random_id" "name" {
  byte_length = 2
}

resource "google_sql_database_instance" "master" {
  name                 = "seat-dealer-main-db"
  project              = var.project
  region               = var.region
  database_version     = var.database_version

  settings {
    tier                        = var.tier
    activation_policy           = var.activation_policy
    disk_autoresize             = var.disk_autoresize

    disk_size        = var.disk_size
    disk_type        = var.disk_type
    pricing_plan     = var.pricing_plan
  }

  timeouts {
    create = "60m"
    delete = "2h"
  }
}

resource "google_sql_database" "default" {
  count     = 1
  name      = var.db_name
  project   = var.project
  instance  = google_sql_database_instance.master.name
  charset   = var.db_charset
  collation = var.db_collation
}

resource "random_id" "user-password" {
  byte_length = 8
}

resource "google_sql_user" "default" {
  count    = 1
  name     = var.user_name
  project  = var.project
  instance = google_sql_database_instance.master.name
  host     = var.user_host
  password = var.user_password == "" ? random_id.user-password.hex : var.user_password
}
