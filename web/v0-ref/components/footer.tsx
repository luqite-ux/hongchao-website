import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Twitter } from "lucide-react"

const productCategories = [
  { name: "Vibratory Bowl Feeder", href: "/products/vibratory-bowl-feeder" },
  { name: "Centrifugal Feeder", href: "/products/centrifugal-feeder" },
  { name: "Step Feeder", href: "/products/step-feeder" },
  { name: "Linear Feeder", href: "/products/linear-feeder" },
  { name: "Hopper System", href: "/products/hopper" },
  { name: "Custom Solutions", href: "/products/custom" },
]

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Process", href: "/process" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "News & Blog", href: "/news" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

const supportLinks = [
  { name: "Technical Support", href: "/support" },
  { name: "Documentation", href: "/docs" },
  { name: "FAQs", href: "/faqs" },
  { name: "Warranty", href: "/warranty" },
  { name: "Parts & Service", href: "/parts" },
]

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/hongchao-automation", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com/@hongchaoautomation", icon: Youtube },
  { name: "Facebook", href: "https://facebook.com/hongchaoautomation", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com/hongchaoauto", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#FBA026] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">HONGCHAO</span>
                <span className="block text-[10px] text-slate-500 tracking-[0.2em] uppercase">Automation</span>
              </div>
            </Link>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-sm">
              Leading manufacturer of custom parts feeding systems since 2005. Precision engineering for global automation excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@hongchao-auto.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
                info@hongchao-auto.com
              </a>
              <a href="tel:+8657489396968" className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#FBA026] transition-colors">
                <Phone className="w-4 h-4 text-slate-400" />
                +86 574 8939 6968
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>No. 168 Automation Road, Ningbo, Zhejiang, China 315000</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#FBA026] hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {productCategories.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-[#FBA026] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Hongchao Automation. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-slate-500 hover:text-[#FBA026] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
