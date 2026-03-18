import { sanityClient } from "./sanity.client";
import { siteSettingsQuery } from "./sanity.queries";

export async function fetchSiteSettings() {
  try {
    return await sanityClient.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export type SiteSettings = Awaited<ReturnType<typeof fetchSiteSettings>>;
