"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "Hongchao delivered our vibratory bowl feeders ahead of schedule with zero defects. Their engineering team responded within hours at every stage — that level of service is simply rare in this industry.",
    name: "Thomas Becker",
    title: "Head of Production Engineering",
    company: "Becker Precision GmbH",
    country: "Germany",
    focus: "Service",
    initials: "TB",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    quote:
      "We've sourced feeding systems from three continents. Nothing matches the dimensional consistency and finish quality we receive from Hongchao. Every unit performs exactly to spec, batch after batch.",
    name: "Hiroshi Tanaka",
    title: "Senior Automation Manager",
    company: "Tanaka Robotics Co.",
    country: "Japan",
    focus: "Quality",
    initials: "HT",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    quote:
      "Our production line could not wait. Hongchao compressed a 12-week lead time down to 7 weeks without any compromise on quality. The system was running on day one of installation.",
    name: "Amara Osei",
    title: "VP of Operations",
    company: "Precision Parts Africa",
    country: "South Africa",
    focus: "Delivery",
    initials: "AO",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    quote:
      "The custom centrifugal feeder they designed for our micro-component line handles parts under 2mm flawlessly. The engineering expertise and attention to detail sets Hongchao apart from every competitor we evaluated.",
    name: "Elena Vasquez",
    title: "Automation Systems Director",
    company: "Vasquez Industrial S.A.",
    country: "Mexico",
    focus: "Quality",
    initials: "EV",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: 5,
    quote:
      "From our first inquiry to final delivery, communication was transparent and proactive. Hongchao's after-sales support team resolved our integration query on the same day. Exceptional partnership.",
    name: "James Whitfield",
    title: "Plant Manager",
    company: "Whitfield Assemblies Ltd.",
    country: "United Kingdom",
    focus: "Service",
    initials: "JW",
    color: "bg-sky-100 text-sky-700",
  },
  {
    id: 6,
    quote:
      "We placed a large order with a tight shipment window. Every unit arrived correctly documented, packaged, and on time. Reliability like this is why we have reordered four times in three years.",
    name: "Sven Lindqvist",
    title: "Procurement Lead",
    company: "Nordic Auto Systems",
    country: "Sweden",
    focus: "Delivery",
    initials: "SL",
    color: "bg-teal-100 text-teal-700",
  },
]

const focusColors: Record<string, string> = {
  Service: "text-[#FBA026] bg-[#FBA026]/10",
  Quality: "text-emerald-600 bg-emerald-50",
  Delivery: "text-sky-600 bg-sky-50",
}

// Large decorative quote SVG using brand orange
function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 24V14.4C0 9.84 1.28 6.24 3.84 3.6 6.4 1.2 9.92 0 14.4 0v4.8C11.84 4.8 9.92 5.6 8.64 7.2 7.36 8.8 6.72 10.88 6.72 13.44H13.44V24H0Zm18.56 0V14.4c0-4.56 1.28-8.16 3.84-10.8C24.96 1.2 28.48 0 32.96 0v4.8c-2.56 0-4.48.8-5.76 2.4-1.28 1.6-1.92 3.68-1.92 6.24h6.72V24H18.56Z" />
    </svg>
  )
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Carousel shows 3 cards at a time on large screens; on mobile shows 1
  const totalSlides = testimonials.length

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) =>
        direction === "next"
          ? (prev + 1) % totalSlides
          : (prev - 1 + totalSlides) % totalSlides
      )
      setTimeout(() => setIsAnimating(false), 350)
    },
    [isAnimating, totalSlides]
  )

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => navigate("next"), 6000)
    return () => clearInterval(timer)
  }, [navigate])

  // Build the visible set: always show a sliding window of 3
  const visible = [
    testimonials[activeIndex % totalSlides],
    testimonials[(activeIndex + 1) % totalSlides],
    testimonials[(activeIndex + 2) % totalSlides],
  ]

  return (
    <section className="bg-[#fafafa] py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FBA026] text-sm font-semibold uppercase tracking-widest mb-4">
            What Clients Say
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight text-balance">
            Trusted by Engineers Worldwide
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Real feedback from manufacturing teams across 50+ countries on service, quality, and delivery.
          </p>
        </div>

        {/* Cards — 3 columns desktop / 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div
              key={`${t.id}-${activeIndex}-${i}`}
              className={cn(
                "relative bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-5",
                "shadow-[0_2px_16px_0_rgba(15,23,42,0.06)] hover:shadow-[0_4px_32px_0_rgba(251,160,38,0.10)]",
                "transition-all duration-350",
                // subtle fade-in
                "animate-in fade-in slide-in-from-bottom-2 duration-350"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Orange quote mark */}
              <QuoteIcon className="w-8 h-6 text-[#FBA026] opacity-80 shrink-0" />

              {/* Focus tag */}
              <span
                className={cn(
                  "absolute top-7 right-7 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full",
                  focusColors[t.focus]
                )}
              >
                {t.focus}
              </span>

              {/* Quote text */}
              <blockquote className="text-slate-600 text-[15px] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Thin divider */}
              <div className="border-t border-slate-100" />

              {/* Author row */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                    t.color
                  )}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-slate-800 font-bold text-sm leading-tight truncate">
                    {t.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5 truncate">
                    {t.title}
                  </p>
                  <p className="text-[#FBA026] text-xs font-semibold mt-0.5 truncate">
                    {t.company} &middot; {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          {/* Prev */}
          <button
            onClick={() => navigate("prev")}
            aria-label="Previous testimonials"
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#FBA026] hover:text-[#FBA026] transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => { if (!isAnimating) { setIsAnimating(true); setActiveIndex(i); setTimeout(() => setIsAnimating(false), 350) } }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-6 h-2.5 bg-[#FBA026]"
                    : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
                )}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => navigate("next")}
            aria-label="Next testimonials"
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#FBA026] hover:text-[#FBA026] transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
