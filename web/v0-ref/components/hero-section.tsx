"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23f1f5f9' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source 
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Semi-transparent light overlay */}
        <div className="absolute inset-0 bg-white/80" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/90" />
      </div>

      {/* Precision grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Since badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 mb-8">
          <div className="w-2 h-2 bg-[#FBA026] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-slate-600">Since 2005</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight leading-tight text-balance">
          {"We're experts in"}
          <span className="block text-[#FBA026]">custom parts feeding systems</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
          Precision-engineered automation solutions designed to optimize your production line efficiency and reduce operational costs.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg"
            className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold px-8 py-6 text-base"
          >
            Explore Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-6 text-base"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Video
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-400 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#FBA026] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
