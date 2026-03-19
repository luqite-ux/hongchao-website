import type { Metadata } from "next"
import { sanityClient } from "@/lib/sanity.client"
import { faqPageQuery } from "@/lib/sanity.queries"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getServerLocale } from "@/lib/server-locale"

export const metadata: Metadata = {
  title: "FAQs - Frequently Asked Questions",
  description: "Find answers to common questions about parts feeding systems, customization, lead time, and service.",
}

type FaqPage = {
  title?: string
  items?: Array<{ _key?: string; question?: string; answer?: string }>
  seo?: { title?: string; description?: string }
} | null

export default async function FaqPage() {
  const locale = await getServerLocale()
  const data = await sanityClient.fetch<FaqPage>(faqPageQuery, { locale }, { next: { revalidate: 60 } })

  const title = data?.seo?.title || data?.title || "FAQs"
  const desc =
    data?.seo?.description ||
    "Find answers to common questions about parts feeding systems, customization, lead time, and service."

  return (
    <div className="flex flex-col">
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Support</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">{title}</h1>
          <p className="mt-6 text-lg text-background/80 leading-relaxed">{desc}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {data?.items?.length ? (
            <Accordion type="single" collapsible className="w-full">
              {data.items.map((it, idx) => (
                <AccordionItem key={it._key || String(idx)} value={it._key || String(idx)}>
                  <AccordionTrigger className="text-left">
                    {it.question || "—"}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {it.answer || "—"}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-16 border border-border rounded-lg bg-secondary/40">
              <p className="text-foreground font-semibold">暂无内容</p>
              <p className="text-sm text-muted-foreground mt-2">
                你可以在 Sanity Studio 中创建并发布 `faqPage` 文档，并录入问题列表。
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

