import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Search as SearchIcon, ArrowRight } from "lucide-react"
import { sanityClient } from "@/lib/sanity.client"
import { productsQuery } from "@/lib/sanity.queries"
import { urlForProductImage } from "@/lib/sanity.image"
import { getServerLocale } from "@/lib/server-locale"

export const metadata: Metadata = {
  title: "Search - HONGCHAO Automation Equipment",
  description: "Search our products and find the right feeding solution.",
}

type ProductHit = {
  _id: string
  title?: string
  excerpt?: string | null
  slug?: string | null
  mainImage?: unknown
  category?: { title?: string; slug?: string | null } | null
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const locale = await getServerLocale()
  const term = (q ?? "").trim().toLowerCase()
  const allProducts = (await sanityClient
    .fetch(productsQuery, { locale }, { next: { revalidate: 60 } })
    .catch(() => [])) as ProductHit[]
  const hits =
    term.length > 0
      ? allProducts.filter(
          (p) =>
            (p.title ?? "").toLowerCase().includes(term) ||
            (p.slug ?? "").toLowerCase().includes(term) ||
            (p.category?.title ?? "").toLowerCase().includes(term)
        )
      : []

  return (
    <div className="flex flex-col min-h-[60vh]">
      <section className="bg-foreground text-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl flex items-center gap-3">
            <SearchIcon className="h-8 w-8 text-[#F6A12A]" />
            Search
          </h1>
          <p className="mt-2 text-background/70">
            {term
              ? `Results for “${q}”`
              : "Enter a product name or category in the search box above."}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!term ? (
            <p className="text-muted-foreground">
              Use the search box in the header to find products.
            </p>
          ) : hits.length === 0 ? (
            <p className="text-muted-foreground">
              No products found. Try a different term or{" "}
              <Link href="/products" className="text-primary hover:underline">
                browse all products
              </Link>
              .
            </p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hits.map((p) => (
                <li key={p._id}>
                  <Link
                    href={
                      p.category?.slug && p.slug
                        ? `/products/${p.category.slug}/${p.slug}`
                        : "/products"
                    }
                    className="group block border border-[#E5E5E5] hover:border-[#F6A12A]/40 transition-colors"
                  >
                    <div className="aspect-[4/3] bg-neutral-50 relative overflow-hidden">
                      <div className="absolute inset-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={
                              p.mainImage
                                ? urlForProductImage(p.mainImage).width(600).url()
                                : "/placeholder.svg"
                            }
                            alt={p.title ?? ""}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">
                        {p.category?.title ?? "Product"}
                      </p>
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {p.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center mt-2 text-sm font-medium text-primary group-hover:underline">
                        View details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
