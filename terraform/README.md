# Terraform Infrastructure for tomasmorales.dev

This directory contains Terraform configuration for deploying the personal website to Google Cloud Platform.

## Architecture

- **Cloud Run**: Hosts the Next.js application
- **Artifact Registry**: Stores Docker images
- **Cloud Load Balancer**: Handles HTTPS traffic and SSL termination
- **Managed SSL Certificate**: Auto-renewing SSL certificate for tomasmorales.dev

## Prerequisites

1. **GCP Project**: `personal-website-475721`
2. **Terraform**: Version >= 1.0
3. **gcloud CLI**: Authenticated with appropriate permissions
4. **Domain**: `tomasmorales.dev` (DNS managed externally)

## Initial Setup

### 1. Create GCS Bucket for Terraform State

```bash
gcloud storage buckets create gs://personal-website-475721-terraform-state \
  --project=personal-website-475721 \
  --location=us-central1 \
  --uniform-bucket-level-access
```

Enable versioning for state file protection:

```bash
gcloud storage buckets update gs://personal-website-475721-terraform-state \
  --versioning
```

### 2. Initialize Terraform

```bash
cd terraform
terraform init
```

### 3. Review and Apply Infrastructure

```bash
# Review what will be created
terraform plan

# Apply the configuration
terraform apply
```

### 4. Get the Load Balancer IP

After applying, get the IP address:

```bash
terraform output load_balancer_ip
```

### 5. Configure DNS

Point your domain's DNS A record to the load balancer IP:

```
Type: A
Name: @
Value: <load_balancer_ip from above>
TTL: 300
```

For www subdomain:

```
Type: A
Name: www
Value: <load_balancer_ip from above>
TTL: 300
```

**Note**: SSL certificate provisioning can take 15-60 minutes after DNS is configured.

## GitHub Actions Setup

### Workload Identity Federation (Recommended)

1. Create a service account:

```bash
gcloud iam service-accounts create github-actions \
  --project=personal-website-475721 \
  --display-name="GitHub Actions"
```

2. Grant necessary permissions:

```bash
PROJECT_ID="personal-website-475721"
SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

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

3. Create Workload Identity Pool:

```bash
gcloud iam workload-identity-pools create "github-pool" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions Pool"
```

4. Create Workload Identity Provider:

```bash
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition="assertion.repository_owner=='YOUR_GITHUB_USERNAME'" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

5. Allow GitHub Actions to impersonate the service account:

```bash
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_USERNAME/tomasmorales"
```

Replace:
- `PROJECT_NUMBER` with your GCP project number
- `YOUR_GITHUB_USERNAME` with your GitHub username

To get your project number:
```bash
gcloud projects describe personal-website-475721 --format="value(projectNumber)"
```

6. Add GitHub Secrets:

Go to your GitHub repository settings → Secrets and variables → Actions, and add:

```
WIF_PROVIDER: projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider
WIF_SERVICE_ACCOUNT: github-actions@personal-website-475721.iam.gserviceaccount.com
```

## Deployment

Deployments are automatic on push to `main` branch via GitHub Actions.

Manual deployment:
```bash
cd website
docker build -t us-central1-docker.pkg.dev/personal-website-475721/website/website:latest .
docker push us-central1-docker.pkg.dev/personal-website-475721/website/website:latest
gcloud run deploy personal-website --image us-central1-docker.pkg.dev/personal-website-475721/website/website:latest --region us-central1
```

## Monitoring

- **Cloud Run Logs**: `gcloud run services logs read personal-website --region us-central1`
- **Load Balancer Metrics**: GCP Console → Network Services → Load Balancing

## Outputs

- `cloud_run_url`: Direct Cloud Run service URL (for testing)
- `load_balancer_ip`: IP address to point your DNS
- `artifact_registry_url`: Docker repository URL

## Cost Optimization

- Cloud Run scales to zero when idle (no cost)
- Minimum configuration: 512Mi memory, 1 CPU
- CDN enabled for static assets
- No minimum instances (cold starts acceptable)

## SSL Certificate Status

Check certificate provisioning status:

```bash
gcloud compute ssl-certificates describe website-ssl-cert --global --format="get(managed.status)"
```

Status will be `ACTIVE` when ready. This can take 15-60 minutes after DNS configuration.
