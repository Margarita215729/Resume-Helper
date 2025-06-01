# 🔧 Azure Services Setup Guide (GitHub Models Version)

## 💰 Cost-Effective AI Strategy

Your Resume Helper application uses **GitHub Models** for AI functionality instead of Azure OpenAI, which saves significant costs while providing the same functionality.

## ✅ Already Configured (FREE)
- **GitHub Models API** - AI service for resume generation and analysis
- **GitHub Token** - Authentication for Models API (free tier available)

## 🏗️ Required Azure Services (MINIMAL COST)

### 1. 📊 Application Insights (Monitoring)
**Cost**: ~$2-5/month for basic usage
**Purpose**: Application performance monitoring and logging
**Status**: ❌ Needs configuration

#### Setup Steps:
```bash
# Create Azure OpenAI resource
az cognitiveservices account create \
  --name "openai-resume-helper-prod" \
  --resource-group "rg-resume-helper-prod" \
  --location "eastus2" \
  --kind "OpenAI" \
  --sku "S0"

# Deploy GPT-4o-mini model
az cognitiveservices account deployment create \
  --name "openai-resume-helper-prod" \
  --resource-group "rg-resume-helper-prod" \
  --deployment-name "gpt-4o-mini" \
  --model-name "gpt-4o-mini" \
  --model-version "2024-07-18" \
  --model-format "OpenAI" \
  --sku-capacity 10 \
  --sku-name "Standard"

# Get endpoint and API key
az cognitiveservices account show \
  --name "openai-resume-helper-prod" \
  --resource-group "rg-resume-helper-prod" \
  --query "properties.endpoint" -o tsv

az cognitiveservices account keys list \
  --name "openai-resume-helper-prod" \
  --resource-group "rg-resume-helper-prod" \
  --query "key1" -o tsv
```

#### Update .env.local:
```bash
AZURE_OPENAI_ENDPOINT=https://openai-resume-helper-prod.openai.azure.com/
AZURE_OPENAI_API_KEY=[output-from-keys-command]
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
```

### 2. 📊 Application Insights
**Status**: ❌ Not configured (using placeholder values)
**Required for**: Monitoring, logging, and performance tracking

#### Setup Steps:
```bash
# Create Application Insights
az monitor app-insights component create \
  --app "ai-resume-helper-prod" \
  --location "eastus2" \
  --resource-group "rg-resume-helper-prod" \
  --kind "web"

# Get connection string
az monitor app-insights component show \
  --app "ai-resume-helper-prod" \
  --resource-group "rg-resume-helper-prod" \
  --query "connectionString" -o tsv
```

#### Update .env.local:
```bash
APPLICATIONINSIGHTS_CONNECTION_STRING=[output-from-connection-string-command]
```

### 3. 🔐 Production NextAuth Secret
**Status**: ⚠️ Using development secret
**Required for**: Secure authentication

#### Generate Production Secret:
```bash
# Generate secure random secret (32+ characters)
openssl rand -base64 32
```

#### Update .env.local:
```bash
NEXTAUTH_SECRET=[generated-secret]
```

---

## 🚀 Quick Setup Script

Run this script to create all missing Azure resources:

```bash
#!/bin/bash
# Quick setup for missing Azure services

RESOURCE_GROUP="rg-resume-helper-prod"
LOCATION="eastus2"
OPENAI_NAME="openai-resume-helper-prod"
APPINSIGHTS_NAME="ai-resume-helper-prod"

echo "🔧 Creating Azure OpenAI Service..."
az cognitiveservices account create \
  --name "$OPENAI_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --kind "OpenAI" \
  --sku "S0"

echo "🤖 Deploying GPT-4o-mini model..."
az cognitiveservices account deployment create \
  --name "$OPENAI_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --deployment-name "gpt-4o-mini" \
  --model-name "gpt-4o-mini" \
  --model-version "2024-07-18" \
  --model-format "OpenAI" \
  --sku-capacity 10 \
  --sku-name "Standard"

echo "📊 Creating Application Insights..."
az monitor app-insights component create \
  --app "$APPINSIGHTS_NAME" \
  --location "$LOCATION" \
  --resource-group "$RESOURCE_GROUP" \
  --kind "web"

echo "✅ Resources created! Now get the configuration values:"
echo ""
echo "1. Azure OpenAI Endpoint:"
az cognitiveservices account show \
  --name "$OPENAI_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "properties.endpoint" -o tsv

echo ""
echo "2. Azure OpenAI API Key:"
az cognitiveservices account keys list \
  --name "$OPENAI_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "key1" -o tsv

echo ""
echo "3. Application Insights Connection String:"
az monitor app-insights component show \
  --app "$APPINSIGHTS_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "connectionString" -o tsv

echo ""
echo "4. Generate NextAuth Secret:"
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
```

---

## ✅ Final Checklist

- [ ] Azure OpenAI service created and model deployed
- [ ] Application Insights created 
- [ ] Production NextAuth secret generated
- [ ] All values updated in .env.local
- [ ] GitHub secrets configured (see GITHUB_SECRETS_SETUP.md)
- [ ] Ready for deployment!

---

## 💡 Cost Optimization Tips

- **Azure OpenAI**: Start with minimal capacity (10 TPM), scale as needed
- **Application Insights**: Use Basic tier for development/testing
- **Container Apps**: Auto-scaling helps control costs

Your estimated monthly cost: ~$50-100 USD (depending on usage)
