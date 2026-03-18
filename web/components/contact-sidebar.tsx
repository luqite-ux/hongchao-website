"use client"

import Link from "next/link"
import { Mail, MessageCircle, Phone, Send } from "lucide-react"
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact"

/**
 * 右侧悬浮联系栏：白底 + 品牌橙、文字标签、悬停反色、默认气泡引导。工业品牌感。
 */
export function ContactSidebar() {
  return (
    <aside
      className="fixed right-4 top-40 z-40 hidden xl:flex flex-col rounded-2xl overflow-visible shadow-xl border border-slate-200/80 bg-white"
      aria-label="Contact us"
    >
      {/* 气泡：在悬浮栏上方，与栏体留出一点距离 */}
      <div
        className="absolute left-1/2 -top-5 -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 whitespace-nowrap pointer-events-none shadow-sm"
        style={{ background: "rgba(251, 160, 38, 0.12)" }}
      >
        Contact Us
      </div>

      {/* 图标条：顶部留白，与气泡不粘在一起 */}
      <div className="flex flex-col w-14 pt-4 pb-3 gap-0.5 px-1.5">
        <Link
          href="/contact"
          className="group/item flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-transform duration-200 hover:scale-105 hover:bg-[#FBA026]"
          title="Request a Quote"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Send
              className="h-5 w-5 shrink-0 text-[#FBA026] transition-colors duration-200 group-hover/item:text-white"
              aria-hidden
            />
          </span>
          <span className="text-[10px] text-slate-600 group-hover/item:text-white font-medium transition-colors duration-200">
            Quote
          </span>
        </Link>
        <a
          href={CONTACT_PHONE_TEL}
          className="group/item flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors duration-200 hover:bg-[#FBA026]"
          title={CONTACT_PHONE_DISPLAY}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Phone
              className="h-5 w-5 shrink-0 text-[#FBA026] transition-colors duration-200 group-hover/item:text-white"
              aria-hidden
            />
          </span>
          <span className="text-[10px] text-slate-600 group-hover/item:text-white font-medium transition-colors duration-200">
            Call
          </span>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group/item flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors duration-200 hover:bg-[#FBA026]"
          title={CONTACT_EMAIL}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Mail
              className="h-5 w-5 shrink-0 text-[#FBA026] transition-colors duration-200 group-hover/item:text-white"
              aria-hidden
            />
          </span>
          <span className="text-[10px] text-slate-600 group-hover/item:text-white font-medium transition-colors duration-200">
            Email
          </span>
        </a>
        <a
          href={CONTACT_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group/item flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors duration-200 hover:bg-[#FBA026]"
          title="WhatsApp"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg">
            <MessageCircle
              className="h-5 w-5 shrink-0 text-[#FBA026] transition-colors duration-200 group-hover/item:text-white"
              aria-hidden
            />
          </span>
          <span className="text-[10px] text-slate-600 group-hover/item:text-white font-medium transition-colors duration-200">
            WhatsApp
          </span>
        </a>
      </div>
    </aside>
  )
}
