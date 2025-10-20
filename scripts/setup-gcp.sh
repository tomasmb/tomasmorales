#!/bin/bash

# Setup script for GCP deployment
# Run this script to set up the initial infrastructure

set -e

PROJECT_ID="personal-website-475721"
REGION="us-central1"
GITHUB_USERNAME="${1:-YOUR_GITHUB_USERNAME}"
REPO_NAME="${2:-tomasmorales}"

echo "🚀 Setting up GCP infrastructure for tomasmorales.dev"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Authenticate and set project
echo "📝 Setting up gcloud configuration..."
gcloud config set project $PROJECT_ID

# Create Terraform state bucket
echo ""
echo "📦 Creating Terraform state bucket..."
if gcloud storage buckets describe gs://${PROJECT_ID}-terraform-state &> /dev/null; then
    echo "   Bucket already exists, skipping..."
else
    gcloud storage buckets create gs://${PROJECT_ID}-terraform-state \
      --project=$PROJECT_ID \
      --location=$REGION \
      --uniform-bucket-level-access

    gcloud storage buckets update gs://${PROJECT_ID}-terraform-state --versioning
    echo "   ✅ Bucket created"
fi

# Create service account
echo ""
echo "👤 Creating GitHub Actions service account..."
SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

if gcloud iam service-accounts describe $SA_EMAIL --project=$PROJECT_ID &> /dev/null; then
    echo "   Service account already exists, skipping..."
else
    gcloud iam service-accounts create github-actions \
      --project=$PROJECT_ID \
      --display-name="GitHub Actions"
    echo "   ✅ Service account created"
fi

# Grant permissions
echo ""
echo "🔐 Granting service account permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin" \
  --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/artifactregistry.writer" \
  --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser" \
  --quiet

echo "   ✅ Permissions granted"

# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

# Create Workload Identity Pool
echo ""
echo "🔑 Setting up Workload Identity Federation..."
if gcloud iam workload-identity-pools describe github-pool --location=global --project=$PROJECT_ID &> /dev/null; then
    echo "   Pool already exists, skipping..."
else
    gcloud iam workload-identity-pools create "github-pool" \
      --project="${PROJECT_ID}" \
      --location="global" \
      --display-name="GitHub Actions Pool"
    echo "   ✅ Pool created"
fi

# Create OIDC Provider
if gcloud iam workload-identity-pools providers describe github-provider --location=global --workload-identity-pool=github-pool --project=$PROJECT_ID &> /dev/null; then
    echo "   Provider already exists, skipping..."
else
    gcloud iam workload-identity-pools providers create-oidc "github-provider" \
      --project="${PROJECT_ID}" \
      --location="global" \
      --workload-identity-pool="github-pool" \
      --display-name="GitHub Provider" \
      --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
      --attribute-condition="assertion.repository_owner=='${GITHUB_USERNAME}'" \
      --issuer-uri="https://token.actions.githubusercontent.com"
    echo "   ✅ Provider created"
fi

# Bind service account to GitHub
echo ""
echo "🔗 Binding service account to GitHub repository..."
gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/attribute.repository/${GITHUB_USERNAME}/${REPO_NAME}" \
  --quiet

echo "   ✅ Binding complete"

# Deploy Terraform
echo ""
echo "🏗️  Deploying infrastructure with Terraform..."
cd terraform

if [ ! -d ".terraform" ]; then
    terraform init
fi

terraform plan
echo ""
read -p "Do you want to apply this Terraform plan? (yes/no): " confirm

if [ "$confirm" = "yes" ]; then
    terraform apply -auto-approve
    echo ""
    echo "🎉 Infrastructure deployed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo ""
    echo "1. Add these secrets to your GitHub repository:"
    echo "   Repository → Settings → Secrets and variables → Actions"
    echo ""
    echo "   WIF_PROVIDER=projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
    echo ""
    echo "   WIF_SERVICE_ACCOUNT=${SA_EMAIL}"
    echo ""
    echo "2. Configure your DNS A record:"
    LOAD_BALANCER_IP=$(terraform output -raw load_balancer_ip)
    echo "   Type: A"
    echo "   Name: @"
    echo "   Value: ${LOAD_BALANCER_IP}"
    echo "   TTL: 300"
    echo ""
    echo "3. Push to main branch to trigger deployment"
    echo ""
    echo "SSL certificate will be provisioned automatically after DNS is configured (15-60 minutes)"
else
    echo "Terraform apply cancelled"
fi
