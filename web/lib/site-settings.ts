import { sanityClient } from "./sanity.client";
import { siteSettingsQuery } from "./sanity.queries";

export async function fetchSiteSettings() {
  return sanityClient.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } });
}

export type SiteSettings = Awaited<ReturnType<typeof fetchSiteSettings>>;
