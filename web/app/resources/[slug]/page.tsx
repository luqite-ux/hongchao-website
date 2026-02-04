import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Clock, Calendar, BookOpen, Share2 } from "lucide-react"
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
    title: `${title} - Resources`,
    description: `Read our comprehensive guide on ${title.toLowerCase()}. Expert insights on feeding systems and automation.`,
  }
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-secondary border-b border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Technical Guide</Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated January 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Technical Guide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                <p className="lead text-lg text-muted-foreground leading-relaxed">
                  Selecting the right vibratory bowl feeder for your application requires careful 
                  consideration of part characteristics, production requirements, and integration needs. 
                  This comprehensive guide walks you through the key factors to ensure you make the 
                  optimal choice.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Understanding Your Parts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The first step in selecting a bowl feeder is to thoroughly analyze the parts you 
                  need to feed. Key characteristics to consider include size, weight, material, 
                  surface finish, and geometric features that will affect orientation.
                </p>
                <ul className="space-y-2 my-4">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Part dimensions:</strong> Length, width, height, and any critical features</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Weight:</strong> Affects bowl size and drive power requirements</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Material:</strong> Metal, plastic, glass, etc. affects tooling design</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Surface finish:</strong> Smooth, textured, oily, etc.</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Calculating Feed Rate Requirements</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your required feed rate is typically determined by your downstream process - whether 
                  that is a robot, assembly machine, or packaging line. Its important to consider not 
                  just the average rate, but also peak requirements and buffer capacity.
                </p>
                <div className="bg-secondary p-6 rounded-lg my-6">
                  <h4 className="font-semibold text-foreground mb-2">Feed Rate Formula</h4>
                  <p className="text-muted-foreground">
                    Required Feed Rate = (Downstream Cycle Time) × (Safety Factor) × (Reject Rate Allowance)
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Selecting Bowl Size</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bowl diameter is primarily determined by part size and required feed rate. Larger 
                  bowls can hold more parts and achieve higher feed rates, but require more floor 
                  space and power. Standard bowl sizes range from 150mm to 750mm in diameter.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Tooling Design Considerations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Custom tooling is the heart of any bowl feeder system. The tooling design determines 
                  how parts are oriented, selected, and delivered to the output. Key tooling elements include:
                </p>
                <ul className="space-y-2 my-4">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Track profile:</strong> Shaped to match part geometry</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Orientation devices:</strong> Wiper blades, air jets, passive selectors</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Return paths:</strong> For rejected or misoriented parts</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Integration Requirements</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Consider how the bowl feeder will integrate with your existing automation systems. 
                  This includes physical mounting, electrical connections, and communication protocols 
                  for your PLC or robot controller.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Selecting the right vibratory bowl feeder involves balancing multiple factors to 
                  achieve optimal performance for your specific application. Working with an experienced 
                  supplier like HONGCHAO ensures that all aspects are properly considered and that your 
                  system delivers reliable, efficient operation.
                </p>
              </article>

              {/* Share */}
              <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
                <span className="text-sm font-medium text-foreground">Share this article:</span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Need Expert Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90 mb-6">
                    Our engineers can help you select and configure the perfect feeding system.
                  </p>
                  <Button asChild variant="secondary" className="w-full font-semibold">
                    <Link href="/contact#engineer">
                      Talk to an Engineer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/resources/optimizing-bowl-feeder-performance" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Optimizing Bowl Feeder Performance</p>
                    <p className="text-sm text-muted-foreground">8 min read</p>
                  </Link>
                  <Link href="/resources/step-feeders-vs-bowl-feeders" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Step Feeders vs Bowl Feeders</p>
                    <p className="text-sm text-muted-foreground">7 min read</p>
                  </Link>
                  <Link href="/resources/feeding-systems-robot-integration" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Robot Integration Guide</p>
                    <p className="text-sm text-muted-foreground">10 min read</p>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/products/vibration-bowl-feeder" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Vibration Bowl Feeder</p>
                    <p className="text-sm text-muted-foreground">Complete feeding systems</p>
                  </Link>
                  <Link href="/products/flexible-feeder" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                    <p className="font-medium text-foreground">Flexible Feeder</p>
                    <p className="text-sm text-muted-foreground">Vision-guided platforms</p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
