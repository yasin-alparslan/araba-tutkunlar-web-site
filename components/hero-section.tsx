"use client"

import { useState } from "react"
import Link from "next/link"
import AnimatedSection from "./animated-section"

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <AnimatedSection animation="scale">
      <div className="w-full">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[480px] relative group cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85")`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#0b95da]/30 to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          
          {/* Floating badge */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <span className="bg-[#0b95da] text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse-glow">
              ONE CIKAN
            </span>
          </div>

          <div className="p-4 md:p-6 lg:p-8 relative z-10">
            <h1
              className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.015em] mb-2 transition-transform duration-300 ${
                isHovered ? "translate-x-2" : ""
              }`}
            >
              Ferrari SF90 XX Lansmani: Hibrit Canavar Piste Cikti!
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mb-4">
              Italyan ustaligin zirvesi, 1030 beygirlik hibrit guc unitesiyle pist deneyimini yeniden tanimliyor.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm">Can Yilmaz</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 text-sm">7 Kasim 2025</span>
            </div>
            <Link
              href="/haberler"
              className={`inline-flex items-center gap-2 mt-4 text-[#0b95da] font-bold text-sm hover:underline transition-all duration-300 ${
                isHovered ? "translate-x-2" : ""
              }`}
            >
              Devamini Oku
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
