import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { createClient } from '@supabase/supabase-js'

if (process.env.HTTPS_PROXY) setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY))
const TENANT_ID = 'ece3bbeb-1483-48bc-bd54-cf38d39fd3f9'

async function main() {
  const url = new URL('https://rbkc9qwm.api.sanity.io/v2024-01-01/data/query/production')
  url.searchParams.set('query', '*[_type == "inquiry" && !(_id in path("drafts.**"))]{name,email,phone,company,message,sourcePage,createdAt}')
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) })
  if (!response.ok) throw new Error(`Sanity inquiry query failed: ${response.status}`)
  const inquiries = (await response.json()).result || []
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  let inserted = 0
  for (const item of inquiries) {
    const email = String(item.email || '').trim()
    const message = String(item.message || '').trim()
    if (!email || !message) continue
    const createdAt = item.createdAt ? new Date(item.createdAt).toISOString() : null
    let existing = sb.from('inquiries').select('id').eq('tenant_id', TENANT_ID).eq('email', email).eq('message', message)
    if (createdAt) existing = existing.eq('created_at', createdAt)
    const { data } = await existing.maybeSingle()
    if (data) continue
    const { error } = await sb.from('inquiries').insert({
      tenant_id: TENANT_ID, name: String(item.name || '—').trim() || '—', email,
      phone: item.phone ? String(item.phone).trim() : null,
      company: item.company ? String(item.company).trim() : null,
      subject: 'Legacy website inquiry', message, status: 'unread',
      ...(createdAt ? { created_at: createdAt } : {}),
    })
    if (error) throw new Error(`inquiry insert failed: ${error.message}`)
    inserted++
  }
  console.log(JSON.stringify({ source: inquiries.length, inserted }))
}

main().catch((error) => { console.error(error.message); process.exit(1) })
