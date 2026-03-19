import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sanityClient } from "@/lib/sanity.client"
import { productBySlugsQuery, relatedProductsQuery, productsQuery } from "@/lib/sanity.queries"
import { urlForProductImage } from "@/lib/sanity.image"
import { getServerLocale } from "@/lib/server-locale"

type Props = {
  params: Promise<{ category: string; product: string }>
}

async function safeSanityFetch<T>(query: string, params: Record<string, unknown>) {
  try {
    return await sanityClient.fetch<T>(query, params)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, product } = await params
  const locale = await getServerLocale()
  const data = await safeSanityFetch<{ title?: string; excerpt?: string }>(productBySlugsQuery, { category, product, locale })

  if (!data) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${data.title} - HONGCHAO Industrial Feeders`,
    description: (data.excerpt as string) ?? undefined,
  }
}

export async function generateStaticParams() {
  const products = (await safeSanityFetch<any[]>(productsQuery, {})) ?? []
  return products
    .map((p) => ({
      category: p?.category?.slug ?? "",
      product: p?.slug ?? "",
    }))
    .filter((x) => x.category && x.product)
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, product } = await params
  const locale = await getServerLocale()

  const data = await safeSanityFetch<any>(productBySlugsQuery, { category, product, locale })
  if (!data) {
    // Sanity 网络不可用时，避免整页 500，提供可预览的占位 UI
    const fallbackTitle = product
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-white to-slate-50">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #475569 1px, transparent 1px),
                linear-gradient(to bottom, #475569 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/products" className="hover:text-[#FBA026] transition-colors">
                Products
              </Link>
              <span aria-hidden>/</span>
              <Link href={`/products/${category}`} className="hover:text-[#FBA026] transition-colors">
                {category}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-slate-500">{fallbackTitle}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                  {fallbackTitle}
                </h1>
                <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl">
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

              <div className="order-1 lg:order-2 relative">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-slate-100/70 shadow-xl" aria-hidden />
                  <div className="relative drop-shadow-2xl rounded-2xl overflow-hidden bg-white/90 p-10 flex items-center justify-center">
                    <div className="text-center text-slate-500">
                      <div className="text-sm font-medium">Sanity fetch failed</div>
                      <div className="mt-1 text-xs">Check proxy/network and refresh.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const related = await safeSanityFetch<any[]>(relatedProductsQuery, {
    category,
    locale,
    excludeId: data._id,
  })
  const relatedList = Array.isArray(related) ? related : []

  const categoryTitle =
    (data.category as { title?: string } | null)?.title ??
    category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")

  const gallery = (data.gallery ?? []) as { _type?: string; asset?: unknown }[]
  const specsList = (data.specs ?? []) as { label?: string; value?: string }[]
  const mainImageEntry = data.mainImage
    ? { url: urlForProductImage(data.mainImage).width(1200).url(), alt: data.title }
    : { url: "/placeholder.svg", alt: data.title }
  const galleryEntries = gallery.map((img, i) => ({
    url: urlForProductImage(img).width(1200).url(),
    alt: `${data.title} view ${i + 1}`,
  }))

  const technicalImages = (data.technicalImages ?? []) as { _type?: string; asset?: unknown }[]
  const technicalImageEntries = technicalImages
    .map((img, i) => ({
      url: urlForProductImage(img).width(2200).url(),
      alt: `${data.title} technical render ${i + 1}`,
    }))
    .filter((x) => x.url)

  const packagingImageUrl = data.packagingImage
    ? urlForProductImage(data.packagingImage).width(2200).url()
    : undefined

  const videoRef = data.video as
    | { source?: string; videoId?: string; url?: string; videoFileUrl?: string; videoFileAsset?: { url?: string }; title?: string; coverImage?: unknown; description?: string }
    | null
    | undefined
  const videoUrl =
    videoRef?.source === 'upload'
      ? (videoRef.videoFileUrl ?? videoRef.videoFileAsset?.url)
      : videoRef?.source === 'url' && videoRef?.url
        ? videoRef.url
        : undefined

  const coverImageUrl = videoRef?.coverImage ? urlForProductImage(videoRef.coverImage).width(800).url() : undefined

  const industrialTags = ["High Precision", "24/7 Reliability", "Fast Lead Time", "Customized Solutions"]

  const productGallery = [mainImageEntry, ...galleryEntries].filter((x) => x?.url).slice(0, 8)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* SECTION A: Hero (Left Text, Right Video Only) */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-slate-50">
        {/* 工业几何网格背景（最底层 z-0） */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #475569 1px, transparent 1px),
              linear-gradient(to bottom, #475569 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 面包屑：最顶部，浅色 */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/products" className="hover:text-[#FBA026] transition-colors">
              Products
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/products/${category}`} className="hover:text-[#FBA026] transition-colors">
              {categoryTitle}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-slate-500">{data.title ?? "Product"}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <Link
                href={`/products/${category}`}
                className="inline-flex items-center text-xs text-slate-400 hover:text-[#FBA026] transition-colors mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {categoryTitle}
              </Link>

              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                {data.title ?? "Product"}
              </h1>

              <div className="mt-5 flex flex-wrap gap-2">
                {industrialTags.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 bg-white/80 backdrop-blur border border-slate-200 rounded-md"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {(data.excerpt as string) ? (
                <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                  {data.excerpt}
                </p>
              ) : null}

              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold shadow-[0_4px_14px_0_rgba(251,160,38,0.35)] transition-transform duration-200 hover:scale-105"
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
                  className="font-semibold border-slate-200 text-slate-900 hover:bg-slate-50 transition-transform duration-200 hover:scale-105"
                >
                  <Link href="#specs">
                    <Download className="mr-2 h-5 w-5" />
                    Download Datasheet
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Video only */}
            {videoUrl ? (
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl shadow-xl bg-white border border-slate-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-neutral-50 relative">
                    <video
                      className="absolute inset-0 w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      poster={coverImageUrl}
                    >
                      <source src={videoUrl} />
                    </video>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* SECTION D: Full Specifications (Data Table) */}
      {specsList.length > 0 ? (
        <section id="specs" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 font-semibold text-slate-900">
                      Parameter
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-900">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specsList.map((row, i) => (
                    <tr
                      key={`${row.label ?? "spec"}-${i}`}
                      className={[
                        "border-b border-slate-100 last:border-0",
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                      ].join(" ")}
                    >
                      <td className="px-5 py-4 text-slate-600 whitespace-nowrap">
                        {row.label ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-slate-900">
                        {row.value ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {/* SECTION B: Product Gallery (Real Photos) */}
      {productGallery.length > 0 ? (
        <section className="py-16 md:py-24 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8">
              Product Gallery (Real Photos)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productGallery.slice(0, 8).map((img, i) => (
                <div
                  key={`${img.url}-${i}`}
                  className="aspect-square relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* SECTION C: Technical 3D Visualization (3D Renders) */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Engineering &amp; 3D Structure
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(technicalImageEntries.length > 0
              ? technicalImageEntries.slice(0, 8)
              : [{ url: "/placeholder.svg", alt: "3D Visualization Placeholder" }]
            ).map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="aspect-square relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: Packaging & Delivery (Process Illustration) */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Packaging &amp; Delivery Process
          </h2>
          {packagingImageUrl ? (
            <div className="relative w-full aspect-[16/9] rounded-2xl bg-slate-50 border border-slate-200 drop-shadow-2xl overflow-hidden">
              <Image
                src={packagingImageUrl}
                alt="Packaging process"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 md:p-14">
              <div className="max-w-2xl">
                <div className="mt-3 text-slate-600 leading-relaxed">
                  Placeholder: add real packaging and delivery process illustration in Sanity to replace this block.
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { t: "Protection", d: "Anti-vibration & anti-scratch packing" },
                    { t: "Labeling", d: "Model / voltage / accessories checklist" },
                    { t: "Shipment", d: "Crate & export-ready delivery" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="font-semibold text-slate-900 text-sm">{x.t}</div>
                      <div className="mt-1 text-xs text-slate-500 leading-relaxed">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION F: Footer Sections (As Is) */}
      {relatedList.length > 0 ? (
        <section className="py-16 md:py-24 bg-white border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Related Products</h2>
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
                    className="group block border border-slate-200 bg-white hover:border-[#FBA026]/40 rounded-lg overflow-hidden transition-colors"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-50">
                      <div className="absolute inset-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={
                              related.mainImage
                                ? urlForProductImage(related.mainImage).width(1200).url()
                                : "/placeholder.svg"
                            }
                            alt={related.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-slate-800 group-hover:text-[#FBA026] transition-colors">
                        {related.title}
                      </h3>
                      <div className="mt-3 flex items-center text-xs font-medium text-slate-600 group-hover:text-[#FBA026] transition-colors">
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
    </div>
  )
}
