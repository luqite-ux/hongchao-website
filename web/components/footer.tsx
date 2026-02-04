import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlForImage } from "@/lib/sanity.image"
import type { SiteSettings } from "@/lib/site-settings"

const footerNavigation = {
  products: [
    { name: "Vibratory Bowl Feeder", href: "/products/vibratory-bowl-feeder" },
    { name: "Centrifugal Feeder", href: "/products/centrifugal-feeder" },
    { name: "Step Feeder", href: "/products/step-feeder" },
    { name: "Elevator Hopper", href: "/products/elevator-hopper" },
    { name: "Auxiliary Equipment", href: "/products/auxiliary-equipment" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Technology & Patents", href: "/technology" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Request a Quote", href: "/contact" },
    { name: "Talk to an Engineer", href: "/contact#engineer" },
  ],
}

const DEFAULT_COMPANY = "Suzhou Hongchao Automation Equipment Co., Ltd."
const DEFAULT_DESC = "Leading manufacturer of vibratory bowl feeders and custom automation feeding systems since 2005."

export function Footer({ settings }: { settings: SiteSettings }) {
  const companyName = settings?.companyName || "HONGCHAO"
  const email = settings?.contact?.email
  const phone = settings?.contact?.phone
  const address = settings?.contact?.address
  const copyrightName = settings?.companyName || DEFAULT_COMPANY
  const footerLogoUrl = settings?.logo
    ? urlForImage(settings.logo).width(180).url()
    : "/logo.png"

  return (
    <footer className="bg-foreground text-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Ready to Optimize Your Production Line?
              </h3>
              <p className="mt-2 text-white/60 text-sm">
                Get a custom feeding solution designed for your specific requirements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold rounded-none h-12 px-8 bg-transparent">
                <Link href="/contact#engineer">Talk to an Engineer</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            {footerLogoUrl && (
              <Image
                src={footerLogoUrl}
                alt={settings?.companyName ?? "Logo"}
                width={180}
                height={60}
                className="h-10 w-auto object-contain"
              />
            )}
            <p className="text-sm text-background/80 max-w-xs leading-relaxed">
              {copyrightName} - {DEFAULT_DESC}
            </p>
            <div className="space-y-3">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-background/80 hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  {phone}
                </a>
              )}
              {address && (
                <div className="flex items-start gap-3 text-sm text-background/80">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 grid grid-cols-3 gap-12 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Products</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.products.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-white/60 hover:text-[#F6A12A] transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-white/60 hover:text-[#F6A12A] transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Support</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-white/60 hover:text-[#F6A12A] transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-background/60">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
