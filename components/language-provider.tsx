'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Language = 'tr' | 'en'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  t: (tr: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const exactDictionary: Record<string, string> = {
  'Araba Tutkunları': 'Car Enthusiasts',
  'Ana Sayfa': 'Home',
  'Modifiye Stüdyosu': 'Modification Studio',
  'Haberler': 'News',
  'İncelemeler': 'Reviews',
  'Karşılaştırmalar': 'Comparisons',
  'Tartışmalar': 'Discussions',
  'Hakkımızda': 'About Us',

  'Karşılaştırma': 'Comparison',
  '2024 BMW M5 mi yoksa Mercedes AMG E63 mi?': '2024 BMW M5 or Mercedes AMG E63?',
  'Yeni nesil BMW M5 ve Mercedes AMG E63 arasında kaldım. Günlük kullanım ve performans açısından hangisini önerirsiniz? Özellikle yakıt tüketimi ve bakım maliyetleri konusunda deneyimlerinizi paylaşır mısınız?': 'I am deciding between the new BMW M5 and Mercedes-AMG E63. Which one would you recommend for daily use and performance? Could you share your experiences, especially about fuel consumption and maintenance costs?',
  'BMW M5 kesinlikle daha sportif bir sürüş sunuyor. xDrive sistemi de çok başarılı.': 'The BMW M5 definitely offers a sportier drive. The xDrive system is also very successful.',
  'Mercedes AMG E63 iç mekân kalitesi ve konforu açısından bir adım önde bence.': 'I think the Mercedes-AMG E63 is one step ahead in interior quality and comfort.',
  'Elektrikli araçlara geçiş yapmalı mıyız?': 'Should we switch to electric vehicles?',
  "Türkiye'deki şarj altyapısı ve elektrikli araç fiyatları düşünüldüğünde, şu an elektrikli araca geçmek mantıklı mi? Deneyimlerinizi ve düşüncelerinizi merak ediyorum.": 'Considering the charging infrastructure and EV prices in Turkey, does it make sense to switch to an electric car right now? I am curious about your experiences and thoughts.',
  'Ben 2 yıldır Tesla Model 3 kullanıyorum. Şehir içi için mükemmel ama uzun yolda hala sıkıntılar var.': 'I have been using a Tesla Model 3 for two years. It is excellent in the city, but there are still issues on long trips.',
  'Porsche 911 GT3 Track Day Deneyimi': 'Porsche 911 GT3 Track Day Experience',
  "Geçen hafta İstanbul Park'ta 911 GT3 ile pist günü yaptım. İnanılmaz bir deneyimdi! Merak edenler için detaylı izlenimlerimi paylaşmak istedim.": 'Last week I did a track day at Istanbul Park with a 911 GT3. It was an incredible experience, so I wanted to share detailed impressions for anyone interested.',
  'Hangi lastikleri kullandın? PDK mi manual mi?': 'Which tires did you use? PDK or manual?',
  'Michelin Pilot Sport Cup 2 lastikler vardı, PDK versiyonuydu. Lap zamanı 1:58 çıkardım!': 'It had Michelin Pilot Sport Cup 2 tires and it was the PDK version. I managed a 1:58 lap time!',
  'Klasik araba restorasyonu - nereden başlamalı?': 'Classic car restoration - where should I start?',
  '1970 model bir Murat 124 aldım ve restore etmek istiyorum. Daha önce restorasyon yapmış arkadaşlar, nereden başlamamı önerirsiniz? Bütçe ve zaman planlaması nasıl yapılmalı?': 'I bought a 1970 Murat 124 and want to restore it. For people who have restored a car before, where should I start? How should budget and time planning be done?',
  'Giriş': 'Login',
  'Giriş Yap': 'Login',
  'Kayıt Ol': 'Sign Up',
  'Kayıt ol': 'Sign up',
  'Çıkış Yap': 'Logout',
  'Hesabım': 'My Account',
  'Admin Paneli': 'Admin Panel',
  'Platform yönetimi': 'Platform management',
  'Yönetim Merkezi': 'Management Center',
  'Kullanıcılar': 'Users',
  'Mesajlar': 'Messages',
  'Blog Yönetimi': 'Blog Management',
  'İlan Yönetimi': 'Listing Management',
  'Modifiye Kayıtları': 'Modification Records',
  'Site Ayarları': 'Site Settings',
  'Genel Bakış': 'Overview',
  'Toplam İlan': 'Total Listings',
  'Markalar': 'Brands',
  'Favoriler': 'Favorites',
  'İlan İstatistikleri': 'Listing Statistics',
  'İlan Durumları': 'Listing Statuses',
  'Son 7 Gün': 'Last 7 Days',
  'Son Blog Yazıları': 'Latest Blog Posts',
  'Son İlanlar': 'Latest Listings',
  'Son Kayıt Olan Kullanıcılar': 'New Users',
  'Son Mesajlar': 'Latest Messages',
  'Tümünü Gör': 'View All',
  'Yeni Yazı': 'New Post',
  'Yeni İlan': 'New Listing',
  'Kullanıcı veya e-posta ara': 'Search user or email',
  'Kullanıcı': 'User',
  'Kullanıcı adı': 'Username',
  'E-posta': 'Email',
  'Rol': 'Role',
  'Kayıt Tarihi': 'Registration Date',
  'Üye': 'Member',
  'Yönetici': 'Administrator',
  'İletişim kutusu': 'Inbox',
  'Henüz mesaj yok': 'No messages yet',
  'Yeni iletişim mesajları burada görünecek.': 'New contact messages will appear here.',
  'Aktif': 'Active',
  'Bekleyen': 'Pending',
  'Pasif': 'Inactive',
  'Reddedilen': 'Rejected',
  'Premium otomotiv platformu': 'Premium automotive platform',
  'Otomobil tutkusunu daha düzenli, daha güçlü ve daha profesyonel yaşa.': 'Experience automotive passion in a cleaner, stronger and more professional way.',
  'Araba Tutkunları; haberler, incelemeler, karşılaştırmalar, tartışmalar ve modifiye planlamasını tek çatı altında sunan modern bir otomotiv deneyimidir.': 'Car Enthusiasts is a modern automotive experience that brings news, reviews, comparisons, discussions and modification planning together in one place.',
  'Modifiye Stüdyosuna Git': 'Go to Modification Studio',
  'İncelemeleri Keşfet': 'Explore Reviews',
  'Yapılandırma Paneli': 'Configuration Panel',
  'Nissan Skyline GT-R R34 Premium Paket': 'Nissan Skyline GT-R R34 Premium Package',
  'Karbon body kit': 'Carbon body kit',
  'ECU yazılımı': 'ECU tuning',
  'Cat-back egzoz': 'Cat-back exhaust',
  'Coilover süspansiyon': 'Coilover suspension',
  'Premium seviye': 'Premium level',
  'Sport seviye': 'Sport level',
  'Tahmini toplam': 'Estimated total',
  'Modifiye kalemi': 'Modification items',
  'Ana kategori': 'Main categories',
  'Paket seviyesi': 'Package levels',
  'Ana Bölümler': 'Main Sections',
  'Sade, anlaşılır ve etkileyici yapı': 'Clean, clear and impressive structure',
  'Fazla tekrar eden alanlar kaldırıldı. Ana sayfa artık kullanıcıyı doğrudan en önemli bölümlere yönlendiren temiz bir yapıya sahip.': 'Repetitive sections have been removed. The homepage now guides users directly to the most important areas.',
  'Aç': 'Open',
  'Güvenilir, sade ve otomobil odaklı içerik.': 'Reliable, clean and automotive-focused content.',
  'Araba Tutkunları; performans otomobilleri, otomotiv haberleri, model incelemeleri, karşılaştırmalar ve modifiye fikirlerini düzenli bir deneyimde birleştiren Türkçe otomobil platformudur.': 'Car Enthusiasts is an automotive platform that combines performance cars, automotive news, model reviews, comparisons and modification ideas in a clean experience.',
  'Daha Fazla Bilgi': 'Learn More',
  'Öne çıkan modeller': 'Featured models',
  'Editör seçimi': "Editor's Pick",
  'JDM ikon': 'JDM icon',
  'Performans kültürünün en güçlü sembollerinden biri.': 'One of the strongest symbols of performance culture.',
  'Performans sedanı': 'Performance sedan',
  'Günlük kullanım ve pist karakterini aynı çizgide buluşturur.': 'It combines daily usability and track character in the same line.',
  'Süper otomobil': 'Supercar',
  'Mühendislik, hız ve denge odaklı prestijli bir referans model.': 'A prestigious benchmark focused on engineering, speed and balance.',
  'İncele': 'Review',
  'Nissan Skyline GT-R R34 Gece Çekimi': 'Nissan Skyline GT-R R34 Night Shot',
  'JDM Efsanesi': 'JDM Legend',
  'R34 GT-R Modifiye Stüdyosu': 'R34 GT-R Modification Studio',
  'Yapılandırma Önizlemesi': 'Configuration Preview',
  'R34 Parça Karşılaştırmaları': 'R34 Part Comparisons',
  'Stok / Modifiyeli': 'Stock / Modified',
  'Görsele tıkla, değişsin': 'Click the image to change it',
  'Yapılandırma görseli': 'Configuration visual',
  'Tıklayarak görseller arasında geçiş yap': 'Click to switch between images',
  'Otomotiv Gündemi': 'Automotive Agenda',
  'Otomobil dünyasından güncel gelişmeler, elektrikli araç pazarı, yeni modeller ve Türkiye otomotiv gündemi.': 'Latest developments from the automotive world, the EV market, new models and Turkey’s automotive agenda.',
  'Ana sayfaya dön': 'Back to home',
  'Kaynak:': 'Source:',
  'Türkiye': 'Turkey',
  'Elektrikli': 'Electric',
  'Pazar Verisi': 'Market Data',
  'Premium EV': 'Premium EV',
  'Yeni Modeller': 'New Models',
  'Rehber': 'Guide',
  'Renault Clio, Türkiye’de Yılın Otomobili 2026 seçildi': 'Renault Clio named Turkey’s 2026 Car of the Year',
  'Tesla Model Y L Avrupa testlerinde görüntülendi': 'Tesla Model Y L spotted during European tests',
  'Nisan 2026 elektrikli otomobil satışlarında Togg T10X öne çıktı': 'Togg T10X stood out in April 2026 EV sales',
  'BMW iX3 50 xDrive için Türkiye’de ön talep süreci başladı': 'Pre-orders started in Turkey for the BMW iX3 50 xDrive',
  '2026’da Türkiye pazarına yeni elektrikli modeller geliyor': 'New electric models are coming to the Turkish market in 2026',
  'Elektrikli araç alırken menzil, şarj ve garanti daha kritik hale geldi': 'Range, charging and warranty are now more critical when buying an EV',
  'Modifiye bölümünde 43 parça': '43 parts in the modification section',
  'Dış Görünüm': 'Exterior',
  'Motor & Performans': 'Engine & Performance',
  'Egzoz': 'Exhaust',
  'Süspansiyon': 'Suspension',
  'Fren Sistemi': 'Brake System',
  'Jant & Lastik': 'Wheels & Tires',
  'İç Mekan': 'Interior',
  'Standart': 'Standard',
  'Sport': 'Sport',
  'Premium': 'Premium',
  'Stok': 'Stock',
  'Modifiyeli': 'Modified',
  'SVG stok / modifiyeli karşılaştırma': 'SVG stock / modified comparison',
  'Ön': 'Front',
  'Yan': 'Side',
  'Arka': 'Rear',
  'Döndür': 'Rotate',
  'Grafit': 'Graphite',
  'Gece Mavisi': 'Night Blue',
  'Kırmızı': 'Red',
  'Mor': 'Purple',
  'Arama kutusuna marka/model yazın': 'Type brand/model in the search box',
  'Build Özeti': 'Build Summary',
  'Yapılandırma Özeti': 'Configuration Summary',
  'Toplam Maliyet': 'Total Cost',
  'Yazdır': 'Print',
  'Seçimleri Temizle': 'Clear Selections',
  'Seçili parça yok': 'No selected parts',
  'Parça seçerek yapılandırmaya başlayın.': 'Start the configuration by selecting parts.',
  'Giriş Yap': 'Login',
  'Araba Tutkunları hesabına eriş.': 'Access your Car Enthusiasts account.',
  'Şifre': 'Password',
  'Giriş yapılıyor...': 'Logging in...',
  'Hesabın yok mu?': "Don't have an account?",
  'Giriş başarısız. Bilgilerinizi kontrol edin.': 'Login failed. Please check your information.',
  'Bağlantı zaman aşımına uğradı. MongoDB URI bilgisini ve internet bağlantınızı kontrol edin.': 'Connection timed out. Check your MongoDB URI and internet connection.',
  'Giriş yapılamadı. Lütfen tekrar deneyin.': 'Could not log in. Please try again.',
  'Hesap Oluştur': 'Create Account',
  'Modifiye build’lerini ve topluluk özelliklerini kullan.': 'Use modification builds and community features.',
  'Şifre (en az 6 karakter)': 'Password (at least 6 characters)',
  'Kaydediliyor...': 'Saving...',
  'Kayıt başarısız. Bilgilerinizi kontrol edin.': 'Registration failed. Please check your information.',
  'Kayıt başarılı. Giriş sayfasına yönlendiriliyorsunuz.': 'Registration successful. Redirecting to login page.',
  'Kayıt yapılamadı. Lütfen tekrar deneyin.': 'Could not register. Please try again.',
  'Hesabın var mı?': 'Already have an account?',
  'Topluluk Tartışmaları': 'Community Discussions',
  'Araba Tutkunları Forumu': 'Car Enthusiasts Forum',
  'Otomobil dünyası hakkında sorular sorun, deneyimlerinizi paylaşın ve diğer araba tutkunlarıyla tartışmalara katılın.': 'Ask questions about the automotive world, share your experiences and join discussions with other car enthusiasts.',
  'Yeni Konu Aç': 'Create New Topic',
  'Konu ara...': 'Search topics...',
  'Tümü': 'All',
  'Genel': 'General',
  'Deneyim': 'Experience',
  'Restorasyon': 'Restoration',
  'Teknik': 'Technical',
  'Satılık': 'For Sale',
  'Yorum yaz...': 'Write a comment...',
  'Yorum Gönder': 'Post Comment',
  'Yorumlar': 'Comments',
  'Misafir': 'Guest',
  'Şimdi': 'Now',
  '2 saat önce': '2 hours ago',
  '1 saat önce': '1 hour ago',
  '45 dk önce': '45 min ago',
  '5 saat önce': '5 hours ago',
  '4 saat önce': '4 hours ago',
  '1 gün önce': '1 day ago',
  '20 saat önce': '20 hours ago',
  '18 saat önce': '18 hours ago',
  '2 gün önce': '2 days ago',
  'Konu Başlığı': 'Topic Title',
  'İçerik': 'Content',
  'Kategori': 'Category',
  'Adınız': 'Your Name',
  'İptal': 'Cancel',
  'Yayınla': 'Publish',
  'Hakkımızda': 'About Us',

  'Karşılaştırma': 'Comparison',
  '2024 BMW M5 mi yoksa Mercedes AMG E63 mi?': '2024 BMW M5 or Mercedes AMG E63?',
  'Yeni nesil BMW M5 ve Mercedes AMG E63 arasında kaldım. Günlük kullanım ve performans açısından hangisini önerirsiniz? Özellikle yakıt tüketimi ve bakım maliyetleri konusunda deneyimlerinizi paylaşır mısınız?': 'I am deciding between the new BMW M5 and Mercedes-AMG E63. Which one would you recommend for daily use and performance? Could you share your experiences, especially about fuel consumption and maintenance costs?',
  'BMW M5 kesinlikle daha sportif bir sürüş sunuyor. xDrive sistemi de çok başarılı.': 'The BMW M5 definitely offers a sportier drive. The xDrive system is also very successful.',
  'Mercedes AMG E63 iç mekân kalitesi ve konforu açısından bir adım önde bence.': 'I think the Mercedes-AMG E63 is one step ahead in interior quality and comfort.',
  'Elektrikli araçlara geçiş yapmalı mıyız?': 'Should we switch to electric vehicles?',
  "Türkiye'deki şarj altyapısı ve elektrikli araç fiyatları düşünüldüğünde, şu an elektrikli araca geçmek mantıklı mi? Deneyimlerinizi ve düşüncelerinizi merak ediyorum.": 'Considering the charging infrastructure and EV prices in Turkey, does it make sense to switch to an electric car right now? I am curious about your experiences and thoughts.',
  'Ben 2 yıldır Tesla Model 3 kullanıyorum. Şehir içi için mükemmel ama uzun yolda hala sıkıntılar var.': 'I have been using a Tesla Model 3 for two years. It is excellent in the city, but there are still issues on long trips.',
  'Porsche 911 GT3 Track Day Deneyimi': 'Porsche 911 GT3 Track Day Experience',
  "Geçen hafta İstanbul Park'ta 911 GT3 ile pist günü yaptım. İnanılmaz bir deneyimdi! Merak edenler için detaylı izlenimlerimi paylaşmak istedim.": 'Last week I did a track day at Istanbul Park with a 911 GT3. It was an incredible experience, so I wanted to share detailed impressions for anyone interested.',
  'Hangi lastikleri kullandın? PDK mi manual mi?': 'Which tires did you use? PDK or manual?',
  'Michelin Pilot Sport Cup 2 lastikler vardı, PDK versiyonuydu. Lap zamanı 1:58 çıkardım!': 'It had Michelin Pilot Sport Cup 2 tires and it was the PDK version. I managed a 1:58 lap time!',
  'Klasik araba restorasyonu - nereden başlamalı?': 'Classic car restoration - where should I start?',
  '1970 model bir Murat 124 aldım ve restore etmek istiyorum. Daha önce restorasyon yapmış arkadaşlar, nereden başlamamı önerirsiniz? Bütçe ve zaman planlaması nasıl yapılmalı?': 'I bought a 1970 Murat 124 and want to restore it. For people who have restored a car before, where should I start? How should budget and time planning be done?',
  'Biz Kimiz?': 'Who Are We?',
  'Misyonumuz': 'Our Mission',
  'Vizyonumuz': 'Our Vision',
}

const phraseDictionary: [string, string][] = [
  ['Platform istatistikleri ve son aktiviteler', 'Platform statistics and recent activity'],
  ['aktif ilan', 'active listings'],
  ['kayıtlı kullanıcı', 'registered users'],
  ['farklı marka', 'different brands'],
  ['Henüz favori yok', 'No favorites yet'],
  ['Kullanıcı veya e-posta ara', 'Search user or email'],
  ['Lütfen .env.local dosyasına MONGODB_URI tanımlayın', 'Please define MONGODB_URI in the .env.local file'],
  ['Kaynak:', 'Source:'],
  ['Türkiye’de Yılın Otomobili', 'Car of the Year in Turkey'],
  ['elektrikli araç', 'electric vehicle'],
  ['Elektrikli araç', 'Electric vehicle'],
  ['güncel gelişmeler', 'latest developments'],
]

function translateText(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return value
  if (exactDictionary[trimmed]) return value.replace(trimmed, exactDictionary[trimmed])

  let translated = value
  for (const [tr, en] of phraseDictionary) {
    translated = translated.split(tr).join(en)
  }
  return translated
}

function translateNode(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const nodes: Text[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode as Text)
  nodes.forEach((node) => {
    const original = node.textContent || ''
    const translated = translateText(original)
    if (translated !== original) node.textContent = translated
  })

  if (root instanceof Element || root instanceof Document) {
    const elements = root instanceof Document ? root.querySelectorAll('*') : root.querySelectorAll('*')
    elements.forEach((el) => {
      ;['placeholder', 'aria-label', 'title'].forEach((attr) => {
        const value = el.getAttribute(attr)
        if (value) {
          const translated = translateText(value)
          if (translated !== value) el.setAttribute(attr, translated)
        }
      })
    })
  }
}

function GlobalTranslator({ language }: { language: Language }) {
  useEffect(() => {
    document.documentElement.lang = language
    if (language === 'tr') return

    const apply = () => translateNode(document)
    apply()

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(apply)
    })
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [language])

  return null
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr')

  useEffect(() => {
    const stored = window.localStorage.getItem('site-language') as Language | null
    if (stored === 'tr' || stored === 'en') setLanguageState(stored)
  }, [])

  const setLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem('site-language', nextLanguage)
    setLanguageState(nextLanguage)
    if (nextLanguage === 'tr') window.location.reload()
  }

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === 'tr' ? 'en' : 'tr'),
    t: (tr: string, en: string) => (language === 'tr' ? tr : en),
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      <GlobalTranslator language={language} />
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
