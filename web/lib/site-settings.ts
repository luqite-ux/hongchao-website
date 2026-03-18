import { sanityClient } from "./sanity.client";
import { siteSettingsQuery } from "./sanity.queries";
import type { Locale } from "@/lib/i18n";

export async function fetchSiteSettings(locale: Locale = "en") {
  try {
    return await sanityClient.fetch(siteSettingsQuery, { locale }, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export type SiteSettings = Awaited<ReturnType<typeof fetchSiteSettings>>;
