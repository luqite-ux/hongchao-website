import { headers } from "next/headers"
import { normalizeLocale, type Locale } from "@/lib/i18n"

export async function getServerLocale(): Promise<Locale> {
  const h = await headers()
  return normalizeLocale(h.get("x-locale"))
}

