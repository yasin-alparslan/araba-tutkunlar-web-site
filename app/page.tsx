import Link from 'next/link'
import { ArrowRight, BarChart3, Gauge, MessageSquare, Newspaper, ShieldCheck, Sparkles } from 'lucide-react'
import { BuildPanelCarPhoto, HeroCarPhotoCarousel } from '@/components/home-car-gallery'

const coreSections = [
  {
    title: 'Modifiye Stüdyosu',
    href: '/modifiye',
    description: 'Aracını seç, kategori bazlı modifiye paketleriyle tahmini build maliyetini anlık hesapla.',
    icon: Gauge,
  },
  {
    title: 'Haberler',
    href: '/haberler',
    description: 'Otomotiv dünyasındaki güncel gelişmeleri sade ve anlaşılır içeriklerle takip et.',
    icon: Newspaper,
  },
  {
    title: 'Karşılaştırmalar',
    href: '/karsilastirmalar',
    description: 'Popüler modelleri performans, fiyat, kullanım ve teknik veriler açısından karşılaştır.',
    icon: BarChart3,
  },
  {
    title: 'Tartışmalar',
    href: '/tartismalar',
    description: 'Toplulukla araç tavsiyeleri, modifiye fikirleri ve deneyimler üzerine konuş.',
    icon: MessageSquare,
  },
]

const highlights = [
  { value: '40+', label: 'Modifiye kalemi' },
  { value: '7', label: 'Ana kategori' },
  { value: '3', label: 'Paket seviyesi' },
]

const featured = [
  {
    model: 'Nissan GT-R R34',
    type: 'JDM ikon',
    text: 'Performans kültürünün en güçlü sembollerinden biri.',
  },
  {
    model: 'BMW M3 Competition',
    type: 'Performans sedanı',
    text: 'Günlük kullanım ve pist karakterini aynı çizgide buluşturur.',
  },
  {
    model: 'Porsche 911 Turbo S',
    type: 'Süper otomobil',
    text: 'Mühendislik, hız ve denge odaklı prestijli bir referans model.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071116] text-white">
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(148,163,184,0.08),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
              <Sparkles size={15} /> Premium otomotiv platformu
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.04em] text-white md:text-6xl">
              Otomobil tutkusunu daha düzenli, daha güçlü ve daha profesyonel yaşa.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Araba Tutkunları; haberler, incelemeler, karşılaştırmalar, tartışmalar ve modifiye planlamasını tek çatı altında sunan modern bir otomotiv deneyimidir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/modifiye" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-2xl shadow-sky-500/20 transition hover:bg-sky-400">
                Modifiye Stüdyosuna Git <ArrowRight size={17} />
              </Link>
              <Link href="/incelemeler" className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/[0.08]">
                İncelemeleri Keşfet
              </Link>
            </div>
            <HeroCarPhotoCarousel />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0b151b] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Yapılandırma Paneli</p>
                  <h2 className="mt-1 text-2xl font-black">Nissan Skyline GT-R R34 Premium Paket</h2>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">Aktif</span>
              </div>
              <BuildPanelCarPhoto />
              <div className="space-y-3">
                {['Karbon body kit', 'ECU yazılımı', 'Cat-back egzoz', 'Coilover süspansiyon'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                    <div>
                      <p className="font-bold text-white">{item}</p>
                      <p className="text-xs text-slate-400">{index % 2 === 0 ? 'Premium' : 'Sport'} seviye</p>
                    </div>
                    <p className="font-black text-sky-300">₺{[95000, 42000, 36000, 58000][index].toLocaleString('tr-TR')}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-sky-500/20 to-white/[0.03] p-5">
                <p className="text-sm text-slate-300">Tahmini toplam</p>
                <p className="mt-1 text-4xl font-black tracking-tight">₺231.000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
              <p className="text-4xl font-black text-white">{item.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-300">Ana Bölümler</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">Sade, anlaşılır ve etkileyici yapı</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Fazla tekrar eden alanlar kaldırıldı. Ana sayfa artık kullanıcıyı doğrudan en önemli bölümlere yönlendiren temiz bir yapıya sahip.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {coreSections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.href} href={section.href} className="group rounded-3xl border border-white/10 bg-[#0c171d] p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-[#101f27]">
                <div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/20">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-black text-white">{section.title}</h3>
                <p className="mt-3 min-h-24 text-sm leading-7 text-slate-400">{section.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-300 transition group-hover:gap-3">
                  Aç <ArrowRight size={16} />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0c171d] to-[#0a1116] p-8">
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-sky-300">
            <ShieldCheck size={23} />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-300">Hakkımızda</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">Güvenilir, sade ve otomobil odaklı içerik.</h2>
          <p className="mt-5 leading-8 text-slate-300">
            Araba Tutkunları; performans otomobilleri, otomotiv haberleri, model incelemeleri, karşılaştırmalar ve modifiye fikirlerini düzenli bir deneyimde birleştiren Türkçe otomobil platformudur.
          </p>
          <Link href="/hakkimizda" className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/[0.06]">
            Daha Fazla Bilgi <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Öne çıkan modeller</p>
              <h2 className="mt-2 text-2xl font-black">Editör seçimi</h2>
            </div>
          </div>
          <div className="space-y-3">
            {featured.map((car) => (
              <div key={car.model} className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b151b] p-5 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">{car.type}</p>
                  <h3 className="mt-2 text-xl font-black">{car.model}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{car.text}</p>
                </div>
                <Link href="/incelemeler" className="shrink-0 rounded-xl bg-white/[0.06] px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-500">
                  İncele
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
