"use client"

import type * as React from "react"
import { useMemo } from "react"
import { ChevronDown, Gauge, Layers, Ruler, Settings, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type SpecRow = { label?: string; value?: string }

const KEY_SPEC_DEFS: {
  key: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  match: (label: string) => boolean
}[] = [
  { key: "material", title: "Material", icon: Layers, match: (l) => /material/i.test(l) },
  { key: "efficiency", title: "Efficiency", icon: Gauge, match: (l) => /efficiency|throughput|output/i.test(l) },
  { key: "feedingSpeed", title: "Feeding Speed", icon: Ruler, match: (l) => /feeding\s*speed|speed|rate/i.test(l) },
  { key: "power", title: "Power", icon: Zap, match: (l) => /power|voltage|frequency/i.test(l) },
  { key: "control", title: "Control", icon: Settings, match: (l) => /control|controller|sensor/i.test(l) },
]

function normalize(s: unknown) {
  return String(s ?? "").trim()
}

export function ProductSpecifications({
  specs,
}: {
  specs: SpecRow[]
}) {
  const rows = Array.isArray(specs)
    ? specs
        .map((r) => ({ label: normalize(r.label), value: normalize(r.value) }))
        .filter((r) => r.label && r.value)
    : []

  const keyCards = useMemo(() => {
    const cards: { title: string; value: string; icon: React.ComponentType<{ className?: string }> }[] = []
    for (const def of KEY_SPEC_DEFS) {
      const hit = rows.find((r) => def.match(r.label))
      if (!hit) continue
      cards.push({ title: def.title, value: hit.value, icon: def.icon })
    }
    return cards.slice(0, 6)
  }, [rows])

  const usedLabels = new Set(keyCards.map((c) => c.title.toLowerCase()))
  const remainingRows = rows.filter((r) => {
    const labelLower = r.label.toLowerCase()
    if (labelLower.includes("material") && usedLabels.has("material")) return false
    if (labelLower.includes("efficiency") && usedLabels.has("efficiency")) return false
    if (labelLower.includes("feeding") && usedLabels.has("feeding speed")) return false
    return true
  })

  if (rows.length === 0) return null

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList variant="line" className="gap-2">
        <TabsTrigger value="overview" className="text-sm">
          Overview
        </TabsTrigger>
        <TabsTrigger value="all" className="text-sm">
          All Specs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-8">
        {keyCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {keyCards.map((c) => {
              const Icon = c.icon
              return (
                <div
                  key={c.title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#FBA026]/10 flex items-center justify-center border border-[#FBA026]/20">
                      <Icon className="h-5 w-5 text-[#FBA026]" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {c.title}
                      </div>
                      <div className="mt-1 text-base font-semibold text-slate-900">
                        {c.value}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Specifications are available below.
          </div>
        )}

        {remainingRows.length > 0 ? (
          <div className="mt-8">
            <Collapsible>
              <CollapsibleTrigger className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[#FBA026] transition-colors">
                More Specifications
                <ChevronDown className="h-4 w-4" aria-hidden />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-4 py-3 font-semibold text-slate-900 text-sm">
                          Parameter
                        </th>
                        <th className="px-4 py-3 font-semibold text-slate-900 text-sm">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {remainingRows.map((r, i) => (
                        <tr
                          key={`${r.label}-${i}`}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="px-4 py-3 text-slate-600 text-sm">
                            {r.label}
                          </td>
                          <td className="px-4 py-3 text-slate-900 text-sm">
                            {r.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ) : null}
      </TabsContent>

      <TabsContent value="all" className="mt-8">
        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 font-semibold text-slate-900 text-sm">
                  Parameter
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 text-sm">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.label}-${i}`} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-slate-600 text-sm">{r.label}</td>
                  <td className="px-4 py-3 text-slate-900 text-sm">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  )
}

