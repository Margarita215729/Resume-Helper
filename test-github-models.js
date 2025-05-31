const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

async function testGitHubModels() {
  console.log('🚀 Testing GitHub Models integration...');
  console.log('Working directory:', process.cwd());
  
  // Check environment variables
  console.log('\n📋 Environment Variables:');
  console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN ? `Set (${process.env.GITHUB_TOKEN.substring(0, 20)}...) ✓` : 'Not set ✗');
  console.log('GITHUB_MODEL_ENDPOINT:', process.env.GITHUB_MODEL_ENDPOINT || 'Not set');
  console.log('GITHUB_MODEL_NAME:', process.env.GITHUB_MODEL_NAME || 'Not set');
  
  if (!process.env.GITHUB_TOKEN) {
    console.error('\n❌ GITHUB_TOKEN is not set. Please check your .env.local file.');
    return;
  }
  
  try {
    const client = new OpenAI({
      apiKey: process.env.GITHUB_TOKEN,
      baseURL: process.env.GITHUB_MODEL_ENDPOINT || 'https://models.inference.ai.azure.com',
    });

    console.log('\n🔄 Making test API call...');
    console.log('Endpoint:', process.env.GITHUB_MODEL_ENDPOINT || 'https://models.inference.ai.azure.com');
    console.log('Model:', process.env.GITHUB_MODEL_NAME || 'gpt-4o-mini');
    
    const response = await client.chat.completions.create({
      model: process.env.GITHUB_MODEL_NAME || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant. Respond briefly.'
        },
        {
          role: 'user',
          content: 'Say hello and confirm you are working via GitHub Models!'
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    console.log('\n✅ Success! Response:');
    console.log('---');
    console.log(response.choices[0].message.content);
    console.log('---');
    console.log('\n🎉 GitHub Models integration is working perfectly!');
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    if (error.code) {
      console.error('Code:', error.code);
    }
  }
}

// Make sure the function actually runs
testGitHubModels().catch(console.error);
