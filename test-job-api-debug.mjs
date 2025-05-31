import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3000/api/ai/analyze-job';

const testJobDescription = `
Software Engineer - Full Stack
Location: San Francisco, CA

We are looking for a talented Full Stack Software Engineer to join our growing team. 

Required Skills:
- JavaScript (ES6+)
- React.js
- Node.js
- TypeScript
- PostgreSQL
- Git/GitHub

Preferred Skills:
- AWS experience
- Docker
- MongoDB
- GraphQL

Experience: 2-3 years of professional development experience
Salary: $80,000 - $120,000

Join our innovative startup and help build the next generation of web applications!
`;

console.log('🔍 Testing Job Analysis API with detailed debugging...');
console.log('API URL:', apiUrl);

async function testAPI() {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobDescription: testJobDescription
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error response body:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ Success! Job analysis result:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }
}

testAPI();
