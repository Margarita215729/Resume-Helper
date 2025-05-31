// Check available models
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function getModels() {
  console.log('Fetching available models...');
  
  try {
    const response = await fetch('https://models.github.ai/inference/catalog/models', {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Available models:');
    data.data.forEach(model => {
      console.log(`- ${model.id} (${model.name})`);
    });
    
    // Look for GPT models
    const gptModels = data.data.filter(model => 
      model.id.toLowerCase().includes('gpt') || 
      model.id.toLowerCase().includes('openai')
    );
    
    console.log('\nGPT/OpenAI models:');
    gptModels.forEach(model => {
      console.log(`- ${model.id}`);
    });
    
  } catch (error) {
    console.error('Error fetching models:', error.message);
  }
}

getModels();
