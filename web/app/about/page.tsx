import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Factory, Award, Globe, Target, Eye, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CertificationCard } from "@/components/certification-card"
import { GlobalPresenceMap } from "@/components/global-presence-map"
import { TrustSection } from "@/components/trust-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { fetchSiteSettings } from "@/lib/site-settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()
  const companyName = settings?.companyName || "HONGCHAO"
  return {
    title: `About Us - ${companyName} Automation Equipment`,
    description: `Learn about ${settings?.companyName || "Suzhou Hongchao Automation Equipment Co., Ltd."} - A leading manufacturer of vibratory bowl feeders and automated feeding systems since 2005.`,
  }
}

const DEFAULT_COMPANY = "HONGCHAO"

const qualityCertifications = [
  {
    title: "Quality Management System Certificate",
    issuer: "YAB (扬标认证)",
    standard: "GB/T19001-2016 / ISO 9001:2015",
    scope: "Production of vibratory bowl feeder",
    validUntil: "2027-01-30",
    image: "/images/about/cert-iso9001.png",
  },
  {
    title: "Machinery Directive Attestation of Conformity",
    issuer: "UDEM International Certification",
    standard: "2006/42/EC Machinery Directive / Annex VIII",
    scope: "EN ISO 12100:2010; EN 60204-1:2018 · Vibration bowl feeder (HC series)",
    validUntil: "2028-11-13",
    image: "/images/about/cert-machinery.png",
  },
  {
    title: "计算机软件著作权登记证书",
    issuer: "国家版权局",
    standard: "宏超智能供料控制系统软件 V1.0",
    scope: "软著登字第14952119号 · 全部权利",
    validUntil: "2025-02-20",
    image: "/images/about/cert-software.png",
  },
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
    description: "Continuous R&D investment drives our 11 Patents and industry-leading solutions.",
  },
  {
    icon: Globe,
    title: "Global Partnership",
    description: "We build long-term relationships with customers through responsive support worldwide.",
  },
]

export default async function AboutPage() {
  const settings = await fetchSiteSettings()
  const companyName = settings?.companyName || DEFAULT_COMPANY

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#FBA026] font-semibold text-sm uppercase tracking-wider mb-4">
                About {companyName}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance text-slate-800">
                Engineering Excellence Since 2005
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                {companyName} is a modern high-tech manufacturing 
                enterprise specializing in the research, development, manufacturing, and sales of 
                non-standard automatic feeding systems. With strong technical strength and continuous 
                innovation, {companyName} has grown into a globally recognized manufacturer.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold">
                  <Link href="/technology">
                    Our Technology
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white border border-slate-100 relative">
                <video
                  src="https://d1c6gk3tn6ydje.cloudfront.net/1686395436736225280%2F5c588a42c0832627edc50a89de5be982.mp4"
                  poster="/images/about/video-poster.jpg"
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#FBA026]">2005</p>
              <p className="mt-1 text-slate-500">Founded</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FBA026]">11</p>
              <p className="mt-1 text-slate-500">Patents</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FBA026]">1000+</p>
              <p className="mt-1 text-slate-500">Projects</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FBA026]">50+</p>
              <p className="mt-1 text-slate-500">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Our Global Presence
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Serving clients across 50+ countries with precision-engineered solutions and local support.
            </p>
          </div>
          <GlobalPresenceMap />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-slate-100 shadow-sm">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-[#FBA026]/10 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-[#FBA026]" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  To empower manufacturers worldwide with innovative, reliable feeding solutions 
                  that optimize production efficiency, reduce costs, and enable them to achieve 
                  their quality and throughput goals.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-100 shadow-sm">
              <CardHeader>
                <div className="h-14 w-14 rounded-lg bg-[#FBA026]/10 flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-[#FBA026]" />
                </div>
                <CardTitle className="text-2xl text-slate-800">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
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
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center border-slate-100 bg-white">
                <CardHeader>
                  <div className="h-14 w-14 rounded-full bg-[#FBA026]/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-[#FBA026]" />
                  </div>
                  <CardTitle className="text-lg text-slate-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Quality Certifications
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Meeting global standards for quality and compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {qualityCertifications.map((cert) => (
              <CertificationCard key={cert.title} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Team / Facility */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#FBA026] font-semibold text-sm uppercase tracking-wider mb-3">
                Our Team & Facilities
              </p>
              <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl text-balance">
                World-Class Manufacturing
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
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
                    <CheckCircle className="h-5 w-5 text-[#FBA026]" />
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-white border border-slate-100">
              <Image
                src="/images/about/company-profile.jpg"
                alt={`${companyName} company profile`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials (按需挂载：关于页底部) */}
      <TrustSection />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl text-balance">
              Ready to Partner with {companyName}?
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Let us show you how our feeding solutions can optimize your production.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
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
