import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Globe, Settings, Zap, Shield, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    title: "Vibratory Bowl Feeder",
    positioning: "Custom-designed bowl feeders for precise part sorting and orientation",
    advantage: "Handles screws, springs, metal and plastic components",
    href: "/products/vibratory-bowl-feeder",
    slug: "vibratory-bowl-feeder",
  },
  {
    title: "Centrifugal Feeder",
    positioning: "High-speed centrifugal feeding systems for production efficiency",
    advantage: "Ideal for lightweight and small parts at high volumes",
    href: "/products/centrifugal-feeder",
    slug: "centrifugal-feeder",
  },
  {
    title: "Step Feeder",
    positioning: "Gentle step-by-step feeding for delicate handling requirements",
    advantage: "Designed for fragile or complex-shaped components",
    href: "/products/step-feeder",
    slug: "step-feeder",
  },
  {
    title: "Elevator Hopper",
    positioning: "Bulk material lifting, buffering, and continuous supply",
    advantage: "Reliable vertical transport for high-volume operations",
    href: "/products/elevator-hopper",
    slug: "elevator-hopper",
  },
  {
    title: "Auxiliary Equipment",
    positioning: "Complete supporting systems for feeding solutions",
    advantage: "Linear feeders, frames, enclosures, hoppers, and controls",
    href: "/products/auxiliary-equipment",
    slug: "auxiliary-equipment",
  },
]

const stats = [
  { value: "2005", label: "Founded" },
  { value: "16+", label: "Patents Filed" },
  { value: "1000+", label: "Projects Delivered" },
  { value: "50+", label: "Countries Served" },
]

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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#1F1F1F] text-white overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-white/50 font-medium text-xs uppercase tracking-[0.2em] mb-6">
                Industrial Automation Systems
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                Precision <span className="text-[#F6A12A]">Feeding Systems</span> for Modern Manufacturing
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
                Custom vibratory bowl feeders and automatic feeding systems engineered for stability, accuracy, and long-term reliability.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold text-base px-8 h-12 rounded-none">
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold text-base px-8 h-12 bg-transparent rounded-none">
                  <Link href="/products">
                    View Products
                  </Link>
                </Button>
              </div>
              
              {/* Compact credentials */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/40">
                  <span>Est. 2005</span>
                  <span>16 Patents</span>
                  <span>1000+ Systems Deployed</span>
                  <span>50+ Countries</span>
                </div>
              </div>
            </div>
            
            {/* Right: Abstract System Architecture Diagram */}
            <div className="relative lg:pl-4">
              {/* Diagram Title */}
              <div className="mb-6">
                <p className="text-xs text-white/40 uppercase tracking-[0.15em] font-medium">
                  Integrated Feeding System Architecture
                </p>
              </div>
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main system flow visualization */}
                <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid dots background */}
                  <pattern id="gridDots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)" />
                  </pattern>
                  <rect width="400" height="400" fill="url(#gridDots)" />
                  
                  {/* Connection lines */}
                  <path d="M80 200 L140 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M220 200 L260 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M340 200 L360 200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <path d="M180 140 L180 160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M180 240 L180 260" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M300 140 L300 160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M300 240 L300 260" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Input hopper module */}
                  <rect x="20" y="170" width="60" height="60" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <text x="50" y="205" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">INPUT</text>
                  
                  {/* Vibratory bowl - main module (highlighted) */}
                  <rect x="140" y="160" width="80" height="80" rx="6" fill="rgba(246,161,42,0.1)" stroke="#F6A12A" strokeWidth="2" />
                  <circle cx="180" cy="200" r="25" fill="none" stroke="rgba(246,161,42,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="180" cy="200" r="12" fill="rgba(246,161,42,0.2)" stroke="#F6A12A" strokeWidth="1" />
                  <text x="180" y="250" textAnchor="middle" fill="#F6A12A" fontSize="8" fontFamily="monospace">FEEDER</text>
                  
                  {/* Linear track module */}
                  <rect x="260" y="175" width="80" height="50" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  <line x1="275" y1="200" x2="325" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                  <circle cx="285" cy="200" r="4" fill="rgba(246,161,42,0.6)" />
                  <circle cx="305" cy="200" r="4" fill="rgba(246,161,42,0.4)" />
                  <circle cx="320" cy="200" r="4" fill="rgba(246,161,42,0.2)" />
                  <text x="300" y="235" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">TRACK</text>
                  
                  {/* Output indicator */}
                  <polygon points="360,200 380,190 380,210" fill="rgba(246,161,42,0.6)" />
                  
                  {/* Control module - top */}
                  <rect x="140" y="80" width="80" height="50" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <rect x="155" y="95" width="8" height="8" rx="1" fill="rgba(246,161,42,0.4)" />
                  <rect x="170" y="95" width="8" height="8" rx="1" fill="rgba(255,255,255,0.2)" />
                  <rect x="185" y="95" width="8" height="8" rx="1" fill="rgba(255,255,255,0.2)" />
                  <rect x="200" y="95" width="8" height="8" rx="1" fill="rgba(255,255,255,0.15)" />
                  <line x1="155" y1="115" x2="208" y2="115" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x="180" y="70" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">CONTROL</text>
                  
                  {/* Sensor module - bottom */}
                  <rect x="140" y="270" width="80" height="40" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <circle cx="165" cy="290" r="6" fill="none" stroke="rgba(246,161,42,0.4)" strokeWidth="1" />
                  <circle cx="180" cy="290" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="195" cy="290" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text x="180" y="320" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">SENSORS</text>
                  
                  {/* Vision system - top right */}
                  <rect x="260" y="80" width="80" height="50" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <rect x="280" y="95" width="40" height="25" rx="2" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="300" cy="107" r="8" fill="none" stroke="rgba(246,161,42,0.3)" strokeWidth="1" />
                  <text x="300" y="70" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">VISION</text>
                  
                  {/* PLC module - bottom right */}
                  <rect x="260" y="270" width="80" height="40" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <rect x="275" y="280" width="50" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
                  <rect x="275" y="288" width="35" height="4" rx="1" fill="rgba(246,161,42,0.3)" />
                  <rect x="275" y="296" width="45" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
                  <text x="300" y="320" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">PLC</text>
                  
                  {/* Flow arrows on connection lines */}
                  <polygon points="130,197 140,200 130,203" fill="rgba(255,255,255,0.3)" />
                  <polygon points="250,197 260,200 250,203" fill="rgba(255,255,255,0.3)" />
                  
                  {/* Data flow indicators */}
                  <circle cx="180" cy="150" r="2" fill="rgba(246,161,42,0.6)">
                    <animate attributeName="cy" values="155;145;155" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="300" cy="150" r="2" fill="rgba(255,255,255,0.3)">
                    <animate attributeName="cy" values="155;145;155" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              {/* Diagram Caption */}
              <p className="mt-4 text-xs text-white/30 text-center">
                Hopper, feeder, track, and control modules working in coordination
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
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

      {/* Products Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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
          
          {/* Core Feeding Systems - 2x2 Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {products.slice(0, 4).map((product, index) => (
              <Link key={product.title} href={product.href} className="group block">
                <div className="border border-[#E5E5E5] hover:border-[#F6A12A]/30 transition-colors">
                  {/* Image Container */}
                  <div className="aspect-[4/3] bg-[#F5F5F5] relative overflow-hidden">
                    <Image
                      src={`/images/products/${product.slug}/system-01.jpg`}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] text-[#9CA3AF] font-mono tracking-wider bg-white/90 px-2 py-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[#6B6B6B] mt-2 text-sm leading-relaxed">
                      {product.positioning}
                    </p>
                    <p className="text-[#1F1F1F] mt-4 text-sm font-medium flex items-center gap-2">
                      <span className="w-4 h-px bg-[#F6A12A]" />
                      {product.advantage}
                    </p>
                    <div className="mt-6 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                      View Solutions
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Supporting Equipment - Full Width Horizontal Card */}
          <div className="mt-8">
            <Link href={products[4].href} className="group block">
              <div className="border border-[#E5E5E5] hover:border-[#F6A12A]/30 transition-colors">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Image Container */}
                  <div className="aspect-[4/3] md:aspect-auto bg-[#F5F5F5] relative overflow-hidden">
                    <Image
                      src={`/images/products/${products[4].slug}/system-01.jpg`}
                      alt={products[4].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] text-[#9CA3AF] font-mono tracking-wider bg-white/90 px-2 py-1">
                        05
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-2">Supporting Systems</p>
                    <h3 className="text-xl font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                      {products[4].title}
                    </h3>
                    <p className="text-[#6B6B6B] mt-3 text-sm leading-relaxed max-w-lg">
                      {products[4].positioning}
                    </p>
                    <p className="text-[#1F1F1F] mt-4 text-sm font-medium flex items-center gap-2">
                      <span className="w-4 h-px bg-[#F6A12A]" />
                      {products[4].advantage}
                    </p>
                    <div className="mt-6 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                      View Equipment
                      <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
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
                  src="/images/products/vibratory-bowl-feeder/application-01.jpg"
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
