"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/** 可序列化，供 Server Component 传入 Client Component */
export type CategoryGalleryItem = {
  _id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  imageUrl: string
}

export type FeaturedProductGalleryItem = {
  _id?: string
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  categorySlug?: string | null
  imageUrl: string
}

type ProductGalleryClientProps = {
  categories: CategoryGalleryItem[]
  featuredProducts?: FeaturedProductGalleryItem[]
}

/**
 * 首页产品画廊：Vibratory Bowl Feeder 设为首位（由传入的 categories 顺序保证），
 * 所有卡片统一 bg-white 并带轻微阴影。使用 @/components/ui Card、Button。
 */
export function ProductGalleryClient({
  categories,
  featuredProducts = [],
}: ProductGalleryClientProps) {
  return (
    <div className="space-y-8">
      {/* 分类卡片：白底 + 轻微阴影，振动盘已排第一 */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <Link key={category._id} href={`/products/${category.slug}`} className="group block">
            <Card className="bg-white border border-[#E5E5E5] shadow-sm hover:border-[#FBA026]/30 transition-colors overflow-hidden">
              <div className="aspect-[4/3] bg-neutral-50 relative overflow-hidden">
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.title ?? ""}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] text-[#6B6B6B] font-mono tracking-wider bg-white/90 px-2 py-1 shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1F1F1F] group-hover:text-[#FBA026] transition-colors">
                  {category.title}
                </h3>
                <p className="text-[#6B6B6B] mt-2 text-sm leading-relaxed">
                  {category.description ?? "Explore our feeding systems and solutions."}
                </p>
                <div className="mt-6 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#FBA026] transition-colors">
                  View Solutions
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* CTA 卡片 */}
        <Card className="bg-white border border-[#E5E5E5] shadow-sm hover:border-[#FBA026]/30 transition-colors flex flex-col overflow-hidden">
          <div
            className="min-h-[200px] flex flex-col items-center justify-center gap-4 px-6 py-6"
            style={{
              backgroundColor: "#FAFAFA",
              backgroundImage: `
                linear-gradient(to bottom right, rgb(31 31 31 / 0.04), rgb(251 160 38 / 0.06)),
                linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 24px 24px, 24px 24px",
            }}
          >
            <Phone className="h-7 w-7 text-[#FBA026]" aria-hidden />
            <ul className="space-y-1.5 text-xs text-[#6B6B6B] text-center max-w-[200px]">
              <li>Reply within 24 hours</li>
              <li>Send part drawings / samples</li>
              <li>Custom feeding solution</li>
            </ul>
          </div>
          <CardContent className="p-5 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-[#1F1F1F]">Need a custom feeding solution?</h3>
            <p className="text-[#6B6B6B] mt-1.5 text-sm leading-relaxed">
              Share your part drawings and requirements. We&apos;ll respond within 24 hours.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button
                asChild
                size="sm"
                className="bg-[#FBA026] hover:bg-[#D4871F] text-white font-medium rounded-none"
              >
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="font-medium rounded-none border-[#E5E5E5] text-[#1F1F1F]"
              >
                <Link href="/contact#engineer">
                  <Phone className="mr-2 h-3 w-3" />
                  Talk to an Engineer
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Products：白底 + 轻微阴影 */}
      {featuredProducts.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold text-[#1F1F1F] mb-4">Featured Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featuredProducts.map((p, index) => (
              <Link
                key={p._id ?? index}
                href={`/products/${p.categorySlug ?? ""}/${p.slug ?? ""}`}
                className="group block"
              >
                <Card className="bg-white border border-[#E5E5E5] shadow-sm hover:border-[#FBA026]/30 transition-colors overflow-hidden">
                  <div className="aspect-[4/3] bg-neutral-50 relative overflow-hidden">
                    <div className="absolute inset-4 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={p.imageUrl || "/placeholder.svg"}
                          alt={p.title ?? ""}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold text-[#1F1F1F] group-hover:text-[#FBA026] transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    {p.excerpt ? (
                      <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-2">{p.excerpt}</p>
                    ) : null}
                    <div className="mt-3 flex items-center text-sm font-semibold text-[#FBA026] group-hover:text-[#D4871F] transition-colors">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
