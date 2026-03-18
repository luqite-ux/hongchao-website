"use client"

import React, { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PresenceCountry = {
  id: string
  name: string
  mapLeft: string
  mapTop: string
  details: {
    title: string
    bullets: string[]
  }
}

const HQ: PresenceCountry = {
  id: "china-hq-suzhou",
  name: "China HQ - Suzhou",
  mapLeft: "78%",
  mapTop: "43%",
  details: {
    title: "China HQ - Suzhou",
    bullets: [
      "Engineering & manufacturing base",
      "Rapid prototyping and customization",
      "Global spare-parts support",
    ],
  },
}

const CORE_COUNTRIES: PresenceCountry[] = [
  { id: "us", name: "United States", mapLeft: "18%", mapTop: "35%", details: { title: "United States", bullets: ["Application consulting", "Remote commissioning support", "Spare parts coordination"] } },
  { id: "ca", name: "Canada", mapLeft: "17%", mapTop: "28%", details: { title: "Canada", bullets: ["OEM support", "Lead-time planning", "After-sales service"] } },
  { id: "mx", name: "Mexico", mapLeft: "20%", mapTop: "48%", details: { title: "Mexico", bullets: ["Integration support", "Quick response for lines", "Standardized documentation"] } },
  { id: "br", name: "Brazil", mapLeft: "32%", mapTop: "68%", details: { title: "Brazil", bullets: ["Project delivery coordination", "Site guidance", "Parts supply support"] } },
  { id: "de", name: "Germany", mapLeft: "49%", mapTop: "28%", details: { title: "Germany", bullets: ["Precision feeding solutions", "Process validation support", "Technical troubleshooting"] } },
  { id: "fr", name: "France", mapLeft: "46%", mapTop: "30%", details: { title: "France", bullets: ["Industry applications", "Documentation support", "Remote assistance"] } },
  { id: "uk", name: "United Kingdom", mapLeft: "44%", mapTop: "26%", details: { title: "United Kingdom", bullets: ["Engineering support", "Solution recommendations", "After-sales assistance"] } },
  { id: "it", name: "Italy", mapLeft: "50%", mapTop: "33%", details: { title: "Italy", bullets: ["Automation line support", "Feeding optimization", "Service response"] } },
  { id: "tr", name: "Turkey", mapLeft: "56%", mapTop: "36%", details: { title: "Turkey", bullets: ["Project support", "Delivery coordination", "Remote diagnostics"] } },
  { id: "in", name: "India", mapLeft: "70%", mapTop: "52%", details: { title: "India", bullets: ["Local partner support", "Commissioning guidance", "Maintenance assistance"] } },
  { id: "vn", name: "Vietnam", mapLeft: "79%", mapTop: "54%", details: { title: "Vietnam", bullets: ["Fast delivery support", "Line changeover guidance", "Spare parts logistics"] } },
  { id: "th", name: "Thailand", mapLeft: "77%", mapTop: "56%", details: { title: "Thailand", bullets: ["Automation consulting", "Remote debugging", "Parts planning"] } },
  { id: "kr", name: "South Korea", mapLeft: "83%", mapTop: "41%", details: { title: "South Korea", bullets: ["High-throughput solutions", "Process tuning support", "After-sales response"] } },
  { id: "jp", name: "Japan", mapLeft: "85%", mapTop: "36%", details: { title: "Japan", bullets: ["High-precision feeding", "Quality documentation", "Remote support"] } },
  { id: "au", name: "Australia", mapLeft: "84%", mapTop: "78%", details: { title: "Australia", bullets: ["Delivery support", "Installation guidance", "After-sales service"] } },
  { id: "za", name: "South Africa", mapLeft: "55%", mapTop: "80%", details: { title: "South Africa", bullets: ["Project coordination", "Remote support", "Parts supply"] } },
]

function PresenceHalo({ active }: { active: PresenceCountry }) {
  return (
    <div
      aria-hidden="true"
      className="absolute z-10 pointer-events-none"
      style={{ left: active.mapLeft, top: active.mapTop }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div className="h-16 w-16 rounded-full bg-orange-400/25 blur-[2px]" />
        <div className="absolute inset-0 rounded-full ring-4 ring-orange-500/70" />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_0_6px_rgba(249,115,22,0.25)]" />
      </div>
    </div>
  )
}

function PresenceMapBackground({ active }: { active: PresenceCountry }) {
  return (
    <div className="relative w-full aspect-[2/1] overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
      <img
        src="/images/map-bg.svg"
        className="absolute inset-0 h-full w-full object-contain opacity-20"
        alt="World map background"
      />
      <PresenceHalo active={active} />
    </div>
  )
}

function CountryMatrix({
  countries,
  activeId,
  onActivate,
}: {
  countries: PresenceCountry[]
  activeId: string
  onActivate: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {countries.map((c) => {
        const isActive = c.id === activeId
        return (
          <button
            key={c.id}
            type="button"
            onMouseEnter={() => onActivate(c.id)}
            onFocus={() => onActivate(c.id)}
            onClick={() => onActivate(c.id)}
            className="text-left"
          >
            <Badge
              variant="outline"
              className={cn(
                "w-full justify-start px-3 py-1.5 rounded-full bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors",
                isActive && "border-orange-400 bg-orange-50 text-slate-700"
              )}
            >
              {c.name}
            </Badge>
          </button>
        )
      })}
    </div>
  )
}

function PresenceDetails({ active }: { active: PresenceCountry }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service Coverage</p>
          <h4 className="mt-1 text-base font-semibold text-slate-800">{active.details.title}</h4>
        </div>
        <Badge className="bg-orange-500 text-white">Active</Badge>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {active.details.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">China HQ - Suzhou</span>
        <span className="mx-2 text-slate-300">•</span>
        <span>Engineering hub and global support center</span>
      </div>
    </div>
  )
}

export function GlobalPresenceMap() {
  const all = useMemo(() => [HQ, ...CORE_COUNTRIES], [])
  const [activeId, setActiveId] = useState<string>("us")
  const active = all.find((c) => c.id === activeId) ?? HQ

  const matrixCountries = CORE_COUNTRIES.slice(0, 16)

  return (
    <section className="w-full">
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-slate-600">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Global Service Footprint</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Hover a country label to highlight its service area and see details.
                </p>
              </div>
              <button
                type="button"
                onMouseEnter={() => setActiveId(HQ.id)}
                onFocus={() => setActiveId(HQ.id)}
                onClick={() => setActiveId(HQ.id)}
                className="shrink-0"
              >
                <Badge className="bg-orange-500 text-white px-3 py-1.5 rounded-full">
                  {HQ.name}
                </Badge>
              </button>
            </div>

            <div className="mt-5">
              <PresenceMapBackground active={active} />
            </div>

            <div className="mt-5">
              <CountryMatrix countries={matrixCountries} activeId={activeId} onActivate={setActiveId} />
            </div>
          </div>

          <div className="lg:w-[360px]">
            <PresenceDetails active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobalPresenceMap
