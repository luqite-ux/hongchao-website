import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { FeaturedProducts, type FeaturedProductItem } from "@/components/featured-products"
import { CustomProcess } from "@/components/custom-process"
import { TrustGallery } from "@/components/trust-gallery"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutSection } from "@/components/about-section"
import { fetchNavCategories } from "@/lib/product-categories"
import { urlForImage } from "@/lib/sanity.image"
import { fetchHomepage } from "@/lib/homepage"
import { getServerLocale } from "@/lib/server-locale"
import { withLocale } from "@/lib/i18n"

const FEATURED_TAGS = ["Best Seller", "High Speed", "Gentle Feed", "Precision", "Bulk Feed"] as const
const DEFAULT_FEATURED: FeaturedProductItem[] = [
  { name: "Vibratory Bowl Feeder", description: "High-precision vibratory feeding systems for automated assembly lines.", tag: "Best Seller", href: "/products/vibration-bowl-feeder" },
  { name: "Centrifugal Feeder", description: "High-speed rotary feeding for maximum throughput efficiency.", tag: "High Speed", href: "/products/centrifugal-feeder" },
  { name: "Step Feeder", description: "Gentle handling for delicate and sensitive components.", tag: "Gentle Feed", href: "/products/step-feeder" },
  { name: "Linear Feeder", description: "Precise linear conveying and orientation systems.", tag: "Precision", href: "/products/linear-feeder" },
  { name: "Hopper System", description: "Bulk storage and controlled feeding solutions.", tag: "Bulk Feed", href: "/products/hopper" },
]

/**
 * 首页：v0 全量布局，仅亮色系统（bg-white / bg-slate-50）。
 * - 视频背景：/videos/hero-bg.mp4
 * - StatsBar：11 Patents、1000+ Projects、50+ Countries
 * - 产品区展示分类图片（图6），无图则用图标
 */
export default async function HomePage() {
  const locale = await getServerLocale()

  let categories: Awaited<ReturnType<typeof fetchNavCategories>> = []
  try {
    categories = await fetchNavCategories(locale)
  } catch {
    // Sanity 不可用时回退到本地默认数据
    categories = []
  }

  let homepage = null
  try {
    homepage = await fetchHomepage(locale)
  } catch {
    homepage = null
  }

  // 用 Sanity「精选分类」填 5 张卡片，有分类图则展示（精选分类已上传图片）
  const items: FeaturedProductItem[] = []
  for (let i = 0; i < 5; i++) {
    const cat = categories[i]
    if (cat) {
      items.push({
        name: cat.title,
        description: cat.description ?? DEFAULT_FEATURED[i]!.description,
        tag: FEATURED_TAGS[i] ?? "Featured",
        href: withLocale(cat.slug ? `/products/${cat.slug}` : "/products", locale),
        imageUrl: cat.image ? urlForImage(cat.image).width(480).height(360).url() : null,
      })
    } else {
      items.push(DEFAULT_FEATURED[i]!)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StatsBar />
      <FeaturedProducts items={items} />
      <CustomProcess />
      <TrustGallery data={homepage?.trustSection} />
      <TestimonialsSection data={homepage?.testimonials} />
      <AboutSection />
    </main>
  )
}
