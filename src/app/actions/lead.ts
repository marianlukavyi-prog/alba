'use server'

export type LeadFormData = {
  name: string
  phone: string
  city?: string
  needs?: string
  consent: boolean
}

export type LeadErrorCode = 'required' | 'consent' | 'send_failed'
export type LeadActionResult = { ok: true } | { ok: false; code: LeadErrorCode }

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export async function submitLead(data: LeadFormData): Promise<LeadActionResult> {
  const name = data.name?.trim() ?? ''
  const phone = data.phone?.trim() ?? ''
  if (!name || !phone) {
    return { ok: false, code: 'required' }
  }
  if (!data.consent) {
    return { ok: false, code: 'consent' }
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('Telegram is not configured: missing TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID')
    return { ok: false, code: 'send_failed' }
  }

  const lines: string[] = ['<b>🔔 Нова заявка з сайту Alba Ventanas</b>', '']
  lines.push(`<b>Імʼя:</b> ${escapeHtml(name)}`)
  lines.push(`<b>Телефон:</b> ${escapeHtml(phone)}`)
  if (data.city?.trim()) lines.push(`<b>Місто:</b> ${escapeHtml(data.city.trim())}`)
  if (data.needs?.trim()) lines.push(`<b>Потреба:</b> ${escapeHtml(data.needs.trim())}`)

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('Telegram sendMessage failed', res.status, body)
      return { ok: false, code: 'send_failed' }
    }
    return { ok: true }
  } catch (err) {
    console.error('Telegram sendMessage exception', err)
    return { ok: false, code: 'send_failed' }
  }
}
