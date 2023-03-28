
## Deploy the thing from a dev machine
```bash
gcloud functions deploy seat-dealer-api \
--gen2 \
--runtime=python311 \
--region=us-central1 \
--source=. \
--entry-point=hello_get \
--trigger-http \
--allow-unauthenticated
```

## administering sql stuff
### connect dev machine to db using proxy
Install [cloud_sql_proxy](https://cloud.google.com/sql/docs/mysql/sql-proxy#macos-64-bit) installed:


```bash
cd terraform
export GOOGLE_PROJECT=$(gcloud config get-value project)
export MYSQL_DB_NAME=$(terraform output -json | jq -r '.instance_name.value')
export MYSQL_CONN_NAME="${GOOGLE_PROJECT}:us-central1:${MYSQL_DB_NAME}"
./cloud-sql-proxy ${MYSQL_CONN_NAME}
echo MYSQL_PASSWORD=$(terraform output -json | jq -r '.generated_user_password.value')
mysql -udefault -p --host 127.0.0.1 default
```

### Create a new migration
`alembic revision --autogenerate -m "Added some table"`

### Run Migrations
`alembic upgrade`

### connect dev machine to db using gcloud only, no proxy
```bash
gcloud sql connect myinstance --user=postgres
```

## Initial dev org/gcloud cli setup
```
gcloud services enable storage.googleapis.com
gcloud services enable sql-component.googleapis.com
```

## Not handled by deployment
- getEvents cloud function needs principal `allUsers` to be assigned role `Cloud Functions Invoker`