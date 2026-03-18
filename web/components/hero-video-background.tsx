"use client"

/**
 * 首页 Hero 视频背景。指向 /videos/hero-bg.mp4，亮色蒙层洗白。
 */
const HERO_VIDEO_SRC = "/videos/hero-bg.mp4"

export function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        aria-hidden
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/70" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80" aria-hidden />
    </div>
  )
}
