"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { urlForImage } from "@/lib/sanity.image"
import type { SiteSettings } from "@/lib/site-settings"
import type { ProductCategory } from "@/lib/product-categories"
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL } from "@/lib/contact"
import { HeaderSearch } from "@/components/header-search"
import { LanguageSwitcher } from "@/components/language-switcher"

/** 导航：Catalog 已在首页产品区体现，不再单独栏目（按图1 v0） */
const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products", isProducts: true },
  { name: "Videos", href: "/videos" },
  { name: "Technology", href: "/technology" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const SUPPORTED_LOCALES = ["en", "de", "es"] as const
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

function getLocaleFromPathname(pathname: string): SupportedLocale {
  const seg = pathname.split("/")[1]
  return (SUPPORTED_LOCALES as readonly string[]).includes(seg) ? (seg as SupportedLocale) : "en"
}

function withLocale(href: string, locale: SupportedLocale) {
  if (locale === "en") return href
  if (!href.startsWith("/")) return href
  if (href === "/") return `/${locale}`
  const seg = href.split("/")[1]
  if ((SUPPORTED_LOCALES as readonly string[]).includes(seg)) return href
  return `/${locale}${href}`
}

export function Header({
  settings,
  productCategories = [],
  locale: localeProp,
}: {
  settings: SiteSettings
  productCategories?: ProductCategory[]
  locale?: string
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const pathname = usePathname()
  const locale = (localeProp as SupportedLocale | undefined) ?? getLocaleFromPathname(pathname || "/")

  const companyName = settings?.companyName ?? ""
  const email = CONTACT_EMAIL
  const phone = CONTACT_PHONE_DISPLAY
  const logoSrc = settings?.logo
    ? urlForImage(settings.logo).width(256).height(256).url()
    : "/logo.png"

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      {/* Top bar - v0 亮色（图1） */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-200 text-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[#FBA026] transition-colors">
                <Mail className="h-4 w-4" />
                {email}
              </a>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[#FBA026] transition-colors">
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-4 text-slate-500 items-center">
              <span className="text-sm">Since 2005 | 11 Patents | Global Service</span>
              <LanguageSwitcher className="text-slate-500 text-xs" size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo - Brand Block */}
          <Link href={withLocale("/", locale)} className="flex items-center gap-4 py-3">
            <div className="flex-shrink-0 w-16 h-16 relative">
              <Image
                src={logoSrc}
                alt={companyName || "Logo"}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col justify-center">
              <span className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                {companyName}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                Automation Equipment
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {navigation.map((item) =>
                item.isProducts && productCategories.length === 0 ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={withLocale("/products", locale)}
                        className="inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none"
                      >
                        Products
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : item.isProducts ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger
                      className="bg-transparent text-slate-800 hover:text-[#FBA026] data-[state=open]:text-[#FBA026]"
                    >
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                        {productCategories.map((cat) => (
                          <li key={cat._id}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={withLocale(cat.slug ? `/products/${cat.slug}` : "/products", locale)}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <span className="font-medium">{cat.title}</span>
                                {cat.description ? (
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {cat.description}
                                  </p>
                                ) : null}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-center border-t border-border px-4 pb-4 pt-3">
                        <Link
                          href={withLocale("/products", locale)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/90 transition-colors"
                        >
                          View All Products
                          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-semibold transition-colors",
                        "hover:bg-[#F6A12A] hover:text-white focus:bg-[#F6A12A] focus:text-white focus-visible:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6A12A] focus-visible:ring-offset-2"
                      )}
                    >
                      <Link href={withLocale(item.href, locale)}>{item.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search + CTA（阶段五：搜索框更醒目） */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderSearch />
            <Button
              asChild
              size="lg"
              className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold rounded-lg h-11 px-6 transition-transform duration-200 hover:scale-105"
            >
              <Link href={withLocale("/contact", locale)}>Request a Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) =>
              item.isProducts && productCategories.length > 0 ? (
                <div key={item.name}>
                  <button
                    className="flex w-full items-center justify-between rounded-md py-3 text-base font-medium text-foreground hover:text-primary"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform",
                        mobileProductsOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {mobileProductsOpen && (
                    <div className="ml-4 space-y-1 border-l-2 border-primary pl-4">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat._id}
                          href={withLocale(cat.slug ? `/products/${cat.slug}` : "/products", locale)}
                          className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {cat.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : item.isProducts ? (
                <Link
                  key={item.name}
                  href={withLocale(item.href, locale)}
                  className="block rounded-md py-3 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={withLocale(item.href, locale)}
                  className="block rounded-md py-3 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600">Language</span>
                <LanguageSwitcher className="flex-1 text-slate-600 border-slate-200" />
              </div>
              <Button asChild className="w-full bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href={withLocale("/contact", locale)}>Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
