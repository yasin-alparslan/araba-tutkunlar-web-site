"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center shadow-lg">
      <div className="text-xl font-bold">
        <Link href="/">Araba Tutkunları</Link>
      </div>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-400">Ana Sayfa</Link>
        <Link href="/incelemeler" className="hover:text-blue-400">İncelemeler</Link>
        <Link href="/haberler" className="hover:text-blue-400">Haberler</Link>
        <Link href="/modifiye" className="hover:text-cyan-400">Modifiye Stüdyosu</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
          Giriş Yap
        </Link>
        <Link href="/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
          Kayıt Ol
        </Link>
      </div>
    </nav>
  );
}
