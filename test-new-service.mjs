// Test the new Azure AI Inference service
import { AIResumeService } from './src/services/ai-azure-inference.service.ts';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testAzureInferenceService() {
  console.log('🧪 Testing Azure AI Inference Service...');
  
  const testJobDescription = `
    Frontend Developer
    We're seeking a skilled React developer to join our team.
    
    Requirements:
    - 3+ years React experience
    - TypeScript knowledge
    - Next.js familiarity
    
    Location: Remote
    Salary: $90,000 - $130,000
  `;

  try {
    console.log('📋 Testing job analysis...');
    const analysis = await AIResumeService.analyzeJobPosting(testJobDescription);
    console.log('✅ Job analysis successful:');
    console.log(JSON.stringify(analysis, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAzureInferenceService();
