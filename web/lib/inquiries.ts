export type InquiryInput = Record<string, unknown>

export function normalizeInquiry(input: InquiryInput, tenantId: string) {
  const email = typeof input.email === 'string' ? input.email.trim() : ''
  const message = typeof input.message === 'string' ? input.message.trim() : ''
  if (!tenantId) throw new Error('Missing tenant ID')
  if (!email) throw new Error('Email is required')
  if (!message) throw new Error('Message is required')
  const text = (key: string) => typeof input[key] === 'string' ? String(input[key]).trim() : ''
  return {
    tenant_id: tenantId,
    name: text('name') || '—',
    email,
    phone: text('phone') || null,
    company: text('company') || null,
    subject: text('subject') || 'Website inquiry',
    message,
    status: 'unread',
  }
}
