import { Check, Crown, Gauge, Scale, Timer, WalletCards } from 'lucide-react'
import Footer from '@/components/footer'

const cars = [
  {
    name: 'BMW M3 Competition',
    image: '/images/comparisons/bmw-m3-competition.png',
    body: 'Sedan', power: '510 HP', torque: '650 Nm', zero: '3.9 sn', weight: '1.730 kg', price: '~ 150.000 €', best: 'Günlük + pist dengesi', score: 8.8,
  },
  {
    name: 'BMW M4 Competition',
    image: '/images/comparisons/bmw-m4-competition.png',
    body: 'Coupe', power: '510 HP', torque: '650 Nm', zero: '3.9 sn', weight: '1.725 kg', price: '~ 155.000 €', best: 'Tasarım ve sportif duruş', score: 8.7,
  },
  {
    name: 'BMW M5 Competition',
    image: '/images/comparisons/bmw-m5-competition.png',
    body: 'Süper sedan', power: '625 HP', torque: '750 Nm', zero: '3.3 sn', weight: '1.895 kg', price: '~ 250.000 €', best: 'Lüks + yüksek güç', score: 9.0,
  },
]

const rows = [
  { label: 'Güç', icon: Gauge, values: cars.map((c) => c.power), winner: 2 },
  { label: 'Tork', icon: Scale, values: cars.map((c) => c.torque), winner: 2 },
  { label: '0-100 km/s', icon: Timer, values: cars.map((c) => c.zero), winner: 2 },
  { label: 'Tahmini fiyat', icon: WalletCards, values: cars.map((c) => c.price), winner: 0 },
]

export default function KarsilastirmalarPage() {
  return (
    <main className="min-h-screen bg-[#071116] text-white">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[.32em] text-cyan-300">Model Karşılaştırması</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">BMW M3, M4 ve M5 Competition</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Performans, fiyat, kullanım karakteri ve teknik değerleri tek ekranda karşılaştır.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cars.map((car, index) => (
            <article key={car.name} className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[.035] shadow-2xl shadow-black/20">
              <div className="relative h-60 overflow-hidden">
                <img src={car.image} alt={car.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {index === 2 && <span className="absolute left-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-xs font-black text-[#061015]"><Crown className="mr-1 inline h-3.5 w-3.5" /> En güçlü</span>}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black">{car.name}</h2>
                <p className="mt-1 text-sm font-bold text-cyan-300">{car.body}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">Öne çıkan yön: {car.best}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/[.05] p-3"><span className="text-slate-500">Güç</span><strong className="mt-1 block">{car.power}</strong></div>
                  <div className="rounded-2xl bg-white/[.05] p-3"><span className="text-slate-500">0-100</span><strong className="mt-1 block">{car.zero}</strong></div>
                  <div className="rounded-2xl bg-white/[.05] p-3"><span className="text-slate-500">Ağırlık</span><strong className="mt-1 block">{car.weight}</strong></div>
                  <div className="rounded-2xl bg-white/[.05] p-3"><span className="text-slate-500">Puan</span><strong className="mt-1 block">{car.score}/10</strong></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-[#0d171d]">
          <div className="border-b border-white/10 p-6"><h2 className="text-2xl font-black">Tek bakışta karşılaştırma</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[.04] text-slate-400">
                <tr><th className="px-6 py-4">Kriter</th>{cars.map((car) => <th key={car.name} className="px-6 py-4">{car.name}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const Icon = row.icon
                  return (
                    <tr key={row.label} className="border-t border-white/10">
                      <td className="px-6 py-5 font-bold"><Icon className="mr-2 inline h-4 w-4 text-cyan-300" /> {row.label}</td>
                      {row.values.map((value, index) => <td key={`${row.label}-${index}`} className={`px-6 py-5 ${row.winner === index ? 'font-black text-emerald-300' : 'text-slate-300'}`}>{value} {row.winner === index && <Check className="ml-1 inline h-4 w-4" />}</td>)}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
