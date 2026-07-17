"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale"
  delay?: number
  className?: string
}

export default function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0 translate-y-8"
    
    switch (animation) {
      case "fade-up":
        return "opacity-100 translate-y-0"
      case "fade-left":
        return "opacity-100 translate-x-0"
      case "fade-right":
        return "opacity-100 translate-x-0"
      case "scale":
        return "opacity-100 scale-100"
      default:
        return "opacity-100"
    }
  }

  const getInitialClass = () => {
    switch (animation) {
      case "fade-left":
        return "-translate-x-8"
      case "fade-right":
        return "translate-x-8"
      case "scale":
        return "scale-95"
      default:
        return ""
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${!isVisible ? `opacity-0 ${getInitialClass()}` : getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}
