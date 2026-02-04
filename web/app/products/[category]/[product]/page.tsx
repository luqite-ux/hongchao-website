import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowLeft, CheckCircle, Download, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoDemo } from "@/components/video-demo"

type Props = {
  params: Promise<{ category: string; product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = await params
  const productName = product
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${productName} - HONGCHAO Industrial Feeders`,
    description: `Detailed specifications and features of the ${productName}. Request a quote for custom configuration.`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, product } = await params
  
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  
  const productName = product
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products/${category}`} className="hover:text-primary transition-colors">{categoryName}</Link>
            <span>/</span>
            <span className="text-foreground">{productName}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/products/${category}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {categoryName}
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[4/3] relative overflow-hidden border border-[#E5E5E5] bg-[#F5F5F5]">
                <Image
                  src={`/images/products/${category}/${product}.jpg`}
                  alt={productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="aspect-square relative overflow-hidden border border-[#E5E5E5] bg-[#F5F5F5] cursor-pointer hover:border-[#F6A12A] transition-colors"
                  >
                    <Image
                      src={`/images/products/${category}/${product}-0${i}.jpg`}
                      alt={`${productName} view ${i}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {productName}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                High-performance {categoryName.toLowerCase()} designed for precision feeding applications. 
                Custom configurations available to match your specific requirements.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Custom tooling designed for your part</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Full integration support included</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>1-year warranty on all components</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Global shipping and installation</span>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" variant="outline" className="font-semibold bg-transparent">
                    <Link href="/contact#engineer">
                      <Phone className="mr-2 h-5 w-5" />
                      Talk to an Engineer
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-semibold bg-transparent">
                    <Link href="#catalog">
                      <Download className="mr-2 h-5 w-5" />
                      Download Datasheet
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                    {[
                      { label: "Model Number", value: "HC-" + product.toUpperCase().slice(0, 6) },
                      { label: "Bowl/Platform Size", value: "300mm - 600mm" },
                      { label: "Feed Rate", value: "Up to 500 ppm" },
                      { label: "Power Supply", value: "220V/380V, 50/60Hz" },
                      { label: "Control System", value: "Digital frequency control" },
                      { label: "Material", value: "Aluminum alloy / Stainless steel" },
                      { label: "Noise Level", value: "< 75dB" },
                      { label: "Weight", value: "50kg - 200kg" },
                    ].map((spec) => (
                      <div key={spec.label} className="flex justify-between py-3 border-b border-border">
                        <span className="font-medium text-foreground">{spec.label}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Precision Engineering", description: "Tight tolerances ensure consistent, reliable feeding performance" },
                      { title: "Durable Construction", description: "Built to withstand demanding 24/7 industrial environments" },
                      { title: "Easy Maintenance", description: "Quick-access design minimizes downtime for cleaning and adjustments" },
                      { title: "Quiet Operation", description: "Advanced vibration isolation reduces noise levels" },
                      { title: "Energy Efficient", description: "Optimized drive system minimizes power consumption" },
                      { title: "Smart Controls", description: "Digital interface for precise parameter adjustment" },
                    ].map((feature) => (
                      <div key={feature.title} className="flex gap-4">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Typical Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { industry: "Automotive", parts: "Fasteners, clips, O-rings, small molded parts" },
                      { industry: "Electronics", parts: "Connectors, terminals, small components" },
                      { industry: "Medical Devices", parts: "Syringes, caps, small assemblies" },
                      { industry: "Pharmaceutical", parts: "Bottles, caps, vials, tablets" },
                      { industry: "Consumer Goods", parts: "Caps, closures, cosmetic components" },
                      { industry: "Hardware", parts: "Screws, nuts, washers, pins" },
                    ].map((app) => (
                      <div key={app.industry} className="p-4 bg-background rounded-lg border border-border">
                        <h4 className="font-semibold text-foreground">{app.industry}</h4>
                        <p className="text-sm text-muted-foreground mt-2">{app.parts}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="options" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Available Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { option: "Sound Enclosure", description: "Reduces noise to < 65dB for operator comfort" },
                      { option: "Hopper System", description: "Automatic bulk feeding with level sensing" },
                      { option: "Stainless Steel Construction", description: "For food, pharma, or corrosive environments" },
                      { option: "Quick-Change Tooling", description: "Rapid changeover for multiple part types" },
                      { option: "Vision Inspection", description: "Inline quality check for part orientation" },
                      { option: "IoT Connectivity", description: "Remote monitoring and predictive maintenance" },
                    ].map((item) => (
                      <div key={item.option} className="flex gap-4 p-4 bg-background rounded-lg border border-border">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">+</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.option}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Product Demonstration Video */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-3">
              Technical Reference
            </p>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Product Demonstration</h2>
            <p className="mt-2 text-sm text-[#6B6B6B] max-w-2xl">
              Watch how this {categoryName.toLowerCase()} performs in real-world feeding applications.
            </p>
          </div>
          
          <div className="max-w-3xl">
            <VideoDemo
              title={`${productName} for Industrial Components`}
              description={`This demonstration shows the ${productName.toLowerCase()} handling typical industrial parts with consistent orientation and reliable feed rates. The system is configured for standard operating conditions.`}
              partType="Metal fasteners, plastic components"
              feedingBehavior="Continuous orientation, 200+ ppm"
              applicationContext="Assembly line integration"
            />
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1F1F1F] mb-8">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sound Enclosure", slug: "sound-enclosure" },
              { name: "Hopper System", slug: "hopper-system" },
              { name: "Linear Track Feeder", slug: "linear-track-feeder" },
            ].map((related) => (
              <Link 
                key={related.slug}
                href={`/products/${category}/${related.slug}`}
                className="group block border border-[#E5E5E5] bg-white hover:border-[#F6A12A]/30 transition-colors"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#F5F5F5]">
                  <Image
                    src={`/images/products/${category}/${related.slug}.jpg`}
                    alt={related.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                    {related.name}
                  </h3>
                  <div className="mt-3 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-background">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-background/80">
                Contact our team to discuss your specific requirements. We will work with you to 
                configure the perfect solution for your application.
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
                <Link href="/contact#engineer">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to an Engineer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
