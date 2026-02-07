"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/lib/product-categories"

interface ProductMegaMenuProps {
  categories: ProductCategory[]
  triggerClassName?: string
}

export function ProductMegaMenu({ categories, triggerClassName }: ProductMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  if (!categories || categories.length === 0) {
    return (
      <Link
        href="/products"
        className={cn(
          "inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none",
          triggerClassName
        )}
      >
        Products
      </Link>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimeout()
        handleMouseEnter()
      }}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="products-mega-menu"
        id="products-mega-menu-trigger"
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-6 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none",
          isOpen && "text-primary",
          triggerClassName
        )}
      >
        Products
        <ChevronDown
          className={cn(
            "ml-1 h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          id="products-mega-menu"
          role="menu"
          aria-labelledby="products-mega-menu-trigger"
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1"
        >
          <div
            className="w-max min-w-[480px] max-w-[560px] animate-in fade-in-0 zoom-in-95 duration-200 rounded-lg border border-border bg-white px-5 py-4 shadow-xl"
            onMouseEnter={clearCloseTimeout}
          >
            {/* v0：两列网格，紧凑；悬停黄色高亮 */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 list-none p-0 m-0">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={cat.slug ? `/products/${cat.slug}` : "/products"}
                    role="menuitem"
                    className={cn(
                      "block select-none rounded-md py-2 px-2.5 transition-colors outline-none",
                      "hover:bg-[#FEF3C7] focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                  >
                    <span className="block font-medium text-sm text-foreground leading-tight">
                      {cat.title}
                    </span>
                    {cat.description ? (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-snug">
                        {cat.description}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            {/* v0：底部居中文字链接，橙色 + 右箭头 */}
            <div className="mt-4 flex justify-center border-t border-border pt-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                View All Products
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
