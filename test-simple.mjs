// Quick test with original model name
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testQuick() {
  console.log('Testing with gpt-4o-mini model...');
  
  const client = new OpenAI({ 
    baseURL: process.env.GITHUB_MODEL_ENDPOINT,
    apiKey: process.env.GITHUB_TOKEN 
  });

  try {
    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: "Say hello" }],
      model: process.env.GITHUB_MODEL_NAME
    });

    console.log('✅ Success:', response.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testQuick();
