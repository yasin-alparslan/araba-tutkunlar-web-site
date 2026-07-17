"use client"

import { Users, Target, Award, Heart, Car, Zap, Shield, Globe } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import AnimatedCounter from "@/components/animated-counter"

const teamMembers = [
  {
    name: "Yasin Alparslan",
    role: "Kurucu & Genel Yayın Yönetmeni",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Otomotiv deneyimi ile sektöre katkı sağlıyor."
  },
  {
    name: "Elif Demir",
    role: "Teknoloji Editoru",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    description: "Elektrikli araclar ve otonom sürüş uzmanı."
  },
  {
    name: "Mehmet Kaya",
    role: "Test Pilotu & Inceleme Uzmani",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "1000'den fazla arac test etmiş deneyimli pilot."
  },
  {
    name: "Zeynep öztürk",
    role: "Tasarim & UX Lideri",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Kullanici deneyimini en üst seviyeye taşıyor."
  }
]

const values = [
  {
    icon: Target,
    title: "Bağımsız ve Tarafsız",
    description: "Hiçbir marka veya üreticiyle ticari ilişkimiz yoktur. Incelemelerimiz tamamen bağımsızdır."
  },
  {
    icon: Award,
    title: "Uzmanlık ve Deneyim",
    description: "Ekibimiz otomotiv sektöründe onlarca yillik deneyime sahip uzmanlardan oluşur."
  },
  {
    icon: Heart,
    title: "Tutku ve Bağlılık",
    description: "Arabalar bizim için sadece bir meslek degil, ayni zamanda büyük bir tutkudur."
  },
  {
    icon: Shield,
    title: "Güvenilirlik",
    description: "Tüm verilerimiz ve karşılaştırmalarımız doğrulanabilir kaynaklara dayanır."
  }
]

const milestones = [
  { year: "2025", title: "Kuruluş", description: "Araba Tutkunlari yayina basladi" },
  { year: "2026", title: "10K Uye", description: "Toplulugumuz büyümeye devam etti" },
  { year: "2027", title: "Mobil Uygulama", description: "iOS ve Android uygulamalarımızı yayınlayacağız" },
  { year: "2026", title: "50K Uye", description: "Türkiye'nin en büyük otomotiv topluluklarından biri olduk" },
  { year: "2027", title: "Video Icerik", description: "YouTube kanalımızı açtık" },
  { year: "2027", title: "100k+ Uye", description: "100k üyeyi asarak büyük bir aile olduk" }
]

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Araba Tutkunlari Hakkinda
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              2018 yılından bu yana Türkiye&apos;nin en guvenilir otomotiv platformu olarak, 
              araba severlere bağımsız incelemeler, karsilaştirmalar ve en güncel haberleri sunuyoruz.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection delay={0} className="text-center">
              <AnimatedCounter end={1000000} suffix="+" className="text-4xl md:text-5xl font-bold text-primary" />
              <p className="text-muted-foreground mt-2">Aktif üye</p>
            </AnimatedSection>
            <AnimatedSection delay={100} className="text-center">
              <AnimatedCounter end={5000} suffix="+" className="text-4xl md:text-5xl font-bold text-primary" />
              <p className="text-muted-foreground mt-2">Arac Incelemesi</p>
            </AnimatedSection>
            <AnimatedSection delay={200} className="text-center">
              <AnimatedCounter end={250} suffix="K+" className="text-4xl md:text-5xl font-bold text-primary" />
              <p className="text-muted-foreground mt-2">Forum Konusu</p>
            </AnimatedSection>
            <AnimatedSection delay={300} className="text-center">
              <AnimatedCounter end={6} className="text-4xl md:text-5xl font-bold text-primary" />
              <p className="text-muted-foreground mt-2">Yillik Deneyim</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85" 
                  alt="Luks spor araba"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                  <Car className="w-12 h-12" />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Misyonumuz
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Araba Tutkunlari olarak misyonumuz, otomobil tutkunlarina en dogru, 
                en guncel ve en kapsamli bilgileri sunmaktir. Bagimsziz ve tarafsziz 
                yaklasimimizla, arac almak isteyenlere karar sureclerinde yardmci olmak 
                ve otomotiv tutkunlarini bir araya getirmek en buyuk hedefimizdir.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Her gun binlerce otomobil tutkunu platformumuzda bulusuyor, 
                deneyimlerini paylaszyor ve yeni arkadasliklar kuruyor.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Degerlerimiz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bizi biz yapan temel degerler
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Yolculugumuz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kurlusumuzdan bugune gecmisimiz
            </p>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 100}>
                  <div className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <span className="text-primary font-bold text-xl">{milestone.year}</span>
                      <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                    </div>
                    <div className="w-2/12 flex justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow" />
                    </div>
                    <div className="w-5/12" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ekibimiz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Araba Tutkunlari&apos;nin arkasindaki uzman kadro
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 100}>
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Topluluğumuza Katılın
              </h2>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                100 binden fazla araba tutkununun bir parçası olun. 
                Deneyimlerinizi paylaşın, sorularınıza cevap bulun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors">
                  Hemen Üye Ol
                </button>
                <button className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
