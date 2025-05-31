import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testAzureOpenAI() {
  console.log('🚀 Testing Azure OpenAI integration...');
  
  // Check environment variables
  console.log('\n📋 Environment Variables:');
  console.log('AZURE_OPENAI_API_KEY:', process.env.AZURE_OPENAI_API_KEY ? `Set (${process.env.AZURE_OPENAI_API_KEY.substring(0, 10)}...) ✓` : 'Not set ✗');
  console.log('AZURE_OPENAI_ENDPOINT:', process.env.AZURE_OPENAI_ENDPOINT || 'Not set');
  console.log('AZURE_OPENAI_DEPLOYMENT_NAME:', process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'Not set');
  
  if (!process.env.AZURE_OPENAI_API_KEY) {
    console.error('\n❌ AZURE_OPENAI_API_KEY is not set.');
    return;
  }
  
  try {
    // For Azure OpenAI, we need to check available deployments first
    console.log('\n🔄 Checking Azure OpenAI service...');
    console.log('Endpoint:', process.env.AZURE_OPENAI_ENDPOINT);
    
    // Create client for listing deployments
    const client = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai`,
      defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview' },
      defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY }
    });

    // Try to list models/deployments
    console.log('\n📋 Checking available models...');
    
    try {
      const models = await client.models.list();
      console.log('Available models:', models.data.map(m => m.id));
    } catch (error) {
      console.log('Could not list models (this is normal if no deployments exist)');
      console.log('Error:', error.message);
    }

    console.log('\n⚠️ Azure OpenAI requires model deployments to work.');
    console.log('Since we don\'t have deployments yet, let\'s proceed with GitHub Models setup.');
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testAzureOpenAI().catch(console.error);
