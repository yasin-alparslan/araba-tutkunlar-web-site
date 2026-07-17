'use client'

import { useState } from 'react'
import { CheckCircle2, Gauge, MinusCircle, Star, X } from 'lucide-react'
import Footer from '@/components/footer'
import AnimatedSection from '@/components/animated-section'

const reviews = [
  {
    id: 'r34',
    image: '/images/home/r34-gece.png',
    category: 'JDM İkonu',
    title: 'Nissan Skyline GT-R R34',
    segment: 'Performans Coupe',
    engine: '2.6L Twin-Turbo I6',
    acceleration: '4.9 sn',
    score: 9.4,
    summary: 'Kült statüsü, modifiye potansiyeli ve mekanik karakteriyle otomobil kültürünün en güçlü ikonlarından biri.',
    pros: ['Çok yüksek modifiye potansiyeli', 'İkonik tasarım', 'Güçlü topluluk kültürü'],
    cons: ['Parça maliyetleri yüksek', 'Temiz örnek bulmak zor', 'Günlük konfor sınırlı'],
  },
  {
    id: 'm3',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85',
    category: 'Performans Sedanı',
    title: 'BMW M3 Competition',
    segment: 'Spor Sedan',
    engine: '3.0L Twin-Turbo I6',
    acceleration: '3.9 sn',
    score: 8.8,
    summary: 'Günlük kullanılabilirlik ve pist karakterini güçlü bir dengede sunan modern M otomobili.',
    pros: ['Çok dengeli sürüş', 'Güçlü motor', 'Kaliteli iç mekân'],
    cons: ['Sert süspansiyon', 'Yüksek bakım maliyeti', 'Tasarım herkese hitap etmeyebilir'],
  },
  {
    id: '911',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    category: 'Süper Spor',
    title: 'Porsche 911 Turbo S',
    segment: 'Süper Spor Coupe',
    engine: '3.8L Twin-Turbo Boxer',
    acceleration: '2.7 sn',
    score: 9.6,
    summary: 'Hız, denge, kalite ve mühendislik hissini aynı potada eriten referans performans otomobili.',
    pros: ['Muazzam yol tutuş', 'Çok hızlı hızlanma', 'Yüksek kalite algısı'],
    cons: ['Çok yüksek fiyat', 'Opsiyonlar pahalı', 'Bakım maliyeti yüksek'],
  },
  {
    id: 'sf90',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=85',
    category: 'Hibrit Süper Otomobil',
    title: 'Ferrari SF90 Stradale',
    segment: 'Plug-in Hibrit Süper Spor',
    engine: 'V8 + Elektrik Motorları',
    acceleration: '2.5 sn',
    score: 9.2,
    summary: 'Ferrari performansını elektrik destekli yeni nesil güç aktarma sistemiyle ileri taşıyan etkileyici bir model.',
    pros: ['Çok yüksek güç', 'Teknolojik altyapı', 'Agresif tasarım'],
    cons: ['Karmaşık sistem', 'Çok yüksek maliyet', 'Günlük kullanım sınırlı'],
  },
]

export default function IncelemelerPage() {
  const [active, setActive] = useState(reviews[0])

  return (
    <main className="min-h-screen bg-[#071116] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up">
          <p className="text-sm font-black uppercase tracking-[.32em] text-cyan-300">Editör İncelemeleri</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">İncelemeler</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Araçları yalnızca görsellik üzerinden değil; performans, kullanım, maliyet ve karakter açısından değerlendiriyoruz.</p>
        </AnimatedSection>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.map((review, index) => (
              <AnimatedSection key={review.id} animation="fade-up" delay={index * 80}>
                <button onClick={() => setActive(review)} className={`group block overflow-hidden rounded-[28px] border text-left transition hover:-translate-y-1 ${active.id === review.id ? 'border-cyan-300/50 bg-cyan-400/10' : 'border-white/10 bg-white/[.035] hover:border-white/25'}`}>
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img src={review.image} alt={review.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-black text-cyan-100">{review.category}</span>
                    <span className="absolute bottom-4 right-4 rounded-2xl bg-cyan-400 px-3 py-2 text-sm font-black text-[#061015]">{review.score}/10</span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-black group-hover:text-cyan-200">{review.title}</h2>
                    <p className="mt-2 line-clamp-3 leading-7 text-slate-300">{review.summary}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <span className="rounded-xl bg-white/[.05] p-2">Motor: {review.engine}</span>
                      <span className="rounded-xl bg-white/[.05] p-2">0-100: {review.acceleration}</span>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          <aside className="h-fit rounded-[30px] border border-white/10 bg-[#0d171d] p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.25em] text-slate-500">Detaylı kart</p>
                <h2 className="mt-2 text-2xl font-black">{active.title}</h2>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-400 text-xl font-black text-[#061015]">{active.score}</div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.035] p-3"><Gauge className="h-4 w-4 text-cyan-300" /> Segment: {active.segment}</div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.035] p-3"><Star className="h-4 w-4 text-cyan-300" /> Editör puanı: {active.score}/10</div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div>
                <h3 className="mb-3 font-black text-emerald-300">Artılar</h3>
                <div className="space-y-2">{active.pros.map((item) => <p key={item} className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</p>)}</div>
              </div>
              <div>
                <h3 className="mb-3 font-black text-red-300">Eksiler</h3>
                <div className="space-y-2">{active.cons.map((item) => <p key={item} className="flex gap-2 text-sm text-slate-300"><MinusCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />{item}</p>)}</div>
              </div>
            </div>
            <button onClick={() => setActive(reviews[0])} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white"><X className="h-4 w-4" /> Seçimi sıfırla</button>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  )
}
