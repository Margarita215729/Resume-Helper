#!/usr/bin/env node

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testAuthFlow() {
  console.log('🧪 Testing Authentication Flow...\n');

  try {
    // 1. Get CSRF token
    console.log('1. Getting CSRF token...');
    const csrfResponse = await fetch(`${BASE_URL}/api/auth/csrf`);
    const csrfData = await csrfResponse.json();
    console.log('✅ CSRF token:', csrfData.csrfToken.substring(0, 20) + '...');

    // 2. Check session (should be null)
    console.log('\n2. Checking initial session...');
    const sessionResponse = await fetch(`${BASE_URL}/api/auth/session`);
    const sessionData = await sessionResponse.json();
    console.log('✅ Initial session:', sessionData || 'null (as expected)');

    // 3. Test protected route (should redirect)
    console.log('\n3. Testing protected route access...');
    const builderResponse = await fetch(`${BASE_URL}/builder`, { redirect: 'manual' });
    console.log('✅ Builder route status:', builderResponse.status);
    console.log('✅ Redirect location:', builderResponse.headers.get('location') || 'none');

    // 4. Test auth page access
    console.log('\n4. Testing auth page access...');
    const signinResponse = await fetch(`${BASE_URL}/auth/signin`);
    console.log('✅ Signin page status:', signinResponse.status);

    console.log('\n🎉 Authentication flow test completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Open http://localhost:3000/auth/signin');
    console.log('   2. Create a test account');
    console.log('   3. Try accessing http://localhost:3000/builder');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuthFlow();
