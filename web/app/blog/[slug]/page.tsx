import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { getArticleBySlug } from "@/lib/articles-db"
import { Badge } from "@/components/ui/badge"
import { getServerLocale } from "@/lib/server-locale"

type Props = {
  params: Promise<{ slug: string }>
}
export const revalidate = 60
export const dynamicParams = true

type PostDetail = {
  _id: string
  title?: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  coverImage?: string | null
  content?: string
  seo?: {
    title?: string
    description?: string
    ogImage?: unknown
  }
} | null

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getServerLocale()
  const post = await getArticleBySlug(slug, locale)

  if (!post) return { title: "Post Not Found" }

  const title = post.title || "Blog"
  const description =
    post.excerpt ||
    post.content?.replace(/<[^>]+>/g, " ").slice(0, 160) ||
    undefined

  const ogUrl = post.coverImage || undefined

  return {
    title,
    description,
    openGraph: ogUrl ? { images: [{ url: ogUrl }] } : undefined,
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getServerLocale()
  const post = await getArticleBySlug(slug, locale)

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-foreground font-semibold">未找到文章</p>
        <p className="text-sm text-muted-foreground mt-2">请确认该文章已在统一管理后台中发布。</p>
        <div className="mt-6">
          <Link href="/blog" className="text-primary hover:text-[#D4871F] transition-colors">
            返回 Blog
          </Link>
        </div>
      </div>
    )
  }

  const coverUrl = post.coverImage || ""
  const date = post.publishedAt ? new Date(post.publishedAt) : null

  return (
    <div className="flex flex-col">
      <section className="bg-secondary border-b border-border py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mt-6">
            <Badge variant="secondary">Post</Badge>
            <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {post.title || "Untitled"}
            </h1>
            {date ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}
              </p>
            ) : null}
            {post.excerpt ? (
              <p className="mt-4 text-muted-foreground leading-relaxed">{post.excerpt}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {coverUrl ? (
            <div className="aspect-video relative rounded-lg overflow-hidden border border-border mb-10">
              <Image src={coverUrl} alt={post.title || "Post cover"} fill className="object-cover" />
            </div>
          ) : null}

          <article className="prose prose-lg max-w-none article-prose" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </div>
      </section>
    </div>
  )
}

