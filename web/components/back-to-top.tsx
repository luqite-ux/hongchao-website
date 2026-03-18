"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

const SCROLL_THRESHOLD = 400

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(typeof window !== "undefined" && window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#F6A12A] text-white shadow-lg hover:bg-[#D4871F] focus:outline-none focus:ring-2 focus:ring-[#F6A12A] focus:ring-offset-2 transition-colors"
      aria-label="Back to top"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  )
}
