import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sanityClient } from "@/lib/sanity.client"
import { productsByCategorySlugQuery, productCategoriesQuery } from "@/lib/sanity.queries"
import { urlForProductImage } from "@/lib/sanity.image"

// 每次请求从 Sanity 拉取最新数据，避免构建时静态快照只含当时的产品数量
export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const data = await sanityClient.fetch(productsByCategorySlugQuery, { category }, { next: { revalidate: 60 } })

  if (!data) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${data.title} - HONGCHAO Industrial Feeders`,
    description: (data.description as string) ?? undefined,
  }
}

export async function generateStaticParams() {
  const categories = await sanityClient.fetch(productCategoriesQuery)
  return (categories ?? []).map((c: { slug?: string | null; _id: string }) => ({
    category: c.slug ?? c._id,
  })).filter((x: { category: string }) => x.category)
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params

  const data = await sanityClient.fetch(productsByCategorySlugQuery, { category }, { next: { revalidate: 60 } })

  if (!data) {
    notFound()
  }

  const products = (data.products ?? []) as {
    _id: string
    title: string
    slug: string | null
    excerpt?: string | null
    mainImage?: unknown
  }[]

  const heroImageSource = data.products?.[0]?.mainImage
  const heroImageUrl = heroImageSource
    ? urlForProductImage(heroImageSource).width(1600).url()
    : "/placeholder.svg"

  const categoryTitle =
    (data.title as string) ??
    category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">{categoryTitle}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-foreground text-background py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            className="object-contain opacity-30"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-background/80 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              {categoryTitle}
            </h1>
            {(data.description as string) ? (
              <p className="mt-6 text-lg text-background/80 leading-relaxed">
                {data.description}
              </p>
            ) : null}
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold"
              >
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      {products.length > 0 ? (
        <section className="py-16 lg:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Products in this category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => {
                const hasSlug = p.slug != null && p.slug !== ""
                const href = hasSlug ? `/products/${category}/${p.slug}` : "/contact"
                const isPlaceholder = !hasSlug
                return (
                  <Link
                    key={p._id}
                    href={href}
                    className={`group block border overflow-hidden transition-colors ${
                      isPlaceholder
                        ? "border-border bg-muted/50 cursor-not-allowed opacity-80 hover:opacity-90"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="aspect-[4/3] bg-neutral-50 relative overflow-hidden">
                      <div className="absolute inset-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={
                              p.mainImage
                                ? urlForProductImage(p.mainImage).width(1200).url()
                                : "/placeholder.svg"
                            }
                            alt={p.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {p.excerpt}
                        </p>
                      ) : null}
                      <div className="mt-4 flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {isPlaceholder ? (
                          <>
                            Detail page unavailable
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </>
                        ) : (
                          <>
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-background">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-background/80">
                Contact our team to discuss your specific requirements for {categoryTitle}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold"
              >
                <Link href="/contact">
                  Request a Quote
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
