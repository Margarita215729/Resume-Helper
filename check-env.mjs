console.log('🚀 Testing environment variables...');

// Direct environment check without imports
const githubToken = process.env.GITHUB_TOKEN;
const azureKey = process.env.AZURE_OPENAI_API_KEY;

console.log('GITHUB_TOKEN:', githubToken ? `Set (${githubToken.substring(0, 20)}...) ✓` : 'Not set ✗');
console.log('AZURE_OPENAI_API_KEY:', azureKey ? `Set (${azureKey.substring(0, 10)}...) ✓` : 'Not set ✗');
console.log('AZURE_OPENAI_ENDPOINT:', process.env.AZURE_OPENAI_ENDPOINT || 'Not set');

console.log('\n📝 Next steps:');
if (!githubToken || githubToken === 'your_github_token_here') {
  console.log('1. Create GitHub token with "models" permission');
  console.log('2. Update GITHUB_TOKEN in .env.local file');
} else {
  console.log('1. GitHub token is set - test the models API');
}

console.log('3. Deploy Azure OpenAI models as backup option');
console.log('4. Test Resume Helper AI features');

console.log('\n🔗 Useful links:');
console.log('- GitHub Tokens: https://github.com/settings/tokens');
console.log('- GitHub Models: https://github.com/marketplace/models');
console.log('- Resume Helper: http://localhost:3000/builder');
