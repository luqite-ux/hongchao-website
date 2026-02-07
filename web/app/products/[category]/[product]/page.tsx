import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Phone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sanityClient } from "@/lib/sanity.client"
import { productBySlugsQuery, relatedProductsQuery, productsQuery } from "@/lib/sanity.queries"
import { urlForImage } from "@/lib/sanity.image"
import { PortableTextFallback } from "@/lib/portable-text"
import { VideoDemo } from "@/components/video-demo"

type Props = {
  params: Promise<{ category: string; product: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, product } = await params
  const data = await sanityClient.fetch(productBySlugsQuery, { category, product })

  if (!data) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${data.title} - HONGCHAO Industrial Feeders`,
    description: (data.excerpt as string) ?? undefined,
  }
}

export async function generateStaticParams() {
  const products = await sanityClient.fetch(productsQuery)
  return (products ?? []).map((p: { category?: { slug?: string }; slug?: string }) => ({
    category: p.category?.slug ?? "",
    product: p.slug ?? "",
  })).filter((x: { category: string; product: string }) => x.category && x.product)
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, product } = await params

  const data = await sanityClient.fetch(productBySlugsQuery, { category, product })

  if (!data) {
    notFound()
  }

  const related = await sanityClient.fetch(relatedProductsQuery, {
    category,
    excludeId: data._id,
  })
  const relatedList = Array.isArray(related) ? related : []

  const categoryTitle =
    (data.category as { title?: string } | null)?.title ??
    category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")

  const mainImageUrl = data.mainImage
    ? urlForImage(data.mainImage).width(1200).height(800).url()
    : "/placeholder.svg"

  const gallery = (data.gallery ?? []) as { _type?: string; asset?: unknown }[]
  const hasGallery = gallery.length > 0

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
            <Link href={`/products/${category}`} className="hover:text-primary transition-colors">
              {categoryTitle}
            </Link>
            <span>/</span>
            <span className="text-foreground">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/products/${category}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {categoryTitle}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/3] relative overflow-hidden border border-[#E5E5E5] bg-[#F5F5F5]">
                <Image
                  src={mainImageUrl}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {hasGallery ? (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square relative overflow-hidden border border-[#E5E5E5] bg-[#F5F5F5]"
                    >
                      <Image
                        src={urlForImage(img).width(400).height(400).url()}
                        alt={`${data.title} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                {data.title}
              </h1>
              {(data.excerpt as string) ? (
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {data.excerpt}
                </p>
              ) : null}

              <div className="mt-10 space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold"
                >
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="font-semibold bg-transparent"
                  >
                    <Link href="/contact#engineer">
                      <Phone className="mr-2 h-5 w-5" />
                      Talk to an Engineer
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="font-semibold bg-transparent"
                  >
                    <Link href="#catalog">
                      <Download className="mr-2 h-5 w-5" />
                      Download Datasheet
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description (Portable Text) */}
      {(data.body as unknown[])?.length > 0 ? (
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Description</h2>
            <PortableTextFallback value={data.body} />
          </div>
        </section>
      ) : null}

      {/* Product Demonstration Video */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-3">
              Technical Reference
            </p>
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Product Demonstration</h2>
            <p className="mt-2 text-sm text-[#6B6B6B] max-w-2xl">
              Watch how this product performs in real-world feeding applications.
            </p>
          </div>
          <div className="max-w-3xl">
            <VideoDemo
              title={`${data.title} for Industrial Components`}
              description={
                (data.excerpt as string) ||
                `This demonstration shows the ${data.title} handling typical industrial parts.`
              }
              partType="Metal fasteners, plastic components"
              feedingBehavior="Continuous orientation"
              applicationContext="Assembly line integration"
              thumbnailPath="/placeholder.svg"
            />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedList.length > 0 ? (
        <section className="py-16 lg:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-8">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedList.map(
                (related: {
                  _id: string
                  title: string
                  slug: string
                  mainImage?: unknown
                }) => (
                  <Link
                    key={related._id}
                    href={`/products/${category}/${related.slug}`}
                    className="group block border border-[#E5E5E5] bg-white hover:border-[#F6A12A]/30 transition-colors"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#F5F5F5]">
                      <Image
                        src={
                          related.mainImage
                            ? urlForImage(related.mainImage).width(1200).height(800).url()
                            : "/placeholder.svg"
                        }
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                        {related.title}
                      </h3>
                      <div className="mt-3 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="py-16 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-background">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-background/80">
                Contact our team to discuss your specific requirements. We will work with you to
                configure the perfect solution for your application.
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/30 text-background hover:bg-background/10 font-semibold bg-transparent"
              >
                <Link href="/contact#engineer">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to an Engineer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
