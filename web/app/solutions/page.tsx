import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Factory, Settings, Wrench, Truck, Headphones, CheckCircle, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Solutions - Custom Feeding Systems & Integration Services",
  description: "HONGCHAO provides end-to-end solutions including custom engineering, system integration, installation, training, and ongoing support for automated feeding systems.",
}

const solutions = [
  {
    icon: Settings,
    title: "Custom Engineering",
    description: "Every feeding challenge is unique. Our engineering team designs custom tooling and systems tailored to your specific part geometry, material properties, and production requirements.",
    features: [
      "3D CAD design and simulation",
      "Custom bowl tooling development",
      "Prototype testing and validation",
      "Integration engineering",
    ],
  },
  {
    icon: Cog,
    title: "System Integration",
    description: "We integrate feeding systems seamlessly into your existing production line, ensuring optimal communication between feeders, robots, conveyors, and PLCs.",
    features: [
      "PLC programming and integration",
      "Robot interface development",
      "Conveyor synchronization",
      "HMI design and implementation",
    ],
  },
  {
    icon: Wrench,
    title: "Installation & Commissioning",
    description: "Our technicians handle complete installation, calibration, and commissioning to ensure your feeding system operates at peak performance from day one.",
    features: [
      "On-site installation",
      "System calibration",
      "Performance validation",
      "Documentation and training",
    ],
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Comprehensive after-sales support including remote diagnostics, spare parts supply, and on-site service to minimize downtime and maximize productivity.",
    features: [
      "24/7 remote support",
      "Spare parts inventory",
      "Preventive maintenance",
      "Performance optimization",
    ],
  },
]

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "We analyze your parts, production requirements, and integration needs to understand the full scope of your project.",
  },
  {
    step: "02",
    title: "Engineering",
    description: "Our team designs custom tooling and system architecture, using simulation to validate performance before manufacturing.",
  },
  {
    step: "03",
    title: "Manufacturing",
    description: "Precision manufacturing of bowl tooling, frames, and components using advanced CNC and quality control processes.",
  },
  {
    step: "04",
    title: "Testing",
    description: "Complete system testing with your actual parts to verify feed rate, orientation accuracy, and reliability targets.",
  },
  {
    step: "05",
    title: "Installation",
    description: "Professional installation at your facility with full integration into your production line and control systems.",
  },
  {
    step: "06",
    title: "Support",
    description: "Ongoing technical support, maintenance, and optimization services to ensure long-term system performance.",
  },
]

const turnkey = [
  "Complete system design and engineering",
  "Custom bowl tooling for your specific parts",
  "Linear feeders and track systems",
  "Hopper and bulk feeding solutions",
  "Sound enclosures for noise reduction",
  "Control systems with HMI interface",
  "Robot and PLC integration",
  "Installation and commissioning",
  "Operator training and documentation",
  "Warranty and ongoing support",
]

export default function SolutionsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Solutions
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              End-to-End Feeding Solutions
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              From initial consultation to ongoing support, HONGCHAO provides comprehensive 
              solutions that ensure your automated feeding systems deliver optimal performance 
              throughout their lifecycle.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Comprehensive Service Offerings
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We support you at every stage, from concept development to long-term maintenance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.title} className="border-border hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <solution.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription className="text-base">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our Process
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              From Concept to Production
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our proven 6-step process ensures successful project delivery every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-background rounded-lg p-6 border border-border h-full">
                  <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Solutions */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Turnkey Systems
              </p>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Complete Feeding Systems Ready to Run
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Our turnkey solutions include everything needed for a fully operational 
                feeding system. From initial design to final commissioning, we handle 
                every detail so you can focus on production.
              </p>
              <div className="mt-10">
                <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                  <Link href="/contact">
                    Get a Turnkey Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-8 border border-border">
              <h3 className="font-semibold text-foreground mb-6">Turnkey Package Includes:</h3>
              <ul className="space-y-3">
                {turnkey.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Support */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-lg bg-background/10 flex items-center justify-center">
                <Truck className="h-32 w-32 text-primary/40" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Global Reach
              </p>
              <h2 className="text-3xl font-bold text-background sm:text-4xl text-balance">
                Worldwide Service & Support
              </h2>
              <p className="mt-4 text-lg text-background/80 leading-relaxed">
                With branches and authorized agents across the globe, HONGCHAO provides 
                local support wherever you operate. Our international team ensures fast 
                response times and seamless communication in your language.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-background/70">Countries Served</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-background/70">Remote Support</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">48h</p>
                  <p className="text-background/70">Parts Shipping</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">1yr</p>
                  <p className="text-background/70">Standard Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Ready to Discuss Your Feeding Challenges?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Our engineering team is ready to analyze your requirements and propose the optimal solution.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/contact">
                  Request Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold bg-transparent">
                <Link href="/case-studies">
                  View Case Studies
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
