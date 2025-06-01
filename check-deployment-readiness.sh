#!/bin/bash

# 🔍 Deployment Readiness Check for Resume Helper
# This script validates that all required configuration is in place

set -e

echo "🔍 Checking deployment readiness for Resume Helper..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ISSUES=0

# Function to check if value is not a placeholder
check_env_var() {
    local var_name=$1
    local var_value=$2
    local required=$3
    
    if [ -z "$var_value" ]; then
        if [ "$required" = "true" ]; then
            echo -e "${RED}❌ $var_name: Missing${NC}"
            ((ISSUES++))
        else
            echo -e "${YELLOW}⚠️  $var_name: Optional (missing)${NC}"
        fi
    elif [[ "$var_value" == *"your-"* ]] || [[ "$var_value" == *"placeholder"* ]] || [[ "$var_value" == *"xxx"* ]]; then
        if [ "$required" = "true" ]; then
            echo -e "${RED}❌ $var_name: Contains placeholder value${NC}"
            ((ISSUES++))
        else
            echo -e "${YELLOW}⚠️  $var_name: Contains placeholder value${NC}"
        fi
    else
        echo -e "${GREEN}✅ $var_name: Configured${NC}"
    fi
}

# Load .env.local if exists
if [ -f ".env.local" ]; then
    export $(grep -v '^#' .env.local | grep -v '^$' | xargs)
    echo "📁 Found .env.local file"
else
    echo -e "${RED}❌ .env.local file not found${NC}"
    ((ISSUES++))
fi

echo ""
echo "🔧 Checking Environment Variables:"
echo "================================="

# Critical variables
check_env_var "GITHUB_TOKEN" "$GITHUB_TOKEN" "true"
check_env_var "AZURE_SUBSCRIPTION_ID" "$AZURE_SUBSCRIPTION_ID" "true"
check_env_var "NEXTAUTH_SECRET" "$NEXTAUTH_SECRET" "true"
check_env_var "NEXTAUTH_URL" "$NEXTAUTH_URL" "true"

# GitHub Models (AI service - FREE!)
check_env_var "GITHUB_MODEL_ENDPOINT" "$GITHUB_MODEL_ENDPOINT" "true"
check_env_var "GITHUB_MODEL_NAME" "$GITHUB_MODEL_NAME" "true"

# Monitoring
check_env_var "APPLICATIONINSIGHTS_CONNECTION_STRING" "$APPLICATIONINSIGHTS_CONNECTION_STRING" "false"

# Container settings
check_env_var "CONTAINER_REGISTRY_NAME" "$CONTAINER_REGISTRY_NAME" "true"
check_env_var "CONTAINER_APP_NAME" "$CONTAINER_APP_NAME" "true"

echo ""
echo "🐙 Checking GitHub Repository Secrets:"
echo "====================================="

# Check if we can access GitHub API (requires gh CLI)
if command -v gh &> /dev/null; then
    echo "📡 Checking GitHub secrets..."
    
    # Check required secrets
    SECRETS=$(gh secret list 2>/dev/null || echo "")
    
    if echo "$SECRETS" | grep -q "AZURE_CREDENTIALS"; then
        echo -e "${GREEN}✅ AZURE_CREDENTIALS: Found${NC}"
    else
        echo -e "${RED}❌ AZURE_CREDENTIALS: Missing${NC}"
        ((ISSUES++))
    fi
    
    if echo "$SECRETS" | grep -q "REGISTRY_USERNAME"; then
        echo -e "${GREEN}✅ REGISTRY_USERNAME: Found${NC}"
    else
        echo -e "${RED}❌ REGISTRY_USERNAME: Missing${NC}"
        ((ISSUES++))
    fi
    
    if echo "$SECRETS" | grep -q "REGISTRY_PASSWORD"; then
        echo -e "${GREEN}✅ REGISTRY_PASSWORD: Found${NC}"
    else
        echo -e "${RED}❌ REGISTRY_PASSWORD: Missing${NC}"
        ((ISSUES++))
    fi
    
    if echo "$SECRETS" | grep -q "GITHUB_TOKEN"; then
        echo -e "${GREEN}✅ GITHUB_TOKEN: Found${NC}"
    else
        echo -e "${YELLOW}⚠️  GITHUB_TOKEN: Not found (may be auto-provided)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  GitHub CLI not installed - cannot check repository secrets${NC}"
    echo "   Install with: brew install gh"
fi

echo ""
echo "🏗️  Checking Build Configuration:"
echo "================================="

# Check Next.js config
if [ -f "next.config.js" ]; then
    if grep -q "output.*standalone" next.config.js; then
        echo -e "${GREEN}✅ Next.js: Standalone output configured${NC}"
    else
        echo -e "${RED}❌ Next.js: Missing standalone output configuration${NC}"
        ((ISSUES++))
    fi
else
    echo -e "${RED}❌ next.config.js: File not found${NC}"
    ((ISSUES++))
fi

# Check Dockerfile
if [ -f "Dockerfile" ]; then
    echo -e "${GREEN}✅ Dockerfile: Found${NC}"
else
    echo -e "${RED}❌ Dockerfile: Missing${NC}"
    ((ISSUES++))
fi

# Check GitHub workflow
if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "${GREEN}✅ GitHub Workflow: Found${NC}"
else
    echo -e "${RED}❌ GitHub Workflow: Missing${NC}"
    ((ISSUES++))
fi

echo ""
echo "📊 Summary:"
echo "==========="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready for deployment.${NC}"
    echo ""
    echo "🚀 To deploy:"
    echo "   git add ."
    echo "   git commit -m \"Ready for production deployment\""
    echo "   git push origin main"
    exit 0
else
    echo -e "${RED}❌ Found $ISSUES issues that need to be resolved.${NC}"
    echo ""
    echo "📝 Next steps:"
    echo "1. Fix the issues listed above"
    echo "2. Run './setup-azure.sh' if Azure resources are missing"
    echo "3. Update .env.local with real values"
    echo "4. Configure GitHub repository secrets"
    echo "5. Run this check again"
    exit 1
fi
