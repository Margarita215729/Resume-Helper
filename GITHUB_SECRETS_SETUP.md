# 🔐 GitHub Secrets Configuration Guide

## Required Secrets for Azure Container Apps Deployment

To successfully deploy your Resume Helper application to Azure Container Apps, you need to configure the following secrets in your GitHub repository:

### 📍 How to Add Secrets:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below

---

## 🏗️ Required Secrets:

### 1. AZURE_CREDENTIALS
**Description**: Azure service principal credentials for authentication

**Format**: JSON object
```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret", 
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id"
}
```

**How to get**:
```bash
# Create service principal
az ad sp create-for-rbac \
  --name "resume-helper-github-actions" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID \
  --sdk-auth
```

### 2. REGISTRY_USERNAME
**Description**: Azure Container Registry username

**Value**: Usually the registry name (e.g., `crresumehelperprod`)

**How to get**:
```bash
# Get registry credentials
az acr credential show --name crresumehelperprod
```

### 3. REGISTRY_PASSWORD
**Description**: Azure Container Registry password

**Value**: The password from ACR credentials

**How to get**:
```bash
# Get registry credentials (use password1 or password2)
az acr credential show --name crresumehelperprod
```

### 4. GITHUB_TOKEN (Already configured)
**Description**: GitHub token for Models API access
**Status**: ✅ Already configured in your repository

---

## 🚀 Azure Resources Setup

Before deployment, ensure these Azure resources exist:

### Resource Group:
```bash
az group create --name rg-resume-helper-prod --location eastus2
```

### Container Registry:
```bash
az acr create \
  --resource-group rg-resume-helper-prod \
  --name crresumehelperprod \
  --sku Basic \
  --admin-enabled true
```

### Container Apps Environment:
```bash
az containerapp env create \
  --name cae-resume-helper-prod \
  --resource-group rg-resume-helper-prod \
  --location eastus2
```

---

## ✅ Verification Steps

### 1. Check Secrets:
- Go to GitHub repository → Settings → Secrets and variables → Actions
- Verify all 3 secrets are configured (GITHUB_TOKEN should already exist)

### 2. Test Azure CLI Access:
```bash
# Test login with service principal
az login --service-principal \
  --username CLIENT_ID \
  --password CLIENT_SECRET \
  --tenant TENANT_ID
```

### 3. Test Container Registry:
```bash
# Test registry login
az acr login --name crresumehelperprod
```

---

## 🐛 Common Issues & Solutions

### Issue: "Azure login failed"
**Solution**: Check AZURE_CREDENTIALS format and service principal permissions

### Issue: "Registry authentication failed"  
**Solution**: Verify REGISTRY_USERNAME and REGISTRY_PASSWORD from `az acr credential show`

### Issue: "Container App not found"
**Solution**: Create Container Apps environment first

---

## 📞 Next Steps

1. ✅ Configure all GitHub secrets
2. ✅ Verify Azure resources exist
3. ✅ Push code to main branch
4. ✅ Monitor GitHub Actions workflow
5. ✅ Access deployed application

Your deployment workflow will automatically trigger when you push to the main branch!
