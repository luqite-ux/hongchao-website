"use client"

import { Play, Globe, Award, Users, Factory } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Award,
    title: "11 Patents",
    description: "Industry-leading innovations"
  },
  {
    icon: Factory,
    title: "20,000m² Facility",
    description: "State-of-the-art manufacturing"
  },
  {
    icon: Users,
    title: "200+ Engineers",
    description: "Expert technical team"
  },
  {
    icon: Globe,
    title: "50+ Countries",
    description: "Global service network"
  }
]

// Simple world map SVG with highlighted regions
const WorldMapSVG = () => (
  <svg viewBox="0 0 1000 500" className="w-full h-full">
    {/* Background */}
    <rect width="1000" height="500" fill="#f8fafc" />
    
    {/* Simplified world map outlines */}
    <g fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5">
      {/* North America */}
      <path d="M 50 100 Q 100 80 150 90 Q 200 85 250 100 Q 280 120 300 160 Q 280 200 250 220 Q 200 250 150 240 Q 100 230 70 200 Q 50 160 50 100" />
      {/* South America */}
      <path d="M 200 280 Q 230 270 260 290 Q 280 340 270 400 Q 250 450 220 460 Q 180 440 170 380 Q 170 320 200 280" />
      {/* Europe */}
      <path d="M 450 80 Q 500 70 550 85 Q 580 100 570 140 Q 540 160 500 150 Q 460 140 450 110 Q 450 90 450 80" />
      {/* Africa */}
      <path d="M 470 180 Q 520 170 560 200 Q 580 260 560 340 Q 530 390 480 400 Q 430 380 420 320 Q 420 240 470 180" />
      {/* Asia */}
      <path d="M 580 60 Q 700 50 820 80 Q 880 120 900 180 Q 880 240 820 260 Q 740 280 660 250 Q 600 200 580 140 Q 570 100 580 60" />
      {/* Australia */}
      <path d="M 800 340 Q 860 330 900 360 Q 920 400 890 440 Q 840 460 790 440 Q 760 400 800 340" />
    </g>
    
    {/* Highlighted dots for presence - 50+ countries */}
    <g fill="#FBA026">
      {/* North America */}
      <circle cx="120" cy="140" r="6" opacity="0.9" />
      <circle cx="180" cy="160" r="5" opacity="0.8" />
      <circle cx="250" cy="180" r="5" opacity="0.8" />
      
      {/* South America */}
      <circle cx="220" cy="320" r="5" opacity="0.8" />
      <circle cx="240" cy="380" r="4" opacity="0.7" />
      
      {/* Europe */}
      <circle cx="480" cy="100" r="6" opacity="0.9" />
      <circle cx="520" cy="110" r="5" opacity="0.8" />
      <circle cx="550" cy="120" r="5" opacity="0.8" />
      <circle cx="500" cy="130" r="4" opacity="0.7" />
      
      {/* Africa */}
      <circle cx="500" cy="280" r="5" opacity="0.8" />
      <circle cx="530" cy="320" r="4" opacity="0.7" />
      
      {/* Asia - Main presence */}
      <circle cx="700" cy="120" r="8" opacity="1">
        <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="760" cy="140" r="6" opacity="0.9" />
      <circle cx="820" cy="160" r="5" opacity="0.8" />
      <circle cx="680" cy="180" r="5" opacity="0.8" />
      <circle cx="740" cy="200" r="5" opacity="0.8" />
      <circle cx="800" cy="180" r="4" opacity="0.7" />
      <circle cx="860" cy="140" r="4" opacity="0.7" />
      
      {/* Australia */}
      <circle cx="850" cy="380" r="5" opacity="0.8" />
      <circle cx="880" cy="400" r="4" opacity="0.7" />
    </g>
    
    {/* China highlight - HQ */}
    <circle cx="700" cy="120" r="16" fill="none" stroke="#FBA026" strokeWidth="2" opacity="0.5">
      <animate attributeName="r" values="16;22;16" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
    </circle>
    
    {/* Legend */}
    <g transform="translate(50, 420)">
      <circle cx="0" cy="0" r="5" fill="#FBA026" />
      <text x="15" y="4" fill="#64748b" fontSize="12" fontFamily="sans-serif">Active Markets</text>
      
      <circle cx="150" cy="0" r="8" fill="#FBA026" />
      <circle cx="150" cy="0" r="12" fill="none" stroke="#FBA026" strokeWidth="1" opacity="0.5" />
      <text x="170" y="4" fill="#64748b" fontSize="12" fontFamily="sans-serif">Headquarters (China)</text>
    </g>
  </svg>
)

export function AboutSection() {
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FBA026] text-sm font-semibold uppercase tracking-wider mb-4">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
            About Hongchao
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-3xl mx-auto text-pretty">
            Founded in 2005, Hongchao Automation has grown to become a global leader in custom parts feeding systems, serving clients across 50+ countries with precision-engineered solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="aspect-video bg-slate-200 rounded-xl overflow-hidden border border-slate-200 shadow-xl">
              {!videoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  {/* Video placeholder pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full" style={{
                      backgroundImage: `
                        linear-gradient(45deg, #64748b 25%, transparent 25%),
                        linear-gradient(-45deg, #64748b 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #64748b 75%),
                        linear-gradient(-45deg, transparent 75%, #64748b 75%)
                      `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }} />
                  </div>
                  
                  {/* Play button */}
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="relative z-10 w-20 h-20 bg-[#FBA026] rounded-full flex items-center justify-center shadow-lg shadow-[#FBA026]/30 hover:scale-110 transition-transform group"
                    aria-label="Play company video"
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </button>
                  
                  {/* Pulse animation */}
                  <div className="absolute w-20 h-20 bg-[#FBA026] rounded-full animate-ping opacity-20" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                  <p className="text-sm">Video Player Placeholder</p>
                </div>
              )}
            </div>

            {/* Video caption */}
            <p className="mt-4 text-center text-sm text-slate-500">
              Watch our company introduction video
            </p>
          </div>

          {/* Map & Features */}
          <div>
            {/* World Map */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#FBA026]" />
                Global Presence - 50+ Countries
              </h3>
              <div className="aspect-[2/1] rounded-lg overflow-hidden">
                <WorldMapSVG />
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:border-[#FBA026]/50 transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-[#FBA026] mb-3" />
                  <h4 className="font-semibold text-slate-800">{feature.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
