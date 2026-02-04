import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Lightbulb, Cpu, Cog, Microscope, Shield, Zap, Award, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Technology & Patents - Innovation at HONGCHAO",
  description: "Discover HONGCHAO's innovative feeding technology backed by 16 patents (8 invention + 8 utility model). Advanced engineering for superior performance.",
}

const technologies = [
  {
    icon: Cpu,
    title: "Digital Frequency Control",
    description: "Precision digital controllers enable exact frequency and amplitude adjustment for optimal feeding performance across all part types.",
    benefits: ["Precise vibration control", "Energy efficient operation", "Easy parameter adjustment", "Consistent performance"],
  },
  {
    icon: Microscope,
    title: "Vision-Guided Feeding",
    description: "Advanced camera systems and AI algorithms enable flexible feeding of mixed parts without dedicated tooling.",
    benefits: ["Handle multiple part types", "Real-time quality inspection", "Robot communication", "Quick changeover"],
  },
  {
    icon: Cog,
    title: "Custom Tooling Design",
    description: "Proprietary tooling design methodology ensures optimal orientation and feeding for any part geometry.",
    benefits: ["Part-specific optimization", "High feed accuracy", "Minimal part damage", "Long tooling life"],
  },
  {
    icon: Shield,
    title: "Noise Reduction Systems",
    description: "Innovative enclosure and isolation designs achieve industry-leading noise levels for operator comfort.",
    benefits: ["< 65dB with enclosure", "Vibration isolation", "OSHA compliant", "Improved work environment"],
  },
]

const patents = [
  { type: "Invention", title: "Variable Frequency Vibratory Drive System", number: "CN-XXXXX-A" },
  { type: "Invention", title: "Intelligent Bowl Feeder Control Method", number: "CN-XXXXX-B" },
  { type: "Invention", title: "Multi-Track Linear Feeder Design", number: "CN-XXXXX-C" },
  { type: "Invention", title: "Vision-Based Part Orientation System", number: "CN-XXXXX-D" },
  { type: "Invention", title: "Adaptive Vibration Amplitude Control", number: "CN-XXXXX-E" },
  { type: "Invention", title: "Low-Energy Electromagnetic Drive", number: "CN-XXXXX-F" },
  { type: "Invention", title: "Noise-Reducing Bowl Construction", number: "CN-XXXXX-G" },
  { type: "Invention", title: "Quick-Change Tooling System", number: "CN-XXXXX-H" },
  { type: "Utility Model", title: "Compact Elevator Hopper Design", number: "CN-XXXXX-U1" },
  { type: "Utility Model", title: "Modular Bowl Feeder Frame", number: "CN-XXXXX-U2" },
  { type: "Utility Model", title: "Integrated Sound Enclosure", number: "CN-XXXXX-U3" },
  { type: "Utility Model", title: "Adjustable Linear Track Assembly", number: "CN-XXXXX-U4" },
  { type: "Utility Model", title: "Anti-Vibration Mounting System", number: "CN-XXXXX-U5" },
  { type: "Utility Model", title: "Dust-Protected Drive Housing", number: "CN-XXXXX-U6" },
  { type: "Utility Model", title: "Easy-Access Maintenance Panel", number: "CN-XXXXX-U7" },
  { type: "Utility Model", title: "Universal Sensor Mounting Bracket", number: "CN-XXXXX-U8" },
]

const rdProcess = [
  {
    step: "01",
    title: "Research",
    description: "We continuously monitor industry trends and customer needs to identify opportunities for innovation.",
  },
  {
    step: "02",
    title: "Design",
    description: "Our engineering team develops concepts using advanced CAD tools and simulation software.",
  },
  {
    step: "03",
    title: "Prototype",
    description: "Rapid prototyping enables quick validation of new designs and technologies.",
  },
  {
    step: "04",
    title: "Test",
    description: "Rigorous testing with real parts ensures performance meets or exceeds targets.",
  },
  {
    step: "05",
    title: "Refine",
    description: "Iterative improvement based on test results optimizes design for production.",
  },
  {
    step: "06",
    title: "Deploy",
    description: "New technologies are integrated into our product line for customer benefit.",
  },
]

export default function TechnologyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-foreground text-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Technology & Innovation
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              16 Patents Driving Innovation
            </h1>
            <p className="mt-6 text-lg text-background/80 leading-relaxed">
              HONGCHAO&apos;s commitment to R&D has resulted in 16 patents - 8 invention patents and 
              8 utility model patents - that deliver superior feeding performance for our customers.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">8</p>
                <p className="text-sm text-background/70">Invention Patents</p>
              </div>
              <div className="h-12 w-px bg-background/20" />
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">8</p>
                <p className="text-sm text-background/70">Utility Model Patents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Core Technologies
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The innovative technologies that set HONGCHAO feeding systems apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.title} className="border-border hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <tech.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                  <CardDescription className="text-base">{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-2">
                    {tech.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Process */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our R&D Process
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              From Idea to Innovation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our structured R&D process ensures continuous improvement and breakthrough innovations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rdProcess.map((item) => (
              <div key={item.step} className="bg-background rounded-lg p-6 border border-border">
                <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patent Portfolio */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Patent Portfolio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our intellectual property portfolio represents years of dedicated R&D investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {patents.map((patent) => (
              <div key={patent.number} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      patent.type === "Invention" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {patent.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{patent.number}</span>
                  </div>
                  <p className="font-medium text-foreground text-sm">{patent.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment in Future */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Future Technologies
              </p>
              <h2 className="text-3xl font-bold text-background sm:text-4xl text-balance">
                Investing in Tomorrow&apos;s Solutions
              </h2>
              <p className="mt-4 text-lg text-background/80 leading-relaxed">
                We continuously invest in R&D to develop next-generation feeding technologies. 
                Current focus areas include AI-powered feeding optimization, IoT-enabled predictive 
                maintenance, and advanced flexible feeding systems.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-background">AI-Powered Optimization</h4>
                    <p className="text-sm text-background/70">Machine learning for automatic parameter tuning</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-background">IoT Connectivity</h4>
                    <p className="text-sm text-background/70">Real-time monitoring and predictive maintenance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Microscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-background">Advanced Vision</h4>
                    <p className="text-sm text-background/70">3D vision for complex part recognition</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square bg-background/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="h-40 w-40 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Experience Our Technology
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              See how our patented technologies can improve your feeding operations.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link href="/contact">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold bg-transparent">
                <Link href="/products">
                  View Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
