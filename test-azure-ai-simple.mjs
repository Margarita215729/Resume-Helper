// Simple Azure AI Inference test
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('🔍 Environment check:');
console.log('GITHUB_TOKEN:', !!process.env.GITHUB_TOKEN);
console.log('GITHUB_MODEL_ENDPOINT:', process.env.GITHUB_MODEL_ENDPOINT);
console.log('GITHUB_MODEL_NAME:', process.env.GITHUB_MODEL_NAME);

try {
  console.log('📦 Importing Azure AI Inference SDK...');
  const { default: ModelClient, isUnexpected } = await import("@azure-rest/ai-inference");
  const { AzureKeyCredential } = await import("@azure/core-auth");
  
  console.log('✅ SDK imported successfully!');
  
  const token = process.env["GITHUB_TOKEN"];
  const endpoint = process.env["GITHUB_MODEL_ENDPOINT"] || "https://models.github.ai/inference";
  const modelName = process.env["GITHUB_MODEL_NAME"] || "openai/o4-mini";
  
  console.log('🚀 Creating client...');
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
    { apiVersion: "2024-12-01-preview" }
  );
  
  console.log('📞 Making API call...');
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello" }
      ],
      model: modelName
    }
  });

  if (isUnexpected(response)) {
    console.error('❌ Unexpected response:', response.body.error);
  } else {
    console.log('✅ Success:', response.body.choices[0].message.content);
  }
  
} catch (error) {
  console.error('❌ Error during test:', error.message);
  console.error('Full error:', error);
}
