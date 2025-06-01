#!/bin/bash

# 🚀 Azure Resources Setup Script for Resume Helper
# This script creates all necessary Azure resources for deployment

set -e

# Configuration
RESOURCE_GROUP="rg-resume-helper-prod"
LOCATION="eastus2"
REGISTRY_NAME="crresumehelperprod"
CONTAINER_APP_ENV="cae-resume-helper-prod"
CONTAINER_APP_NAME="ca-resume-helper-prod"
APPINSIGHTS_NAME="ai-resume-helper-prod"

echo "🚀 Starting Azure resources setup for Resume Helper..."

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Login check
echo "🔐 Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "❌ Not logged in to Azure. Please run: az login"
    exit 1
fi

# Get subscription info
SUBSCRIPTION_ID=$(az account show --query id --output tsv)
echo "✅ Using subscription: $SUBSCRIPTION_ID"

echo ""
echo "📦 Creating Resource Group..."
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION \
    --output table

echo ""
echo "🐳 Creating Container Registry..."
az acr create \
    --resource-group $RESOURCE_GROUP \
    --name $REGISTRY_NAME \
    --sku Basic \
    --admin-enabled true \
    --output table

echo ""
echo "🌐 Creating Container Apps Environment..."
az containerapp env create \
    --name $CONTAINER_APP_ENV \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --output table

echo ""
echo "🔑 Getting Container Registry credentials..."
REGISTRY_CREDENTIALS=$(az acr credential show --name $REGISTRY_NAME --output json)
REGISTRY_USERNAME=$(echo $REGISTRY_CREDENTIALS | jq -r '.username')
REGISTRY_PASSWORD=$(echo $REGISTRY_CREDENTIALS | jq -r '.passwords[0].value')

echo ""
echo "🎯 Creating Service Principal for GitHub Actions..."
SP_CREDENTIALS=$(az ad sp create-for-rbac \
    --name "resume-helper-github-actions" \
    --role contributor \
    --scopes /subscriptions/$SUBSCRIPTION_ID \
    --sdk-auth)

echo ""
echo "📊 Creating Application Insights..."
az monitor app-insights component create \
    --app "$APPINSIGHTS_NAME" \
    --location "$LOCATION" \
    --resource-group "$RESOURCE_GROUP" \
    --kind "web"

# Get configuration values
echo ""
echo "🔍 Gathering configuration values..."

APPINSIGHTS_CONNECTION=$(az monitor app-insights component show \
    --app "$APPINSIGHTS_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --query "connectionString" -o tsv 2>/dev/null || echo "Not available")

NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "Generate manually")

echo ""
echo "✅ Azure resources created successfully!"
echo ""
echo "📋 GitHub Secrets Configuration:"
echo "================================"
echo ""
echo "🔐 AZURE_CREDENTIALS:"
echo "$SP_CREDENTIALS"
echo ""
echo "🔐 REGISTRY_USERNAME:"
echo "$REGISTRY_USERNAME"
echo ""
echo "🔐 REGISTRY_PASSWORD:"
echo "$REGISTRY_PASSWORD"
echo ""
echo "📋 Environment Variables for .env.local:"
echo "========================================"
echo ""
echo "# GitHub Models (AI) - Already configured ✅"
echo "GITHUB_TOKEN=your-github-token"
echo "GITHUB_MODEL_ENDPOINT=https://models.github.ai/inference"
echo "GITHUB_MODEL_NAME=openai/o4-mini"
echo ""
echo "# Azure Monitoring"
echo "APPLICATIONINSIGHTS_CONNECTION_STRING=$APPINSIGHTS_CONNECTION"
echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET"
echo ""
echo "📝 Next steps:"
echo "1. Copy GitHub secrets to repository (Settings → Secrets and variables → Actions)"
echo "2. Update .env.local APPLICATIONINSIGHTS_CONNECTION_STRING"
echo "3. Verify GITHUB_TOKEN is working in .env.local"
echo "4. Push code to main branch to trigger deployment"
echo ""
echo "💰 Cost savings: Using FREE GitHub Models instead of paid Azure OpenAI!"
echo ""
echo "🌐 Resources created:"
echo "- Resource Group: $RESOURCE_GROUP"
echo "- Container Registry: $REGISTRY_NAME" 
echo "- Container Apps Environment: $CONTAINER_APP_ENV"
echo "- Application Insights: $APPINSIGHTS_NAME"
echo "- Service Principal: resume-helper-github-actions"
echo ""
echo "🚀 Ready for deployment with GitHub Models AI!"
echo "- Resource Group: $RESOURCE_GROUP"
echo "- Container Registry: $REGISTRY_NAME"
echo "- Container Apps Environment: $CONTAINER_APP_ENV"
echo "- Azure OpenAI: $OPENAI_NAME"
echo "- Application Insights: $APPINSIGHTS_NAME"
echo ""
echo "🚀 Ready for deployment!"
