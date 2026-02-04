import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ApplicationCaseProps {
  imagePath?: string
}

export function ApplicationCase({ 
  imagePath = "/images/products/vibratory-bowl-feeder/application-01.jpg" 
}: ApplicationCaseProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#1F1F1F] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div>
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Application
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl tracking-tight">
              Automotive Fastener Feeding System
            </h2>
            
            <div className="mt-8 space-y-8">
              {/* Industry Tag */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Industry</span>
                <span className="text-sm text-white font-medium">Automotive</span>
              </div>
              
              {/* Challenge */}
              <div className="border-l-2 border-white/20 pl-6">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Challenge</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  High-speed and stable feeding of small fasteners with strict noise control requirements.
                </p>
              </div>
              
              {/* Solution */}
              <div className="border-l-2 border-[#F6A12A] pl-6">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Solution</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Custom vibratory bowl feeder integrated with linear feeder and elevator hopper.
                </p>
              </div>
              
              {/* Result */}
              <div className="border-l-2 border-white/20 pl-6">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Result</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Improved feeding stability, reduced noise, and increased assembly line efficiency.
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                <Link href="/contact">
                  Discuss Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden border border-white/10">
              <Image
                src={imagePath || "/placeholder.svg"}
                alt="Automotive fastener feeding system application"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#1F1F1F] border border-white/10 px-4 py-3">
              <p className="text-[10px] text-white/40 uppercase tracking-wider">System Type</p>
              <p className="text-sm font-medium text-white mt-0.5">Integrated Feeding Line</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
