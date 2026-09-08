import app from '../apps/worker/src/index';
import { PingResponse } from '../packages/shared-types/src/api';

async function runPingTest() {
  console.log('🧪 Running Worker ping route tests...\n');

  // Test 1: Standard GET /api/ping
  console.log('Test 1: Basic GET /api/ping');
  const res1 = await app.request('/api/ping');
  if (res1.status !== 200) {
    throw new Error(`Expected 200 OK, got ${res1.status}`);
  }
  const body1 = (await res1.json()) as PingResponse;
  console.log('  Status:', res1.status);
  console.log('  Response:', body1);
  if (body1.status !== 'ok' || body1.message !== 'pong') {
    throw new Error(`Unexpected body content: ${JSON.stringify(body1)}`);
  }
  console.log('  ✓ Test 1 passed.\n');

  // Test 2: GET /api/ping with echo parameter
  console.log('Test 2: GET /api/ping?echo=frontend-connection-verified');
  const res2 = await app.request('/api/ping?echo=frontend-connection-verified');
  if (res2.status !== 200) {
    throw new Error(`Expected 200 OK, got ${res2.status}`);
  }
  const body2 = (await res2.json()) as PingResponse;
  console.log('  Status:', res2.status);
  console.log('  Response:', body2);
  if (body2.message !== 'pong: frontend-connection-verified') {
    throw new Error(`Expected message to contain echo, got: ${body2.message}`);
  }
  console.log('  ✓ Test 2 passed.\n');

  // Test 3: Verify CORS headers
  console.log('Test 3: CORS Headers Verification');
  const res3 = await app.request('/api/ping', {
    method: 'OPTIONS',
    headers: {
      Origin: 'http://localhost:3000',
      'Access-Control-Request-Method': 'GET',
    },
  });
  console.log('  OPTIONS Status:', res3.status);
  console.log('  Access-Control-Allow-Origin:', res3.headers.get('Access-Control-Allow-Origin'));
  if (!res3.headers.get('Access-Control-Allow-Origin')) {
    throw new Error('CORS header Access-Control-Allow-Origin missing!');
  }
  console.log('  ✓ Test 3 passed.\n');

  console.log('🎉 All worker ping connection tests passed successfully!');
}

runPingTest().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
