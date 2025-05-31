// Test different model name formats
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const possibleModels = [
  'gpt-4o-mini',
  'openai/gpt-4o-mini', 
  'gpt-4o',
  'openai/gpt-4o',
  'gpt-3.5-turbo',
  'openai/gpt-3.5-turbo'
];

async function testModels() {
  const client = new OpenAI({ 
    baseURL: process.env.GITHUB_MODEL_ENDPOINT,
    apiKey: process.env.GITHUB_TOKEN 
  });

  for (const modelName of possibleModels) {
    console.log(`\nTesting model: ${modelName}`);
    
    try {
      const response = await client.chat.completions.create({
        messages: [{ role: "user", content: "Say hello" }],
        model: modelName
      });

      console.log(`✅ SUCCESS with ${modelName}:`, response.choices[0].message.content);
      break; // Stop on first success
      
    } catch (error) {
      console.log(`❌ Failed with ${modelName}:`, error.message.substring(0, 100));
    }
  }
}

testModels();
