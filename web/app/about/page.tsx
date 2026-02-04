import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Factory, Award, Globe, Users, Target, Eye, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchSiteSettings } from "@/lib/site-settings"
import { urlForImage } from "@/lib/sanity.image"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()
  const companyName = settings?.companyName || "HONGCHAO"
  return {
    title: `About Us - ${companyName} Automation Equipment`,
    description: `Learn about ${settings?.companyName || "Suzhou Hongchao Automation Equipment Co., Ltd."} - A leading manufacturer of vibratory bowl feeders and automated feeding systems since 2005.`,
  }
}

const DEFAULT_COMPANY = "HONGCHAO"
const milestones = [
  { year: "2005", event: "Company founded in Suzhou, China" },
  { year: "Present", event: "16 patents accepted (8 invention + 8 utility model)" },
]

const values = [
  {
    icon: Target,
    title: "Customer Focus",
    description: "Every solution is engineered to solve your specific challenges and exceed your expectations.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Rigorous quality control and testing ensure reliable performance and long service life.",
  },
  {
    icon: Factory,
    title: "Innovation",
    description: "Continuous R&D investment drives our 16 patents and industry-leading solutions.",
  },
  {
    icon: Globe,
    title: "Global Partnership",
    description: "We build long-term relationships with customers through responsive support worldwide.",
  },
]

const certifications = [
  "16 Patents (8 Invention + 8 Utility Model)",
]

export default async function AboutPage() {
  const settings = await fetchSiteSettings()
  const companyName = settings?.companyName || DEFAULT_COMPANY
  const logoSrc = settings?.logo ? urlForImage(settings.logo).width(300).height(300).url() : "/logo.png"

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                About {companyName}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                Engineering Excellence Since 2005
              </h1>
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                {companyName} is a modern high-tech manufacturing 
                enterprise specializing in the research, development, manufacturing, and sales of 
                non-standard automatic feeding systems. With strong technical strength and continuous 
                innovation, {companyName} has grown into a globally recognized manufacturer.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-semibold bg-transparent">
                  <Link href="/technology">
                    Our Technology
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-background/10 flex items-center justify-center">
                <Image
                  src={logoSrc}
                  alt={`${companyName} Logo`}
                  width={300}
                  height={300}
                  className="opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-foreground">2005</p>
              <p className="mt-1 text-primary-foreground/80">Founded</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-foreground">16+</p>
              <p className="mt-1 text-primary-foreground/80">Patents</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-foreground">1000+</p>
              <p className="mt-1 text-primary-foreground/80">Projects</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-foreground">50+</p>
              <p className="mt-1 text-primary-foreground/80">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To empower manufacturers worldwide with innovative, reliable feeding solutions 
                  that optimize production efficiency, reduce costs, and enable them to achieve 
                  their quality and throughput goals.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in automated feeding technology, recognized for our 
                  engineering excellence, customer partnership, and commitment to advancing the 
                  future of manufacturing automation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center border-border">
                <CardHeader>
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Key milestones in {companyName}&apos;s growth story.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-secondary p-6 rounded-lg inline-block">
                      <p className="text-2xl font-bold text-primary">{milestone.year}</p>
                      <p className="text-muted-foreground mt-1">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-4 w-4 rounded-full bg-primary flex-shrink-0 relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team / Facility */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Our Team & Facilities
              </p>
              <h2 className="text-3xl font-bold text-background sm:text-4xl text-balance">
                World-Class Manufacturing
              </h2>
              <p className="mt-4 text-lg text-background/80 leading-relaxed">
                Our modern manufacturing facility in Suzhou, China houses state-of-the-art CNC 
                equipment, precision assembly areas, and comprehensive testing facilities. Our team 
                of experienced engineers and skilled technicians work together to deliver exceptional 
                feeding solutions.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "5,000+ sqm manufacturing facility",
                  "Advanced CNC machining centers",
                  "In-house tooling design and fabrication",
                  "Complete testing and validation lab",
                  "Experienced engineering team",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-background/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] bg-background/10 rounded-lg flex items-center justify-center">
              <Users className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground">Quality Certifications</h3>
              <p className="text-muted-foreground mt-1">Meeting global standards for quality and compliance.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {certifications.map((cert) => (
                <div key={cert} className="px-6 py-3 bg-background rounded-lg border border-border">
                  <span className="font-medium text-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready to Partner with {companyName}?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Let us show you how our feeding solutions can optimize your production.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold bg-transparent">
                <Link href="/products">
                  View Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
