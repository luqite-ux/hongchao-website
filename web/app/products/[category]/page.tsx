import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { TrustSection } from "@/components/trust-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { sanityClient } from "@/lib/sanity.client"
import { productsByCategorySlugQuery, productCategoriesQuery } from "@/lib/sanity.queries"
import { safeProductImageUrl } from "@/lib/sanity.image"
import { getServerLocale } from "@/lib/server-locale"

// 每次请求从 Sanity 拉取最新数据，避免构建时静态快照只含当时的产品数量
export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ category: string }>
}

async function safeSanityFetch<T>(query: string, params: Record<string, unknown>) {
  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const data = await safeSanityFetch<{ title?: string; description?: string }>(productsByCategorySlugQuery, { category })

  if (!data) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${data.title} - HONGCHAO Industrial Feeders`,
    description: (data.description as string) ?? undefined,
  }
}

export async function generateStaticParams() {
  const categories = (await safeSanityFetch<any[]>(productCategoriesQuery, {})) ?? []
  return categories.map((c: { slug?: string | null; _id: string }) => ({
    category: c.slug ?? c._id,
  })).filter((x: { category: string }) => x.category)
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const locale = await getServerLocale()

  const data = await safeSanityFetch<any>(productsByCategorySlugQuery, { category, locale })
  const categoryTitleFallback = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: categoryTitleFallback }]} />
        <section className="relative bg-slate-50 py-16 md:py-24 overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-slate-500 hover:text-[#FBA026] transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance text-slate-900">
                {categoryTitleFallback}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                内容暂时不可用：当前环境无法连接 Sanity API（请检查网络/代理设置后刷新）。
              </p>
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold transition-transform duration-200 hover:scale-105"
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

  const products = (data.products ?? []) as {
    _id: string
    title: string
    slug: string | null
    excerpt?: string | null
    mainImage?: unknown
  }[]

  const heroImageSource = data.products?.[0]?.mainImage
  const heroImageUrl = safeProductImageUrl(heroImageSource, 1600) ?? "/placeholder.svg"

  const categoryTitle =
    (data.title as string) ??
    categoryTitleFallback

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: categoryTitle }]} />
      {/* Hero */}
      <section className="relative bg-slate-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-20">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-slate-500 hover:text-[#FBA026] transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance text-slate-900">
              {categoryTitle}
            </h1>
            {(data.description as string) ? (
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                {data.description}
              </p>
            ) : null}
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold"
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

      {/* Product Grid - 对齐首页 FeaturedProducts 卡片样式 */}
      {products.length > 0 ? (
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Products in this category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => {
                const hasSlug = p.slug != null && p.slug !== ""
                const href = hasSlug ? `/products/${category}/${p.slug}` : "/contact"
                const isPlaceholder = !hasSlug
                return (
                  <Link
                    key={p._id}
                    href={href}
                    className={`group flex flex-col bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                      isPlaceholder
                        ? "border-slate-100 bg-slate-50/50 cursor-not-allowed opacity-80 hover:opacity-90"
                        : "border-slate-100 hover:shadow-xl hover:border-[#FBA026]/30"
                    }`}
                  >
                    <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-4" style={{ boxShadow: "inset 0 -1px 0 0 #e2e8f0" }}>
                      <div className="relative w-full h-full min-h-[160px]">
                        <Image
                          src={safeProductImageUrl(p.mainImage, 1200) ?? "/placeholder.svg"}
                          alt={p.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-800 group-hover:text-[#FBA026] transition-colors text-sm leading-snug">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
                          {p.excerpt}
                        </p>
                      ) : null}
                      <div className="mt-4 flex items-center gap-1.5 text-[#FBA026] text-xs font-semibold">
                        {isPlaceholder ? (
                          <>Detail page unavailable</>
                        ) : (
                          <>
                            <span>View Details</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

      {/* Trust & Testimonials (按需挂载：产品分类页底部) */}
      <TrustSection />
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-slate-600">
                Contact our team to discuss your specific requirements for {categoryTitle}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold"
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
