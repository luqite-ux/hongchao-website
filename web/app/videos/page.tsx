import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoDemo } from "@/components/video-demo"
import { sanityClient } from "@/lib/sanity.client"
import { videosQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"

export const metadata: Metadata = {
  title: "Product Demonstration Videos - HONGCHAO Industrial Feeders",
  description: "Technical demonstration videos of vibratory bowl feeders, centrifugal feeders, step feeders, and elevator hoppers for industrial automation applications.",
}

type SanityVideo = {
  _id: string
  title: string
  description?: string | null
  source: "upload" | "youtube" | "vimeo" | "url"
  videoId?: string | null
  url?: string | null
  videoFileUrl?: string | null
  coverImage?: unknown
}

function getPlayableProps(v: SanityVideo) {
  const videoUrl =
    (v.source === "upload" && v.videoFileUrl) || (v.source === "url" && v.url)
      ? (v.videoFileUrl || v.url)!
      : undefined
  const videoId = (v.source === "youtube" || v.source === "vimeo") ? v.videoId ?? undefined : undefined
  const videoSource = v.source === "vimeo" ? "vimeo" as const : "youtube" as const
  return { videoUrl, videoId, videoSource }
}

export default async function VideosPage() {
  const videos = await sanityClient.fetch<SanityVideo[]>(videosQuery, {}, { next: { revalidate: 60 } })

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#1F1F1F] text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs text-white/50 hover:text-[#F6A12A] transition-colors mb-8 uppercase tracking-wider"
          >
            <ArrowLeft className="mr-2 h-3 w-3" />
            Home
          </Link>
          <div className="max-w-3xl">
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Technical Library
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Product Demonstration Videos
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              Technical demonstrations of our feeding systems handling real industrial components.
              Each video shows actual part feeding behavior, orientation methods, and system performance.
            </p>
          </div>
        </div>
      </section>

      {/* Video Library from Sanity Studio */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {videos.length === 0 ? (
            <div className="py-16 text-center text-[#6B6B6B]">
              <p className="text-lg">No demonstration videos have been added yet.</p>
              <p className="mt-2 text-sm">Add videos in Sanity Studio (视频) to display them here.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {videos.map((video) => {
                const { videoUrl, videoId, videoSource } = getPlayableProps(video)
                return (
                  <VideoDemo
                    key={video._id}
                    title={video.title}
                    description={video.description ?? ""}
                    videoUrl={videoUrl}
                    videoId={videoId}
                    videoSource={videoSource}
                    thumbnailPath={video.coverImage ? urlForImage(video.coverImage).width(800).url() : undefined}
                  />
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#1F1F1F]">
              Need a Custom Feeding Solution?
            </h2>
            <p className="mt-4 text-[#6B6B6B]">
              Send us your part samples and we will create a demonstration video
              showing how our systems handle your specific components.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                <Link href="/contact">
                  Request Custom Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
