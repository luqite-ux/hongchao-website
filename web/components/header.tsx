"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
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

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products", isProducts: true },
  { name: "Videos", href: "/videos" },
  { name: "Technology", href: "/technology" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header({
  settings,
  productCategories = [],
}: {
  settings: SiteSettings
  productCategories?: ProductCategory[]
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  const companyName = settings?.companyName ?? ""
  const email = settings?.contact?.email
  const phone = settings?.contact?.phone
  const logoSrc = settings?.logo
    ? urlForImage(settings.logo).width(256).height(256).url()
    : "/logo.png"

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top bar */}
      <div className="hidden lg:block bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>Since 2005 | 16 Patents | Global Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo - Brand Block */}
          <Link href="/" className="flex items-center gap-4 py-3">
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
              <span className="text-lg font-bold text-[#1F1F1F] tracking-tight leading-tight">
                {companyName}
              </span>
              <span className="text-[10px] text-[#6B6B6B] uppercase tracking-wider mt-0.5">
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
                        href="/products"
                        className="inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none"
                      >
                        Products
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : item.isProducts ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger
                      className="bg-transparent text-foreground hover:text-primary data-[state=open]:text-primary"
                    >
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                        {productCategories.map((cat) => (
                          <li key={cat._id}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={cat.slug ? `/products/${cat.slug}` : "/products"}
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
                          href="/products"
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
                        "group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-medium transition-colors",
                        "hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus-visible:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-11 px-6">
              <Link href="/contact">Request a Quote</Link>
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
                          href={cat.slug ? `/products/${cat.slug}` : "/products"}
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
                  href={item.href}
                  className="block rounded-md py-3 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md py-3 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-border">
              <Button asChild className="w-full bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
