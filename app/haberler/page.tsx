'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Filter, Search, Tag } from 'lucide-react'

type NewsItem = {
  title: string
  category: string
  date: string
  source: string
  readTime: string
  tags: string[]
  summary: string
  detail: string
  image: string
  imageAlt: string
}

const news: NewsItem[] = [
  {
    title: 'Renault Clio, Türkiye’de Yılın Otomobili 2026 seçildi',
    category: 'Türkiye Pazarı',
    date: '24 Haziran 2026',
    source: 'OGD / CNBC-e',
    readTime: '3 dk',
    tags: ['Türkiye', 'B segment', 'Yeni model'],
    summary: 'Renault Clio, erişilebilirlik, verimlilik ve kullanıcı beklentileriyle öne çıkarak yılın otomobili seçildi.',
    detail: 'Sonuç, Türkiye pazarında kompakt sınıfın hâlâ çok güçlü olduğunu gösteriyor. Kullanıcıların yakıt ekonomisi, donanım seviyesi, güvenlik ve toplam sahip olma maliyeti gibi kriterlere daha fazla önem verdiği görülüyor.',
    image: 'https://caetano.pt/site/uploads/sites/17/2025/10/clio-5-e1759396651570.webp',
    imageAlt: 'Renault Clio 2026 dış görünüm',
  },
  {
    title: 'Tesla Model Y L Avrupa testlerinde görüntülendi',
    category: 'Elektrikli Araçlar',
    date: 'Temmuz 2026',
    source: 'Motor1 Türkiye',
    readTime: '4 dk',
    tags: ['Tesla', 'SUV', 'Elektrikli'],
    summary: 'Uzun aks mesafeli Model Y L, geniş aile SUV segmentinde elektrikli rekabeti artırabilir.',
    detail: 'Daha uzun aks mesafesi, özellikle arka yaşam alanı ve bagaj hacmi tarafında avantaj sağlayabilir. Avrupa pazarındaki testlerin yoğunlaşması, modelin farklı pazarlara uyarlanabileceğini düşündürüyor.',
    image: 'https://citymagazine.b-cdn.net/wp-content/uploads/2025/07/tesla-Model-Y-L-2025-03-1400x788.webp',
    imageAlt: 'Tesla Model Y L yan profil',
  },
  {
    title: 'Togg T10X elektrikli araç satışlarında öne çıktı',
    category: 'Türkiye Pazarı',
    date: 'Mayıs 2026',
    source: 'Volt Haber',
    readTime: '3 dk',
    tags: ['Togg', 'T10X', 'Satış'],
    summary: 'Togg T10X, elektrikli SUV pazarında yerli üretim avantajı ve marka bilinirliğiyle dikkat çekiyor.',
    detail: 'Elektrikli araç talebinin artmasıyla birlikte kullanıcılar menzil, servis ağı, yazılım güncellemeleri ve şarj ekosistemini daha yakından takip ediyor. T10X bu başlıklarda Türkiye merkezli konumuyla öne çıkıyor.',
    image: 'https://i.auto-bild.de/ir_img/4/0/1/0/7/0/9/Togg-T10X-3601-2258x1269-2bb7e72e87d4a3d4.jpg?impolicy=leadteaser',
    imageAlt: 'Togg T10X mavi SUV',
  },
  {
    title: 'BMW iX3 50 xDrive yeni elektrikli SUV rekabetine hazırlanıyor',
    category: 'Premium EV',
    date: '2026',
    source: 'BMW',
    readTime: '5 dk',
    tags: ['BMW', 'iX3', 'Neue Klasse'],
    summary: 'Yeni iX3, menzil, yazılım ve hızlı şarj tarafında premium elektrikli SUV rekabetini kızıştırıyor.',
    detail: 'Neue Klasse yaklaşımı, BMW’nin elektrikli mimari, dijital kokpit ve verimlilik konusundaki yeni dönemini temsil ediyor. Bu sınıfta menzil kadar yazılım deneyimi de belirleyici hale geldi.',
    image: 'https://bmw.scene7.com/is/image/BMW/na5_teaser_electric-cars%3A3to2?fit=wrap%2C+1&fmt=webp&wid=2560',
    imageAlt: 'BMW iX3 elektrikli SUV',
  },
  {
    title: '2026’da Türkiye pazarına yeni elektrikli modeller geliyor',
    category: 'Yeni Modeller',
    date: '2026',
    source: 'Marka duyuruları',
    readTime: '4 dk',
    tags: ['Yeni modeller', 'EV', 'Türkiye'],
    summary: 'Renault 5 E-Tech, Audi Q6 e-tron ve şehir içi odaklı yeni EV modelleri pazarda daha görünür olacak.',
    detail: 'Elektrikli araç rekabeti artık yalnızca premium sınıfta değil, şehir içi kullanıma odaklanan kompakt modellerde de hızlanıyor. Bu durum fiyat, menzil ve şarj altyapısı rekabetini artıracak.',
    image: 'https://events.renault.com/app/uploads/sites/5/2024/02/Renault-5-E-Tech-electric-3.jpg',
    imageAlt: 'Renault 5 E-Tech sarı elektrikli otomobil',
  },
  {
    title: 'Elektrikli araç alırken menzil, şarj ve garanti daha kritik',
    category: 'Rehber',
    date: '2026',
    source: 'Editör analizi',
    readTime: '6 dk',
    tags: ['Şarj', 'Rehber', 'Garanti'],
    summary: 'EV satın alırken yalnızca katalog menziline değil, gerçek tüketim ve şarj alışkanlığına da bakmak gerekiyor.',
    detail: 'Evde şarj imkânı, uzun yol kullanım sıklığı, batarya garantisi, hızlı şarj eğrisi ve servis ağı satın alma kararının merkezinde olmalı. Bu yüzden kullanım senaryosu doğru belirlenmeden EV tercihi yapılmamalı.',
    image: 'https://bmw.scene7.com/is/image/BMW/na5_teaser_public-charging%3A3to2?fit=wrap%2C+1&fmt=webp&wid=2560',
    imageAlt: 'Elektrikli araç şarj istasyonu',
  },
]

const categories = ['Tümü', ...Array.from(new Set(news.map((item) => item.category)))]

export default function HaberlerPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string | null>(news[0].title)

  const filteredNews = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR')
    return news.filter((item) => {
      const matchCategory = activeCategory === 'Tümü' || item.category === activeCategory
      const matchQuery = !q || `${item.title} ${item.summary} ${item.tags.join(' ')}`.toLocaleLowerCase('tr-TR').includes(q)
      return matchCategory && matchQuery
    })
  }, [activeCategory, query])

  const main = filteredNews[0] ?? news[0]
  const rest = filteredNews.slice(1)

  return (
    <main className="min-h-screen bg-[#071116] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[.32em] text-cyan-300">Otomotiv Gündemi</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Haberler</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Güncel otomotiv haberleri, elektrikli araç gelişmeleri, Türkiye pazarı ve yeni model duyuruları.
            </p>
          </div>
          <Link href="/" className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200">
            Ana sayfaya dön
          </Link>
        </div>

        <div className="mb-8 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Haber ara: Togg, Tesla, BMW, elektrikli..."
              className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${activeCategory === category ? 'border-cyan-300 bg-cyan-400/15 text-cyan-200' : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/25'}`}
              >
                <Filter className="mr-1 inline h-3.5 w-3.5" /> {category}
              </button>
            ))}
          </div>
        </div>

        <article className="grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[.04] shadow-2xl shadow-black/30 lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden bg-slate-950">
            <img src={main.image} alt={main.imageAlt} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-[.18em] text-cyan-100 backdrop-blur">{main.category}</span>
          </div>
          <div className="p-8 lg:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-slate-400">
              <span>{main.date}</span><span>•</span><span>Kaynak: {main.source}</span><span>•</span><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {main.readTime}</span>
            </div>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">{main.title}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">{main.summary}</p>
            <p className="mt-4 leading-7 text-slate-400">{main.detail}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {main.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-300"><Tag className="mr-1 inline h-3 w-3" />{tag}</span>)}
            </div>
          </div>
        </article>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[.035] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[.055]">
              <div className="relative h-60 overflow-hidden bg-slate-950">
                <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-cyan-100">{item.category}</span>
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-slate-500">
                  <span>{item.date}</span><span>•</span><span>{item.source}</span><span>•</span><span>{item.readTime}</span>
                </div>
                <h3 className="text-xl font-black leading-snug group-hover:text-cyan-200">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.summary}</p>
                {expanded === item.title && <p className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-400">{item.detail}</p>}
                <button onClick={() => setExpanded(expanded === item.title ? null : item.title)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-300">
                  {expanded === item.title ? 'Detayı kapat' : 'Detayı oku'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
