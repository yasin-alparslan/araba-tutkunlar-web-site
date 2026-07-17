'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, LogIn, LogOut, Shield, Languages } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/language-provider'

const navLinks = [
  { href: '/', label: { tr: 'Ana Sayfa', en: 'Home' } },
  { href: '/modifiye', label: { tr: 'Modifiye Stüdyosu', en: 'Modification Studio' } },
  { href: '/haberler', label: { tr: 'Haberler', en: 'News' } },
  { href: '/incelemeler', label: { tr: 'İncelemeler', en: 'Reviews' } },
  { href: '/karsilastirmalar', label: { tr: 'Karşılaştırmalar', en: 'Comparisons' } },
  { href: '/tartismalar', label: { tr: 'Tartışmalar', en: 'Discussions' } },
  { href: '/hakkimizda', label: { tr: 'Hakkımızda', en: 'About Us' } },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  const accountLink = '/admin'

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050b0f]/90 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-sm font-black text-white shadow-lg shadow-sky-500/20">
            AT
          </div>
          <span className="text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">{t('Araba Tutkunları', 'Car Enthusiasts')}</span>
        </Link>

        <nav className="hidden items-center rounded-2xl border border-white/10 bg-white/[0.035] p-1 xl:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
            >
              {item.label[language]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1" aria-label={t('Dil seçimi', 'Language selection')}>
            <Languages size={16} className="ml-2 text-slate-400" />
            {(['tr', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`rounded-xl px-2.5 py-1.5 text-xs font-black transition ${language === code ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          {user ? (
            <>
              <Link
                href={accountLink}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/[0.09]"
              >
                <Shield size={17} />
                {t('Admin Paneli', 'Admin Panel')}
              </Link>
              <button
                onClick={logout}
                className="rounded-2xl border border-white/10 p-2.5 text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                title={t('Çıkış Yap', 'Logout')}
              >
                <LogOut size={19} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
                <LogIn size={18} />
                {t('Giriş', 'Login')}
              </Link>
              <Link href="/register" className="rounded-2xl bg-sky-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">
                {t('Kayıt Ol', 'Sign Up')}
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-2xl border border-white/10 p-2.5 text-white transition hover:bg-white/10 lg:hidden" aria-label={t('Menüyü aç', 'Open menu')}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#050b0f] p-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                onClick={() => setOpen(false)}
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label[language]}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
            {(['tr', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-black transition ${language === code ? 'bg-sky-500 text-white' : 'bg-white/[0.05] text-slate-300'}`}
              >
                {code === 'tr' ? 'Türkçe' : 'English'}
              </button>
            ))}
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            {user ? (
              <>
                <Link onClick={() => setOpen(false)} href={accountLink} className="block rounded-2xl px-4 py-3 font-bold text-sky-300">
                  {t('Admin Paneli', 'Admin Panel')}
                </Link>
                <button onClick={logout} className="w-full rounded-2xl px-4 py-3 text-left font-bold text-red-300">
                  {t('Çıkış Yap', 'Logout')}
                </button>
              </>
            ) : (
              <>
                <Link onClick={() => setOpen(false)} href="/login" className="block rounded-2xl px-4 py-3 font-bold text-white">
                  {t('Giriş', 'Login')}
                </Link>
                <Link onClick={() => setOpen(false)} href="/register" className="mt-2 block rounded-2xl bg-sky-500 px-4 py-3 text-center font-black text-white">
                  {t('Kayıt Ol', 'Sign Up')}
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
