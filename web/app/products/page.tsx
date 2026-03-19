import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { TrustSection } from "@/components/trust-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { sanityClient } from "@/lib/sanity.client"
import { productCategoriesQuery, productsQuery } from "@/lib/sanity.queries"
import { urlForProductImage } from "@/lib/sanity.image"
import { getServerLocale } from "@/lib/server-locale"

export const metadata: Metadata = {
  title: "Products - Vibratory Feeders & Automation Equipment",
  description: "Explore HONGCHAO's complete range of vibratory bowl feeders, step feeders, chain elevator hoppers, drive bases, and flexible feeding systems for industrial automation.",
}

type Category = {
  _id: string
  title: string
  slug: string | null
  description: string | null
  image?: unknown
}

type Product = {
  _id: string
  title: string
  excerpt: string | null
  slug: string | null
  mainImage: unknown
  category: { title: string; slug: string | null } | null
}

async function safeSanityFetch<T>(query: string, params: Record<string, unknown>) {
  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } })
  } catch {
    return null
  }
}

export default async function ProductsPage() {
  const locale = await getServerLocale()
  const [categoriesRes, productsRes] = await Promise.all([
    safeSanityFetch<Category[]>(productCategoriesQuery, { locale }),
    safeSanityFetch<Product[]>(productsQuery, { locale }),
  ])
  const categories = categoriesRes ?? []
  const products = productsRes ?? []

  const productsWithCategory = products.filter((p) => p.category?.slug)
  const sanityOffline = !categoriesRes || !productsRes

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#FBA026] font-semibold text-sm uppercase tracking-wider mb-4">
              Product Catalog
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance text-slate-900">
              Industrial Feeding Solutions
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              From standard vibratory bowl feeders to fully customized flexible feeding platforms,
              HONGCHAO offers a complete range of automated feeding solutions designed for precision,
              reliability, and efficiency.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold">
                <Link href="/catalog">
                  Download Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {sanityOffline ? (
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
              当前环境无法连接 Sanity API，列表内容已使用空数据回退（页面可正常预览样式）。
            </div>
          </div>
        </section>
      ) : null}

      {/* Product Grid - 对齐首页 FeaturedProducts：白底、极细边框、hover 阴影、aspect-square 图区 */}
      {productsWithCategory.length > 0 && (
        <section id="catalog" className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                All Products
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Browse our full range of feeding systems and equipment.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsWithCategory.map((p) => (
                <Link
                  key={p._id}
                  href={`/products/${p.category!.slug}/${p.slug ?? p._id}`}
                  className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#FBA026]/30 transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center p-4" style={{ boxShadow: "inset 0 -1px 0 0 #e2e8f0" }}>
                    <div className="relative w-full h-full min-h-[180px]">
                      <Image
                        src={p.mainImage ? urlForProductImage(p.mainImage).width(1200).url() : "/placeholder.svg"}
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
                    {p.excerpt && (
                      <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1.5 text-[#FBA026] text-xs font-semibold">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Categories */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Product Categories
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Explore our full range of feeding equipment and find the right solution for your application.
              </p>
            </div>

            <div className="space-y-12">
              {categories.map((category, index) => (
                <Card key={category._id} className="overflow-hidden border-slate-100 bg-white hover:shadow-lg transition-shadow">
                  <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={`aspect-[16/10] lg:aspect-auto bg-slate-50 flex items-center justify-center relative overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      {category.image ? (
                        <Image
                          src={urlForProductImage(category.image).width(1200).url()}
                          alt={category.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <Factory className="h-32 w-32 text-[#FBA026]/30" />
                      )}
                    </div>
                    <div className={`p-8 lg:p-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-2xl text-slate-900">{category.title}</CardTitle>
                        {category.description && (
                          <CardDescription className="text-base mt-2 text-slate-500">
                            {category.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="p-0">
                        <Button asChild className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
                          <Link href={`/products/${category.slug ?? category._id}`}>
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
      )}

      {/* Trust & Testimonials (按需挂载：产品列表页底部) */}
      <TrustSection />
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
              Not sure which solution fits your needs?
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Our engineering team can help you evaluate options and recommend the best feeding
              solution for your specific application requirements.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
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
