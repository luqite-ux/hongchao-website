"use client"

import Link from "next/link"
import { Phone, Mail, MessageCircle } from "lucide-react"
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL, CONTACT_PHONE_TEL } from "@/lib/contact"

/**
 * Right-side floating contact bar: narrow icon strip; content (phone, email, link) shows only on hover. English only.
 */
export function ContactSidebar() {
  return (
    <aside
      className="group fixed right-0 top-1/2 z-40 -translate-y-1/2 hidden xl:flex flex-col rounded-l-lg overflow-visible shadow-lg border border-r-0 border-white/10"
      style={{ background: "rgba(31, 31, 31, 0.92)" }}
      aria-label="Contact us"
    >
      {/* Hover panel: visible only when hovering the bar */}
      <div className="absolute right-full top-0 mr-0 w-0 overflow-hidden opacity-0 group-hover:w-[180px] group-hover:opacity-100 group-hover:overflow-visible transition-all duration-200 ease-out">
        <div className="w-[180px] py-3 px-3 rounded-l-lg space-y-1.5 mr-1" style={{ background: "rgba(31, 31, 31, 0.98)" }}>
          <p className="text-[10px] font-medium text-white/70 uppercase tracking-wider mb-2">Contact Us</p>
          <a href={CONTACT_PHONE_TEL} className="flex items-center gap-2 py-1.5 px-2 rounded text-white hover:text-[#F6A12A] hover:bg-white/5 transition-colors" title="Call us">
            <Phone className="h-3.5 w-3.5 shrink-0 text-[#F6A12A]" />
            <span className="text-xs break-all">{CONTACT_PHONE_DISPLAY}</span>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 py-1.5 px-2 rounded text-white hover:text-[#F6A12A] hover:bg-white/5 transition-colors" title="Email us">
            <Mail className="h-3.5 w-3.5 shrink-0 text-[#F6A12A]" />
            <span className="text-xs break-all truncate max-w-[140px]">{CONTACT_EMAIL}</span>
          </a>
          <Link href="/contact" className="flex items-center gap-2 py-1.5 px-2 rounded text-white hover:text-[#F6A12A] hover:bg-white/5 transition-colors" title="Online inquiry">
            <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#F6A12A]" />
            <span className="text-xs">Online inquiry</span>
          </Link>
        </div>
      </div>
      {/* Narrow icon strip (always visible) */}
      <div className="flex flex-col w-11 py-2.5 gap-0.5">
        <a href={CONTACT_PHONE_TEL} className="flex items-center justify-center py-2 text-white hover:text-[#F6A12A] transition-colors" title={CONTACT_PHONE_DISPLAY}>
          <Phone className="h-4 w-4 shrink-0 text-[#F6A12A]" />
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center py-2 text-white hover:text-[#F6A12A] transition-colors" title={CONTACT_EMAIL}>
          <Mail className="h-4 w-4 shrink-0 text-[#F6A12A]" />
        </a>
        <Link href="/contact" className="flex items-center justify-center py-2 text-white hover:text-[#F6A12A] transition-colors" title="Online inquiry">
          <MessageCircle className="h-4 w-4 shrink-0 text-[#F6A12A]" />
        </Link>
      </div>
    </aside>
  )
}
