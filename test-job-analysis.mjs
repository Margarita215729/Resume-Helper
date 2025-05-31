// Simple test for job analysis API
import fetch from 'node-fetch';

async function testJobAnalysis() {
  console.log('🔍 Testing Job Analysis API...');
  
  const testJobDescription = `
    Software Engineer - Frontend
    We're looking for a skilled Frontend Developer to join our team.
    
    Requirements:
    - 3+ years experience with React
    - TypeScript proficiency
    - Experience with Next.js
    - Knowledge of CSS/Tailwind
    
    Nice to have:
    - Node.js experience
    - AWS knowledge
    
    Location: Remote
    Salary: $80,000 - $120,000
  `;

  try {
    console.log('Making request to job analysis API...');
    
    const response = await fetch('http://localhost:3000/api/ai/analyze-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobDescription: testJobDescription
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ Success! Job analysis result:');
    console.log(JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testJobAnalysis();
