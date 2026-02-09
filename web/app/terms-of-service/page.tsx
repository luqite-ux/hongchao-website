import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - Hongchao Automation Equipment",
  description: "Terms of Service for using Hongchao Automation Equipment website and services.",
}

const COMPANY_NAME = "Hongchao Automation Equipment"
const EMAIL = "info@hongchaoautomation.cn"
const PHONE = "+86 131 8265 8718"
const EFFECTIVE_DATE = "January 1, 2026"

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing or using the website and services of Hongchao Automation Equipment (\"Hongchao,\" \"we,\" \"us,\" or \"our\"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.",
  },
  {
    title: "Description of Services",
    content: "We provide an industrial equipment and automation solutions website, including product information, company information, contact and inquiry forms, and related content. We reserve the right to modify, suspend, or discontinue any part of our services at any time.",
  },
  {
    title: "Disclaimer on Content and Accuracy",
    content: "Product specifications, technical data, and other information on this website are for general reference only. We strive for accuracy but do not warrant that content is complete, current, or error-free. Specifications may vary; confirm critical details with us before relying on them for design or procurement decisions.",
  },
  {
    title: "Inquiries and Communication Do Not Constitute a Contract",
    content: "Submitting a quote request, inquiry form, or other communication does not create a binding contract. Any quote or proposal we provide is subject to our acceptance and mutually agreed terms. A contract is formed only when both parties execute a written agreement or otherwise agree in writing.",
  },
  {
    title: "Intellectual Property",
    content: "All content on this website, including text, images, logos, and design, is owned by Hongchao or its licensors and is protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or use our content for commercial purposes without our prior written consent.",
  },
  {
    title: "Prohibited Conduct",
    content: "You agree not to use our website or services for any unlawful purpose, to transmit malware or harmful code, to attempt unauthorized access to our systems or data, to impersonate others, or to interfere with the proper operation of our website. We may suspend or terminate access for violation of these terms.",
  },
  {
    title: "Third-Party Links",
    content: "Our website may contain links to third-party websites. We do not control and are not responsible for their content or practices. Links do not imply endorsement. Your use of third-party sites is at your own risk and subject to their terms and policies.",
  },
  {
    title: "Limitation of Liability",
    content: "To the fullest extent permitted by law, Hongchao and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits or data, arising from your use of our website or services. Our total liability shall not exceed the amount you paid to us in the twelve months preceding the claim, if any.",
  },
  {
    title: "Indemnification",
    content: "You agree to indemnify and hold harmless Hongchao, its officers, directors, and employees from any claims, damages, or expenses (including reasonable attorneys' fees) arising from your use of our website or services or your violation of these Terms.",
  },
  {
    title: "Governing Law and Disputes",
    content: "These Terms are governed by the laws of the People's Republic of China, without regard to conflict of law principles. Any dispute arising from or relating to these Terms or our services shall be resolved through good-faith negotiation; failing that, through the courts with jurisdiction in our place of business.",
  },
  {
    title: "Changes to Terms",
    content: "We may update these Terms of Service from time to time. The effective date at the top indicates the latest version. We will post changes on this page and encourage you to review periodically. Continued use of our website after changes constitutes acceptance of the updated Terms.",
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-foreground text-background py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Legal
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Terms of Service
          </h1>
          <p className="mt-4 text-background/80">
            Effective as of {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            Please read these Terms of Service carefully before using the website and services of {COMPANY_NAME}. By using our website, you agree to these terms.
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
                For questions about these Terms of Service, please contact us:
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
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
