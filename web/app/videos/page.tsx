import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoDemo } from "@/components/video-demo"

export const metadata: Metadata = {
  title: "Product Demonstration Videos - HONGCHAO Industrial Feeders",
  description: "Technical demonstration videos of vibratory bowl feeders, centrifugal feeders, step feeders, and elevator hoppers for industrial automation applications.",
}

const videoLibrary = [
  {
    category: "Vibratory Bowl Feeders",
    videos: [
      {
        title: "Vibratory Bowl Feeder for Brass Inserts",
        description: "Demonstrates precise orientation and feeding of threaded brass inserts used in injection molding applications. The bowl tooling separates tangled parts and orients them thread-down for automated insertion.",
        partType: "Threaded brass inserts (M4-M8)",
        feedingBehavior: "Orientation + singulation, 180 ppm",
        applicationContext: "Automotive injection molding",
      },
      {
        title: "Vibratory Bowl Feeder for Rubber O-Rings",
        description: "Shows gentle handling of elastic rubber O-rings without stretching or damage. Special bowl coating and low-amplitude vibration preserve part integrity during feeding.",
        partType: "Rubber O-rings (8-25mm OD)",
        feedingBehavior: "Gentle handling, 120 ppm",
        applicationContext: "Hydraulic component assembly",
      },
    ],
  },
  {
    category: "Centrifugal Feeders",
    videos: [
      {
        title: "Centrifugal Feeder for Plastic Caps",
        description: "High-speed feeding of lightweight plastic closures for beverage bottling lines. The centrifugal action rapidly orients caps top-up for capping machine integration.",
        partType: "PE/PP bottle caps (28mm)",
        feedingBehavior: "High-speed orientation, 500+ ppm",
        applicationContext: "Beverage packaging line",
      },
    ],
  },
  {
    category: "Step Feeders",
    videos: [
      {
        title: "Step Feeder for Glass Vials",
        description: "Demonstrates damage-free elevation and feeding of fragile glass pharmaceutical vials. The stepped conveying action eliminates part-to-part contact and prevents surface scratches.",
        partType: "Borosilicate glass vials (10ml)",
        feedingBehavior: "Zero-contact transport, 80 ppm",
        applicationContext: "Pharmaceutical filling line",
      },
    ],
  },
  {
    category: "Elevator Hoppers",
    videos: [
      {
        title: "Elevator Hopper for Metal Stampings",
        description: "Bulk elevation of heavy metal stampings from floor-level bins to overhead bowl feeders. Automatic level sensing maintains consistent bowl fill for uninterrupted production.",
        partType: "Steel stampings (50-80mm)",
        feedingBehavior: "Continuous bulk elevation",
        applicationContext: "Automotive stamping line",
      },
    ],
  },
]

export default function VideosPage() {
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

      {/* Video Library */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {videoLibrary.map((section) => (
              <div key={section.category}>
                <div className="mb-8 pb-4 border-b border-[#E5E5E5]">
                  <h2 className="text-2xl font-bold text-[#1F1F1F]">{section.category}</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {section.videos.map((video) => (
                    <VideoDemo
                      key={video.title}
                      title={video.title}
                      description={video.description}
                      partType={video.partType}
                      feedingBehavior={video.feedingBehavior}
                      applicationContext={video.applicationContext}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
