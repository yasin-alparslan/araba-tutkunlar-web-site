"use client"

import Link from "next/link"

interface ComparisonCardProps {
  image: string
  title: string
  subtitle: string
  href?: string
}

export default function ComparisonCard({ image, title, subtitle, href = "/karsilastirmalar" }: ComparisonCardProps) {
  return (
    <Link href={href} className="block">
      <div className="flex flex-col gap-3 pb-3 min-w-[280px] group cursor-pointer hover-lift">
        <div className="hover-zoom rounded-lg overflow-hidden">
          <div
            className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url("${image}")` }}
          />
        </div>
        <div>
          <p className="text-white text-base font-bold leading-tight group-hover:text-[#0b95da] transition-colors duration-300">
            {title}
          </p>
          <p className="text-[#9cb0ba] text-sm mt-1">{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}
