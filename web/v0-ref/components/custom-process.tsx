"use client"

import { MessageSquare, FileSearch, PenTool, Factory, PackageCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Share your requirements and challenges with our engineering team.",
    icon: MessageSquare
  },
  {
    number: "02",
    title: "Analysis",
    description: "We analyze your parts and production environment thoroughly.",
    icon: FileSearch
  },
  {
    number: "03",
    title: "Design",
    description: "Custom solution design with 3D modeling and simulation.",
    icon: PenTool
  },
  {
    number: "04",
    title: "Manufacturing",
    description: "Precision manufacturing in our state-of-the-art facility.",
    icon: Factory
  },
  {
    number: "05",
    title: "Delivery",
    description: "Installation, testing, and ongoing technical support.",
    icon: PackageCheck
  }
]

export function CustomProcess() {
  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FBA026] text-sm font-semibold uppercase tracking-wider mb-4">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight">
            Custom Process
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            From initial consultation to final delivery, we ensure excellence at every step
          </p>
        </div>

        {/* Desktop Process Flow - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-[10%] right-[10%] h-px bg-slate-200">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FBA026]/0 via-[#FBA026] to-[#FBA026]/0 opacity-50" />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div className="flex flex-col items-center text-center">
                    {/* Icon Circle */}
                    <div className="relative z-10 w-32 h-32 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm group hover:border-[#FBA026] hover:shadow-lg transition-all duration-300">
                      <step.icon className="w-12 h-12 text-slate-400 group-hover:text-[#FBA026] transition-colors" />
                      {/* Number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FBA026] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-lg font-semibold text-slate-800">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 -right-2 transform translate-x-1/2 z-20">
                      <div className="w-4 h-4 border-t-2 border-r-2 border-[#FBA026] rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Process Flow - Vertical */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute top-0 bottom-0 left-8 w-px bg-slate-200">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FBA026] via-[#FBA026]/50 to-[#FBA026]" />
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative flex gap-6">
                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
                    <step.icon className="w-7 h-7 text-[#FBA026]" />
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FBA026] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
