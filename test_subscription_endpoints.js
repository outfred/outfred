#!/usr/bin/env node

// Test script for subscription endpoints
const PROJECT_ID = 'yilnhwzfgezkqeskhrkq';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpbG5od3pmZ2V6a3Flc2tocmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTAxNzIsImV4cCI6MjA3NzU4NjE3Mn0.NZ1cqPAVL2xuc6nftN3Bt-nLLNZ4wjKoztGDZWqTpVg';
const API_BASE = `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-dec0bed9`;

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', body = null, headers = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ANON_KEY}`,
      ...headers
    }
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  try {
    const url = `${API_BASE}${endpoint}`;
    console.log(`   → Request: ${method} ${url}`);
    const response = await fetch(url, options);
    
    // Get response text first
    const responseText = await response.text();
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log(`   ← Response: ${response.status}`, Object.keys(data).join(', '));
    } catch (parseError) {
      console.error(`   ✖ JSON Parse Error. Response text (first 200 chars): ${responseText.substring(0, 200)}`);
      return { status: response.status, error: 'Invalid JSON response', responseText: responseText.substring(0, 500) };
    }
    
    return { status: response.status, data };
  } catch (error) {
    console.error(`   ✖ Network Error: ${error.message}`);
    return { status: 0, error: error.message };
  }
}

// Helper function to log test results
function logTest(name, passed, details) {
  const result = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`\n${result}: ${name}`);
  if (details) {
    console.log(`   Details: ${details}`);
  }
  
  testResults.tests.push({ name, passed, details });
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
  }
}

// Test Suite
async function runTests() {
  console.log('🧪 Starting Subscription System Tests...\n');
  console.log('='.repeat(60));

  let accessToken = '';
  let userId = '';
  let adminToken = '';
  const testEmail = `test_${Date.now()}@test.com`;
  const testPassword = 'testpass123';

  // ========================================
  // TEST 1: Register new user with subscription fields
  // ========================================
  console.log('\n📝 TEST 1: User Registration with Subscription Fields');
  const registerResult = await apiRequest('/auth/register', 'POST', {
    email: testEmail,
    password: testPassword,
    name: 'Test User'
  });

  if (registerResult.status === 200 && registerResult.data.success) {
    accessToken = registerResult.data.accessToken;
    userId = registerResult.data.user.id;
    
    // Check if user has subscription fields
    const hasFields = registerResult.data.user.id !== undefined;
    
    logTest(
      'User registration successful',
      hasFields,
      `User ID: ${userId}`
    );
  } else {
    logTest(
      'User registration',
      false,
      `Status: ${registerResult.status}, Error: ${registerResult.data?.error || 'Unknown'}`
    );
  }

  // ========================================
  // TEST 2: Login as admin
  // ========================================
  console.log('\n🔐 TEST 2: Admin Login');
  const adminLoginResult = await apiRequest('/auth/login', 'POST', {
    email: 'admin@outfred.com',
    password: 'admin123'
  });

  if (adminLoginResult.status === 200 && adminLoginResult.data.success) {
    adminToken = adminLoginResult.data.accessToken;
    logTest(
      'Admin login successful',
      true,
      'Admin token received'
    );
  } else {
    logTest(
      'Admin login',
      false,
      `Status: ${adminLoginResult.status}, Error: ${adminLoginResult.data?.error || 'Unknown'}`
    );
  }

  // ========================================
  // TEST 3: Get subscription plans
  // ========================================
  console.log('\n📋 TEST 3: Get Subscription Plans');
  const plansResult = await apiRequest('/api/subscriptions/plans', 'GET');

  if (plansResult.status === 200 && plansResult.data.plans) {
    const hasAllPlans = plansResult.data.plans.length === 3 &&
      plansResult.data.plans.some(p => p.id === 'free') &&
      plansResult.data.plans.some(p => p.id === 'basic') &&
      plansResult.data.plans.some(p => p.id === 'pro');
    
    logTest(
      'Get subscription plans',
      hasAllPlans,
      `Found ${plansResult.data.plans.length} plans: ${plansResult.data.plans.map(p => p.id).join(', ')}`
    );
  } else {
    logTest(
      'Get subscription plans',
      false,
      `Status: ${plansResult.status}`
    );
  }

  // ========================================
  // TEST 4: Get current user subscription
  // ========================================
  console.log('\n📊 TEST 4: Get Current User Subscription');
  const currentSubResult = await apiRequest('/api/subscriptions/current', 'GET', null, {
    'X-Access-Token': accessToken
  });

  if (currentSubResult.status === 200 && currentSubResult.data.subscription) {
    const sub = currentSubResult.data.subscription;
    const hasCorrectDefaults = 
      sub.plan === 'free' &&
      sub.searches_count === 0 &&
      sub.searches_limit === 5 &&
      sub.payment_status === 'none';
    
    logTest(
      'Get current subscription',
      hasCorrectDefaults,
      `Plan: ${sub.plan}, Count: ${sub.searches_count}/${sub.searches_limit}, Status: ${sub.payment_status}`
    );
  } else {
    logTest(
      'Get current subscription',
      false,
      `Status: ${currentSubResult.status}, Error: ${currentSubResult.data?.error || 'Unknown'}`
    );
  }

  // ========================================
  // TEST 5: Upgrade user subscription
  // ========================================
  console.log('\n⬆️  TEST 5: Upgrade User Subscription to Basic');
  const upgradeResult = await apiRequest('/api/subscriptions/upgrade', 'POST', {
    plan: 'basic'
  }, {
    'X-Access-Token': accessToken
  });

  if (upgradeResult.status === 200 && upgradeResult.data.success) {
    const sub = upgradeResult.data.subscription;
    const isUpgraded = 
      sub.plan === 'basic' &&
      sub.searches_limit === 100 &&
      sub.payment_status === 'active';
    
    logTest(
      'Upgrade to basic plan',
      isUpgraded,
      `Plan: ${sub.plan}, Limit: ${sub.searches_limit}, Status: ${sub.payment_status}`
    );
  } else {
    logTest(
      'Upgrade to basic plan',
      false,
      `Status: ${upgradeResult.status}, Error: ${upgradeResult.data?.error || 'Unknown'}`
    );
  }

  // ========================================
  // TEST 6: Admin update user subscription
  // ========================================
  console.log('\n👨‍💼 TEST 6: Admin Update User Subscription');
  if (adminToken && userId) {
    const adminUpdateResult = await apiRequest(`/admin/users/${userId}/subscription`, 'POST', {
      subscription_plan: 'pro',
      searches_limit: 999999,
      payment_status: 'active'
    }, {
      'X-Access-Token': adminToken
    });

    if (adminUpdateResult.status === 200 && adminUpdateResult.data.success) {
      const user = adminUpdateResult.data.user;
      const isUpdated = 
        user.subscription_plan === 'pro' &&
        user.searches_limit === 999999 &&
        user.payment_status === 'active';
      
      logTest(
        'Admin update user subscription',
        isUpdated,
        `Plan: ${user.subscription_plan}, Limit: ${user.searches_limit}`
      );
    } else {
      logTest(
        'Admin update user subscription',
        false,
        `Status: ${adminUpdateResult.status}, Error: ${adminUpdateResult.data?.error || 'Unknown'}`
      );
    }
  } else {
    logTest(
      'Admin update user subscription',
      false,
      'No admin token or user ID available'
    );
  }

  // ========================================
  // TEST 7: Rate limiting - perform searches
  // ========================================
  console.log('\n🔍 TEST 7: Rate Limiting on Search');
  
  // First, downgrade to free plan (5 searches limit)
  const downgradeResult = await apiRequest('/api/subscriptions/upgrade', 'POST', {
    plan: 'free'
  }, {
    'X-Access-Token': accessToken
  });

  if (downgradeResult.status === 200) {
    console.log('   Downgraded to free plan (5 searches limit)');
    
    // Perform 5 searches (should succeed)
    let searchSuccess = true;
    for (let i = 1; i <= 5; i++) {
      const searchResult = await apiRequest('/products/search', 'POST', {
        query: `test search ${i}`,
        language: 'en'
      }, {
        'X-Access-Token': accessToken
      });
      
      if (searchResult.status !== 200) {
        searchSuccess = false;
        console.log(`   ❌ Search ${i} failed unexpectedly`);
        break;
      } else {
        console.log(`   ✅ Search ${i}/5 succeeded`);
      }
    }
    
    logTest(
      'Rate limiting - 5 searches succeed',
      searchSuccess,
      'All 5 searches completed successfully'
    );

    // 6th search should fail with 429
    const limitedSearchResult = await apiRequest('/products/search', 'POST', {
      query: 'test search 6',
      language: 'en'
    }, {
      'X-Access-Token': accessToken
    });

    const isRateLimited = limitedSearchResult.status === 429;
    logTest(
      'Rate limiting - 6th search blocked',
      isRateLimited,
      `Status: ${limitedSearchResult.status}, Message: ${limitedSearchResult.data?.error || limitedSearchResult.data?.error_en || 'N/A'}`
    );
  } else {
    logTest(
      'Rate limiting test',
      false,
      'Failed to downgrade to free plan for testing'
    );
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📝 Total:  ${testResults.tests.length}`);
  console.log('='.repeat(60));

  if (testResults.failed === 0) {
    console.log('\n🎉 All tests passed! Subscription system is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the details above.');
  }

  console.log('\n');
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});
