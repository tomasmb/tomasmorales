# Deployment Guide

This guide walks you through deploying tomasmorales.dev to Google Cloud Platform using Terraform and GitHub Actions.

## Quick Start

### 1. Set up GCP Infrastructure

```bash
# Authenticate with GCP
gcloud auth login
gcloud config set project personal-website-475721

# Create Terraform state bucket
gcloud storage buckets create gs://personal-website-475721-terraform-state \
  --project=personal-website-475721 \
  --location=us-central1 \
  --uniform-bucket-level-access

# Enable versioning
gcloud storage buckets update gs://personal-website-475721-terraform-state --versioning

# Deploy infrastructure
cd terraform
terraform init
terraform plan
terraform apply
```

### 2. Configure DNS

After Terraform completes, get the load balancer IP:

```bash
terraform output load_balancer_ip
```

Update your DNS records at your domain registrar:

**A Record:**
- Type: `A`
- Name: `@`
- Value: `<load_balancer_ip>`
- TTL: `300`

**WWW Subdomain (optional):**
- Type: `A`
- Name: `www`
- Value: `<load_balancer_ip>`
- TTL: `300`

### 3. Set up GitHub Actions

#### Create Service Account

```bash
PROJECT_ID="personal-website-475721"

# Create service account
gcloud iam service-accounts create github-actions \
  --project=$PROJECT_ID \
  --display-name="GitHub Actions"

SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

# Grant permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser"
```

#### Set up Workload Identity Federation

```bash
# Get your project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"  # Replace with your username
REPO_NAME="tomasmorales"  # Your repository name

# Create Workload Identity Pool
gcloud iam workload-identity-pools create "github-pool" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Create OIDC Provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner=='${GITHUB_USERNAME}'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# Allow GitHub Actions to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/${GITHUB_USERNAME}/${REPO_NAME}"
```

#### Add GitHub Secrets

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:

```
WIF_PROVIDER=projects/<PROJECT_NUMBER>/locations/global/workloadIdentityPools/github-pool/providers/github-provider

WIF_SERVICE_ACCOUNT=github-actions@personal-website-475721.iam.gserviceaccount.com
```

To get the exact values:
```bash
echo "WIF_PROVIDER=projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
echo "WIF_SERVICE_ACCOUNT=${SA_EMAIL}"
```

### 4. Deploy

Push to the `main` branch and GitHub Actions will automatically:
1. Build the Docker image
2. Push to Artifact Registry
3. Deploy to Cloud Run

Monitor the deployment:
```bash
# Watch GitHub Actions in your repository
# Or check Cloud Run directly:
gcloud run services describe personal-website --region us-central1
```

## SSL Certificate

The managed SSL certificate will be automatically provisioned after DNS is configured. This takes 15-60 minutes.

Check status:
```bash
gcloud compute ssl-certificates describe website-ssl-cert --global --format="get(managed.status)"
```

Once it shows `ACTIVE`, your site will be available at `https://tomasmorales.dev`

## Manual Deployment (Without GitHub Actions)

If you prefer to deploy manually:

```bash
# Build and push Docker image
cd website
docker build -t us-central1-docker.pkg.dev/personal-website-475721/website/website:latest .
docker push us-central1-docker.pkg.dev/personal-website-475721/website/website:latest

# Deploy to Cloud Run
gcloud run deploy personal-website \
  --image us-central1-docker.pkg.dev/personal-website-475721/website/website:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --port 3000
```

## Verification

1. **Cloud Run URL**: Check the direct Cloud Run URL first
   ```bash
   gcloud run services describe personal-website --region us-central1 --format="value(status.url)"
   ```

2. **Load Balancer**: After DNS propagates (5-10 minutes), check:
   ```bash
   curl -I https://tomasmorales.dev
   ```

3. **SSL Certificate**: Verify HTTPS is working:
   ```bash
   openssl s_client -connect tomasmorales.dev:443 -servername tomasmorales.dev
   ```

## Monitoring & Logs

```bash
# View logs
gcloud run services logs read personal-website --region us-central1 --limit 50

# Follow logs in real-time
gcloud run services logs tail personal-website --region us-central1

# View metrics in GCP Console
open "https://console.cloud.google.com/run/detail/us-central1/personal-website/metrics?project=personal-website-475721"
```

## Cost Estimate

- **Cloud Run**: $0 when idle (scales to zero), ~$5-10/month with moderate traffic
- **Cloud Load Balancer**: ~$18/month base + usage
- **Artifact Registry**: ~$0.10/GB/month for storage
- **Cloud Storage** (Terraform state): < $1/month
- **Total estimate**: ~$20-30/month

## Troubleshooting

### SSL Certificate not provisioning
- Verify DNS A record points to the load balancer IP
- Wait 15-60 minutes for Google to provision
- Check: `gcloud compute ssl-certificates describe website-ssl-cert --global`

### GitHub Actions failing
- Verify Workload Identity Federation is set up correctly
- Check service account has required permissions
- Verify GitHub secrets are set correctly

### Site not loading
- Check Cloud Run service is running: `gcloud run services list`
- Verify load balancer backend is healthy in GCP Console
- Check DNS propagation: `dig tomasmorales.dev`

### Build failing
- Ensure `output: 'standalone'` is in next.config.ts
- Verify Docker can build locally: `cd website && docker build .`
