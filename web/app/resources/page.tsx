import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, Download, Video, BookOpen, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Resources - Technical Articles, Guides & Downloads",
  description: "Access HONGCHAO's library of technical resources including feeding system guides, product catalogs, white papers, and instructional videos.",
}

const featuredResources = [
  {
    type: "Guide",
    icon: BookOpen,
    title: "Complete Guide to Vibratory Bowl Feeder Selection",
    description: "Learn how to choose the right bowl feeder for your application, including part analysis, feed rate calculation, and system sizing.",
    slug: "vibratory-bowl-feeder-selection-guide",
    readTime: "15 min read",
  },
  {
    type: "White Paper",
    icon: FileText,
    title: "Flexible Feeding: The Future of Parts Handling",
    description: "Explore how vision-guided flexible feeding systems are revolutionizing high-mix, low-volume manufacturing.",
    slug: "flexible-feeding-white-paper",
    readTime: "12 min read",
  },
  {
    type: "Technical Article",
    icon: Wrench,
    title: "Optimizing Bowl Feeder Performance",
    description: "Practical tips for tuning your vibratory bowl feeder to achieve maximum throughput and reliability.",
    slug: "optimizing-bowl-feeder-performance",
    readTime: "8 min read",
  },
]

const articles = [
  {
    title: "Understanding Vibratory Feeder Frequency Control",
    category: "Technical",
    slug: "vibratory-feeder-frequency-control",
    readTime: "6 min read",
  },
  {
    title: "When to Choose Step Feeders Over Bowl Feeders",
    category: "Guide",
    slug: "step-feeders-vs-bowl-feeders",
    readTime: "7 min read",
  },
  {
    title: "Integrating Feeding Systems with Industrial Robots",
    category: "Technical",
    slug: "feeding-systems-robot-integration",
    readTime: "10 min read",
  },
  {
    title: "Maintaining Your Vibratory Bowl Feeder",
    category: "Maintenance",
    slug: "vibratory-bowl-feeder-maintenance",
    readTime: "5 min read",
  },
  {
    title: "FDA Compliance for Feeding Systems in Pharma",
    category: "Industry",
    slug: "fda-compliance-feeding-systems",
    readTime: "8 min read",
  },
  {
    title: "Calculating ROI for Automated Feeding Systems",
    category: "Business",
    slug: "feeding-system-roi-calculation",
    readTime: "6 min read",
  },
]

const downloads = [
  {
    title: "Product Catalog 2025",
    description: "Complete catalog of HONGCHAO feeding systems and accessories",
    type: "PDF",
    size: "12.5 MB",
  },
  {
    title: "Vibration Bowl Feeder Datasheet",
    description: "Technical specifications for standard bowl feeder systems",
    type: "PDF",
    size: "2.3 MB",
  },
  {
    title: "Flexible Feeder Datasheet",
    description: "Technical specifications for FlexFeed platform systems",
    type: "PDF",
    size: "3.1 MB",
  },
  {
    title: "Company Brochure",
    description: "Overview of HONGCHAO capabilities and services",
    type: "PDF",
    size: "5.8 MB",
  },
]

const videos = [
  {
    title: "Bowl Feeder Operation Overview",
    duration: "4:32",
    thumbnail: "bowl-feeder-video",
  },
  {
    title: "Flexible Feeder Demo",
    duration: "6:15",
    thumbnail: "flexible-feeder-video",
  },
  {
    title: "Factory Tour",
    duration: "8:45",
    thumbnail: "factory-tour-video",
  },
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Knowledge Center
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              Access technical guides, product documentation, and expert insights to help 
              you make informed decisions about your feeding system requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Featured Resources</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredResources.map((resource) => (
              <Card key={resource.slug} className="flex flex-col border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="mb-4">{resource.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                    <Link
                      href={`/resources/${resource.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-[#D4871F] transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Technical Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.slug} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="outline" className="mb-3">{article.category}</Badge>
                      <h3 className="font-semibold text-foreground">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{article.readTime}</p>
                    </div>
                    <Link
                      href={`/resources/${article.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-[#D4871F] transition-colors flex-shrink-0"
                    >
                      Read
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-16 lg:py-24 bg-background" id="catalog">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Downloads</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {downloads.map((download) => (
              <Card key={download.title} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-foreground">{download.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{download.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary">{download.type}</Badge>
                        <span className="text-sm text-muted-foreground">{download.size}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Video Library</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.title} className="border-border hover:border-primary/30 transition-colors overflow-hidden">
                <div className="aspect-video bg-foreground/5 flex items-center justify-center relative">
                  <Video className="h-12 w-12 text-primary/30" />
                  <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{video.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-background sm:text-4xl text-balance">
                Need Technical Assistance?
              </h2>
              <p className="mt-4 text-lg text-background/80">
                Our engineering team is available to answer your technical questions and 
                help you find the right feeding solution.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact#engineer">
                  Talk to an Engineer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-semibold bg-transparent">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
