export const metadata = {
  title: 'Alba Ventanas — Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ margin: 0, height: '100%', minHeight: '100vh' }}>{children}</body>
    </html>
  )
}
