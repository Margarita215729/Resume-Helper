import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testQuickAI() {
  console.log('🚀 Quick AI Test...');
  console.log('Token available:', !!process.env.GITHUB_TOKEN);
  console.log('Endpoint:', process.env.GITHUB_MODEL_ENDPOINT);
  
  try {
    console.log('Creating OpenAI client...');
    const client = new OpenAI({
      apiKey: process.env.GITHUB_TOKEN,
      baseURL: process.env.GITHUB_MODEL_ENDPOINT || 'https://models.inference.ai.azure.com',
      timeout: 10000, // 10 second timeout
    });

    console.log('Making API call with 10s timeout...');
    
    const startTime = Date.now();
    
    const response = await Promise.race([
      client.chat.completions.create({
        model: process.env.GITHUB_MODEL_NAME || 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello" in JSON format: {"message": "Hello"}'
          }
        ],
        max_completion_tokens: 50
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout after 15 seconds')), 15000)
      )
    ]);

    const endTime = Date.now();
    console.log(`✅ Response received in ${endTime - startTime}ms`);
    
    const content = response.choices[0]?.message?.content;
    console.log('Response:', content);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('timeout') || error.message.includes('Timeout')) {
      console.log('🔍 This suggests network connectivity issues');
      console.log('💡 Try checking your internet connection or firewall settings');
    }
  }
}

console.log('Starting test...');
testQuickAI().then(() => {
  console.log('Test completed');
  process.exit(0);
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
