"use client"

import type * as React from "react"
import {
  BadgeCheck,
  Clock,
  Cog,
  Gauge,
  Shield,
  Sparkles,
} from "lucide-react"

const DEFAULT_FEATURES = [
  {
    title: "High Precision",
    description: "Stable orientation and repeatable feeding for critical components.",
    icon: BadgeCheck,
  },
  {
    title: "24/7 Reliability",
    description: "Industrial-grade build for continuous production environments.",
    icon: Shield,
  },
  {
    title: "Fast Lead Time",
    description: "Rapid engineering response and efficient delivery to keep you on schedule.",
    icon: Clock,
  },
  {
    title: "Customized Solutions",
    description: "Tailored tooling and control strategies for your exact part geometry.",
    icon: Cog,
  },
  {
    title: "High Efficiency",
    description: "Optimized feeding speed to maximize throughput and reduce downtime.",
    icon: Gauge,
  },
  {
    title: "Clean Integration",
    description: "Designed to fit seamlessly into automation cells and conveyors.",
    icon: Sparkles,
  },
]

export function FeatureCards({
  features = DEFAULT_FEATURES,
}: {
  features?: {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}) {
  const list = Array.isArray(features) ? features.slice(0, 6) : DEFAULT_FEATURES

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {list.map((f) => {
        const Icon = f.icon
        return (
          <div
            key={f.title}
            className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#FBA026]/10 flex items-center justify-center border border-[#FBA026]/20">
                <Icon className="h-5 w-5 text-[#FBA026]" aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 leading-snug">
                  {f.title}
                </div>
                <div className="mt-1 text-sm text-slate-500 leading-relaxed">
                  {f.description}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

