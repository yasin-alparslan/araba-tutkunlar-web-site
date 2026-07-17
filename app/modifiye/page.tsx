"use client"

import { useMemo, useState } from "react"
import {
  CarFront,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  ListChecks,
  PackageCheck,
  Plus,
  Printer,
  RotateCw,
  Search,
  ShoppingCart,
  Sparkles,
  Save,
  Zap,
  Wrench,
  Trash2,
  X,
} from "lucide-react"

type Level = "Standart" | "Sport" | "Premium"
type CategoryKey = "dis" | "motor" | "egzoz" | "suspansiyon" | "fren" | "jant" | "ic"
type ViewMode = "ucBoyut" | "on" | "yan" | "arka"

type ModItem = {
  id: string
  name: string
  description: string
  prices: Record<Level, number>
  icon: string
}

type Category = {
  key: CategoryKey
  name: string
  emoji: string
  accent: string
  items: ModItem[]
}

type Selection = {
  category: string
  itemName: string
  level: Level
  price: number
}

const levelMultipliers: Record<Level, number> = {
  Standart: 1,
  Sport: 1.45,
  Premium: 2.1,
}

const makeItem = (id: string, name: string, description: string, basePrice: number, icon: string): ModItem => ({
  id,
  name,
  description,
  icon,
  prices: {
    Standart: basePrice,
    Sport: Math.round((basePrice * levelMultipliers.Sport) / 100) * 100,
    Premium: Math.round((basePrice * levelMultipliers.Premium) / 100) * 100,
  },
})

const categories: Category[] = [
  {
    key: "dis",
    name: "Dış Görünüm",
    emoji: "🔵",
    accent: "border-blue-500/70 bg-blue-500/10 text-blue-300",
    items: [
      makeItem("body-kit", "Body Kit", "Ön tampon, arka tampon ve yan marşpiyel seti", 65000, "body-kit"),
      makeItem("spoiler", "Spoiler", "Aerodinamik arka kanat uygulaması", 18000, "spoiler"),
      makeItem("karbon-kapot", "Karbon Kaput", "Hafif karbon fiber kaput görünümü", 85000, "carbon-hood"),
      makeItem("film-kaplama", "Renk Kaplama", "Tam araç renk ve koruma kaplaması", 60000, "wrap"),
      makeItem("on-lip", "Ön Lip", "Tampona sportif ön lip eki", 15000, "front-lip"),
      makeItem("difuzor", "Arka Difüzör", "Arka hava akışını güçlendiren difüzör", 18000, "diffuser"),
      makeItem("far", "Far Sistemi", "LED, mercek veya özel tasarım far yükseltmesi", 35000, "headlight"),
    ],
  },
  {
    key: "motor",
    name: "Motor & Performans",
    emoji: "🟡",
    accent: "border-yellow-500/70 bg-yellow-500/10 text-yellow-300",
    items: [
      makeItem("ecu", "ECU Yazılımı", "Motor kontrol ünitesi güç ve tork optimizasyonu", 25000, "ecu"),
      makeItem("turbo", "Turbo Kiti", "Daha yüksek basınç ve güç için turbo yükseltmesi", 140000, "turbo"),
      makeItem("intake", "Soğuk Hava Intake", "Motora daha serin hava beslemesi", 18000, "intake"),
      makeItem("intercooler", "Intercooler", "Şarj havası sıcaklığını düşüren sistem", 40000, "intercooler"),
      makeItem("yakit", "Yakıt Sistemi", "Enjektör, pompa ve yakıt hattı yükseltmesi", 45000, "fuel"),
      makeItem("supercharger", "Supercharger", "Anlık gaz tepkisi için mekanik besleme", 180000, "supercharger"),
    ],
  },
  {
    key: "egzoz",
    name: "Egzoz",
    emoji: "🟠",
    accent: "border-orange-500/70 bg-orange-500/10 text-orange-300",
    items: [
      makeItem("catback", "Cat-back Sistem", "Katalizör sonrası performans egzoz hattı", 48000, "catback"),
      makeItem("downpipe", "Downpipe", "Turbo çıkışı yüksek akışlı boru sistemi", 30000, "downpipe"),
      makeItem("manifold", "Egzoz Manifoldu", "Akış verimliliği artırılmış manifold", 38000, "manifold"),
      makeItem("egzoz-ucu", "Egzoz Uçları", "Çift, dörtlü veya karbon egzoz ucu seti", 9500, "exhaust-tip"),
      makeItem("valf", "Valf Kontrolü", "Uzaktan kontrollü aktif egzoz valfi", 22000, "valve"),
      makeItem("susturucu", "Performans Susturucu", "Daha tok ses ve düşük geri basınç", 20000, "muffler"),
    ],
  },
  {
    key: "suspansiyon",
    name: "Süspansiyon",
    emoji: "🟢",
    accent: "border-green-500/70 bg-green-500/10 text-green-300",
    items: [
      makeItem("coilover", "Coilover", "Ayarlanabilir yükseklik ve sertlik sistemi", 65000, "coilover"),
      makeItem("spor-yay", "Spor Yay", "Daha alçak sürüş ve daha net yol tutuş", 18000, "spring"),
      makeItem("stabilizator", "Stabilizatör", "Viraj yatmasını azaltan denge çubuğu", 25000, "stabilizer"),
      makeItem("camber", "Camber Kiti", "Teker açılarını hassas ayarlama sistemi", 18000, "camber"),
      makeItem("alt-kasa", "Alt Kasa Desteği", "Şasi rijitliğini artıran destek barları", 20000, "chassis"),
      makeItem("havalı", "Havalı Süspansiyon", "Elektronik yükseklik kontrollü hava sistemi", 130000, "air-suspension"),
    ],
  },
  {
    key: "fren",
    name: "Fren Sistemi",
    emoji: "🔴",
    accent: "border-red-500/70 bg-red-500/10 text-red-300",
    items: [
      makeItem("big-brake", "Büyük Fren Kiti", "Çok pistonlu kaliper ve büyük disk paketi", 120000, "big-brake"),
      makeItem("balata", "Performans Balata", "Yüksek sıcaklığa dayanıklı fren balatası", 15000, "brake-pad"),
      makeItem("disk", "Performans Disk", "Delikli veya kanallı disk seti", 40000, "brake-disc"),
      makeItem("hortum", "Çelik Fren Hortumu", "Daha sert pedal hissi sağlayan örgülü hortum", 10000, "brake-line"),
      makeItem("kaliper", "Kaliper Rengi", "Isıya dayanıklı özel renk kaliper uygulaması", 9000, "caliper"),
      makeItem("fren-sivi", "Yarış Tipi Fren Sıvısı", "Yüksek kaynama noktalı performans sıvısı", 5500, "brake-fluid"),
    ],
  },
  {
    key: "jant",
    name: "Jant & Lastik",
    emoji: "🟣",
    accent: "border-purple-500/70 bg-purple-500/10 text-purple-300",
    items: [
      makeItem("jant18", '18 inç Jant Seti', "Hafif alaşım dört adet jant", 60000, "wheel-18"),
      makeItem("jant19", '19 inç Jant Seti', "Sportif tasarımlı büyük çap jant seti", 85000, "wheel-19"),
      makeItem("jant20", '20+ inç Jant Seti', "Premium forged veya çok parçalı jant seti", 130000, "wheel-20"),
      makeItem("lastik", "Performans Lastiği", "Yüksek yol tutuşlu dört adet lastik", 55000, "tire"),
      makeItem("spacer", "Ara Parça", "Daha dolgun duruş için jant spacer seti", 12000, "spacer"),
      makeItem("tpms", "TPMS", "Lastik basınç takip sensörü seti", 9000, "tpms"),
    ],
  },
  {
    key: "ic",
    name: "İç Mekan",
    emoji: "🩷",
    accent: "border-pink-500/70 bg-pink-500/10 text-pink-300",
    items: [
      makeItem("koltuk", "Spor Koltuk", "Yüksek yan destekli sürücü ve yolcu koltuğu", 75000, "seat"),
      makeItem("direksiyon", "Spor Direksiyon", "Alcantara, karbon veya LED göstergeli direksiyon", 38000, "steering"),
      makeItem("pedal", "Spor Pedal Seti", "Alüminyum gaz, fren ve debriyaj pedalları", 7000, "pedals"),
      makeItem("gosterge", "Dijital Göstergeler", "Ek performans verisi ve dijital ekran paketi", 28000, "gauge"),
      makeItem("ses", "Ses Sistemi", "Amfi, hoparlör ve subwoofer yükseltmesi", 55000, "audio"),
      makeItem("roll-cage", "Roll Kafes", "Pist kullanımı için kabin güvenlik kafesi", 65000, "roll-cage"),
    ],
  },
]

const vehicles = [
  "Jenerik Spor Coupe",
  "BMW M3 Competition",
  "BMW M4 Competition",
  "Porsche 911 Carrera S",
  "Ferrari 488 GTB",
  "Mercedes-AMG C 63 S",
  "Audi RS6 Avant",
  "Nissan GT-R",
  "Toyota GR Supra",
  "Honda Civic Type R",
]

const presetBuilds = [
  {
    name: "Günlük Kullanım Paketi",
    description: "Görünüm, konfor ve güvenli sürüş odaklı dengeli başlangıç paketi.",
    ids: { "film-kaplama": "Standart", "jant18": "Standart", "spor-yay": "Standart", "balata": "Standart", "egzoz-ucu": "Standart" } as Record<string, Level>,
  },
  {
    name: "Pist Paketi",
    description: "Yol tutuş, frenleme ve motor tepkisini güçlendiren sportif paket.",
    ids: { ecu: "Sport", coilover: "Sport", "big-brake": "Sport", "lastik": "Sport", catback: "Sport", spoiler: "Sport" } as Record<string, Level>,
  },
  {
    name: "Show Car Paketi",
    description: "Duruş, jant, kaplama ve iç mekân etkisini öne çıkaran premium görünüm paketi.",
    ids: { "body-kit": "Premium", spoiler: "Premium", "karbon-kapot": "Premium", "jant20": "Premium", kaliper: "Premium", ses: "Premium" } as Record<string, Level>,
  },
]

const formatPrice = (value: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value)

const partCount = categories.reduce((total, category) => total + category.items.length, 0)

function getIconAccent(categoryKey: CategoryKey) {
  const colors: Record<CategoryKey, { stroke: string; glow: string; soft: string }> = {
    dis: { stroke: "#38bdf8", glow: "rgba(56,189,248,.35)", soft: "#082f49" },
    motor: { stroke: "#facc15", glow: "rgba(250,204,21,.35)", soft: "#422006" },
    egzoz: { stroke: "#fb923c", glow: "rgba(251,146,60,.35)", soft: "#431407" },
    suspansiyon: { stroke: "#86efac", glow: "rgba(134,239,172,.35)", soft: "#052e16" },
    fren: { stroke: "#f87171", glow: "rgba(248,113,113,.35)", soft: "#450a0a" },
    jant: { stroke: "#c084fc", glow: "rgba(192,132,252,.35)", soft: "#3b0764" },
    ic: { stroke: "#f9a8d4", glow: "rgba(249,168,212,.35)", soft: "#500724" },
  }
  return colors[categoryKey]
}

function PartIcon({ icon, categoryKey, selected = false, large = false }: { icon: string; categoryKey: CategoryKey; selected?: boolean; large?: boolean }) {
  const accent = getIconAccent(categoryKey)
  const stroke = selected ? accent.stroke : "#94a3b8"
  const soft = selected ? accent.soft : "#111827"
  const glow = selected ? `drop-shadow(0 0 14px ${accent.glow})` : "none"
  const sizeClass = large ? "h-32 w-full" : "h-20 w-24"
  const common = {
    viewBox: "0 0 128 92",
    className: `${sizeClass} rounded-2xl bg-gradient-to-br from-[#050b10] via-[#0c171d] to-[#111827]`,
    style: { filter: glow },
    role: "img",
  } as const

  const wheelBase = (
    <>
      <circle cx="64" cy="46" r="27" fill="#020617" stroke={stroke} strokeWidth="7" />
      <circle cx="64" cy="46" r="8" fill="#e2e8f0" />
    </>
  )

  switch (icon) {
    case "body-kit":
      return <svg {...common}><path d="M13 59c7-22 24-34 49-34h14c18 0 31 12 39 34" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M9 60h110l-11 15H20z" fill="#020617" stroke={stroke} strokeWidth="4"/><path d="M23 75h82" stroke={stroke} strokeWidth="5" strokeLinecap="round"/></svg>
    case "spoiler":
      return <svg {...common}><path d="M22 62h84" stroke={stroke} strokeWidth="6" strokeLinecap="round"/><path d="M36 34h56l15 10H21z" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M43 45v19M85 45v19" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round"/></svg>
    case "carbon-hood":
      return <svg {...common}><path d="M33 19h62l-13 58H20z" fill="url(#carbon)" stroke={stroke} strokeWidth="4"/><defs><pattern id="carbon" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="12" fill="#020617"/><rect x="6" width="6" height="12" fill="#1e293b"/></pattern></defs><path d="M47 27 35 69M68 27 56 69" stroke="#64748b" strokeWidth="2"/></svg>
    case "wrap":
      return <svg {...common}><path d="M17 58c9-24 27-34 51-34h9c17 1 29 13 35 34" fill="url(#wrapg)" stroke={stroke} strokeWidth="4"/><path d="M20 67h88" stroke="#e0f2fe" strokeWidth="5" strokeLinecap="round"/><defs><linearGradient id="wrapg" x1="0" x2="1"><stop stopColor="#0284c7"/><stop offset=".5" stopColor="#22d3ee"/><stop offset="1" stopColor="#4338ca"/></linearGradient></defs></svg>
    case "front-lip":
      return <svg {...common}><path d="M19 39h90v23H19z" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M11 65h106l-9 11H20z" fill="#020617" stroke={stroke} strokeWidth="5"/><path d="M27 50h20M82 50h20" stroke="#bae6fd" strokeWidth="5" strokeLinecap="round"/></svg>
    case "diffuser":
      return <svg {...common}><path d="M17 37h94v25H17z" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M25 64h78l10 13H15z" fill="#020617" stroke={stroke} strokeWidth="4"/><path d="M41 64 34 77M64 64v13M87 64l7 13" stroke="#e2e8f0" strokeWidth="4"/></svg>
    case "headlight":
      return <svg {...common}><path d="M18 46c12-17 31-24 54-17l38 12c-8 18-28 26-52 19z" fill={soft} stroke={stroke} strokeWidth="4"/><circle cx="52" cy="45" r="10" fill="#e0f2fe"/><circle cx="78" cy="47" r="8" fill="#bae6fd"/><path d="M86 49h31" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" opacity=".8"/></svg>
    case "ecu":
      return <svg {...common}><rect x="26" y="22" width="76" height="50" rx="8" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M37 35h26M37 48h44M37 61h18" stroke="#fef3c7" strokeWidth="4" strokeLinecap="round"/><path d="M102 34h12M102 46h12M102 58h12M14 34h12M14 46h12M14 58h12" stroke={stroke} strokeWidth="4" strokeLinecap="round"/></svg>
    case "turbo":
      return <svg {...common}><path d="M69 24c19 0 35 14 35 31 0 11-9 20-21 20H52c-17 0-30-12-30-27 0-13 11-24 25-24z" fill={soft} stroke={stroke} strokeWidth="4"/><circle cx="56" cy="49" r="18" fill="#020617" stroke="#fde68a" strokeWidth="5"/><path d="M56 31v36M38 49h36M44 37l25 25M69 37 44 62" stroke="#fef3c7" strokeWidth="3"/></svg>
    case "intake":
      return <svg {...common}><path d="M23 60h45c16 0 26-12 37-29" stroke={stroke} strokeWidth="12" fill="none" strokeLinecap="round"/><path d="M20 46h25v28H20z" fill="#020617" stroke="#fde68a" strokeWidth="4"/><path d="M25 52h15M25 60h15M25 68h15" stroke="#fef3c7" strokeWidth="3"/></svg>
    case "intercooler":
      return <svg {...common}><rect x="23" y="30" width="82" height="40" rx="6" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M32 39h64M32 48h64M32 57h64M32 66h64" stroke="#fef3c7" strokeWidth="3"/><path d="M14 50h9M105 50h9" stroke={stroke} strokeWidth="8" strokeLinecap="round"/></svg>
    case "fuel":
      return <svg {...common}><path d="M37 20h42l10 16v42H27V36z" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M44 35h28M44 48h28" stroke="#fef3c7" strokeWidth="4"/><path d="M89 42c15 0 15 20 1 20" stroke={stroke} strokeWidth="5" fill="none"/><circle cx="82" cy="20" r="5" fill="#facc15"/></svg>
    case "supercharger":
      return <svg {...common}><rect x="21" y="35" width="86" height="33" rx="9" fill={soft} stroke={stroke} strokeWidth="4"/><circle cx="46" cy="51" r="11" fill="#020617" stroke="#fef3c7" strokeWidth="4"/><circle cx="82" cy="51" r="11" fill="#020617" stroke="#fef3c7" strokeWidth="4"/><path d="M38 24h52" stroke={stroke} strokeWidth="8" strokeLinecap="round"/></svg>
    case "catback":
      return <svg {...common}><path d="M17 50h45c14 0 17 13 32 13h13" stroke={stroke} strokeWidth="9" fill="none" strokeLinecap="round"/><ellipse cx="105" cy="63" rx="14" ry="9" fill="#020617" stroke="#fb923c" strokeWidth="4"/><path d="M25 37h25" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round"/></svg>
    case "downpipe":
      return <svg {...common}><path d="M38 19c36 7 44 31 35 57" stroke={stroke} strokeWidth="12" fill="none" strokeLinecap="round"/><path d="M37 19h31M64 76h30" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round"/><circle cx="38" cy="19" r="7" fill="#fb923c"/></svg>
    case "manifold":
      return <svg {...common}><path d="M29 28h70" stroke={stroke} strokeWidth="9" strokeLinecap="round"/><path d="M37 31v31M55 31v31M73 31v31M91 31v31" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round"/><path d="M33 64h64" stroke={stroke} strokeWidth="8" strokeLinecap="round"/></svg>
    case "exhaust-tip":
      return <svg {...common}><ellipse cx="45" cy="48" rx="20" ry="14" fill="#020617" stroke={stroke} strokeWidth="5"/><ellipse cx="84" cy="48" rx="20" ry="14" fill="#020617" stroke="#fb923c" strokeWidth="5"/><path d="M45 62h39" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round"/></svg>
    case "valve":
      return <svg {...common}><circle cx="64" cy="46" r="27" fill={soft} stroke={stroke} strokeWidth="5"/><path d="M43 46h42M64 25v42" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round"/><path d="M48 30 80 62M80 30 48 62" stroke="#fb923c" strokeWidth="4"/></svg>
    case "muffler":
      return <svg {...common}><rect x="29" y="32" width="70" height="32" rx="16" fill={soft} stroke={stroke} strokeWidth="5"/><path d="M14 48h15M99 48h15" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round"/><path d="M45 41h38M45 55h38" stroke="#fb923c" strokeWidth="3"/></svg>
    case "coilover":
      return <svg {...common}><path d="M45 16v60M83 16v60" stroke={stroke} strokeWidth="7" strokeLinecap="round"/><path d="M45 22c22 5-22 10 0 15s-22 10 0 15  -22 10 0 15M83 22c22 5-22 10 0 15s-22 10 0 15-22 10 0 15" stroke="#bbf7d0" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
    case "spring":
      return <svg {...common}><path d="M64 16c36 7-36 14 0 21s-36 14 0 21-36 14 0 21" stroke={stroke} strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M39 16h50M39 79h50" stroke="#bbf7d0" strokeWidth="4"/></svg>
    case "stabilizer":
      return <svg {...common}><path d="M20 59c18-32 70-32 88 0" stroke={stroke} strokeWidth="8" fill="none" strokeLinecap="round"/><circle cx="27" cy="59" r="10" fill={soft} stroke="#bbf7d0" strokeWidth="4"/><circle cx="101" cy="59" r="10" fill={soft} stroke="#bbf7d0" strokeWidth="4"/></svg>
    case "camber":
      return <svg {...common}><path d="M42 22 30 74M86 22l12 52" stroke={stroke} strokeWidth="9" strokeLinecap="round"/><path d="M28 74h28M72 74h28" stroke="#bbf7d0" strokeWidth="5" strokeLinecap="round"/><path d="M47 27h34" stroke="#e2e8f0" strokeWidth="4"/></svg>
    case "chassis":
      return <svg {...common}><path d="M18 66h92M28 46h72M38 26h52" stroke={stroke} strokeWidth="7" strokeLinecap="round"/><path d="M28 66 90 26M100 66 38 26" stroke="#bbf7d0" strokeWidth="4" strokeLinecap="round"/></svg>
    case "air-suspension":
      return <svg {...common}><rect x="31" y="25" width="66" height="42" rx="20" fill={soft} stroke={stroke} strokeWidth="5"/><path d="M42 36h44M42 48h44M42 60h44" stroke="#bbf7d0" strokeWidth="4"/><path d="M19 70h90" stroke={stroke} strokeWidth="5" strokeLinecap="round"/></svg>
    case "big-brake":
      return <svg {...common}>{wheelBase}<path d="M78 24c16 10 19 34 3 49" stroke="#ef4444" strokeWidth="12" strokeLinecap="round"/></svg>
    case "brake-pad":
      return <svg {...common}><path d="M39 20h50v52H39z" fill={soft} stroke={stroke} strokeWidth="5"/><path d="M49 33h30M49 46h30M49 59h30" stroke="#fecaca" strokeWidth="4"/><path d="M89 26c12 11 12 29 0 40" stroke="#ef4444" strokeWidth="6" fill="none"/></svg>
    case "brake-disc":
      return <svg {...common}>{wheelBase}<path d="M64 19v54M37 46h54M45 27l38 38M83 27 45 65" stroke="#cbd5e1" strokeWidth="3"/></svg>
    case "brake-line":
      return <svg {...common}><path d="M22 66c14-42 53-56 84-30" stroke={stroke} strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M31 58c13-23 41-37 66-19" stroke="#fecaca" strokeWidth="4" fill="none" strokeLinecap="round"/><circle cx="22" cy="66" r="7" fill="#ef4444"/><circle cx="106" cy="36" r="7" fill="#ef4444"/></svg>
    case "caliper":
      return <svg {...common}><circle cx="64" cy="46" r="28" fill="#020617" stroke="#64748b" strokeWidth="6"/><path d="M83 24c13 13 13 31 0 44" stroke={stroke} strokeWidth="14" strokeLinecap="round"/><circle cx="64" cy="46" r="7" fill="#e2e8f0"/></svg>
    case "brake-fluid":
      return <svg {...common}><path d="M64 15c22 27 30 40 30 53 0 13-12 20-30 20s-30-7-30-20c0-13 8-26 30-53z" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M49 61c10 8 21 8 31 0" stroke="#fecaca" strokeWidth="4" strokeLinecap="round"/></svg>
    case "wheel-18":
    case "wheel-19":
    case "wheel-20":
      return <svg {...common}>{wheelBase}<path d="M64 19v54M37 46h54M45 27l38 38M83 27 45 65" stroke="#e9d5ff" strokeWidth={icon === "wheel-20" ? "5" : "3"}/><text x="64" y="87" textAnchor="middle" fill={stroke} fontSize="13" fontWeight="900">{icon === "wheel-18" ? "18" : icon === "wheel-19" ? "19" : "20+"}</text></svg>
    case "tire":
      return <svg {...common}><circle cx="64" cy="46" r="31" fill="#020617" stroke={stroke} strokeWidth="8"/><circle cx="64" cy="46" r="18" fill={soft} stroke="#e9d5ff" strokeWidth="4"/><path d="M37 29 28 21M91 29l9-8M37 63l-9 8M91 63l9 8" stroke="#cbd5e1" strokeWidth="4"/></svg>
    case "spacer":
      return <svg {...common}><circle cx="50" cy="46" r="24" fill={soft} stroke={stroke} strokeWidth="5"/><circle cx="78" cy="46" r="24" fill="none" stroke="#e9d5ff" strokeWidth="5"/><path d="M50 46h28" stroke="#c084fc" strokeWidth="8" strokeLinecap="round"/></svg>
    case "tpms":
      return <svg {...common}><circle cx="64" cy="46" r="28" fill={soft} stroke={stroke} strokeWidth="5"/><path d="M47 48c10-11 24-11 34 0M54 57c6-5 14-5 20 0" stroke="#e9d5ff" strokeWidth="4" fill="none" strokeLinecap="round"/><circle cx="64" cy="66" r="4" fill="#c084fc"/></svg>
    case "seat":
      return <svg {...common}><path d="M46 16h34l6 36H53z" fill={soft} stroke={stroke} strokeWidth="4"/><path d="M45 52h47v23H36z" fill="#020617" stroke={stroke} strokeWidth="4"/><path d="M52 30h25M51 43h29" stroke="#fce7f3" strokeWidth="4"/></svg>
    case "steering":
      return <svg {...common}><circle cx="64" cy="46" r="30" fill={soft} stroke={stroke} strokeWidth="5"/><circle cx="64" cy="46" r="7" fill="#fce7f3"/><path d="M64 53v20M57 45 36 36M71 45l21-9" stroke="#f9a8d4" strokeWidth="5" strokeLinecap="round"/></svg>
    case "pedals":
      return <svg {...common}><rect x="30" y="25" width="20" height="46" rx="6" fill={soft} stroke={stroke} strokeWidth="4"/><rect x="59" y="18" width="20" height="53" rx="6" fill={soft} stroke={stroke} strokeWidth="4"/><rect x="88" y="34" width="18" height="37" rx="6" fill={soft} stroke={stroke} strokeWidth="4"/></svg>
    case "gauge":
      return <svg {...common}><path d="M29 66a35 35 0 1 1 70 0" fill={soft} stroke={stroke} strokeWidth="5"/><path d="M64 66 84 42" stroke="#fce7f3" strokeWidth="5" strokeLinecap="round"/><path d="M39 59h8M81 59h8M64 34v8" stroke="#f9a8d4" strokeWidth="4" strokeLinecap="round"/></svg>
    case "audio":
      return <svg {...common}><rect x="28" y="21" width="72" height="53" rx="8" fill={soft} stroke={stroke} strokeWidth="4"/><circle cx="48" cy="48" r="14" fill="#020617" stroke="#fce7f3" strokeWidth="4"/><circle cx="80" cy="48" r="14" fill="#020617" stroke="#f9a8d4" strokeWidth="4"/><path d="M40 22c6-9 43-9 49 0" stroke={stroke} strokeWidth="4"/></svg>
    case "roll-cage":
      return <svg {...common}><path d="M25 75V28c0-10 10-16 22-16h34c12 0 22 6 22 16v47" fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round"/><path d="M28 33h72M33 75l62-63M95 75 33 12" stroke="#fce7f3" strokeWidth="4" strokeLinecap="round"/></svg>
    default:
      return <svg {...common}><path d="M17 58c9-24 27-34 51-34h9c17 1 29 13 35 34" fill={soft} stroke={stroke} strokeWidth="4"/><circle cx="39" cy="65" r="12" fill="#020617" stroke={stroke} strokeWidth="5"/><circle cx="91" cy="65" r="12" fill="#020617" stroke={stroke} strokeWidth="5"/></svg>
  }
}

function BeforeAfterIconCard({ item, categoryKey, selected = false }: { item: ModItem; categoryKey: CategoryKey; selected?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${selected ? "border-cyan-300/80 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.18)]" : "border-white/10 bg-[#071116]"}`}>
      <div className="grid grid-cols-2">
        <div className="relative grid h-24 place-items-center overflow-hidden border-r border-white/10 bg-[#060d12]">
          <PartIcon icon={item.icon} categoryKey={categoryKey} />
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">Stok</span>
        </div>
        <div className="relative grid h-24 place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(34,211,238,.16),transparent_55%)]">
          <PartIcon icon={item.icon} categoryKey={categoryKey} selected />
          <span className="absolute right-2 top-2 rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-black text-[#041016]">Modifiyeli</span>
        </div>
      </div>
      <div className="absolute left-1/2 top-[49px] grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-black/80 text-[10px] font-black text-cyan-200 shadow-xl backdrop-blur">VS</div>
      <div className="border-t border-white/10 px-3 py-2">
        <p className="truncate text-xs font-black text-white">{item.name}</p>
        <p className="truncate text-[11px] text-slate-400">SVG stok / modifiyeli karşılaştırma</p>
      </div>
    </div>
  )
}

function GenericSportCar3D({ selectedIds, viewMode, autoRotate, bodyColor }: { selectedIds: Set<string>; viewMode: ViewMode; autoRotate: boolean; bodyColor: string }) {
  const has = (ids: string[]) => ids.some((id) => selectedIds.has(id))
  const wrap = has(["film-kaplama"])
  const spoiler = has(["spoiler"])
  const lip = has(["body-kit", "on-lip"])
  const diffuser = has(["difuzor"])
  const headlights = has(["far"])
  const carbon = has(["karbon-kapot"])
  const wheels = has(["jant18", "jant19", "jant20", "lastik", "spacer"])
  const bigWheels = has(["jant20"])
  const brakes = has(["big-brake", "balata", "disk", "hortum", "kaliper", "fren-sivi"])
  const engine = has(["ecu", "turbo", "intake", "intercooler", "yakit", "supercharger"])
  const exhaust = has(["catback", "downpipe", "manifold", "egzoz-ucu", "valf", "susturucu"])
  const lowered = has(["coilover", "spor-yay", "havalı", "stabilizator", "camber", "alt-kasa"])
  const interior = has(["koltuk", "direksiyon", "pedal", "gosterge", "ses", "roll-cage"])

  const rotationClass: Record<ViewMode, string> = {
    ucBoyut: "[transform:rotateX(12deg)_rotateY(-22deg)_rotateZ(-1deg)]",
    on: "[transform:rotateX(7deg)_rotateY(0deg)]",
    yan: "[transform:rotateX(9deg)_rotateY(-38deg)]",
    arka: "[transform:rotateX(8deg)_rotateY(162deg)]",
  }

  const bodyGradient = wrap
    ? "linear-gradient(110deg,#0ea5e9,#22d3ee 45%,#312e81)"
    : bodyColor

  return (
    <div className="relative h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#04090d] [perspective:1200px]">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0_92%,rgba(255,255,255,.055)_92%),linear-gradient(90deg,transparent_0_92%,rgba(255,255,255,.045)_92%)] bg-[size:46px_46px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(14,165,233,.24),transparent_42%)]" />
      <div className="absolute bottom-10 left-1/2 h-24 w-[76%] -translate-x-1/2 rounded-[100%] bg-black/75 blur-2xl" />

      <div className={`absolute left-1/2 top-[54%] h-[235px] w-[80%] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 [transform-style:preserve-3d] ${rotationClass[viewMode]} ${autoRotate ? "animate-[showroomRotate_9s_ease-in-out_infinite]" : ""} ${lowered ? "translate-y-4 scale-y-[0.94]" : ""}`}>
        <div className="absolute left-[18%] right-[18%] top-[36px] h-[72px] rounded-t-[5rem] border border-white/20 shadow-2xl" style={{ background: bodyGradient, transform: "translateZ(50px)" }} />
        <div className="absolute left-[34%] right-[34%] top-[49px] h-[52px] rounded-t-[4rem] bg-black/55 ring-1 ring-white/15 backdrop-blur" style={{ transform: "translateZ(74px)" }} />
        <div className="absolute bottom-[52px] left-0 right-0 h-[100px] rounded-[4.5rem] border border-white/15 shadow-[inset_0_0_38px_rgba(255,255,255,0.12),0_30px_60px_rgba(0,0,0,.55)]" style={{ background: bodyGradient, transform: "translateZ(36px)" }} />
        <div className="absolute bottom-[80px] left-[8%] right-[8%] h-[38px] rounded-full bg-white/7" style={{ transform: "translateZ(58px)" }} />

        {carbon && <div className="absolute left-[38%] top-[116px] z-20 h-12 w-44 -translate-x-1/2 skew-x-[-15deg] rounded-2xl bg-[repeating-linear-gradient(45deg,#020617_0,#020617_6px,#1e293b_6px,#1e293b_12px)] ring-1 ring-cyan-300/25" style={{ transform: "translateZ(84px)" }} />}
        {engine && <div className="absolute left-[38%] top-[128px] z-30 h-2 w-40 -translate-x-1/2 rounded-full bg-yellow-300 shadow-[0_0_34px_rgba(250,204,21,0.95)]" style={{ transform: "translateZ(94px)" }} />}
        {headlights && <><div className="absolute left-[6%] top-[128px] z-40 h-5 w-20 rounded-full bg-cyan-200 shadow-[0_0_34px_rgba(125,211,252,0.95)]"/><div className="absolute right-[6%] top-[128px] z-40 h-5 w-20 rounded-full bg-cyan-200 shadow-[0_0_34px_rgba(125,211,252,0.95)]"/></>}
        {lip && <div className="absolute bottom-[45px] left-8 right-8 z-40 h-6 rounded-full bg-cyan-400/90 shadow-[0_0_24px_rgba(34,211,238,0.65)]" />}
        {spoiler && <div className="absolute -right-8 top-[55px] z-40 h-4 w-44 rotate-[-8deg] rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(103,232,249,0.75)]" />}
        {diffuser && <div className="absolute bottom-[38px] right-20 z-40 h-10 w-32 skew-x-[-18deg] rounded-xl bg-black/90 ring-1 ring-cyan-300/40" />}
        {exhaust && <div className="absolute bottom-[47px] right-3 z-50 flex gap-2"><span className="h-5 w-10 rounded-full border-2 border-orange-300 bg-black shadow-[0_0_20px_rgba(251,146,60,0.85)]"/><span className="h-5 w-10 rounded-full border-2 border-orange-300 bg-black shadow-[0_0_20px_rgba(251,146,60,0.85)]"/></div>}
        {interior && <div className="absolute left-[42%] top-[65px] z-50 h-6 w-24 -translate-x-1/2 rounded-full bg-pink-300/80 shadow-[0_0_24px_rgba(249,168,212,0.8)]" />}

        <div className={`absolute bottom-0 left-[12%] z-50 grid h-[92px] w-[92px] place-items-center rounded-full border-[11px] ${wheels ? "border-cyan-300" : "border-slate-600"} bg-black shadow-2xl transition-all ${bigWheels ? "scale-110" : has(["jant19"]) ? "scale-105" : ""}`}>
          <span className="absolute inset-4 rounded-full border-2 border-white/30" />
          <span className="h-9 w-9 rounded-full bg-slate-300" />
          {brakes && <span className="absolute right-4 top-8 h-10 w-3 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.95)]" />}
        </div>
        <div className={`absolute bottom-0 right-[12%] z-50 grid h-[92px] w-[92px] place-items-center rounded-full border-[11px] ${wheels ? "border-cyan-300" : "border-slate-600"} bg-black shadow-2xl transition-all ${bigWheels ? "scale-110" : has(["jant19"]) ? "scale-105" : ""}`}>
          <span className="absolute inset-4 rounded-full border-2 border-white/30" />
          <span className="h-9 w-9 rounded-full bg-slate-300" />
          {brakes && <span className="absolute left-4 top-8 h-10 w-3 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.95)]" />}
        </div>
      </div>

      <style jsx global>{`
        @keyframes showroomRotate {
          0%, 100% { transform: rotateX(12deg) rotateY(-25deg) rotateZ(-1deg); }
          50% { transform: rotateX(10deg) rotateY(25deg) rotateZ(1deg); }
        }
      `}</style>
    </div>
  )
}

function Vehicle3DPreview({ selectedIds, vehicleName, totalPrice, count }: { selectedIds: Set<string>; vehicleName: string; totalPrice: number; count: number }) {
  const [viewMode, setViewMode] = useState<ViewMode>("ucBoyut")
  const [autoRotate, setAutoRotate] = useState(true)
  const [bodyColor, setBodyColor] = useState("linear-gradient(110deg,#0f172a,#64748b 48%,#020617)")
  const viewButtons: { key: ViewMode; label: string }[] = [
    { key: "ucBoyut", label: "3B" },
    { key: "on", label: "Ön" },
    { key: "yan", label: "Yan" },
    { key: "arka", label: "Arka" },
  ]
  const colors = [
    { name: "Grafit", value: "linear-gradient(110deg,#0f172a,#64748b 48%,#020617)" },
    { name: "Gece Mavisi", value: "linear-gradient(110deg,#0f172a,#0ea5e9 48%,#172554)" },
    { name: "Kırmızı", value: "linear-gradient(110deg,#450a0a,#ef4444 48%,#111827)" },
    { name: "Mor", value: "linear-gradient(110deg,#2e1065,#a855f7 48%,#020617)" },
  ]

  return (
    <div className="mb-5 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_15%,rgba(56,189,248,0.18),transparent_34%),linear-gradient(145deg,#101d24,#060b10)] shadow-2xl shadow-black/30">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Canlı CSS/3D Build Önizleyici</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white">{vehicleName || "Jenerik Spor Coupe"}</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-200">{count} parça seçili</span>
          </div>

          <GenericSportCar3D selectedIds={selectedIds} viewMode={viewMode} autoRotate={autoRotate} bodyColor={bodyColor} />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur">
            <div className="flex flex-wrap gap-2">
              {viewButtons.map((button) => (
                <button key={button.key} onClick={() => setViewMode(button.key)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${viewMode === button.key ? "bg-cyan-400 text-[#041016]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>{button.label}</button>
              ))}
              <button onClick={() => setAutoRotate((value) => !value)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${autoRotate ? "bg-cyan-400 text-[#041016]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}><RotateCw className="h-4 w-4" /> Döndür</button>
            </div>
            <strong className="text-cyan-300">{formatPrice(totalPrice)}</strong>
          </div>
        </div>

        <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Araç rengi</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {colors.map((color) => (
              <button key={color.name} onClick={() => setBodyColor(color.value)} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-cyan-300/50">
                <span className="block h-9 rounded-xl border border-white/10" style={{ background: color.value }} />
                <span className="mt-2 block text-xs font-bold text-slate-200">{color.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <p className="text-sm font-bold text-cyan-200">Görsel sistemi</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Bu model fotoğraf değil; CSS katmanları ve gömülü SVG ikonlarla oluşturulmuş marka bağımsız, hafif ve telifsiz bir canlı önizleyicidir.</p>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-bold text-white">Gerçek zamanlı değişenler</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Renk kaplama, spoiler, ön lip, difüzör, jant tipi, alçaltma, egzoz ucu, far efekti, fren kaliperi ve iç mekan vurguları seçime göre görünür.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function ModificationBuilderPage() {
  const [vehicleQuery, setVehicleQuery] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("Jenerik Spor Coupe")
  const [customVehicle, setCustomVehicle] = useState("")
  const [showCustomVehicle, setShowCustomVehicle] = useState(false)
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("dis")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [selections, setSelections] = useState<Record<string, Selection>>({})
  const [showSummary, setShowSummary] = useState(true)
  const [laborIncluded, setLaborIncluded] = useState(true)
  const [savedMessage, setSavedMessage] = useState("")

  const filteredVehicles = useMemo(() => {
    const query = vehicleQuery.trim().toLocaleLowerCase("tr-TR")
    if (!query) return vehicles.slice(0, 6)
    return vehicles.filter((vehicle) => vehicle.toLocaleLowerCase("tr-TR").includes(query)).slice(0, 8)
  }, [vehicleQuery])

  const currentCategory = categories.find((category) => category.key === activeCategory) ?? categories[0]
  const selectionList = Object.values(selections)
  const totalPrice = selectionList.reduce((sum, item) => sum + item.price, 0)
  const laborPrice = laborIncluded ? Math.round(totalPrice * 0.18) : 0
  const finalTotal = totalPrice + laborPrice
  const estimatedHorsePower = useMemo(() => {
    let hp = 0
    if (selections.ecu) hp += selections.ecu.level === "Premium" ? 75 : selections.ecu.level === "Sport" ? 45 : 25
    if (selections.turbo) hp += selections.turbo.level === "Premium" ? 180 : selections.turbo.level === "Sport" ? 110 : 65
    if (selections.intake) hp += selections.intake.level === "Premium" ? 18 : selections.intake.level === "Sport" ? 12 : 7
    if (selections.intercooler) hp += selections.intercooler.level === "Premium" ? 35 : selections.intercooler.level === "Sport" ? 22 : 12
    if (selections.catback) hp += selections.catback.level === "Premium" ? 20 : selections.catback.level === "Sport" ? 14 : 8
    return hp
  }, [selections])
  const estimatedTorque = Math.round(estimatedHorsePower * 1.35)
  const lowering = selections.coilover || selections["spor-yay"] || selections["havalı"] ? (selections["havalı"] ? "0-70 mm" : selections.coilover ? "20-45 mm" : "20-30 mm") : "Stok yükseklik"
  const selectedIds = useMemo(() => new Set(Object.keys(selections)), [selections])

  const chooseLevel = (category: Category, item: ModItem, level: Level) => {
    setSelections((current) => ({
      ...current,
      [item.id]: {
        category: category.name,
        itemName: item.name,
        level,
        price: item.prices[level],
      },
    }))
  }

  const removeSelection = (id: string) => {
    setSelections((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
  }

  const finalizeCustomVehicle = () => {
    const value = customVehicle.trim()
    if (!value) return
    setSelectedVehicle(value)
    setVehicleQuery(value)
    setShowCustomVehicle(false)
  }

  const findItemById = (id: string) => {
    for (const category of categories) {
      const item = category.items.find((candidate) => candidate.id === id)
      if (item) return { category, item }
    }
    return null
  }

  const applyPreset = (preset: typeof presetBuilds[number]) => {
    const next: Record<string, Selection> = {}
    Object.entries(preset.ids).forEach(([id, level]) => {
      const found = findItemById(id)
      if (!found) return
      next[id] = {
        category: found.category.name,
        itemName: found.item.name,
        level,
        price: found.item.prices[level],
      }
    })
    setSelections(next)
    setSavedMessage(`${preset.name} uygulandı.`)
  }

  const saveBuild = () => {
    const build = {
      vehicle: selectedVehicle || customVehicle || "Jenerik Spor Coupe",
      selections,
      total: finalTotal,
      laborIncluded,
      date: new Date().toLocaleString("tr-TR"),
    }
    try {
      const current = JSON.parse(localStorage.getItem("araba-tutkunlari-builds") || "[]")
      localStorage.setItem("araba-tutkunlari-builds", JSON.stringify([build, ...current].slice(0, 10)))
      setSavedMessage("Yapılandırma tarayıcıya kaydedildi.")
    } catch {
      setSavedMessage("Yapılandırma kaydedilemedi. Tarayıcı depolama iznini kontrol edin.")
    }
  }

  return (
    <div className="min-h-screen bg-[#081116] text-white print:bg-white print:text-black">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(11,149,218,0.22),transparent_38%),linear-gradient(135deg,#101c22,#081116)] print:hidden">
        <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
            <a href="/" className="transition hover:text-white">Ana Sayfa</a>
            <ChevronDown className="h-3 w-3 -rotate-90" />
            <span className="text-slate-200">Modifikasyon Yapılandırıcı</span>
          </div>
          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                <Sparkles className="h-4 w-4" /> Araç Modifikasyon Yapılandırıcı
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Build Configurator</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Aracınızı seçin, kategorilere göre modifikasyon kalemleri arasından tercih yapın. Seçimleriniz canlı 3B araç önizleyiciye ve toplam maliyete anında yansır.
              </p>
            </div>

            <div className="grid min-w-full grid-cols-2 gap-3 sm:min-w-[430px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Seçilen Kalem</p>
                <p className="mt-2 text-2xl font-black">{selectionList.length}</p>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Toplam maliyet</p>
                <p className="mt-2 text-2xl font-black text-cyan-300">{formatPrice(finalTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 print:max-w-none print:p-0">
        <section className="mb-6 rounded-3xl border border-white/10 bg-[#111d23] p-5 shadow-2xl print:hidden">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="relative">
              <label className="mb-2 block text-sm font-semibold text-slate-200">Araç seçimi</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  value={vehicleQuery}
                  onChange={(event) => {
                    setVehicleQuery(event.target.value)
                    setSelectedVehicle("")
                  }}
                  placeholder="Marka / model yazın (örn. BMW M4, Porsche 911)"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-[#091318] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/70 focus:ring-4 focus:ring-cyan-400/10"
                />
              </div>
              {!selectedVehicle && (
                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c171c] p-2 shadow-2xl">
                  {filteredVehicles.map((vehicle) => (
                    <button
                      key={vehicle}
                      onClick={() => {
                        setSelectedVehicle(vehicle)
                        setVehicleQuery(vehicle)
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      <CarFront className="h-4 w-4" /> {vehicle}
                    </button>
                  ))}
                  {filteredVehicles.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">Eşleşen hazır araç bulunamadı.</p>}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowCustomVehicle(true)}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              <Plus className="h-5 w-5" /> Kendi aracını tanımla
            </button>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {presetBuilds.map((preset) => (
              <button key={preset.name} onClick={() => applyPreset(preset)} className="rounded-2xl border border-white/10 bg-[#091318] p-4 text-left transition hover:border-cyan-400/50 hover:bg-cyan-400/10">
                <div className="flex items-center gap-2 text-cyan-300"><PackageCheck className="h-5 w-5" /><span className="font-black">{preset.name}</span></div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{preset.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center gap-2 text-slate-400"><Zap className="h-4 w-4" /><span className="text-xs uppercase tracking-[0.18em]">Güç artışı</span></div>
              <p className="mt-2 text-2xl font-black text-white">+{estimatedHorsePower} HP</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center gap-2 text-slate-400"><Gauge className="h-4 w-4" /><span className="text-xs uppercase tracking-[0.18em]">Tork artışı</span></div>
              <p className="mt-2 text-2xl font-black text-white">+{estimatedTorque} Nm</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex items-center gap-2 text-slate-400"><Wrench className="h-4 w-4" /><span className="text-xs uppercase tracking-[0.18em]">Sürüş yüksekliği</span></div>
              <p className="mt-2 text-2xl font-black text-white">{lowering}</p>
            </div>
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">İşçilik</span>
                <span className="mt-2 block font-black text-white">{laborIncluded ? "Dahil" : "Hariç"}</span>
              </span>
              <input type="checkbox" checked={laborIncluded} onChange={(event) => setLaborIncluded(event.target.checked)} className="h-5 w-5 accent-cyan-400" />
            </label>
          </div>
          {savedMessage && <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300">{savedMessage}</p>}
        </section>

        <Vehicle3DPreview
          selectedIds={selectedIds}
          vehicleName={selectedVehicle || customVehicle}
          totalPrice={finalTotal}
          count={selectionList.length}
        />

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_360px] print:block">
          <aside className="h-fit rounded-3xl border border-white/10 bg-[#111d23] p-3 xl:sticky xl:top-6 print:hidden">
            <div className="px-3 pb-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Kategoriler</p>
            </div>
            <nav className="space-y-1.5">
              {categories.map((category) => {
                const count = Object.entries(selections).filter(([id]) => category.items.some((item) => item.id === id)).length
                const isActive = activeCategory === category.key
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${isActive ? category.accent : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white"}`}
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold"><span>{category.emoji}</span>{category.name}</span>
                    {count > 0 && <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{count}</span>}
                  </button>
                )
              })}
            </nav>
          </aside>

          <section className="min-w-0 print:hidden">
            <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/10 bg-[#111d23] px-5 py-4">
              <div>
                <p className="text-sm text-slate-500">Aktif kategori</p>
                <h2 className="mt-1 text-2xl font-black">{currentCategory.emoji} {currentCategory.name}</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-400">{currentCategory.items.length} seçenek</span>
            </div>

            <div className="space-y-3">
              {currentCategory.items.map((item) => {
                const isOpen = openItems[item.id]
                const selected = selections[item.id]
                return (
                  <article key={item.id} className={`overflow-hidden rounded-3xl border bg-[#111d23] transition ${selected ? "border-cyan-400/40 shadow-[0_0_30px_rgba(11,149,218,0.08)]" : "border-white/10"}`}>
                    <button
                      onClick={() => setOpenItems((current) => ({ ...current, [item.id]: !current[item.id] }))}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="w-72 max-w-full shrink-0"><BeforeAfterIconCard item={item} categoryKey={currentCategory.key} selected={Boolean(selected)} /></div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white">{item.name}</h3>
                          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        {selected && <span className="hidden rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 sm:block">{selected.level} · {formatPrice(selected.price)}</span>}
                        <ChevronDown className={`h-5 w-5 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/10 p-5">
                        <div className="mb-4 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-center">
                          <div className="rounded-3xl border border-white/10 bg-[#071116] p-3">
                            <BeforeAfterIconCard item={item} categoryKey={currentCategory.key} selected={Boolean(selected)} />
                          </div>
                          <div>
                            <p className="text-sm leading-6 text-slate-400">{item.description}. Görsel, projeye gömülü özel SVG çizimle gösterilir; fotoğraf kullanılmaz.</p>
                            <p className="mt-2 text-xs leading-5 text-slate-500">Seviye seçildiğinde parça hem canlı 3B araç önizlemesine hem de yapılandırma özetine eklenir.</p>
                          </div>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                          {(Object.keys(item.prices) as Level[]).map((level) => {
                            const isSelected = selected?.level === level
                            return (
                              <button
                                key={level}
                                onClick={() => chooseLevel(currentCategory, item, level)}
                                className={`rounded-2xl border p-4 text-left transition ${isSelected ? "border-cyan-400 bg-cyan-400/10 ring-4 ring-cyan-400/10" : "border-white/10 bg-[#091318] hover:border-white/25"}`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span className={`font-bold ${isSelected ? "text-cyan-300" : "text-white"}`}>{level}</span>
                                  {isSelected && <ListChecks className="h-5 w-5 text-cyan-300" />}
                                </div>
                                <p className="mt-3 text-xl font-black">{formatPrice(item.prices[level])}</p>
                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                  {level === "Standart" && "Günlük kullanım ve bütçe odaklı çözüm."}
                                  {level === "Sport" && "Performans ve görünüm dengeli yükseltme."}
                                  {level === "Premium" && "Üst segment malzeme, marka ve işçilik."}
                                </p>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-white/10 bg-[#111d23] p-5 xl:sticky xl:top-6 print:border-0 print:bg-white print:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Build Özeti</p>
                <h2 className="mt-2 text-xl font-black print:text-black">{selectedVehicle || customVehicle || "Araç seçilmedi"}</h2>
              </div>
              <button onClick={() => setShowSummary(!showSummary)} className="rounded-xl border border-white/10 p-2 text-slate-400 xl:hidden print:hidden">
                <ChevronDown className={`h-5 w-5 transition ${showSummary ? "rotate-180" : ""}`} />
              </button>
            </div>

            {showSummary && (
              <>
                <div className="my-5 h-px bg-white/10 print:bg-slate-200" />
                {selectionList.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/15 p-6 text-center print:border-slate-300">
                    <ShoppingCart className="mx-auto h-9 w-9 text-slate-600" />
                    <p className="mt-3 font-semibold text-slate-300 print:text-slate-700">Henüz seçim yapılmadı</p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">Bir kategori ve modifikasyon seviyesi seçerek yapılandırmanı başlat.</p>
                  </div>
                ) : (
                  <div className="max-h-[52vh] space-y-2 overflow-y-auto pr-1 print:max-h-none print:overflow-visible">
                    {Object.entries(selections).map(([id, item]) => (
                      <div key={id} className="group rounded-2xl border border-white/10 bg-[#091318] p-3 print:border-slate-200 print:bg-white">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs text-slate-500">{item.category}</p>
                            <p className="mt-1 text-sm font-bold print:text-black">{item.itemName}</p>
                            <p className="mt-1 text-xs font-semibold text-cyan-300 print:text-slate-600">{item.level}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black print:text-black">{formatPrice(item.price)}</p>
                            <button onClick={() => removeSelection(id)} className="mt-2 rounded-lg p-1.5 text-slate-600 opacity-100 transition hover:bg-red-500/10 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100 print:hidden" aria-label={`${item.itemName} seçimini kaldır`}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 print:border-slate-300 print:bg-slate-50">
                  <div className="flex items-center justify-between text-sm text-slate-400 print:text-slate-600">
                    <span>Toplam kalem</span><span>{selectionList.length}</span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-400 print:text-slate-600">
                    <div className="flex justify-between"><span>Parça toplamı</span><span>{formatPrice(totalPrice)}</span></div>
                    <div className="flex justify-between"><span>Tahmini işçilik</span><span>{laborIncluded ? formatPrice(laborPrice) : "Hariç"}</span></div>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3 border-t border-cyan-400/20 pt-3">
                    <div className="flex items-center gap-2 text-cyan-300 print:text-black"><CircleDollarSign className="h-5 w-5" /><span className="font-bold">Genel toplam</span></div>
                    <strong className="text-2xl text-cyan-300 print:text-black">{formatPrice(finalTotal)}</strong>
                  </div>
                </div>

                <button
                  onClick={saveBuild}
                  disabled={selectionList.length === 0}
                  className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] font-black text-white transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-40 print:hidden"
                >
                  <Save className="h-5 w-5" /> Yapılandırmayı kaydet
                </button>

                <button
                  onClick={() => window.print()}
                  disabled={selectionList.length === 0}
                  className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 font-black text-[#061015] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40 print:hidden"
                >
                  <Printer className="h-5 w-5" /> Yapılandırma özetini yazdır
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-600 print:mt-8 print:text-left">Fiyatlar 2026 Türkiye piyasası için yaklaşık modifiye parça + işçilik aralıklarına göre hazırlanmıştır; araç modeli, marka, kur ve servis kalitesine göre değişebilir.</p>
              </>
            )}
          </aside>
        </div>
      </main>

      {showCustomVehicle && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm print:hidden">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111d23] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300">Özel araç</p>
                <h2 className="mt-1 text-2xl font-black">Aracını tanımla</h2>
              </div>
              <button onClick={() => setShowCustomVehicle(false)} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <label className="mt-6 block text-sm font-semibold text-slate-300">Marka, model ve yıl</label>
            <input
              autoFocus
              value={customVehicle}
              onChange={(event) => setCustomVehicle(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && finalizeCustomVehicle()}
              placeholder="Örn. 2018 Volkswagen Golf GTI"
              className="mt-2 h-13 w-full rounded-2xl border border-white/10 bg-[#091318] px-4 text-white outline-none focus:border-cyan-400"
            />
            <button onClick={finalizeCustomVehicle} className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 font-black text-[#061015] hover:bg-cyan-400">
              <Gauge className="h-5 w-5" /> Aracı kullan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
