import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FileText, Download, Video, BookOpen, Wrench, HelpCircle, Newspaper } from "lucide-react"
import { sanityClient } from "@/lib/sanity.client"
import { docPagesQuery, postsQuery } from "@/lib/sanity.queries"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServerLocale } from "@/lib/server-locale"

export const metadata: Metadata = {
  title: "Resources - Technical Articles, Guides & Downloads",
  description: "Access HONGCHAO's library of technical resources including feeding system guides, product catalogs, white papers, and instructional videos.",
}

type DocPageListItem = {
  _id: string
  title?: string
  slug?: string
  category?: string
  summary?: string
  updatedAt?: string
  fileUrl?: string
}

type PostListItem = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  publishedAt?: string
}

function iconByCategory(category?: string) {
  switch (category) {
    case "guide":
      return BookOpen
    case "whitepaper":
      return FileText
    case "download":
      return Download
    case "article":
    default:
      return Wrench
  }
}

function labelByCategory(category?: string) {
  switch (category) {
    case "guide":
      return "Guide"
    case "whitepaper":
      return "White Paper"
    case "download":
      return "Download"
    case "article":
    default:
      return "Technical Article"
  }
}

export default async function ResourcesPage() {
  const locale = await getServerLocale()
  const [docs, posts] = await Promise.all([
    sanityClient.fetch<DocPageListItem[]>(docPagesQuery, { locale }, { next: { revalidate: 60 } }),
    sanityClient.fetch<PostListItem[]>(postsQuery, { locale }, { next: { revalidate: 60 } }),
  ])

  const featuredDocs = (docs || []).slice(0, 6)
  const latestPosts = (posts || []).slice(0, 6)

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
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured Resources</h2>
              <p className="text-sm text-muted-foreground mt-2">
                内容来自 Sanity 的 `docPage`，用于维护技术文章、指南、白皮书与下载资料。
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link href="/blog">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link href="/faq">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQs
                </Link>
              </Button>
            </div>
          </div>

          {featuredDocs.length ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredDocs.map((d) => {
                const Icon = iconByCategory(d.category)
                const label = labelByCategory(d.category)
                return (
                  <Card key={d._id} className="flex flex-col border-border hover:border-primary/30 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary">{label}</Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight">{d.title || "Untitled"}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="mb-4 line-clamp-3">{d.summary || "—"}</CardDescription>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-muted-foreground">
                          {d.updatedAt ? new Date(d.updatedAt).toLocaleDateString() : ""}
                        </span>
                        <Link
                          href={d.slug ? `/resources/${d.slug}` : "/resources"}
                          className="inline-flex items-center text-sm font-medium text-primary hover:text-[#D4871F] transition-colors"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 border border-border rounded-lg bg-secondary/40">
              <p className="text-foreground font-semibold">暂无资源内容</p>
              <p className="text-sm text-muted-foreground mt-2">
                你可以在 Sanity Studio 中创建并发布 `docPage` 文档，这里会自动展示。
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Latest Blog Posts</h2>
              <p className="text-sm text-muted-foreground mt-2">内容来自 Sanity 的 `post`。</p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary hover:text-[#D4871F] transition-colors">
              View all
            </Link>
          </div>

          {latestPosts.length ? (
            <div className="grid md:grid-cols-2 gap-6">
              {latestPosts.map((p) => (
                <Card key={p._id} className="border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="outline" className="mb-3">Post</Badge>
                        <h3 className="font-semibold text-foreground">{p.title || "Untitled"}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt || "—"}</p>
                      </div>
                      <Link
                        href={p.slug ? `/blog/${p.slug}` : "/blog"}
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
          ) : (
            <div className="text-center py-16 border border-border rounded-lg bg-background">
              <p className="text-foreground font-semibold">暂无 Blog 内容</p>
              <p className="text-sm text-muted-foreground mt-2">
                你可以在 Sanity Studio 中创建并发布 `post` 文档。
              </p>
            </div>
          )}
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
