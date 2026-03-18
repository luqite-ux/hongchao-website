import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { FeaturedProducts } from "@/components/featured-products"
import { CustomProcess } from "@/components/custom-process"
import { TrustGallery } from "@/components/trust-gallery"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Header with Glassmorphism */}
      <Header />

      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Stats Bar - 11 Patents, 1000+ Projects, 50+ Countries */}
      <StatsBar />

      {/* Featured Products - 5 cards in a row */}
      <FeaturedProducts />

      {/* Custom Process - 5 Steps */}
      <CustomProcess />

      {/* Trust Gallery - Tabbed sections */}
      <TrustGallery />

      {/* Testimonials - 3-column carousel */}
      <TestimonialsSection />

      {/* About Section with Video and Map */}
      <AboutSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
