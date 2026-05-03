'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const TAWK_SRC = 'https://embed.tawk.to/69f7368948ca411c3004e21e/1jnmqq22r'
const STORAGE_KEY = 'alba-cookie-consent'
const CONSENT_EVENT = 'alba:consent-changed'

const isAllowed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'all'
  } catch {
    return false
  }
}

declare global {
  interface Window {
    Tawk_API?: {
      hideWidget?: () => void
      showWidget?: () => void
      endChat?: () => void
    }
  }
}

export function TawkChat() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(isAllowed())
    const sync = () => {
      const allow = isAllowed()
      setEnabled(allow)
      // If user revoked consent after widget was already loaded — hide it.
      if (!allow && typeof window !== 'undefined' && window.Tawk_API?.hideWidget) {
        try {
          window.Tawk_API.hideWidget()
          window.Tawk_API.endChat?.()
        } catch {
          /* ignore */
        }
      } else if (allow && window.Tawk_API?.showWidget) {
        try {
          window.Tawk_API.showWidget()
        } catch {
          /* ignore */
        }
      }
    }
    window.addEventListener('storage', sync)
    window.addEventListener(CONSENT_EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(CONSENT_EVENT, sync)
    }
  }, [])

  if (!enabled) return null

  return (
    <Script
      id="tawk-chat-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='${TAWK_SRC}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  )
}
