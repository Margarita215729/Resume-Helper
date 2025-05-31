# GitHub Models Token Setup Instructions

## Steps to Create a GitHub Token for Models API

1. **Go to GitHub Token Settings**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" > "Generate new token (classic)"

2. **Configure Token Settings**
   - **Token name**: `Resume Helper OpenAI Token`
   - **Expiration**: Choose appropriate duration (30 days, 60 days, etc.)

3. **Select Required Permissions**
   ⚠️ **IMPORTANT**: You must select the following scopes:
   
   - ✅ **`models`** - This is REQUIRED for GitHub Models API access
   - ✅ **`read:user`** - Basic user information access
   
   Optional (if you plan to use other features):
   - ✅ **`read:org`** - If using organizational resources

4. **Generate and Copy Token**
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)
   - Token format: `github_pat_11XXXXX...`

5. **Update .env.local File**
   Replace the GITHUB_TOKEN in your `.env.local` file:
   ```
   GITHUB_TOKEN=github_pat_YOUR_NEW_TOKEN_HERE
   ```

## Testing the Integration

After updating the token, run:
```bash
node test-github-models.mjs
```

## Troubleshooting

- **401 Unauthorized**: Token doesn't have `models` permission
- **403 Forbidden**: Rate limit exceeded or token expired
- **404 Not Found**: Wrong endpoint or model name

## GitHub Models Available

Popular models you can use:
- `gpt-4o-mini` (recommended for cost efficiency)
- `gpt-4o`
- `gpt-4`
- `gpt-3.5-turbo`

## Rate Limits

GitHub Models has usage limits:
- Requests per minute: Varies by model
- Requests per day: Check GitHub Models documentation
- Not for production use (use Azure OpenAI for production)
