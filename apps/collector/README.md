```
gcloud functions deploy collector \
    --region=europe-west1 \
    --allow-unauthenticated \
    --runtime=nodejs14 \
    --memory=1024MB \
    --project=privacytracker \
    --env-vars-file= \
    --source=dist/apps/collector \
    --trigger-http
```
