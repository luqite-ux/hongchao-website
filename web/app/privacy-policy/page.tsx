import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Hongchao Automation Equipment",
  description: "Privacy Policy for Hongchao Automation Equipment. How we collect, use, and protect your information.",
}

const COMPANY_NAME = "Hongchao Automation Equipment"
const EMAIL = "info@hongchaoautomation.cn"
const PHONE = "+86 131 8265 8718"
const EFFECTIVE_DATE = "January 1, 2026"

const sections = [
  {
    title: "Information We Collect",
    content: "We may collect information you provide directly, such as name, company, email, phone number, and message content when you submit an inquiry, request a quote, or contact us. We may also collect technical information such as IP address, browser type, and pages visited when you use our website.",
  },
  {
    title: "Purpose of Use",
    content: "We use the information to respond to your inquiries, provide quotes and technical support, improve our products and services, send relevant updates (with your consent), and comply with applicable laws. We do not sell your personal information to third parties.",
  },
  {
    title: "Cookies",
    content: "Our website may use cookies and similar technologies to improve user experience, analyze site traffic, and remember your preferences. You can manage cookie settings in your browser. Disabling certain cookies may affect site functionality.",
  },
  {
    title: "Third-Party Services",
    content: "We may use third-party services for analytics, hosting, or communication. These providers may process data on our behalf under contractual obligations to protect your information. We do not share your personal data for marketing by third parties.",
  },
  {
    title: "Data Storage and Security",
    content: "We store data on secure servers and take reasonable technical and organizational measures to protect your information against unauthorized access, loss, or alteration. No method of transmission over the Internet is 100% secure; we strive to use industry-standard practices.",
  },
  {
    title: "International Access",
    content: "Our services may be accessed from different countries. Data may be processed in the jurisdiction where our servers or service providers are located. By using our website, you consent to such transfer to the extent permitted by applicable law.",
  },
  {
    title: "Children's Privacy",
    content: "Our website is not directed at individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us and we will take steps to delete it.",
  },
  {
    title: "Your Rights",
    content: "Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, object to or restrict processing, and data portability. To exercise these rights or ask questions, contact us using the details below.",
  },
  {
    title: "Updates",
    content: "We may update this Privacy Policy from time to time. The effective date at the top will indicate the latest version. We encourage you to review this page periodically. Continued use of our website after changes constitutes acceptance of the updated policy.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-foreground text-background py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Legal
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Privacy Policy
          </h1>
          <p className="mt-4 text-background/80">
            Effective as of {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            {COMPANY_NAME} (&quot;Hongchao,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and related services.
          </p>

          {sections.map((section) => (
            <Card key={section.title} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <p className="text-muted-foreground">
                For privacy-related questions or to exercise your rights, please contact us:
              </p>
              <p className="font-medium text-foreground">{COMPANY_NAME}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  {PHONE}
                </a>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground pt-4">
            <Link href="/" className="hover:text-primary transition-colors">Back to Home</Link>
            {" · "}
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
