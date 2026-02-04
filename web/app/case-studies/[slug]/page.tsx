import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Factory, CheckCircle, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${title} - Case Study`,
    description: `Learn how HONGCHAO helped improve feeding efficiency in this detailed case study.`,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm text-background/70 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Automotive</Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                {title}
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                A leading automotive manufacturer partnered with HONGCHAO to dramatically 
                improve their fastener feeding efficiency while maintaining zero-defect quality standards.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-background/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">40%</p>
                <p className="text-sm text-background/70 mt-1">Throughput Increase</p>
              </div>
              <div className="text-center p-6 bg-background/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">99.9%</p>
                <p className="text-sm text-background/70 mt-1">Feed Accuracy</p>
              </div>
              <div className="text-center p-6 bg-background/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">6mo</p>
                <p className="text-sm text-background/70 mt-1">ROI Achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our client, a major automotive tier-1 supplier, was experiencing bottlenecks in their 
                  fastener assembly line. Their existing feeding system could only achieve 60% of the 
                  target feed rate, and occasional misoriented parts were causing downstream quality issues 
                  and line stoppages.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  They needed a solution that could increase throughput by 40% while maintaining 
                  zero-defect quality standards required for automotive supply chain compliance.
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  HONGCHAO engineering team conducted a thorough analysis of the fastener geometry 
                  and production requirements. We designed a custom high-speed vibratory bowl feeder 
                  with advanced tooling optimized for the specific fastener dimensions.
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    "Custom bowl tooling with optimized track geometry",
                    "High-frequency drive base for maximum feed rate",
                    "Inline vision inspection system for 100% orientation verification",
                    "Automatic reject mechanism for misoriented parts",
                    "Sound enclosure for operator comfort",
                    "Integration with existing PLC and robot systems",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-border">
                <Factory className="h-24 w-24 text-primary/30" />
              </div>

              {/* Implementation */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Implementation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The project was completed in 12 weeks from initial design to full production. Our team 
                  worked closely with the client throughout the process to ensure seamless integration 
                  with their existing automation systems.
                </p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground">Phase 1: Engineering</h4>
                    <p className="text-sm text-muted-foreground mt-2">4 weeks - Part analysis, design, simulation</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground">Phase 2: Manufacturing</h4>
                    <p className="text-sm text-muted-foreground mt-2">5 weeks - Bowl tooling, system assembly</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground">Phase 3: Testing</h4>
                    <p className="text-sm text-muted-foreground mt-2">2 weeks - Factory acceptance testing</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground">Phase 4: Installation</h4>
                    <p className="text-sm text-muted-foreground mt-2">1 week - Installation, commissioning, training</p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Results</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The new feeding system exceeded all performance targets within the first month of 
                  operation. The client achieved their throughput goals while eliminating quality issues 
                  related to part orientation.
                </p>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-4xl font-bold text-primary">40%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Increase in throughput, exceeding the 40% target</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-4xl font-bold text-primary">99.9%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Feed accuracy with inline vision inspection</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-4xl font-bold text-primary">0</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Line stoppages due to feeding issues</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-4xl font-bold text-primary">6mo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Return on investment achieved</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Testimonial */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <Quote className="h-10 w-10 text-primary/40 mb-4" />
                  <blockquote className="text-lg text-foreground italic leading-relaxed">
                    &quot;HONGCHAO delivered exactly what we needed - a reliable, high-speed feeding system 
                    that integrated perfectly with our existing automation. The ROI was faster than 
                    we projected, and we&apos;ve had zero quality issues since installation.&quot;
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-semibold text-foreground">Production Engineering Manager</p>
                    <p className="text-sm text-muted-foreground">Global Automotive Tier-1 Supplier</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p className="font-medium text-foreground">Automotive</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Application</p>
                    <p className="font-medium text-foreground">Fastener Assembly</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product Type</p>
                    <p className="font-medium text-foreground">High-Speed Bowl Feeder</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Project Duration</p>
                    <p className="font-medium text-foreground">12 Weeks</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Germany</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Have a Similar Challenge?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90 mb-6">
                    Let us analyze your feeding requirements and propose an optimized solution.
                  </p>
                  <Button asChild variant="secondary" className="w-full font-semibold">
                    <Link href="/contact">
                      Request a Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/products/vibration-bowl-feeder" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Vibration Bowl Feeder</p>
                    <p className="text-sm text-muted-foreground">High-speed feeding systems</p>
                  </Link>
                  <Link href="/products/vibratory-bowl-drive" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Vibratory Bowl Drive</p>
                    <p className="text-sm text-muted-foreground">Precision drive bases</p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Explore More Success Stories</h2>
              <p className="text-muted-foreground mt-1">See how other manufacturers have improved their operations.</p>
            </div>
            <Button asChild size="lg" variant="outline" className="font-semibold bg-transparent">
              <Link href="/case-studies">
                View All Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
