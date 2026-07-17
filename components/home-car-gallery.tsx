"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carPhotos = [
  {
    title: "Nissan Skyline GT-R R34 Gece Çekimi",
    tag: "JDM Efsanesi",
    image: "/images/home/r34-gece.png",
  },
  {
    title: "Premium Spor Otomobil",
    tag: "Pist Odaklı",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Modern Performans Coupe",
    tag: "Şık Tasarım",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=85",
  },
]

function nextIndex(current: number) {
  return current === carPhotos.length - 1 ? 0 : current + 1
}

function previousIndex(current: number) {
  return current === 0 ? carPhotos.length - 1 : current - 1
}

export function HeroCarPhotoCarousel() {
  const [active, setActive] = useState(0)
  const photo = carPhotos[active]

  return (
    <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30">
      <button
        type="button"
        onClick={() => setActive(nextIndex(active))}
        className="group relative block h-[230px] w-full overflow-hidden rounded-[1.35rem] text-left sm:h-[280px]"
        aria-label="Sonraki araç görseline geç"
      >
        <img
          src={photo.image}
          alt={photo.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">{photo.tag}</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{photo.title}</h2>
          </div>
          <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
            Görsele tıkla, değişsin
          </span>
        </div>
      </button>

      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActive(previousIndex(active))}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-sky-500"
          aria-label="Önceki araç görseli"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {carPhotos.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition ${index === active ? "w-9 bg-sky-400" : "w-2.5 bg-white/25 hover:bg-white/50"}`}
              aria-label={`${index + 1}. görseli aç`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActive(nextIndex(active))}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-sky-500"
          aria-label="Sonraki araç görseli"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export function BuildPanelCarPhoto() {
  const [active, setActive] = useState(0)
  const photo = carPhotos[active]

  return (
    <div className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-black/30">
      <button
        type="button"
        onClick={() => setActive(nextIndex(active))}
        className="group relative block h-52 w-full overflow-hidden text-left"
        aria-label="Yapılandırma paneli araç görselini değiştir"
      >
        <img
          src={photo.image}
          alt={photo.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Yapılandırma görseli</p>
          <h3 className="mt-1 text-xl font-black text-white">{photo.title}</h3>
        </div>
      </button>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-slate-400">Tıklayarak görseller arasında geçiş yap</span>
        <div className="flex gap-1.5">
          {carPhotos.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition ${index === active ? "w-7 bg-sky-400" : "w-2 bg-white/25"}`}
              aria-label={`${index + 1}. build görseli`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
