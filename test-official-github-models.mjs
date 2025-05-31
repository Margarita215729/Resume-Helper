// Test using the exact official GitHub Models documentation
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/o4-mini";

export async function main() {
  console.log('🚀 Testing Official GitHub Models API...');
  console.log('Token available:', !!token);
  console.log('Endpoint:', endpoint);
  console.log('Model:', modelName);

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  try {
    const startTime = Date.now();
    
    const response = await client.chat.completions.create({
      messages: [
          { role:"system", content: "You are a helpful assistant." },
          { role:"user", content: "What is the capital of France?" }
        ],
        model: modelName
      });

    const endTime = Date.now();
    console.log(`✅ Response received in ${endTime - startTime}ms`);
    console.log('Response:', response.choices[0].message.content);
    
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
