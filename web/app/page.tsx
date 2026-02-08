import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Settings, Zap, Shield, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchProductCategories } from "@/lib/product-categories"
import { sanityClient } from "@/lib/sanity.client"
import { productsQuery } from "@/lib/sanity.queries"
import { homepageQuery } from "@/lib/sanity/queries"
import { urlForImage } from "@/lib/sanity.image"

// 静态 Hero 文案（不依赖 Sanity homepage 文档，与原设计一致）
const HERO = {
  subtitle:
    "Precision feeding and reliable automation solutions for modern manufacturing.",
  ctaPrimary: { text: "Product Sheet", href: "/products" },
  ctaSecondary: { text: "View Products", href: "/products" },
} as const

const HERO_STATS = [
  { value: "2005", label: "Founded" },
  { value: "16+", label: "Patents" },
  { value: "1000+", label: "Solutions" },
  { value: "50+", label: "Countries" },
] as const

const features = [
  {
    icon: Settings,
    title: "Custom Engineering",
    description: "Every feeding system is designed to match your exact part geometry and production requirements.",
  },
  {
    icon: Zap,
    title: "High Throughput",
    description: "Optimized bowl tooling and vibration control deliver maximum feed rates with minimal downtime.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Rigorous testing and quality control ensure reliable operation and long service life.",
  },
  {
    icon: Globe,
    title: "Global Support",
    description: "Technical support and spare parts network serving manufacturers worldwide.",
  },
]

export default async function HomePage() {
  const [categories, allProducts, homepage] = await Promise.all([
    fetchProductCategories(),
    sanityClient.fetch(productsQuery),
    sanityClient.fetch(homepageQuery, {}, { next: { revalidate: 60 } }).catch(() => null),
  ])
  const categoriesWithSlug = (categories ?? []).filter((c) => c.slug)
  const representativeProducts = (allProducts ?? [])
    .filter((p: { slug?: string | null; category?: { slug?: string | null } }) => p?.slug && p?.category?.slug)
    .slice(0, 5)

  // 分类卡片：仅从 productCategory 查询，取前 5 个；图片用 productCategory.image，无则 /placeholder.svg
  const displayCategories = categoriesWithSlug.slice(0, 5)

  // Featured Products：优先 Sanity homepage.featuredProducts，否则用 representativeProducts
  const featuredProducts =
    (homepage?.featuredProducts?.length ?? 0) > 0
      ? (homepage.featuredProducts ?? []).filter(
          (p: { slug?: string | null; category?: { slug?: string | null } }) => p?.slug && p?.category?.slug
        )
      : representativeProducts

  const stats = homepage?.stats ?? []

  return (
    <div className="flex flex-col">
      {/* Hero Section：静态 UI，不依赖 Sanity homepage */}
      <section className="relative bg-[#1F1F1F] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Precision{" "}
                <span className="text-[#F6A12A]">Feeding</span>{" "}
                <span className="text-[#F6A12A]">Systems</span> for Modern Manufacturing
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
                {HERO.subtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold text-base px-8 h-12 rounded-none">
                  <Link href={HERO.ctaPrimary.href}>
                    {HERO.ctaPrimary.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold text-base px-8 h-12 bg-transparent rounded-none">
                  <Link href={HERO.ctaSecondary.href}>
                    {HERO.ctaSecondary.text}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:pl-4">
              <div className="mb-6">
                <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-medium">
                  Integrated Feeding System Architecture
                </p>
              </div>
              <div className="relative aspect-square max-w-md mx-auto">
                <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="gridDots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)" />
                  </pattern>
                  <rect width="400" height="400" fill="url(#gridDots)" />
                  <path d="M80 200 L140 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M220 200 L260 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M340 200 L360 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <path d="M180 140 L180 160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M180 240 L180 260" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M300 140 L300 160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M300 240 L300 260" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <rect x="20" y="170" width="60" height="60" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <text x="50" y="205" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">INPUT</text>
                  <rect x="140" y="160" width="80" height="80" rx="6" fill="rgba(246,161,42,0.1)" stroke="#F6A12A" strokeWidth="2" />
                  <circle cx="180" cy="200" r="25" fill="none" stroke="rgba(246,161,42,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="180" cy="200" r="12" fill="rgba(246,161,42,0.2)" stroke="#F6A12A" strokeWidth="1" />
                  <text x="180" y="250" textAnchor="middle" fill="#F6A12A" fontSize="8" fontFamily="monospace">FEEDER</text>
                  <rect x="260" y="175" width="80" height="50" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  <line x1="275" y1="200" x2="325" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <circle cx="285" cy="200" r="4" fill="rgba(246,161,42,0.6)" />
                  <circle cx="305" cy="200" r="4" fill="rgba(246,161,42,0.4)" />
                  <circle cx="320" cy="200" r="4" fill="rgba(246,161,42,0.2)" />
                  <text x="300" y="235" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">TRACK</text>
                  <polygon points="360,200 380,190 380,210" fill="rgba(246,161,42,0.6)" />
                  <rect x="140" y="80" width="80" height="50" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <rect x="155" y="95" width="8" height="8" rx="1" fill="rgba(246,161,42,0.4)" />
                  <rect x="170" y="95" width="8" height="8" rx="1" fill="rgba(255,255,255,0.2)" />
                  <rect x="185" y="95" width="8" height="8" rx="1" fill="rgba(255,255,255,0.2)" />
                  <rect x="200" y="95" width="8" height="8" rx="1" fill="rgba(255,255,255,0.15)" />
                  <line x1="155" y1="115" x2="208" y2="115" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x="180" y="70" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">CONTROL</text>
                  <rect x="140" y="270" width="80" height="40" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <circle cx="165" cy="290" r="6" fill="none" stroke="rgba(246,161,42,0.4)" strokeWidth="1" />
                  <circle cx="180" cy="290" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="195" cy="290" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="180" y="320" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">SENSORS</text>
                  <rect x="260" y="80" width="80" height="50" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <rect x="280" y="95" width="40" height="25" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="300" cy="107" r="8" fill="none" stroke="rgba(246,161,42,0.3)" strokeWidth="1" />
                  <text x="300" y="70" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">VISION</text>
                  <rect x="260" y="270" width="80" height="40" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <rect x="275" y="280" width="50" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
                  <rect x="275" y="288" width="35" height="4" rx="1" fill="rgba(246,161,42,0.3)" />
                  <rect x="275" y="296" width="45" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
                  <text x="300" y="320" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">PLC</text>
                  <polygon points="130,197 140,200 130,203" fill="rgba(255,255,255,0.3)" />
                  <polygon points="250,197 260,200 250,203" fill="rgba(255,255,255,0.3)" />
                  <circle cx="180" cy="150" r="2" fill="rgba(246,161,42,0.6)">
                    <animate attributeName="cy" values="155;145;155" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="300" cy="150" r="2" fill="rgba(255,255,255,0.3)">
                    <animate attributeName="cy" values="155;145;155" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              <p className="mt-4 text-xs text-white/30 text-center">
                Hopper, feeder, track, and control modules working in coordination
              </p>
            </div>
          </div>
          {/* Hero 底部静态统计（与原设计一致） */}
          <div className="mt-16 lg:mt-20 pt-12 border-t border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {HERO_STATS.map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    {value}
                  </p>
                  <p className="mt-2 text-sm text-white/50 uppercase tracking-wider font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section：来自 Sanity homepage（无则不展示） */}
      {stats.length > 0 && (
        <section className="bg-[#FAFAFA]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat: { value: string; label: string }) => (
                <div key={stat.label} className="text-center">
                  <p className="text-5xl lg:text-6xl font-bold text-[#1F1F1F] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section: Categories from Sanity + 4–5 representative products */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
                Engineering Systems
              </p>
              <h2 className="text-3xl font-bold text-[#1F1F1F] sm:text-4xl tracking-tight">
                Precision Feeding Technology
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-medium text-[#1F1F1F] hover:text-[#F6A12A] transition-colors group"
            >
              View All Systems
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 分类卡片：3 行 2 列网格，前 5 个分类 + 1 个 CTA 卡片 */}
          <div className="grid md:grid-cols-2 gap-8">
            {displayCategories.slice(0, 5).map((category: { _id: string; title: string; slug: string | null; description?: string | null; image?: unknown }, index: number) => (
              <Link
                key={category._id}
                href={`/products/${category.slug}`}
                className="group block"
              >
                <div className="border border-[#E5E5E5] hover:border-[#F6A12A]/30 transition-colors">
                  <div className="aspect-[4/3] bg-[#F5F5F5] relative overflow-hidden">
                    <Image
                      src={category.image ? urlForImage(category.image).width(1200).height(900).url() : "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] text-[#9CA3AF] font-mono tracking-wider bg-white/90 px-2 py-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[#6B6B6B] mt-2 text-sm leading-relaxed">
                      {category.description ?? "Explore our feeding systems and solutions."}
                    </p>
                    <div className="mt-6 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                      View Solutions
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {/* CTA 卡片：右下角 */}
            <div className="border border-[#E5E5E5] hover:border-[#F6A12A]/30 transition-colors flex flex-col overflow-hidden">
              <div
                className="min-h-[200px] flex flex-col items-center justify-center gap-4 px-6 py-6"
                style={{
                  backgroundColor: "#FAFAFA",
                  backgroundImage: `
                    linear-gradient(to bottom right, rgb(31 31 31 / 0.04), rgb(246 161 42 / 0.06)),
                    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 24px 24px, 24px 24px",
                }}
              >
                <Phone className="h-7 w-7 text-[#F6A12A]" aria-hidden />
                <ul className="space-y-1.5 text-xs text-[#6B6B6B] text-center max-w-[200px]">
                  <li>Reply within 24 hours</li>
                  <li>Send part drawings / samples</li>
                  <li>Custom feeding solution</li>
                </ul>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">Need a custom feeding solution?</h3>
                <p className="text-[#6B6B6B] mt-1.5 text-sm leading-relaxed">
                  Share your part drawings and requirements. We&apos;ll respond within 24 hours.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button asChild size="sm" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-medium rounded-none">
                    <Link href="/contact">Request a Quote</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="font-medium rounded-none border-[#E5E5E5]">
                    <Link href="/contact#engineer">
                      <Phone className="mr-2 h-3 w-3" />
                      Talk to an Engineer
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Products：优先 Sanity homepage.featuredProducts，否则取产品列表前 5 */}
          {featuredProducts.length > 0 ? (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Featured Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {featuredProducts.map((p: { _id: string; title: string; slug: string; excerpt?: string | null; mainImage?: unknown; category: { slug: string } }) => (
                  <Link
                    key={p._id}
                    href={`/products/${p.category.slug}/${p.slug}`}
                    className="group block border border-[#E5E5E5] hover:border-[#F6A12A]/30 transition-colors"
                  >
                    <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                      <div className="absolute inset-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={p.mainImage ? urlForImage(p.mainImage).width(1200).height(800).url() : "/placeholder.svg"}
                            alt={p.title}
                            fill
                            className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 20vw"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                      {p.excerpt ? (
                        <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-2">{p.excerpt}</p>
                      ) : null}
                      <div className="mt-2 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">Why HONGCHAO</p>
              <h2 className="text-3xl font-bold text-[#1F1F1F] sm:text-4xl tracking-tight">
                Engineering Excellence Backed by Innovation
              </h2>
              <p className="mt-6 text-base text-[#6B6B6B] leading-relaxed">
                With 16 patents and nearly two decades of experience, HONGCHAO delivers feeding systems 
                that meet the most demanding industrial requirements. Our team of engineers works closely 
                with you to develop solutions that integrate seamlessly into your production line.
              </p>
              <ul className="mt-10 space-y-5">
                {[
                  "8 Invention Patents + 8 Utility Model Patents",
                  "Custom non-standard automation solutions",
                  "Strategic partnerships with leading manufacturers",
                  "Comprehensive after-sales support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#F6A12A] mt-2 flex-shrink-0" />
                    <span className="text-[#1F1F1F] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                  <Link href="/technology">
                    Explore Our Technology
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#E5E5E5]">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <feature.icon className="h-5 w-5 text-[#F6A12A]" />
                    <h3 className="font-semibold text-[#1F1F1F] text-sm">{feature.title}</h3>
                  </div>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Case */}
      <section className="py-24 lg:py-32 bg-[#1F1F1F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em]">
                  Application Case
                </p>
                <span className="text-white/20 text-xs">|</span>
                <span className="text-white/40 text-xs">Automotive</span>
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl tracking-tight">
                Automotive Fastener Feeding System
              </h2>
              
              <div className="mt-10 space-y-8">
                <div className="border-l-2 border-[#F6A12A] pl-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Challenge</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    High-speed feeding of M6 hex bolts at 800+ ppm with consistent orientation for robotic pick-and-place assembly.
                  </p>
                </div>
                
                <div className="border-l border-white/20 pl-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Solution</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Custom vibratory bowl feeder with precision tooling, linear track, sound enclosure, and elevator hopper for continuous supply.
                  </p>
                </div>
                
                <div className="border-l border-white/20 pl-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Result</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    35% increase in assembly line efficiency. Noise level reduced to under 65dB with sound enclosure integration.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                  <Link href="/contact">
                    Discuss Your Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden border border-white/10">
                <Image
                  src="/images/case-automotive.png"
                  alt="Automotive fastener feeding system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#1F1F1F] border border-white/10 px-4 py-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Industry</p>
                <p className="text-sm font-medium text-white mt-0.5">Automotive Manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1F1F1F] sm:text-4xl tracking-tight">
              Ready to Streamline Your Production?
            </h2>
            <p className="mt-6 text-base text-[#6B6B6B] leading-relaxed">
              Contact our engineering team today to discuss your specific feeding requirements. 
              We will work with you to design a custom solution that optimizes your assembly process.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold text-base px-8 rounded-none h-12">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold text-base px-8 bg-transparent rounded-none h-12 border-[#1F1F1F] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white">
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
