import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ApplicationCase() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[#FBA026] font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Application
            </p>
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl tracking-tight">
              Automotive Fastener Feeding System
            </h2>
            <div className="mt-8 space-y-8">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Industry</span>
                <span className="text-sm text-slate-800 font-medium">Automotive</span>
              </div>
              <div className="border-l-2 border-slate-200 pl-6">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Challenge</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  High-speed and stable feeding of small fasteners with strict noise control requirements.
                </p>
              </div>
              <div className="border-l-2 border-[#FBA026] pl-6">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Solution</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Custom vibratory bowl feeder integrated with linear feeder and elevator hopper.
                </p>
              </div>
              <div className="border-l-2 border-slate-200 pl-6">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Result</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Improved feeding stability, reduced noise, and increased assembly line efficiency.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold rounded-lg h-12 px-8">
                <Link href="/contact">
                  Discuss Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden border border-slate-200 rounded-lg bg-white shadow-sm">
              <Image
                src="/images/case-automotive.png"
                alt="Automotive fastener feeding system application"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 rounded-lg shadow-md px-4 py-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">System Type</p>
              <p className="text-sm font-medium text-slate-800 mt-0.5">Integrated Feeding Line</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
