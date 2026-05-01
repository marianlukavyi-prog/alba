'use server'

export type LeadFormData = {
  name: string
  phone: string
  city?: string
  needs?: string
}

export type LeadActionResult = { ok: true } | { ok: false; error: string }

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export async function submitLead(data: LeadFormData): Promise<LeadActionResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return { ok: false, error: 'Telegram is not configured' }
  }

  const name = data.name?.trim() ?? ''
  const phone = data.phone?.trim() ?? ''
  if (!name || !phone) {
    return { ok: false, error: 'Name and phone are required' }
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
      return { ok: false, error: 'Telegram API error' }
    }
    return { ok: true }
  } catch (err) {
    console.error('Telegram sendMessage exception', err)
    return { ok: false, error: 'Network error' }
  }
}
