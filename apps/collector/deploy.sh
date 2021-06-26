npm run build collector
gcloud functions deploy collector \
  --region=europe-west1 \
  --no-allow-unauthenticated \
  --runtime=nodejs14 \
  --memory=1024MB \
  --project=privacytracker \
  --env-vars-file=secrets/collector.yml \
  --source=dist/apps/collector \
  --trigger-http
