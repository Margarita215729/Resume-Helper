// Direct test of Azure AI Inference integration
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testDirectIntegration() {
  console.log('🚀 Direct Azure AI Inference Test...');
  
  const token = process.env.GITHUB_TOKEN;
  const endpoint = process.env.GITHUB_MODEL_ENDPOINT || "https://models.github.ai/inference";
  const modelName = process.env.GITHUB_MODEL_NAME || "openai/o4-mini";
  
  console.log('Configuration:');
  console.log('- Token available:', !!token);
  console.log('- Endpoint:', endpoint);
  console.log('- Model:', modelName);
  
  if (!token) {
    console.error('❌ GITHUB_TOKEN not found in environment');
    return;
  }
  
  try {
    console.log('\n📦 Creating Azure AI Inference client...');
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
      { apiVersion: "2024-12-01-preview" }
    );
    
    console.log('✅ Client created successfully');
    
    console.log('\n📞 Making API call...');
    const startTime = Date.now();
    
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Analyze this job: 'Frontend Developer with React experience'" }
        ],
        model: modelName
      }
    });
    
    const endTime = Date.now();
    console.log(`⏱️  Response time: ${endTime - startTime}ms`);
    
    if (isUnexpected(response)) {
      console.error('❌ Unexpected response:', response.body.error);
      console.error('Status:', response.status);
      return;
    }
    
    console.log('✅ Success! Response:');
    console.log(response.body.choices[0].message.content);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testDirectIntegration();
