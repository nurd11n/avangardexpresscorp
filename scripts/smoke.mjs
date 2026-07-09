/**
 * Smoke test against a running server. Usage:
 *   BASE_URL=http://localhost:3000 node scripts/smoke.mjs
 */
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

let failures = 0;

async function check(name, fn) {
  try {
    await fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL  ${name}: ${err.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const get = (path, init) => fetch(`${BASE}${path}`, init);

await check('GET / renders EN', async () => {
  const res = await get('/', { headers: { 'accept-language': 'en-US' } });
  assert(res.status === 200, `status ${res.status}`);
  const html = await res.text();
  assert(html.includes('lang="en"'), 'missing lang="en"');
  assert(html.includes('Apply to drive'), 'missing EN hero CTA');
  assert(html.includes('application/ld+json'), 'missing JSON-LD');
  assert(html.includes('USDOT'), 'missing trust bar');
});

await check('GET / renders RU from Accept-Language', async () => {
  const res = await get('/', { headers: { 'accept-language': 'ru-RU,ru;q=0.9' } });
  const html = await res.text();
  assert(html.includes('lang="ru"'), 'missing lang="ru"');
  assert(html.includes('Заявка водителя'), 'missing RU hero CTA');
});

await check('GET / respects lang cookie over header', async () => {
  const res = await get('/', {
    headers: { 'accept-language': 'ru-RU', cookie: 'lang=en' },
  });
  const html = await res.text();
  assert(html.includes('lang="en"'), 'cookie did not win');
});

await check('GET /api/health', async () => {
  const res = await get('/api/health');
  assert(res.status === 200, `status ${res.status}`);
  assert((await res.json()).ok === true, 'not ok');
});

await check('GET /privacy and /terms', async () => {
  for (const path of ['/privacy', '/terms']) {
    const res = await get(path);
    assert(res.status === 200, `${path} status ${res.status}`);
  }
});

await check('GET /sitemap.xml and /robots.txt', async () => {
  for (const path of ['/sitemap.xml', '/robots.txt']) {
    const res = await get(path);
    assert(res.status === 200, `${path} status ${res.status}`);
  }
});

await check('POST /api/apply — valid submission', async () => {
  const res = await get('/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Driver',
      phone: '+1 312 555 0100',
      email: 'driver@example.com',
      experience: 5,
      driverType: 'owner-operator',
      message: 'smoke test',
      website: '',
      ts: Date.now() - 5000,
    }),
  });
  assert(res.status === 200, `status ${res.status}`);
  assert((await res.json()).ok === true, 'not ok');
});

await check('POST /api/apply — validation errors', async () => {
  const res = await get('/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', phone: 'x', email: 'nope', ts: Date.now() - 5000 }),
  });
  assert(res.status === 400, `status ${res.status}`);
  const json = await res.json();
  assert(json.ok === false && json.errors.email, 'missing field errors');
});

await check('POST /api/apply — honeypot gets fake success', async () => {
  const res = await get('/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bot', website: 'http://spam.example', ts: Date.now() }),
  });
  assert(res.status === 200, `status ${res.status}`);
  assert((await res.json()).ok === true, 'honeypot leaked');
});

await check('POST /api/quote — valid submission', async () => {
  const res = await get('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Broker',
      company: 'Acme Logistics',
      phone: '+1 312 555 0101',
      email: 'broker@example.com',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      freight: 'Dry van, 40k lbs',
      message: '',
      website: '',
      ts: Date.now() - 5000,
    }),
  });
  assert(res.status === 200, `status ${res.status}`);
  assert((await res.json()).ok === true, 'not ok');
});

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nAll smoke checks passed.');
