'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { BarChart3, FilePenLine, MessageSquare, Newspaper, Search, Settings, Shield, SlidersHorizontal, Users } from 'lucide-react'

type UserRow = { id: string; username: string; email: string; role: string; createdAt: string }

type Props = {
  currentUser: { username: string; email?: string }
  users: UserRow[]
}

const tabs = [
  { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
  { id: 'news', label: 'Haber Yönetimi', icon: Newspaper },
  { id: 'reviews', label: 'İnceleme Yönetimi', icon: FilePenLine },
  { id: 'prices', label: 'Modifiye Fiyatları', icon: SlidersHorizontal },
  { id: 'users', label: 'Kullanıcılar', icon: Users },
  { id: 'comments', label: 'Yorumlar', icon: MessageSquare },
  { id: 'settings', label: 'Site Ayarları', icon: Settings },
]

const demoNews = ['Elektrikli araçlarda 2026 rekabeti', 'Yeni BMW iX3 ön inceleme', 'Togg T10X satış grafiği', 'Modifiye maliyetleri rehberi']
const priceRows = ['Body Kit', 'ECU Yazılımı', 'Cat-back Egzoz', 'Coilover', 'Büyük Fren Kiti', '20+ Jant Seti']

export default function AdminDashboard({ currentUser, users }: Props) {
  const [active, setActive] = useState('overview')
  const [query, setQuery] = useState('')

  const filteredUsers = useMemo(() => {
    const q = query.toLocaleLowerCase('tr-TR')
    return users.filter((user) => `${user.username} ${user.email} ${user.role}`.toLocaleLowerCase('tr-TR').includes(q))
  }, [users, query])

  const stats = [
    { label: 'Toplam kullanıcı', value: users.length },
    { label: 'Admin', value: users.filter((u) => u.role === 'admin').length },
    { label: 'Haber taslağı', value: demoNews.length },
    { label: 'Fiyat kalemi', value: priceRows.length },
  ]

  return (
    <main className="min-h-screen bg-[#071116] text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[.32em] text-cyan-300">Yönetim Merkezi</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Admin Kontrol Paneli</h1>
            <p className="mt-3 text-slate-400">Hoş geldin, {currentUser.username}. İçerik, kullanıcı ve modifiye fiyatlarını tek panelden yönet.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-200"><Shield className="mr-2 inline h-4 w-4" /> Admin oturumu aktif</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[28px] border border-white/10 bg-[#111d23] p-3 lg:sticky lg:top-24">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return <button key={tab.id} onClick={() => setActive(tab.id)} className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active === tab.id ? 'bg-cyan-400/15 text-cyan-200' : 'text-slate-400 hover:bg-white/[.05] hover:text-white'}`}><Icon className="h-4 w-4" />{tab.label}</button>
            })}
          </aside>

          <section className="min-w-0">
            {active === 'overview' && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-[24px] border border-white/10 bg-white/[.035] p-5"><p className="text-sm text-slate-500">{stat.label}</p><p className="mt-2 text-3xl font-black">{stat.value}</p></div>)}</div>
                <Panel title="Hızlı işlemler"><div className="grid gap-3 md:grid-cols-3"><AdminAction title="Yeni haber ekle" /><AdminAction title="Yeni inceleme ekle" /><AdminAction title="Fiyatları güncelle" /></div></Panel>
              </div>
            )}

            {active === 'news' && <Panel title="Haber Yönetimi" action="Yeni Haber"><List items={demoNews} note="Buradaki yapı admin panelde haber ekleme/düzenleme akışına hazırlandı." /></Panel>}
            {active === 'reviews' && <Panel title="İnceleme Yönetimi" action="Yeni İnceleme"><List items={['Nissan Skyline GT-R R34', 'BMW M3 Competition', 'Porsche 911 Turbo S']} note="İncelemeler için puan, artılar, eksiler ve teknik özellik alanları kullanılabilir." /></Panel>}
            {active === 'prices' && <Panel title="Modifiye Fiyatları" action="Fiyatları Kaydet"><div className="grid gap-3">{priceRows.map((row, i) => <div key={row} className="grid gap-3 rounded-2xl border border-white/10 bg-[#091318] p-4 md:grid-cols-[1fr_140px_140px_140px]"><strong>{row}</strong><input defaultValue={`${(i + 1) * 12000}`} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" /><input defaultValue={`${(i + 1) * 18000}`} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" /><input defaultValue={`${(i + 1) * 26000}`} className="rounded-xl border border-white/10 bg-black/20 px-3 py-2" /></div>)}</div></Panel>}
            {active === 'users' && <Panel title="Kullanıcılar"><div className="relative mb-4"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Kullanıcı ara" className="h-12 w-full rounded-2xl border border-white/10 bg-[#091318] pl-11 pr-4 outline-none focus:border-cyan-400" /></div><div className="overflow-hidden rounded-2xl border border-white/10">{filteredUsers.map((u) => <div key={u.id} className="grid gap-2 border-b border-white/10 p-4 last:border-0 md:grid-cols-[1fr_1fr_120px_120px]"><strong>{u.username}</strong><span className="text-slate-400">{u.email}</span><span className="text-cyan-300">{u.role}</span><span className="text-slate-500">{u.createdAt}</span></div>)}</div></Panel>}
            {active === 'comments' && <Panel title="Yorum Yönetimi"><List items={['Modifiye önerisi yorumu', 'Haber yorumu', 'Karşılaştırma tartışması']} note="Yorumlar burada onaylanabilir, gizlenebilir veya silinebilir." /></Panel>}
            {active === 'settings' && <Panel title="Site Ayarları"><List items={['TR / EN dil kontrolü', 'SEO başlıkları', 'Ana sayfa vitrin ayarları', 'Sosyal medya bağlantıları']} note="Yayın öncesi düzenlenmesi gereken temel site ayarları." /></Panel>}
          </section>
        </div>
      </section>
    </main>
  )
}

function Panel({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return <div className="rounded-[28px] border border-white/10 bg-[#111d23] p-6"><div className="mb-5 flex items-center justify-between gap-4"><h2 className="text-2xl font-black">{title}</h2>{action && <button className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-black text-[#061015]">{action}</button>}</div>{children}</div>
}
function AdminAction({ title }: { title: string }) { return <button className="rounded-2xl border border-white/10 bg-[#091318] p-5 text-left font-bold transition hover:border-cyan-400/40 hover:bg-cyan-400/10">{title}</button> }
function List({ items, note }: { items: string[]; note: string }) { return <><div className="space-y-2">{items.map((item) => <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#091318] p-4"><strong>{item}</strong><button className="text-sm font-bold text-cyan-300">Düzenle</button></div>)}</div><p className="mt-4 text-sm leading-6 text-slate-500">{note}</p></> }
