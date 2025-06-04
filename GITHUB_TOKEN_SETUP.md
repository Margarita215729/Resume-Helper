# GitHub Models Token Setup Guide

## 🎯 Purpose
This guide helps you set up the GitHub Personal Access Token needed for AI-powered features in your Resume Helper application.

## 📋 Prerequisites
- GitHub account with access to GitHub Models
- Repository admin access to set secrets

## 🔑 Creating GitHub Personal Access Token

### Step 1: Access Token Settings
1. Go to GitHub.com and sign in
2. Click your profile picture → **Settings**
3. In left sidebar, click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**

### Step 2: Generate New Token
1. Click **Generate new token** → **Generate new token (classic)**
2. Add a descriptive note: "Resume Helper AI Services"
3. Set expiration: **90 days** (or longer as needed)

### Step 3: Select Scopes
Select these permissions:
- ✅ **repo** (Full control of private repositories)
- ✅ **read:org** (Read org and team membership)
- ✅ **workflow** (Update GitHub Action workflows)

**Note**: GitHub Models may require additional beta access. Check GitHub Models documentation for current requirements.

### Step 4: Generate and Copy Token
1. Click **Generate token**
2. **⚠️ IMPORTANT**: Copy the token immediately - you won't see it again!
3. Store it securely (we'll add it to GitHub secrets next)

## 🔒 Adding Token to GitHub Repository Secrets

### Step 1: Repository Settings
1. Go to your Resume Helper repository on GitHub
2. Click **Settings** tab
3. In left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Repository Secret
1. Click **New repository secret**
2. Name: `GITHUB_TOKEN`
3. Secret: Paste your personal access token
4. Click **Add secret**

### Step 3: Verify Secret Added
- You should see `GITHUB_TOKEN` listed in your repository secrets
- The value will be hidden (showing only `***`)

## 🧪 Testing the Setup

### Option 1: Manual Workflow Trigger
1. Go to **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow** → **Run workflow**
4. Monitor the build logs for environment variable confirmation

### Option 2: Commit and Push
1. Make any small change to your repository
2. Commit and push to main branch
3. GitHub Actions will automatically trigger deployment

## 🔍 Verification

### Build Logs Should Show:
```
🔍 Environment Debug Test:
GITHUB_TOKEN exists: true
GITHUB_TOKEN length: 40-93
GITHUB_MODEL_ENDPOINT: https://models.github.ai/inference
GITHUB_MODEL_NAME: gpt-4o-mini
✅ Azure modules imported successfully
✅ Azure client created successfully
```

### Live Application Should Have:
- ✅ AI Resume Generation working
- ✅ Job Analysis features functional
- ✅ Cover letter generation available
- ✅ No "AI service unavailable" fallback messages

## 🚨 Troubleshooting

### Token Not Working?
1. **Check Expiration**: Ensure token hasn't expired
2. **Verify Scopes**: Make sure all required permissions are selected
3. **GitHub Models Access**: Confirm you have beta access to GitHub Models
4. **Repository Access**: Ensure token has access to your repository

### Build Failing?
1. **Secret Name**: Ensure secret is named exactly `GITHUB_TOKEN`
2. **Token Format**: Verify token was copied completely without extra spaces
3. **Permissions**: Check repository permissions for GitHub Actions

### AI Features Not Working?
1. **Token in Secrets**: Confirm token is properly added to repository secrets
2. **GitHub Models API**: Check GitHub Models service status
3. **Browser Console**: Look for API error messages in developer tools

## 📞 Support Resources

- **GitHub Models Documentation**: Check GitHub's official Models API docs
- **GitHub Actions Logs**: Review detailed build logs in Actions tab
- **Repository Issues**: Create issue in your repository for specific problems

## 🎉 Success!

Once setup correctly:
- Your Resume Helper will have full AI capabilities
- Job analysis will provide detailed insights
- Resume generation will be intelligent and tailored
- Cover letters will be automatically customized

**Ready to use your AI-powered Resume Helper! 🚀**
