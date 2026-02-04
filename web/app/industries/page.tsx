import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Factory, Car, Cpu, Stethoscope, Package, Wrench, Pill, UtensilsCrossed, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Industries - Feeding Solutions for Every Sector",
  description: "HONGCHAO provides automated feeding solutions for automotive, electronics, medical devices, pharmaceutical, consumer goods, and aerospace industries.",
}

const industries = [
  {
    id: "automotive",
    icon: Car,
    title: "Automotive",
    description: "High-speed, reliable feeding systems for automotive assembly lines handling fasteners, clips, o-rings, and precision components.",
    parts: ["Fasteners & screws", "Plastic clips & retainers", "O-rings & seals", "Connector terminals", "Small molded parts"],
    benefits: ["High-speed feeding up to 1000+ ppm", "Zero-defect orientation", "24/7 operation capability", "Integration with robots and PLCs"],
  },
  {
    id: "electronics",
    icon: Cpu,
    title: "Electronics",
    description: "Precision feeding solutions for sensitive electronic components requiring careful handling and exact orientation.",
    parts: ["Connectors & terminals", "Capacitors & resistors", "IC packages", "PCB components", "Small metal parts"],
    benefits: ["ESD-safe options available", "Gentle part handling", "High precision orientation", "Clean room compatible"],
  },
  {
    id: "medical",
    icon: Stethoscope,
    title: "Medical Devices",
    description: "FDA-compliant feeding systems for medical device manufacturing with stringent quality and cleanliness requirements.",
    parts: ["Syringes & needles", "Caps & closures", "Diagnostic components", "Implant parts", "Assembly components"],
    benefits: ["Stainless steel construction", "Easy to clean design", "Validation documentation", "Traceability support"],
  },
  {
    id: "pharmaceutical",
    icon: Pill,
    title: "Pharmaceutical",
    description: "Hygienic feeding solutions for pharmaceutical packaging lines handling bottles, caps, vials, and tablets.",
    parts: ["Bottles & vials", "Caps & closures", "Ampoules", "Blister components", "Packaging materials"],
    benefits: ["cGMP compliant", "Stainless steel options", "Wash-down capable", "Dust containment"],
  },
  {
    id: "consumer",
    icon: Package,
    title: "Consumer Goods",
    description: "Versatile feeding systems for high-volume consumer product manufacturing and packaging operations.",
    parts: ["Caps & closures", "Spray triggers", "Cosmetic components", "Household items", "Personal care parts"],
    benefits: ["High throughput capacity", "Quick changeover", "Flexible tooling options", "Cost-effective solutions"],
  },
  {
    id: "hardware",
    icon: Wrench,
    title: "Hardware & Fasteners",
    description: "Robust feeding solutions for hardware and fastener manufacturing handling diverse part geometries.",
    parts: ["Screws & bolts", "Nuts & washers", "Pins & rivets", "Springs", "Stamped parts"],
    benefits: ["Handle diverse geometries", "High-volume capability", "Durable construction", "Low maintenance"],
  },
  {
    id: "food",
    icon: UtensilsCrossed,
    title: "Food & Beverage",
    description: "Food-grade feeding systems for beverage and food packaging lines with strict hygiene standards.",
    parts: ["Caps & closures", "Container components", "Packaging elements", "Dispensing parts", "Sealing components"],
    benefits: ["FDA food-grade materials", "Easy sanitation", "Corrosion resistant", "HACCP compatible"],
  },
  {
    id: "aerospace",
    icon: Plane,
    title: "Aerospace",
    description: "High-precision feeding systems for aerospace manufacturing with demanding quality requirements.",
    parts: ["Precision fasteners", "Aircraft components", "Electronic parts", "Sealing elements", "Assembly hardware"],
    benefits: ["AS9100 compatible", "Traceability support", "High precision", "Quality documentation"],
  },
]

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Industries We Serve
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Feeding Solutions for Every Industry
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              From automotive assembly to pharmaceutical packaging, HONGCHAO delivers 
              specialized feeding solutions that meet the unique requirements of each 
              industry we serve.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact">
                  Discuss Your Industry Needs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                id={industry.id}
                className="scroll-mt-32"
              >
                <Card className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                  <div className={`grid lg:grid-cols-5 ${index % 2 === 1 ? '' : ''}`}>
                    <div className={`lg:col-span-2 bg-secondary p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                        <industry.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl mb-4">{industry.title}</CardTitle>
                      <CardDescription className="text-base">
                        {industry.description}
                      </CardDescription>
                    </div>
                    <div className={`lg:col-span-3 p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-foreground mb-4">Typical Parts</h4>
                          <ul className="space-y-2">
                            {industry.parts.map((part) => (
                              <li key={part} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                {part}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-4">Key Benefits</h4>
                          <ul className="space-y-2">
                            {industry.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-8">
                        <Button asChild variant="outline" className="font-semibold bg-transparent">
                          <Link href={`/case-studies?industry=${industry.id}`}>
                            View {industry.title} Case Studies
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Industry Experience */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Cross-Industry Expertise
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our experience across diverse industries means we can apply proven solutions 
              and best practices to solve your unique feeding challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">1000+</p>
              <p className="mt-2 text-muted-foreground">Projects Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="mt-2 text-muted-foreground">Countries Served</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">20+</p>
              <p className="mt-2 text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">99%</p>
              <p className="mt-2 text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-background sm:text-4xl text-balance">
                Your Industry, Our Expertise
              </h2>
              <p className="mt-4 text-lg text-background/80">
                Whatever parts you need to feed, whatever standards you must meet, our 
                engineering team has the experience to deliver the right solution.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-semibold bg-transparent">
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
