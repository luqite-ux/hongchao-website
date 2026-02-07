import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { fetchSiteSettings } from "@/lib/site-settings";
import { fetchNavCategories } from "@/lib/product-categories";
import { urlForImage } from "@/lib/sanity.image";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings();

  const title = settings?.defaultSeo?.title || settings?.companyName || "Website";
  const description = settings?.defaultSeo?.description || "";
  const og = settings?.defaultSeo?.ogImage
    ? urlForImage(settings.defaultSeo.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: og
      ? { title, description, images: [{ url: og }] }
      : { title, description },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, productCategories] = await Promise.all([
    fetchSiteSettings(),
    fetchNavCategories(),
  ]);

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header settings={settings} productCategories={productCategories} />
        <main>{children}</main>
        <Footer settings={settings} />
        <Analytics />
      </body>
    </html>
  );
}
