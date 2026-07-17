'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';

async function readJsonSafely(response) {
  try { return await response.json(); } catch { return {}; }
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function submit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage('');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const data = await readJsonSafely(response);
      if (!response.ok) {
        setMessage(data.message || 'Bu e-posta ve şifreyle eşleşen bir kullanıcı bulunamadı. Önce kayıt olduğundan emin ol.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch (error) {
      setMessage(error?.name === 'AbortError' ? 'Bağlantı zaman aşımına uğradı. MongoDB bağlantını ve internetini kontrol et.' : 'Giriş yapılamadı. Lütfen tekrar deneyin.');
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071116] p-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#111d23] p-8 shadow-2xl shadow-black/30">
        <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300"><LogIn /></div>
        <h1 className="text-3xl font-black tracking-tight">Giriş Yap</h1>
        <p className="mt-2 text-slate-400">Hesabına giriş yaparak kayıtlı yapılandırmalarını, yorumlarını ve admin yetkilerini kullan.</p>

        <label className="mt-6 block text-sm font-bold text-slate-200">E-posta</label>
        <input type="email" required value={form.email} className="mt-2 h-13 w-full rounded-2xl border border-white/10 bg-[#071116] px-4 outline-none focus:border-cyan-400" onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="ornek@mail.com" />

        <label className="mt-4 block text-sm font-bold text-slate-200">Şifre</label>
        <div className="relative mt-2">
          <input type={showPassword ? 'text' : 'password'} required value={form.password} className="h-13 w-full rounded-2xl border border-white/10 bg-[#071116] px-4 pr-12 outline-none focus:border-cyan-400" onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Şifren" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-400 hover:text-white" aria-label="Şifreyi göster veya gizle">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>

        <label className="mt-4 flex items-center gap-3 text-sm text-slate-400"><input type="checkbox" checked={form.remember} onChange={(event) => setForm({ ...form, remember: event.target.checked })} className="h-4 w-4 accent-cyan-400" /> Beni hatırla</label>

        {message && <p className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{message}</p>}

        <button disabled={loading} className="mt-6 h-13 w-full rounded-2xl bg-cyan-500 font-black text-[#061015] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</button>
        <p className="mt-5 text-center text-slate-400">Hesabın yok mu? <Link href="/register" className="font-bold text-cyan-300">Kayıt ol</Link></p>
      </form>
    </main>
  );
}
