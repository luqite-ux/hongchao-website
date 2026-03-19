import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Clock, Calendar, BookOpen, Share2, Download } from "lucide-react"
import { notFound } from "next/navigation"
import { sanityClient } from "@/lib/sanity.client"
import { docPageBySlugQuery } from "@/lib/sanity.queries"
import { PortableTextFallback, getPortableTextBlockTexts } from "@/lib/portable-text"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServerLocale } from "@/lib/server-locale"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getServerLocale()
  const doc = await sanityClient.fetch<any>(docPageBySlugQuery, { slug, locale }, { next: { revalidate: 60 } })

  if (!doc) return { title: "Resource Not Found" }

  const title = doc?.seo?.title || doc?.title || "Resources"
  const description =
    doc?.seo?.description ||
    doc?.summary ||
    getPortableTextBlockTexts(doc?.content).join(" ").slice(0, 160) ||
    undefined

  return {
    title: `${title} - Resources`,
    description,
  }
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getServerLocale()
  const doc = await sanityClient.fetch<any>(docPageBySlugQuery, { slug, locale }, { next: { revalidate: 60 } })
  if (!doc) notFound()

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
            <Badge variant="secondary" className="mb-4">
              {doc?.category ? String(doc.category).toUpperCase() : "RESOURCE"}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {doc?.title || "Untitled"}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>—</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {doc?.updatedAt ? `Updated ${new Date(doc.updatedAt).toLocaleDateString()}` : "—"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{doc?.category ? String(doc.category) : "Resource"}</span>
              </div>
            </div>
            {doc?.fileUrl ? (
              <div className="mt-6">
                <Button asChild variant="outline" className="bg-transparent">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            ) : null}
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
                {doc?.summary ? (
                  <p className="lead text-lg text-muted-foreground leading-relaxed">
                    {doc.summary}
                  </p>
                ) : null}
                <PortableTextFallback value={doc?.content} />
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
