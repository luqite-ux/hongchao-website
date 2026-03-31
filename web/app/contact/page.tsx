import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, MessageSquare, Wrench, FileText, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { fetchSiteSettings } from "@/lib/site-settings"
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL } from "@/lib/contact"
import { ContactForm } from "@/components/contact-form"
import { getServerLocale } from "@/lib/server-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const settings = await fetchSiteSettings(locale)
  const companyName = settings?.companyName || "HONGCHAO"
  return {
    title: `Contact Us - Request a Quote | ${companyName}`,
    description: `Contact ${companyName} for a custom feeding system quote. Talk to our engineers about your specific requirements. Global support, local service.`,
  }
}

const inquiryTypes = [
  { value: "quote", label: "Request a Quote", icon: FileText },
  { value: "engineer", label: "Talk to an Engineer", icon: Wrench },
  { value: "support", label: "Technical Support", icon: MessageSquare },
  { value: "partnership", label: "Partnership Inquiry", icon: Globe },
]

export default async function ContactPage() {
  const locale = await getServerLocale()
  const settings = await fetchSiteSettings(locale)
  const contact = settings?.contact
  const companyName = settings?.companyName || "HONGCHAO"
  const email = CONTACT_EMAIL
  const phone = CONTACT_PHONE_DISPLAY
  const address = contact?.address || ""

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your inquiry anytime",
      contact: email,
      href: email ? `mailto:${email}` : null,
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Contact us",
      contact: phone,
      href: phone ? `tel:${phone.replace(/\s/g, "")}` : null,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      contact: address || "Suzhou, China",
      href: address ? "#location" : null,
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically respond within",
      contact: "24 Hours",
      href: null,
    },
  ].filter((m) => m.contact)

  const offices = address || email || phone
    ? [
        {
          region: "Headquarters",
          location: address || "Suzhou, China",
          address: address || "",
          phone,
          email,
        },
      ].filter((o) => o.address || o.phone || o.email)
    : []
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#FBA026] font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance text-slate-800">
              Let&apos;s Discuss Your Feeding Requirements
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Whether you need a custom quote, technical consultation, or product information, 
              our team is ready to help. Fill out the form below or contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-[#FBA026]/5 border-y border-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {contactMethods.length > 0 && contactMethods.map((method) => (
              <div key={method.title} className="text-center">
                <div className="h-12 w-12 rounded-lg bg-[#FBA026]/20 flex items-center justify-center mx-auto mb-3">
                  <method.icon className="h-6 w-6 text-[#FBA026]" />
                </div>
                <h3 className="font-semibold text-slate-800">{method.title}</h3>
                <p className="text-sm text-slate-500">{method.description}</p>
                {method.href ? (
                  <a href={method.href} className="text-sm font-medium text-slate-700 hover:text-[#FBA026] transition-colors">
                    {method.contact}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-slate-700">{method.contact}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-slate-100">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm companyName={companyName} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="bg-slate-50 border-slate-100">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inquiryTypes.map((type) => (
                    <a
                      key={type.value}
                      href={`#${type.value}`}
                      className="flex items-center gap-4 p-3 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-100"
                    >
                      <div className="h-10 w-10 rounded-lg bg-[#FBA026]/10 flex items-center justify-center">
                        <type.icon className="h-5 w-5 text-[#FBA026]" />
                      </div>
                      <span className="font-medium text-slate-800">{type.label}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Office Location */}
              {offices.length > 0 && offices.map((office) => (
                <Card key={office.region} id="location">
                  <CardHeader>
                    <CardTitle>{office.region}</CardTitle>
                    <CardDescription>{office.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {office.address && (
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{office.address}</span>
                      </div>
                    )}
                    {office.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-5 w-5 text-primary" />
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {office.phone}
                        </a>
                      </div>
                    )}
                    {office.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {office.email}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Download */}
              <Card className="bg-[#FBA026] text-white border-0">
                <CardHeader>
                  <CardTitle className="text-white">Download Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 mb-4">
                    Get our complete product catalog with specifications and application guides.
                  </p>
                  <Button asChild variant="secondary" className="w-full font-semibold bg-white text-slate-800 hover:bg-slate-100">
                    <Link href="/catalog">Download PDF</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-slate-50 py-16 md:py-24" id="map">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Our Location</h2>
            <p className="text-slate-500 mt-2">
              Visit our manufacturing facility in Suzhou, China
            </p>
          </div>
          <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
            <iframe
              title="Our location - No.81 CaiXing Road, LinHu Town, WuZhong District, SuZhou City, China"
              src="https://www.google.com/maps?q=No.81+CaiXing+Road,+LinHu+Town,+WuZhong+District,+SuZhou+City,+China&output=embed"
              className="w-full h-[240px] md:h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="text-center py-4 px-4">
              <p className="text-slate-500">
                No.81 CaiXing Road, LinHu Town, WuZhong District, SuZhou City, China
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "What information do you need for a quote?",
                a: "We typically need part drawings or samples, required feed rate, integration requirements, and any special environmental conditions.",
              },
              {
                q: "How long does it take to receive a quote?",
                a: "Standard quotes are typically provided within 2-3 business days. Complex custom projects may require additional time for engineering review.",
              },
              {
                q: "Do you offer on-site consultations?",
                a: "Yes, for larger projects our engineers can visit your facility to assess requirements and discuss optimal solutions.",
              },
              {
                q: "What is your typical project timeline?",
                a: "Standard systems typically ship in 6-8 weeks. Custom projects vary based on complexity, usually 8-16 weeks.",
              },
            ].map((faq) => (
              <div key={faq.q} className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
