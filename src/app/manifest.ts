import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alba Ventanas',
    short_name: 'Alba Ventanas',
    description:
      'PVC and aluminium windows, doors and glazing systems by Schüco, Reynaers and Aluprof.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#081f48',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  }
}
