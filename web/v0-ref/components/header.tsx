"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { 
    name: "Products", 
    href: "/products",
    submenu: [
      { name: "Vibratory Bowl Feeder", href: "/products/vibratory-bowl-feeder" },
      { name: "Centrifugal Feeder", href: "/products/centrifugal-feeder" },
      { name: "Step Feeder", href: "/products/step-feeder" },
      { name: "Linear Feeder", href: "/products/linear-feeder" },
      { name: "Hopper", href: "/products/hopper" },
    ]
  },
  { name: "Solutions", href: "/solutions" },
  { name: "About Us", href: "/about" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-slate-200" />
      
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FBA026] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">HONGCHAO</span>
                <span className="block text-[10px] text-slate-500 tracking-[0.2em] uppercase">Automation</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-[15px] font-bold text-slate-800 hover:text-[#FBA026] hover:bg-[#FBA026]/6 transition-all duration-150 tracking-tight"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180 text-[#FBA026]" : ""}`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-2xl shadow-slate-200/80 border border-slate-200 py-2 min-w-[230px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#FBA026] transition-colors group/sub"
                        >
                          <span className="w-1 h-1 rounded-full bg-slate-300 group-hover/sub:bg-[#FBA026] transition-colors" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:text-[#FBA026] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Request Quote Button */}
            <Button 
              className="hidden sm:inline-flex bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold px-6"
            >
              Request a Quote
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 p-4 bg-white border-b border-slate-200">
            <input
              type="text"
              placeholder="Search products, solutions..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBA026]/50 text-slate-700"
              autoFocus
            />
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-bold text-slate-800 hover:text-[#FBA026] tracking-tight transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-slate-200 ml-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-2 py-1.5 text-sm font-medium text-slate-500 hover:text-[#FBA026] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button className="w-full mt-4 bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
              Request a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
