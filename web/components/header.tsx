"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"
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

const products = [
  {
    title: "Vibratory Bowl Feeder",
    href: "/products/vibratory-bowl-feeder",
    description: "Custom-designed bowl feeders for precise part sorting and orientation",
  },
  {
    title: "Centrifugal Feeder",
    href: "/products/centrifugal-feeder",
    description: "High-speed feeding systems for lightweight and small parts",
  },
  {
    title: "Step Feeder",
    href: "/products/step-feeder",
    description: "Gentle handling for fragile or complex-shaped components",
  },
  {
    title: "Elevator Hopper",
    href: "/products/elevator-hopper",
    description: "Bulk material lifting, buffering, and continuous supply systems",
  },
  {
    title: "Auxiliary Equipment",
    href: "/products/auxiliary-equipment",
    description: "Linear feeders, frames, sound enclosures, hoppers, and controls",
  },
]

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products", children: products },
  { name: "Videos", href: "/videos" },
  { name: "Technology", href: "/technology" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header({ settings }: { settings: SiteSettings }) {
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
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger className="bg-transparent text-foreground hover:text-primary data-[state=open]:text-primary">
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{child.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li className="col-span-2 border-t pt-3 mt-2">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/products"
                              className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                            >
                              View All Products
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none"
                      )}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
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
              item.children ? (
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
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className="block py-2 text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
