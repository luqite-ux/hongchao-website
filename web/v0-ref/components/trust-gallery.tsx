"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "exhibition", label: "Exhibition", icon: "🏛" },
  { id: "client-visit", label: "Client Visit", icon: "🤝" },
  { id: "inspection", label: "Customer Inspection", icon: "🔍" },
]

const galleryImages = {
  exhibition: [
    { id: 1, title: "Canton Fair 2024", location: "Guangzhou, China" },
    { id: 2, title: "Hannover Messe", location: "Hannover, Germany" },
    { id: 3, title: "IMTS Chicago", location: "Chicago, USA" },
    { id: 4, title: "Automatica Munich", location: "Munich, Germany" },
    { id: 5, title: "Japan Robot Week", location: "Tokyo, Japan" },
    { id: 6, title: "SPS Nuremberg", location: "Nuremberg, Germany" },
  ],
  "client-visit": [
    { id: 1, title: "Bosch Engineering Team", location: "Stuttgart, Germany" },
    { id: 2, title: "Toyota Production", location: "Nagoya, Japan" },
    { id: 3, title: "Tesla Automation", location: "Fremont, USA" },
    { id: 4, title: "Samsung Electronics", location: "Seoul, Korea" },
    { id: 5, title: "Siemens AG", location: "Munich, Germany" },
    { id: 6, title: "Foxconn Technology", location: "Shenzhen, China" },
  ],
  inspection: [
    { id: 1, title: "Quality Audit - Q1", location: "Factory Floor A" },
    { id: 2, title: "ISO Certification", location: "Testing Lab" },
    { id: 3, title: "Client QC Review", location: "Assembly Line 3" },
    { id: 4, title: "Product Testing", location: "R&D Center" },
    { id: 5, title: "Final Inspection", location: "Shipping Dock" },
    { id: 6, title: "Performance Validation", location: "Test Chamber" },
  ],
}

export function TrustGallery() {
  const [activeTab, setActiveTab] = useState("exhibition")

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#FBA026] text-sm font-semibold uppercase tracking-wider mb-4">
            Trust & Quality
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
            Our Global Presence
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Building lasting relationships through quality and transparency
          </p>
        </div>

        {/* Tabs — underline indicator style */}
        <div className="flex flex-wrap justify-center mb-12">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages[activeTab as keyof typeof galleryImages].map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-slate-100 rounded-lg overflow-hidden aspect-[4/3] border border-slate-200 hover:border-[#FBA026]/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Placeholder image pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-slate-50 via-slate-100 to-slate-150 flex items-center justify-center">
                  <svg 
                    className="w-16 h-16 text-slate-300 group-hover:text-[#FBA026]/40 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold">{image.title}</h3>
                <p className="text-white/70 text-sm mt-1">{image.location}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-[#FBA026] transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
