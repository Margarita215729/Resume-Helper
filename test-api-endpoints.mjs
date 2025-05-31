import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testAPIEndpoints() {
  console.log('🔧 Testing Resume Helper API endpoints...');
  console.log('Node version:', process.version);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('\n🌐 Testing server connection...');
    const healthResponse = await fetch(`${baseURL}/`, {
      method: 'GET',
    });
    
    if (healthResponse.ok) {
      console.log('✅ Server is responding!');
    } else {
      console.log('❌ Server returned status:', healthResponse.status);
      return;
    }
    
    // Test job analysis endpoint
    console.log('\n📋 Testing Job Analysis API...');
    
    const jobDescription = 'Software Engineer position requiring React and Node.js experience';
    
    console.log('Making request to:', `${baseURL}/api/ai/analyze-job`);
    
    const analysisResponse = await fetch(`${baseURL}/api/ai/analyze-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDescription }),
    });
    
    console.log('Response status:', analysisResponse.status);
    
    if (analysisResponse.ok) {
      const analysisData = await analysisResponse.json();
      console.log('✅ Job Analysis Success!');
      console.log('Title:', analysisData.title);
      console.log('Requirements count:', analysisData.requirements?.length);
    } else {
      const errorText = await analysisResponse.text();
      console.log('❌ Job Analysis Failed:');
      console.log('Status:', analysisResponse.status);
      console.log('Error:', errorText);
    }
    
    console.log('\n🎉 Testing Complete!');
    
  } catch (error) {
    console.error('\n❌ Error during API testing:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack?.split('\n').slice(0, 3).join('\n'));
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Server is not running. Try: npm run dev');
    }
  }
}

testAPIEndpoints().catch(console.error);
