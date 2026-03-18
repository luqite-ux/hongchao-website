import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { fetchSiteSettings } from "@/lib/site-settings"

export const metadata: Metadata = {
  title: "Product Catalog - HONGCHAO Automation Equipment",
  description: "Download our product catalog for vibratory bowl feeders and custom feeding systems.",
}

/** 产品目录 PDF 路径：将 PDF 放到 public/downloads/ 后在此填写，留空则显示“即将提供” */
const CATALOG_PDF_PATH = "" // 例如: "/downloads/hongchao-product-catalog.pdf"

export default async function CatalogPage() {
  const settings = await fetchSiteSettings()
  const companyName = settings?.companyName ?? "HONGCHAO"

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Catalog" }]} />
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#FBA026] font-medium text-sm uppercase tracking-wider mb-4">Resources</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-800">
              Product Catalog
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Download our product catalog for {companyName} vibratory bowl feeders, inline feeders, and custom automation feeding systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FBA026]/10 text-[#FBA026] mb-6">
              <FileText className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              {CATALOG_PDF_PATH ? "Download Catalog" : "Catalog Coming Soon"}
            </h2>
            <p className="mt-3 text-slate-500">
              {CATALOG_PDF_PATH
                ? "Click below to download our product catalog (PDF)."
                : "We are preparing our product catalog for download. Please contact us for technical brochures or product sheets."}
            </p>
            {CATALOG_PDF_PATH ? (
              <div className="mt-8">
                <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
                  <a href={CATALOG_PDF_PATH} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
              </div>
            ) : (
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-[#FBA026] hover:bg-[#e8922a] text-white font-semibold">
                  <Link href="/products">
                    View Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
