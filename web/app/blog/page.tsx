import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { groq } from "next-sanity"
import { sanityClient } from "@/lib/sanity.client"
import { postsQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServerLocale } from "@/lib/server-locale"

export const metadata: Metadata = {
  title: "Blog - Insights & Updates",
  description: "Read HONGCHAO's latest insights on parts feeding, automation, and engineering best practices.",
}

type PostListItem = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  coverImage?: unknown
}

export default async function BlogPage() {
  const locale = await getServerLocale()
  const posts = await sanityClient.fetch<PostListItem[]>(postsQuery, { locale }, { next: { revalidate: 60 } })

  return (
    <div className="flex flex-col">
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Blog</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">Insights & Updates</h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              Engineering insights, application notes, and updates to help you build reliable automated feeding systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => {
                const href = p.slug ? `/blog/${p.slug}` : "#"
                const imgUrl = p.coverImage
                  ? urlForImage(p.coverImage).width(1200).height(675).fit("max").auto("format").url()
                  : ""
                const date = p.publishedAt ? new Date(p.publishedAt) : null

                return (
                  <Card key={p._id} className="overflow-hidden border-border hover:border-primary/30 hover:shadow-lg transition-all">
                    {imgUrl ? (
                      <div className="aspect-video bg-secondary relative">
                        <Image src={imgUrl} alt={p.title || "Post cover"} fill className="object-cover" />
                      </div>
                    ) : null}
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="secondary">Post</Badge>
                        {date ? (
                          <span className="text-xs text-muted-foreground">
                            {date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}
                          </span>
                        ) : null}
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        <Link href={href} className={p.slug ? "hover:text-primary transition-colors" : "pointer-events-none"}>
                          {p.title || "Untitled"}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {p.excerpt || "—"}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 border border-border rounded-lg bg-secondary/40">
              <p className="text-foreground font-semibold">暂无内容</p>
              <p className="text-sm text-muted-foreground mt-2">
                你可以在 Sanity Studio 中创建并发布 `post` 文档，这里会自动展示。
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

