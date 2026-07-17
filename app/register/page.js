'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

async function readJsonSafely(response) {
  try { return await response.json(); } catch { return {}; }
}

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function submit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage('');
    setSuccess(false);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const data = await readJsonSafely(response);
      if (!response.ok) {
        setMessage(data.message || 'Kayıt başarısız. E-posta daha önce kullanılmış olabilir veya MongoDB bağlantısı hatalı olabilir.');
        return;
      }
      setSuccess(true);
      setMessage(data.message || 'Kayıt başarılı. Giriş sayfasına yönlendiriliyorsunuz.');
      setTimeout(() => { router.replace('/login'); router.refresh(); }, 900);
    } catch (error) {
      setMessage(error?.name === 'AbortError' ? 'Bağlantı zaman aşımına uğradı. MongoDB bağlantını ve internetini kontrol et.' : 'Kayıt yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071116] p-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#111d23] p-8 shadow-2xl shadow-black/30">
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300"><UserPlus /></div>
        <h1 className="text-3xl font-black tracking-tight">Hesap Oluştur</h1>
        <p className="mt-2 text-slate-400">İlk kayıt olan kullanıcı otomatik olarak admin yetkisi alır.</p>

        <label className="mt-6 block text-sm font-bold text-slate-200">Kullanıcı adı</label>
        <input type="text" required minLength={2} value={form.username} className="mt-2 h-13 w-full rounded-2xl border border-white/10 bg-[#071116] px-4 outline-none focus:border-cyan-400" onChange={(event) => setForm({ ...form, username: event.target.value })} placeholder="Yasin Alparslan" />

        <label className="mt-4 block text-sm font-bold text-slate-200">E-posta</label>
        <input type="email" required value={form.email} className="mt-2 h-13 w-full rounded-2xl border border-white/10 bg-[#071116] px-4 outline-none focus:border-cyan-400" onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="ornek@mail.com" />

        <label className="mt-4 block text-sm font-bold text-slate-200">Şifre</label>
        <div className="relative mt-2">
          <input type={showPassword ? 'text' : 'password'} required minLength={6} value={form.password} className="h-13 w-full rounded-2xl border border-white/10 bg-[#071116] px-4 pr-12 outline-none focus:border-cyan-400" onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="En az 6 karakter" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 hover:text-white" aria-label="Şifreyi göster veya gizle">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>

        {message && <p className={`mt-5 rounded-2xl border p-3 text-sm ${success ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>{message}</p>}

        <button disabled={loading} className="mt-6 h-13 w-full rounded-2xl bg-cyan-500 font-black text-[#061015] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Kaydediliyor...' : 'Kayıt Ol'}</button>
        <p className="mt-5 text-center text-slate-400">Hesabın var mı? <Link href="/login" className="font-bold text-cyan-300">Giriş yap</Link></p>
      </form>
    </main>
  );
}
