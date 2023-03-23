
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
```bash
export GOOGLE_PROJECT=$(gcloud config get-value project)
MYSQL_DB_NAME=$(terraform output -json | jq -r '.instance_name.value')
MYSQL_CONN_NAME="${GOOGLE_PROJECT}:us-central1:${MYSQL_DB_NAME}"
./cloud_sql_proxy -instances=${MYSQL_CONN_NAME}=tcp:3306
cd terraform
echo MYSQL_PASSWORD=$(terraform output -json | jq -r '.generated_user_password.value')
mysql -udefault -p --host 127.0.0.1 default
```

### connect dev machine to db using gcloud only, no proxy
```bash
gcloud sql connect myinstance --user=postgres
```

## Initial dev org/gcloud cli setup
```
gcloud services enable storage.googleapis.com
gcloud services enable sql-component.googleapis.com
```