import 'server-only'
import { createClient } from '@supabase/supabase-js'

export const HONGCHAO_TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID?.trim() || ''

export function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key || !HONGCHAO_TENANT_ID) return null
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}
