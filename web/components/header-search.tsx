"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function HeaderSearch() {
  const [q, setQ] = useState("")
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const term = q.trim()
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="hidden sm:block">
      <div className="relative">
        <label htmlFor="header-search" className="sr-only">
          Search products
        </label>
        <input
          id="header-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-40 lg:w-48 h-9 pl-3 pr-9 rounded-none border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#F6A12A] focus:border-transparent"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-2.5 flex items-center justify-center text-muted-foreground hover:text-[#F6A12A] transition-colors"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}
