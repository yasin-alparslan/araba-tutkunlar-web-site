"use client"

import Link from "next/link"

interface NewsCardProps {
  image: string
  category: string
  title: string
  description: string
  date: string
  href?: string
}

export default function NewsCard({ image, category, title, description, date, href = "/haberler" }: NewsCardProps) {
  return (
    <Link href={href} className="block">
      <div className="flex flex-col gap-3 rounded-lg bg-[#1b2327] shadow-lg hover-lift transition-all cursor-pointer group overflow-hidden">
        <div className="hover-zoom aspect-video w-full">
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url("${image}")` }}
          />
        </div>
        <div className="p-4 pt-0 flex flex-col gap-2">
          <span className="text-[#0b95da] text-xs font-bold uppercase">{category}</span>
          <h3 className="text-white text-lg font-bold group-hover:text-[#0b95da] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#9cb0ba] text-sm line-clamp-2">{description}</p>
          <span className="text-gray-500 text-xs mt-1">{date}</span>
        </div>
      </div>
    </Link>
  )
}
