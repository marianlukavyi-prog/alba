import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookBody = {
  _type?: string
  slug?: { current?: string } | string
  current?: string
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookBody>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ ok: false, error: 'Missing _type' }, { status: 400 })
    }

    if (body._type === 'post') {
      revalidateTag('posts', 'default')
      const slug =
        typeof body.slug === 'string' ? body.slug : body.slug?.current ?? body.current
      if (slug) revalidateTag(`post:${slug}`, 'default')
    } else if (body._type === 'tag') {
      revalidateTag('tags', 'default')
      revalidateTag('posts', 'default')
    } else if (body._type === 'author') {
      revalidateTag('posts', 'default')
    }

    return NextResponse.json({ ok: true, type: body._type })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
