import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, MessageSquare, Wrench, FileText, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchSiteSettings } from "@/lib/site-settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()
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
  const settings = await fetchSiteSettings()
  const contact = settings?.contact
  const companyName = settings?.companyName || "HONGCHAO"
  const email = contact?.email || ""
  const phone = contact?.phone || ""
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Let&apos;s Discuss Your Feeding Requirements
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              Whether you need a custom quote, technical consultation, or product information, 
              our team is ready to help. Fill out the form below or contact us directly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-primary py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {contactMethods.length > 0 && contactMethods.map((method) => (
              <div key={method.title} className="text-center">
                <div className="h-12 w-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center mx-auto mb-3">
                  <method.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-primary-foreground">{method.title}</h3>
                <p className="text-sm text-primary-foreground/70">{method.description}</p>
                {method.href ? (
                  <a href={method.href} className="text-sm font-medium text-primary-foreground hover:underline">
                    {method.contact}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-primary-foreground">{method.contact}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="john@company.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input id="company" placeholder="Your Company Name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input id="country" placeholder="United States" required />
                      </div>
                    </div>

                    <div className="space-y-2" id="engineer">
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="medical">Medical Devices</SelectItem>
                          <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                          <SelectItem value="consumer">Consumer Goods</SelectItem>
                          <SelectItem value="hardware">Hardware & Fasteners</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="aerospace">Aerospace</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partDescription">Part Description</Label>
                      <Input id="partDescription" placeholder="Describe the parts you need to feed" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your project requirements, feed rate needs, and any special considerations..."
                        rows={5}
                        required
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="consent" className="mt-1" required />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal">
                        I agree to receive communications from {companyName}. You can unsubscribe at any time.
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-[#D4871F] text-primary-foreground font-semibold">
                      Submit Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="bg-secondary border-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inquiryTypes.map((type) => (
                    <a
                      key={type.value}
                      href={`#${type.value}`}
                      className="flex items-center gap-4 p-3 bg-background rounded-lg hover:bg-background/80 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <type.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{type.label}</span>
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
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Download Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90 mb-4">
                    Get our complete product catalog with specifications and application guides.
                  </p>
                  <Button variant="secondary" className="w-full font-semibold">
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-secondary py-16" id="map">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Our Location</h2>
            <p className="text-muted-foreground mt-2">
              Visit our manufacturing facility in Suzhou, China
            </p>
          </div>
          <div className="bg-background rounded-lg border border-border overflow-hidden">
            <iframe
              title="Our location - No.81 Caixing Road, Linhu Town, Wuzhong District, Suzhou, Jiangsu, China"
              src="https://www.google.com/maps?q=No.81+Caixing+Road,+Linhu+Town,+Wuzhong+District,+Suzhou,+Jiangsu,+China&output=embed"
              className="w-full h-[240px] md:h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="text-center py-4 px-4">
              <p className="text-muted-foreground">
                No.81 Caixing Road, Linhu Town, Wuzhong District
              </p>
              <p className="text-muted-foreground">
                Suzhou, Jiangsu, China
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
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
              <div key={faq.q} className="p-6 bg-secondary rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
