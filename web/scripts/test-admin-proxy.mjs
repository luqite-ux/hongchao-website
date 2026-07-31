const baseUrl = (process.argv[2] || process.env.ADMIN_TEST_BASE_URL || 'http://127.0.0.1:3001').replace(/\/$/, '')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function request(path, init = {}) {
  return fetch(`${baseUrl}${path}`, { redirect: 'manual', ...init })
}

async function main() {
  const loginPage = await request('/admin/login')
  assert(loginPage.status === 200, `GET /admin/login expected 200, received ${loginPage.status}`)
  const loginHtml = await loginPage.text()
  assert(
    loginHtml.includes('action="/api/auth/login"') && loginHtml.includes('method="post"'),
    'login page must submit a native POST form to /api/auth/login',
  )

  const unauthorized = await request('/admin')
  assert(
    [307, 308].includes(unauthorized.status),
    `GET /admin without a session expected a redirect, received ${unauthorized.status}`,
  )
  const unauthorizedLocation = unauthorized.headers.get('location') || ''
  assert(
    new URL(unauthorizedLocation, baseUrl).pathname === '/admin/login',
    `GET /admin redirected to an unexpected location: ${unauthorizedLocation}`,
  )

  const invalidLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: '',
  })
  assert(
    invalidLogin.status === 303,
    `POST /api/auth/login with empty credentials expected 303, received ${invalidLogin.status}`,
  )
  const invalidLocation = invalidLogin.headers.get('location') || ''
  const invalidUrl = new URL(invalidLocation, baseUrl)
  assert(
    invalidUrl.pathname === '/admin/login' && invalidUrl.searchParams.has('error'),
    `invalid login redirected to an unexpected location: ${invalidLocation}`,
  )

  console.log('admin proxy smoke test passed')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
