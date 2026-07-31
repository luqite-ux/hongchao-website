import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { headers } from "next/headers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactSidebar } from "@/components/contact-sidebar";
import { BackToTop } from "@/components/back-to-top";
import { fetchSiteSettings } from "@/lib/site-settings";
import { fetchNavCategories } from "@/lib/product-categories";
import { urlForImage } from "@/lib/sanity.image";
import { getServerLocale } from "@/lib/server-locale";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const SITE_URL = "https://www.hongchaoautomation.cn";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const settings = await fetchSiteSettings(locale);

  const title = settings?.defaultSeo?.title || settings?.companyName || "Website";
  const description = settings?.defaultSeo?.description || "";
  const og = settings?.defaultSeo?.ogImage
    ? urlForImage(settings.defaultSeo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: SITE_URL },
    openGraph: og
      ? { title, description, url: SITE_URL, type: "website", images: [{ url: og }] }
      : { title, description, url: SITE_URL, type: "website" },
    twitter: { card: "summary_large_image", title, description, images: og ? [og] : undefined },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getServerLocale();
  const [settings, productCategories] = await Promise.all([
    fetchSiteSettings(locale),
    fetchNavCategories(locale),
  ]);

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header settings={settings} productCategories={productCategories} locale={locale} />
        <main>{children}</main>
        <Footer settings={settings} locale={locale} productCategories={productCategories} />
        <ContactSidebar />
        <BackToTop />
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
