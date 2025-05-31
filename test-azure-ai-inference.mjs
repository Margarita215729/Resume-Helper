// Test using official Azure AI Inference SDK
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/o4-mini";

export async function main() {
  console.log('🚀 Testing Azure AI Inference SDK...');
  console.log('Token available:', !!token);
  console.log('Endpoint:', endpoint);
  console.log('Model:', modelName);

  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
      { apiVersion: "2024-12-01-preview" }
    );

    const startTime = Date.now();

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say hello in JSON format: {\"message\": \"Hello\"}" }
        ],
        model: modelName
      }
    });

    const endTime = Date.now();

    if (isUnexpected(response)) {
      console.error('❌ Unexpected response:', response.body.error);
      return;
    }

    console.log(`✅ Success! Response received in ${endTime - startTime}ms`);
    console.log('Response:', response.body.choices[0].message.content);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
