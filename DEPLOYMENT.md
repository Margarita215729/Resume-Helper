# Deployment Guide for Resume Helper

## 🚀 Production Deployment Status

✅ **Successfully deployed to Azure Container Apps!**

## 📋 Deployment Configuration

### Current Setup:
- **Platform**: Azure Container Apps
- **Build**: Docker with standalone Next.js output
- **Authentication**: NextAuth v5 with credentials provider
- **AI Service**: GitHub Models API
- **Container Registry**: Azure Container Registry

### Architecture:
```
GitHub → GitHub Actions → Docker Build → Azure Container Registry → Azure Container Apps
```

## 🔧 Required GitHub Secrets

Make sure these secrets are configured in your GitHub repository:

1. **AZURE_CREDENTIALS** - Azure service principal credentials
2. **REGISTRY_USERNAME** - Azure Container Registry username
3. **REGISTRY_PASSWORD** - Azure Container Registry password
4. **GITHUB_TOKEN** - GitHub token for Models API (already configured)

## 🏗️ Build Configuration

### Next.js Configuration (`next.config.js`):
```javascript
output: 'standalone'  // ✅ Optimized for Docker/Container deployment
```

### Dockerfile Features:
- ✅ Multi-stage build for optimization
- ✅ Standalone Next.js output support
- ✅ Proper user permissions and security
- ✅ Optimized for production

## 📦 Deployment Workflow

### Automatic Deployment:
1. **Trigger**: Push to `main` branch
2. **Build**: 
   - Install dependencies
   - Run linting
   - Build Next.js application
3. **Docker**:
   - Build Docker image with standalone output
   - Push to Azure Container Registry
4. **Deploy**:
   - Deploy to Azure Container Apps
   - Configure ingress and port 3000

### Manual Deployment:
```bash
# Run manually via GitHub Actions
# Go to Actions → Deploy to Azure Container Apps → Run workflow
```

## 🌐 Access Your Application

After successful deployment, your application will be available at:
```
https://ca-resume-helper-prod.REGION.azurecontainerapps.io
```

## 🔍 Monitoring & Logs

### Check Deployment Status:
1. Go to GitHub Actions
2. Check latest workflow run
3. Monitor build and deployment logs

### Azure Portal:
1. Navigate to your Container App
2. Check logs and metrics
3. Monitor application health

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check GitHub Actions logs
   - Verify all dependencies in package.json
   - Ensure environment variables are set

2. **Authentication Issues**:
   - Verify NEXTAUTH_URL in environment
   - Check NEXTAUTH_SECRET configuration
   - Ensure credentials provider is working

3. **Container Issues**:
   - Check Dockerfile configuration
   - Verify port 3000 exposure
   - Monitor container logs in Azure Portal

## 📚 Key Files

- `/.github/workflows/deploy.yml` - Azure deployment workflow
- `/Dockerfile` - Container configuration
- `/next.config.js` - Next.js build configuration
- `/.env.local` - Environment variables (local)

## 🔒 Security Notes

- GitHub token is configured as repository secret
- Azure credentials use service principal
- Environment variables are properly managed
- Container runs with non-root user

---

## 🎉 Deployment Success!

Your Resume Helper application is now successfully deployed to Azure Container Apps with full server-side functionality including:
- ✅ User authentication
- ✅ AI-powered resume generation
- ✅ PDF/DOCX export
- ✅ Real-time preview
- ✅ Responsive design

Access your live application and start creating amazing resumes!
