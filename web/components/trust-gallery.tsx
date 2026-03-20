"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { TrustSectionData } from "@/lib/homepage"

const tabs = [
  { id: "exhibition", label: "Exhibition" },
  { id: "client-visit", label: "Client Visit" },
  { id: "inspection", label: "Customer Inspection" },
]

interface TrustGalleryProps {
  data?: TrustSectionData | null
}

export function TrustGallery({ data }: TrustGalleryProps) {
  const [activeTab, setActiveTab] = useState("exhibition")

  const exhibitionImages = (data?.exhibitionImages ?? []).filter(Boolean) as string[]
  const clientVisitImages = (data?.clientVisitImages ?? []).filter(Boolean) as string[]

  const inspectionImageUrl = data?.inspectionImageUrl ?? "/images/customer-inspection.jpg"

  return (
    <section className="bg-white py-16 lg:py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-[#FBA026] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Global Presence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Our Global Presence
          </h2>
          <p className="mt-3 text-base text-slate-500 max-w-2xl mx-auto">
            Building lasting relationships through quality and transparency
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-10">
          <div className="inline-flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50/80 p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-white text-[#FBA026] shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {activeTab === tab.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBA026] shrink-0" />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "exhibition" && (
          exhibitionImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibitionImages.map((src, i) => (
                <div
                  key={src}
                  className="aspect-[4/3] relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm"
                >
                  <Image src={src} alt={`Exhibition ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-slate-500 text-sm border border-slate-200 rounded-lg bg-slate-50">
              No exhibition images yet. Please upload in Sanity.
            </div>
          )
        )}

        {activeTab === "client-visit" && (
          clientVisitImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientVisitImages.map((src, i) => (
                <div
                  key={src}
                  className="aspect-[4/3] relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-sm"
                >
                  <Image src={src} alt={`Client visit ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-slate-500 text-sm border border-slate-200 rounded-lg bg-slate-50">
              No client visit images yet. Please upload in Sanity.
            </div>
          )
        )}

        {activeTab === "inspection" && (
          <div className="flex justify-center">
            <div className="relative aspect-[4/3] w-full max-w-3xl rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image src={inspectionImageUrl} alt="Customer inspection at factory" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
