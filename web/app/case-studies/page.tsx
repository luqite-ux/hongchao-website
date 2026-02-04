import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Factory, Car, Cpu, Stethoscope, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Case Studies - Feeding System Success Stories",
  description: "Explore real-world examples of how HONGCHAO feeding systems have improved efficiency, quality, and throughput for manufacturers worldwide.",
}

const caseStudies = [
  {
    slug: "automotive-fastener-feeding",
    title: "Automotive Fastener Assembly Line Optimization",
    industry: "Automotive",
    icon: Car,
    challenge: "A leading automotive manufacturer needed to increase fastener feeding rate by 40% while maintaining zero-defect quality.",
    solution: "Custom high-speed vibratory bowl feeder with advanced tooling and vision inspection system.",
    results: [
      { metric: "40%", label: "Throughput Increase" },
      { metric: "99.9%", label: "Feed Accuracy" },
      { metric: "6mo", label: "ROI Achieved" },
    ],
    featured: true,
  },
  {
    slug: "electronics-connector-handling",
    title: "Precision Connector Feeding for PCB Assembly",
    industry: "Electronics",
    icon: Cpu,
    challenge: "Electronics manufacturer required gentle handling of delicate connectors with exact orientation for robotic placement.",
    solution: "Step feeder system with ESD-safe construction and precision linear track for robot integration.",
    results: [
      { metric: "200", label: "Parts/Minute" },
      { metric: "100%", label: "Orientation Accuracy" },
      { metric: "Zero", label: "Part Damage" },
    ],
    featured: true,
  },
  {
    slug: "medical-device-assembly",
    title: "Medical Device Component Feeding System",
    industry: "Medical Devices",
    icon: Stethoscope,
    challenge: "Medical device company needed FDA-compliant feeding system for syringe assembly with full traceability.",
    solution: "Stainless steel vibratory system with validation documentation and IoT connectivity.",
    results: [
      { metric: "FDA", label: "Compliant" },
      { metric: "150", label: "Parts/Minute" },
      { metric: "100%", label: "Traceability" },
    ],
    featured: true,
  },
  {
    slug: "cosmetics-cap-feeding",
    title: "High-Volume Cosmetics Packaging Line",
    industry: "Consumer Goods",
    icon: Package,
    challenge: "Cosmetics company required flexible feeding for multiple cap styles with rapid changeover capability.",
    solution: "Flexible feeder platform with vision-guided sorting and quick-change tooling.",
    results: [
      { metric: "5min", label: "Changeover Time" },
      { metric: "8", label: "Part Types Handled" },
      { metric: "35%", label: "Efficiency Gain" },
    ],
    featured: false,
  },
  {
    slug: "pharmaceutical-bottle-feeding",
    title: "Pharmaceutical Bottle Handling System",
    industry: "Pharmaceutical",
    icon: Factory,
    challenge: "Pharmaceutical company needed cGMP-compliant feeding for various bottle sizes in packaging line.",
    solution: "Sanitary step feeder with wash-down design and automatic size adjustment.",
    results: [
      { metric: "cGMP", label: "Compliant" },
      { metric: "4", label: "Bottle Sizes" },
      { metric: "50%", label: "Labor Reduction" },
    ],
    featured: false,
  },
  {
    slug: "hardware-screw-sorting",
    title: "Multi-Size Fastener Sorting System",
    industry: "Hardware",
    icon: Factory,
    challenge: "Hardware distributor needed automated sorting of mixed fasteners into separate feeding lines.",
    solution: "Chain elevator hopper with multi-track bowl feeder system and AI-powered sorting.",
    results: [
      { metric: "12", label: "Screw Types" },
      { metric: "500+", label: "Parts/Minute" },
      { metric: "99.5%", label: "Sort Accuracy" },
    ],
    featured: false,
  },
]

const industries = [
  { id: "all", label: "All Industries" },
  { id: "automotive", label: "Automotive" },
  { id: "electronics", label: "Electronics" },
  { id: "medical", label: "Medical Devices" },
  { id: "pharmaceutical", label: "Pharmaceutical" },
  { id: "consumer", label: "Consumer Goods" },
  { id: "hardware", label: "Hardware" },
]

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Case Studies
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Real Results for Real Manufacturers
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              Discover how leading manufacturers across industries have improved their 
              production efficiency with HONGCHAO feeding systems.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-secondary border-b border-border py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Badge
                key={industry.id}
                variant={industry.id === "all" ? "default" : "outline"}
                className={`cursor-pointer ${industry.id === "all" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
              >
                {industry.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Case Studies</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies
              .filter((cs) => cs.featured)
              .map((study) => (
                <Card key={study.slug} className="flex flex-col border-border hover:border-primary/30 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <study.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{study.industry}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="mb-6">{study.challenge}</CardDescription>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.results.map((result) => (
                        <div key={result.label} className="text-center">
                          <p className="text-xl font-bold text-primary">{result.metric}</p>
                          <p className="text-xs text-muted-foreground">{result.label}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-[#D4871F] transition-colors"
                    >
                      Read Full Case Study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Case Studies */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">More Success Stories</h2>
          <div className="space-y-6">
            {caseStudies
              .filter((cs) => !cs.featured)
              .map((study) => (
                <Card key={study.slug} className="border-border hover:border-primary/30 transition-colors">
                  <div className="grid md:grid-cols-4 gap-6 p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <study.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">{study.industry}</Badge>
                        <h3 className="font-semibold text-foreground">{study.title}</h3>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="flex gap-4">
                        {study.results.slice(0, 2).map((result) => (
                          <div key={result.label} className="text-center">
                            <p className="text-lg font-bold text-primary">{result.metric}</p>
                            <p className="text-xs text-muted-foreground">{result.label}</p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-[#D4871F] transition-colors"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready to Write Your Success Story?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Contact our engineering team to discuss how we can help optimize your feeding operations.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/contact">
                  Request a Consultation
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
