import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Factory, Settings, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Products - Vibratory Feeders & Automation Equipment",
  description: "Explore HONGCHAO's complete range of vibratory bowl feeders, step feeders, chain elevator hoppers, drive bases, and flexible feeding systems for industrial automation.",
}

const productCategories = [
  {
    title: "Vibratory Bowl Feeder",
    slug: "vibratory-bowl-feeder",
    description: "Custom-designed bowl feeders used for precise part sorting and orientation. Handles screws, springs, metal components, and plastic parts.",
    features: ["Custom bowl tooling", "Linear track feeders", "Sound enclosures", "Hopper integration", "PLC control systems"],
    applications: ["Small parts assembly", "Fastener feeding", "Electronic components", "Packaging lines"],
  },
  {
    title: "Centrifugal Feeder",
    slug: "centrifugal-feeder",
    description: "High-speed centrifugal feeding systems suitable for lightweight and small parts requiring rapid, consistent delivery.",
    features: ["High-speed operation", "Gentle part handling", "Compact footprint", "Low maintenance", "Variable speed control"],
    applications: ["High-volume production", "Small components", "Lightweight parts", "Rapid assembly"],
  },
  {
    title: "Step Feeder",
    slug: "step-feeder",
    description: "Step-type feeding machines designed for gentle handling of fragile or complex-shaped components that require careful orientation.",
    features: ["Gentle part handling", "Adjustable step height", "Multiple track options", "Low noise operation", "Easy maintenance"],
    applications: ["Pharmaceutical", "Medical devices", "Cosmetics", "Precision components"],
  },
  {
    title: "Elevator Hopper",
    slug: "elevator-hopper",
    description: "Elevator and hopper systems for bulk material lifting, buffering, and continuous supply to downstream feeding equipment.",
    features: ["High capacity", "Continuous feeding", "Variable speed", "Durable construction", "Level sensing"],
    applications: ["High-volume production", "Bulk feeding", "Buffer storage", "Continuous supply"],
  },
  {
    title: "Auxiliary Equipment",
    slug: "auxiliary-equipment",
    description: "Complete range of supporting equipment including linear feeders, machine frames, sound enclosures, automatic hoppers, electrical control systems, and auxiliary mechanisms.",
    features: ["Linear feeders", "Machine frames", "Sound enclosures", "Automatic hoppers", "Control systems"],
    applications: ["System integration", "Noise reduction", "Part buffering", "Process control"],
  },
]

const capabilities = [
  {
    icon: Settings,
    title: "Custom Engineering",
    description: "Every feeder is designed specifically for your part requirements",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick turnaround from concept to working prototype",
  },
  {
    icon: Factory,
    title: "Full Integration",
    description: "Complete systems with hoppers, controls, and conveyors",
  },
]

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Product Catalog
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Industrial Feeding Solutions
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              From standard vibratory bowl feeders to fully customized flexible feeding platforms, 
              HONGCHAO offers a complete range of automated feeding solutions designed for precision, 
              reliability, and efficiency.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-semibold bg-transparent">
                <Link href="#catalog">
                  Download Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Product Categories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our full range of feeding equipment and find the right solution for your application.
            </p>
          </div>

          <div className="space-y-12">
            {productCategories.map((category, index) => (
              <Card key={category.slug} className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`aspect-[16/10] lg:aspect-auto bg-secondary flex items-center justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <Factory className="h-32 w-32 text-primary/30" />
                  </div>
                  <div className={`p-8 lg:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {category.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Applications</h4>
                          <ul className="space-y-2">
                            {category.applications.map((app) => (
                              <li key={app} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                {app}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Button asChild className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                        <Link href={`/products/${category.slug}`}>
                          View Products
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Not sure which solution fits your needs?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our engineering team can help you evaluate options and recommend the best feeding 
              solution for your specific application requirements.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact#engineer">
                  Talk to an Engineer
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
