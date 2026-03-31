"use client"

import Link from "next/link"
import { Play, Globe, Award, Users, ShieldCheck } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const DEFAULT_VIDEO_SRC = "/videos/company-intro.mp4"
const DEFAULT_POSTER_SRC = "/images/about/video-poster.jpg"

const features = [
  { icon: Award, value: "11 Patents", description: "Industry-leading innovations" },
  { icon: ShieldCheck, value: "CE certifications", description: "European conformity & quality standards" },
  { icon: Users, value: "R&D department", description: "Innovation & product development" },
  { icon: Globe, value: "50+ Countries", description: "Global service network" },
]

export function AboutSection({
  videoSrc,
  posterSrc,
}: {
  /** Sanity 上传视频的绝对 URL；缺省用本地默认文件 */
  videoSrc?: string | null
  /** 封面图 URL（可由服务端 urlForImage 生成）；缺省用本地默认图 */
  posterSrc?: string | null
} = {}) {
  const companyVideoSrc = videoSrc?.trim() || DEFAULT_VIDEO_SRC
  const companyPosterSrc = posterSrc?.trim() || DEFAULT_POSTER_SRC
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoPlaying && videoRef.current) videoRef.current.play()
  }, [videoPlaying])

  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/about" className="block text-left mb-12 group">
          <span className="inline-block text-[#FBA026] text-sm font-semibold uppercase tracking-wider mb-4 group-hover:underline">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight group-hover:text-slate-900">
            About Hongchao
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-3xl text-pretty">
            Founded in 2005, Hongchao Automation has grown to become a global leader in custom parts feeding systems, serving clients across 50+ countries with precision-engineered solutions.
          </p>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left: video，仅负责播放 */}
          <div className="aspect-video rounded-xl overflow-hidden bg-slate-200 shadow-lg relative w-full">
            {!videoPlaying ? (
              <button
                type="button"
                onClick={() => setVideoPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
                aria-label="Play company video"
              >
                <img
                  src={companyPosterSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 w-20 h-20 bg-[#FBA026] rounded-full flex items-center justify-center shadow-lg shadow-[#FBA026]/30 hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </button>
            ) : (
              <video
                ref={videoRef}
                src={companyVideoSrc}
                poster={companyPosterSrc}
                controls
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setVideoPlaying(false)}
              />
            )}
          </div>

          {/* Right: 2x2 data cards（整体点击跳转公司简介） */}
          <Link href="/about" className="grid grid-cols-2 gap-4 w-full">
            {features.map((item) => (
              <div
                key={item.value}
                className="bg-white rounded-xl p-5 border border-slate-100 hover:border-slate-200 transition-colors flex flex-col"
              >
                <item.icon className="w-9 h-9 text-[#FBA026] mb-3 shrink-0" />
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight leading-tight">
                  {item.value}
                </p>
                <p className="text-sm text-slate-500 mt-1.5">
                  {item.description}
                </p>
              </div>
            ))}
          </Link>
        </div>
      </div>
    </section>
  )
}
