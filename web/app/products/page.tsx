import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sanityClient } from "@/lib/sanity.client"
import { productCategoriesQuery, productsQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"

export const metadata: Metadata = {
  title: "Products - Vibratory Feeders & Automation Equipment",
  description: "Explore HONGCHAO's complete range of vibratory bowl feeders, step feeders, chain elevator hoppers, drive bases, and flexible feeding systems for industrial automation.",
}

type Category = {
  _id: string
  title: string
  slug: string | null
  description: string | null
}

type Product = {
  _id: string
  title: string
  excerpt: string | null
  slug: string | null
  mainImage: unknown
  category: { title: string; slug: string | null } | null
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    sanityClient.fetch<Category[]>(productCategoriesQuery, {}, { next: { revalidate: 60 } }),
    sanityClient.fetch<Product[]>(productsQuery, {}, { next: { revalidate: 60 } }),
  ])

  const productsWithCategory = products.filter((p) => p.category?.slug)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Product Catalog
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Industrial Feeding Solutions
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              From standard vibratory bowl feeders to fully customized flexible feeding platforms,
              HONGCHAO offers a complete range of automated feeding solutions designed for precision,
              reliability, and efficiency.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 font-semibold bg-transparent">
                <Link href="#catalog">
                  Download Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      {productsWithCategory.length > 0 && (
        <section id="catalog" className="py-20 lg:py-28 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                All Products
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Browse our full range of feeding systems and equipment.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsWithCategory.map((p) => (
                <Link
                  key={p._id}
                  href={`/products/${p.category!.slug}/${p.slug ?? p._id}`}
                  className="group block border border-border hover:border-primary/30 transition-colors overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <Image
                      src={p.mainImage ? urlForImage(p.mainImage).width(1200).height(800).url() : "/placeholder.svg"}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      View Details
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
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
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Product Categories
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explore our full range of feeding equipment and find the right solution for your application.
              </p>
            </div>

            <div className="space-y-12">
              {categories.map((category, index) => (
                <Card key={category._id} className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                  <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={`aspect-[16/10] lg:aspect-auto bg-background flex items-center justify-center ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <Factory className="h-32 w-32 text-primary/30" />
                    </div>
                    <div className={`p-8 lg:p-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-2xl">{category.title}</CardTitle>
                        {category.description && (
                          <CardDescription className="text-base mt-2">
                            {category.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="p-0">
                        <Button asChild className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
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

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Not sure which solution fits your needs?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our engineering team can help you evaluate options and recommend the best feeding
              solution for your specific application requirements.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
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
