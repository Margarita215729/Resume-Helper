// Test environment variables in Next.js context
console.log('Environment Variables Test:');
console.log('GITHUB_TOKEN exists:', !!process.env.GITHUB_TOKEN);
console.log('GITHUB_MODEL_ENDPOINT:', process.env.GITHUB_MODEL_ENDPOINT);
console.log('GITHUB_MODEL_NAME:', process.env.GITHUB_MODEL_NAME);

// Try to create the Azure client
try {
  const ModelClient = require("@azure-rest/ai-inference").default;
  const { AzureKeyCredential } = require("@azure/core-auth");
  
  const token = process.env.GITHUB_TOKEN;
  const endpoint = process.env.GITHUB_MODEL_ENDPOINT || "https://models.github.ai/inference";
  
  if (!token) {
    throw new Error('GITHUB_TOKEN is required');
  }
  
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token),
    { apiVersion: "2024-12-01-preview" }
  );
  
  console.log('✅ Azure client created successfully');
} catch (error) {
  console.error('❌ Error creating Azure client:', error.message);
}
