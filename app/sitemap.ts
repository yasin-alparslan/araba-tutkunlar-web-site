import type { MetadataRoute } from 'next'

const baseUrl = 'https://araba-tutkunlari.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/modifiye', '/haberler', '/incelemeler', '/karsilastirmalar', '/tartismalar', '/hakkimizda'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' || path === '/haberler' ? 'weekly' : 'monthly') as const,
    priority: path === '' ? 1 : 0.8,
  }))
}
