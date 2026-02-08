"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface VideoDemoProps {
  title: string
  description: string
  partType?: string
  feedingBehavior?: string
  applicationContext?: string
  thumbnailPath?: string
  /** YouTube 或 Vimeo 的视频 ID（用于嵌入） */
  videoId?: string
  /** 来源：youtube | vimeo，用于选择嵌入方式 */
  videoSource?: 'youtube' | 'vimeo'
  /** 直接视频地址（本地上传或 URL 来源），用 HTML5 video 播放 */
  videoUrl?: string
}

export function VideoDemo({
  title,
  description,
  partType,
  feedingBehavior,
  applicationContext,
  thumbnailPath = "/images/video-placeholder.jpg",
  videoId,
  videoSource = 'youtube',
  videoUrl,
}: VideoDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const hasVideo = Boolean(videoId || videoUrl)
  const embedSrc =
    videoSource === 'vimeo' && videoId
      ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
      : videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        : null

  return (
    <div className="border border-[#E5E5E5] bg-white">
      {/* Video Container */}
      <div className="aspect-video bg-[#1F1F1F] relative overflow-hidden">
        {isPlaying && videoUrl ? (
          <video
            src={videoUrl}
            title={title}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : isPlaying && embedSrc ? (
          <iframe
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group cursor-pointer"
            aria-label={`Play ${title}`}
          >
            {/* Placeholder Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F]" />
            
            {/* Play Button */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#F6A12A] group-hover:border-[#F6A12A] transition-colors">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
            
            {/* Sample Label */}
            <p className="relative z-10 mt-4 text-xs text-white/40 uppercase tracking-wider">
              Sample Demonstration Video
            </p>
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#1F1F1F]">{title}</h3>
        <p className="mt-2 text-sm text-[#6B6B6B] leading-relaxed">{description}</p>
        
        {/* Technical Details */}
        {(partType || feedingBehavior || applicationContext) && (
          <div className="mt-4 pt-4 border-t border-[#E5E5E5] grid sm:grid-cols-3 gap-4">
            {partType && (
              <div>
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Part Type</p>
                <p className="text-xs text-[#1F1F1F] mt-1 font-medium">{partType}</p>
              </div>
            )}
            {feedingBehavior && (
              <div>
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Feeding Behavior</p>
                <p className="text-xs text-[#1F1F1F] mt-1 font-medium">{feedingBehavior}</p>
              </div>
            )}
            {applicationContext && (
              <div>
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Application</p>
                <p className="text-xs text-[#1F1F1F] mt-1 font-medium">{applicationContext}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
