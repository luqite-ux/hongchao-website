import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowLeft, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const categoryData: Record<string, {
  title: string
  tagline: string
  valueProposition: string
  systems: {
    name: string
    slug: string
    partType: string
    advantage: string
  }[]
  capabilities: {
    title: string
    description: string
  }[]
  applications: string[]
  specifications: {
    parameter: string
    range: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
}> = {
  "vibratory-bowl-feeder": {
    title: "Vibratory Bowl Feeder",
    tagline: "Precise part sorting and orientation systems",
    valueProposition: "Custom-designed bowl feeders for precise part sorting and orientation. Handles screws, springs, metal components, and plastic parts with feed rates from 10 to 1000+ parts per minute.",
    systems: [
      { name: "Standard Bowl Feeder System", slug: "standard-bowl-feeder", partType: "Screws, springs, metal parts 5-80mm", advantage: "Versatile configuration, proven reliability" },
      { name: "High-Speed Bowl Feeder", slug: "high-speed-bowl-feeder", partType: "Fasteners, small components", advantage: "1000+ ppm throughput capacity" },
      { name: "Precision Bowl Feeder", slug: "precision-bowl-feeder", partType: "Delicate electronics, plastic parts", advantage: "Gentle handling, zero-damage feeding" },
      { name: "Multi-Track Bowl Feeder", slug: "multi-track-bowl-feeder", partType: "High-volume assembly lines", advantage: "Parallel output for increased capacity" },
      { name: "Compact Bowl Feeder", slug: "compact-bowl-feeder", partType: "Space-constrained applications", advantage: "Reduced footprint, full functionality" },
    ],
    capabilities: [
      { title: "Custom Tooling Design", description: "Bowl geometry and track profiles engineered specifically for your part orientation requirements using 3D modeling and simulation." },
      { title: "System Integration", description: "Seamless integration with hoppers, linear tracks, escapements, vision systems, and robotic pick stations." },
      { title: "Noise & Vibration Control", description: "Sound enclosures achieving <75dB operation. Isolation mounts prevent vibration transmission to adjacent equipment." },
    ],
    applications: [
      "Fastener orientation for automated assembly",
      "Electronics component feeding to pick-and-place",
      "Medical device part singulation",
      "Cosmetic cap and closure handling",
      "Automotive connector and terminal feeding",
      "Pharmaceutical tablet and capsule orientation",
    ],
    specifications: [
      { parameter: "Bowl Diameter", range: "150mm – 750mm" },
      { parameter: "Feed Rate", range: "10 – 1000+ ppm" },
      { parameter: "Part Size", range: "1mm – 150mm" },
      { parameter: "Power Supply", range: "220V/380V, 50/60Hz" },
      { parameter: "Noise Level", range: "< 75dB (with enclosure)" },
      { parameter: "Control System", range: "Digital frequency control with PLC interface" },
    ],
    faqs: [
      { question: "What part geometries can be handled?", answer: "Our bowl feeders handle cylindrical, rectangular, asymmetric, and complex 3D geometries. We design custom tooling based on your part CAD data to ensure reliable orientation." },
      { question: "How is feed rate determined?", answer: "Feed rate depends on part size, geometry complexity, and required orientation accuracy. We provide feed rate estimates during the quotation process based on part samples or drawings." },
      { question: "Can the system handle multiple part variants?", answer: "Quick-change tooling options allow switching between part variants. For high-mix applications, consider our Flexible Feeder systems with vision-guided picking." },
      { question: "What is the typical lead time?", answer: "Standard systems ship in 4-6 weeks. Custom tooling development adds 2-4 weeks depending on complexity. Rush delivery available for urgent requirements." },
      { question: "How is noise controlled?", answer: "Sound enclosures with acoustic dampening materials achieve <75dB operation. Bowl coatings and tuned frequencies further reduce operational noise." },
      { question: "What integration options are available?", answer: "Systems include PLC interfaces (Siemens, Allen-Bradley, Mitsubishi), level sensors for hopper refill, jam detection, and output signals for downstream equipment coordination." },
      { question: "What maintenance is required?", answer: "Routine maintenance includes drive base inspection (quarterly), bowl coating inspection (annual), and controller calibration verification. Average MTBF exceeds 20,000 hours." },
      { question: "Can existing bowls be retrofitted?", answer: "Yes. We can retrofit new tooling to existing bowl feeders or upgrade drive bases and controls on legacy systems to improve performance." },
    ],
  },
  "centrifugal-feeder": {
    title: "Centrifugal Feeder",
    tagline: "High-speed feeding for lightweight parts",
    valueProposition: "High-speed centrifugal feeding systems suitable for lightweight and small parts. Ideal for high-volume production requiring rapid, consistent delivery.",
    systems: [
      { name: "Standard Centrifugal Feeder", slug: "standard-centrifugal-feeder", partType: "Small lightweight parts 2-30mm", advantage: "High-speed continuous output" },
      { name: "High-Capacity Centrifugal", slug: "high-capacity-centrifugal", partType: "Volume production applications", advantage: "Extended hopper capacity" },
      { name: "Compact Centrifugal Feeder", slug: "compact-centrifugal-feeder", partType: "Space-limited installations", advantage: "Minimal footprint design" },
      { name: "Inline Centrifugal System", slug: "inline-centrifugal-system", partType: "Integrated assembly lines", advantage: "Direct line integration" },
    ],
    capabilities: [
      { title: "High-Speed Operation", description: "Centrifugal action delivers parts at rates exceeding traditional vibratory systems for lightweight components." },
      { title: "Gentle Part Handling", description: "Smooth rotational motion minimizes part-to-part contact and reduces surface damage on delicate items." },
      { title: "Compact Footprint", description: "Vertical design requires less floor space than equivalent-capacity bowl feeders." },
    ],
    applications: [
      "Small fastener feeding at high speeds",
      "Lightweight plastic component handling",
      "Electronic connector pin feeding",
      "Small cap and closure orientation",
      "Pharmaceutical tablet feeding",
      "High-volume packaging operations",
    ],
    specifications: [
      { parameter: "Disc Diameter", range: "200mm – 500mm" },
      { parameter: "Feed Rate", range: "Up to 2000 ppm" },
      { parameter: "Part Size", range: "2mm – 50mm" },
      { parameter: "Power Supply", range: "220V, 50/60Hz" },
      { parameter: "Noise Level", range: "< 70dB" },
      { parameter: "Control System", range: "Variable speed with PLC interface" },
    ],
    faqs: [
      { question: "What parts are best suited for centrifugal feeders?", answer: "Centrifugal feeders excel with small, lightweight parts under 30g including pins, caps, small fasteners, and plastic components where high speed is required." },
      { question: "How does feed rate compare to bowl feeders?", answer: "Centrifugal feeders can achieve 2-3x the feed rate of equivalent bowl feeders for suitable parts due to the continuous rotational action." },
      { question: "Can orientation be controlled?", answer: "Yes. Peripheral tooling and discharge tracks provide orientation control similar to bowl feeders, with parts oriented during the discharge phase." },
      { question: "What maintenance is required?", answer: "Routine maintenance includes disc surface inspection, drive belt checks (if applicable), and bearing lubrication. Typical service intervals are quarterly." },
    ],
  },
  "step-feeder": {
    title: "Step Feeder",
    tagline: "Gentle handling for fragile components",
    valueProposition: "Step-type feeding machines designed for gentle handling of fragile or complex-shaped components. Step-by-step mechanical feeding eliminates part damage from vibratory action.",
    systems: [
      { name: "Linear Step Feeder", slug: "linear-step-feeder", partType: "Tubes, vials, cylindrical parts", advantage: "Consistent orientation, low noise" },
      { name: "Rotary Step Feeder", slug: "rotary-step-feeder", partType: "Caps, closures, round components", advantage: "Compact footprint, continuous output" },
      { name: "Sanitary Step Feeder", slug: "sanitary-step-feeder", partType: "Pharma/food grade applications", advantage: "FDA-compliant, easy cleandown" },
      { name: "Multi-Lane Step Feeder", slug: "multi-lane-step-feeder", partType: "High-throughput packaging lines", advantage: "Parallel lanes, synchronized output" },
    ],
    capabilities: [
      { title: "Gentle Part Handling", description: "Mechanical stepping action prevents scratching, chipping, and cosmetic damage that vibratory systems may cause on delicate surfaces." },
      { title: "Hygienic Design Options", description: "Stainless steel construction, tool-free disassembly, and wash-down rated enclosures for pharmaceutical and food applications." },
      { title: "Variable Speed Control", description: "Adjustable step rate matches downstream equipment requirements with smooth acceleration and deceleration profiles." },
    ],
    applications: [
      "Glass vial feeding to filling machines",
      "Syringe barrel orientation",
      "Cosmetic tube handling",
      "Pharmaceutical bottle feeding",
      "Pre-filled syringe assembly",
      "Lipstick and mascara component feeding",
    ],
    specifications: [
      { parameter: "Step Width", range: "50mm – 300mm" },
      { parameter: "Feed Rate", range: "5 – 200 ppm" },
      { parameter: "Part Size", range: "5mm – 100mm" },
      { parameter: "Power Supply", range: "220V, 50/60Hz" },
      { parameter: "Material Options", range: "Aluminum, Stainless Steel (304/316)" },
      { parameter: "Noise Level", range: "< 65dB" },
    ],
    faqs: [
      { question: "What makes step feeders better for fragile parts?", answer: "The mechanical stepping motion lifts and places parts rather than vibrating them, eliminating surface contact abrasion and impact damage common in vibratory systems." },
      { question: "Can step feeders achieve high throughput?", answer: "Multi-lane configurations achieve 200+ ppm. For higher rates, parallel step feeders or hybrid systems combining step elevation with vibratory output tracks are available." },
      { question: "What cleaning protocols are supported?", answer: "Sanitary models support CIP (clean-in-place), tool-free disassembly for manual cleaning, and are designed to FDA 21 CFR Part 11 documentation requirements." },
      { question: "How is part orientation controlled?", answer: "Mechanical guides and rails orient parts during the stepping process. Vision-guided rejection stations can remove mis-oriented parts before output." },
      { question: "What is the noise level compared to bowl feeders?", answer: "Step feeders operate at <65dB, significantly quieter than standard bowl feeders. This makes them suitable for cleanroom and laboratory environments." },
      { question: "Can the system handle varying part lengths?", answer: "Adjustable guides accommodate part length variations. Quick-change guide sets enable rapid changeover between product sizes." },
    ],
  },
  "elevator-hopper": {
    title: "Elevator Hopper",
    tagline: "Bulk lifting, buffering, and continuous supply",
    valueProposition: "Elevator and hopper systems for bulk material lifting, buffering, and continuous supply to downstream feeding equipment. Floor-level loading with automatic level control.",
    systems: [
      { name: "Chain Type Elevator", slug: "chain-type-elevator", partType: "General bulk parts 10-50mm", advantage: "Reliable continuous elevation" },
      { name: "Belt Elevator Hopper", slug: "belt-elevator-hopper", partType: "Delicate or coated parts", advantage: "Gentle transport, no marking" },
      { name: "Heavy-Duty Elevator", slug: "heavy-duty-elevator", partType: "Large metal stampings, castings", advantage: "Reinforced design, high load capacity" },
      { name: "Compact Elevator Hopper", slug: "compact-elevator-hopper", partType: "Light parts, limited space", advantage: "Vertical design, minimal footprint" },
    ],
    capabilities: [
      { title: "Automatic Level Control", description: "Capacitive or photoelectric sensors monitor bowl level and trigger elevator operation to maintain consistent part supply." },
      { title: "High-Volume Buffer Storage", description: "Floor-level hoppers from 50L to 500L capacity reduce operator intervention frequency for high-throughput operations." },
      { title: "Gentle Part Transport", description: "Cleated chain design lifts parts without tumbling or impact, preserving part quality during elevation." },
    ],
    applications: [
      "Bulk fastener elevation to bowl feeders",
      "Metal stamping transfer to assembly",
      "Plastic injection molded part handling",
      "Die-cast component feeding",
      "Rubber seal and O-ring elevation",
      "Connector and terminal bulk transfer",
    ],
    specifications: [
      { parameter: "Hopper Capacity", range: "50L – 500L" },
      { parameter: "Lift Height", range: "500mm – 3000mm" },
      { parameter: "Feed Rate", range: "Up to 50 L/min" },
      { parameter: "Power Supply", range: "220V/380V, 50/60Hz" },
      { parameter: "Chain Material", range: "Steel / Stainless Steel" },
      { parameter: "Control", range: "Level sensor with auto-start/stop" },
    ],
    faqs: [
      { question: "How does the level sensing work?", answer: "Capacitive sensors detect part level in the bowl feeder. When level drops below setpoint, the elevator starts automatically and stops when the high-level threshold is reached." },
      { question: "Can the elevator handle heavy parts?", answer: "Heavy-duty models handle parts up to 500g each with reinforced chains and drive motors. Custom designs available for heavier applications." },
      { question: "What is the maximum lift height?", answer: "Standard systems lift up to 3000mm. Custom configurations for higher elevations are available with intermediate support structures." },
      { question: "How is part damage prevented during elevation?", answer: "Cleated chain design carries parts in individual pockets rather than bulk tumbling. Chain speed is adjustable to minimize part-to-part contact." },
      { question: "What integration is provided with bowl feeders?", answer: "Elevators include mounting flanges for direct bowl feeder attachment and electrical interlocks for coordinated start/stop operation." },
      { question: "How is the hopper loaded?", answer: "Floor-level loading via forklift dump, manual box pour, or automated bin tipper integration. Hopper geometry optimized for your bulk packaging format." },
    ],
  },
  "auxiliary-equipment": {
    title: "Auxiliary Equipment",
    tagline: "Complete supporting systems for feeding solutions",
    valueProposition: "Complete range of supporting equipment including linear feeders, machine frames, sound enclosures, automatic hoppers, electrical control systems, and auxiliary mechanisms.",
    systems: [
      { name: "Linear Feeder Track", slug: "linear-feeder-track", partType: "Part transport from bowl to station", advantage: "Precise linear conveyance" },
      { name: "Sound Enclosure", slug: "sound-enclosure", partType: "Noise-sensitive environments", advantage: "Reduces noise to < 65dB" },
      { name: "Automatic Hopper", slug: "automatic-hopper", partType: "Bulk part storage and supply", advantage: "Level-controlled refill" },
      { name: "Machine Frame", slug: "machine-frame", partType: "System mounting and support", advantage: "Rigid, adjustable platform" },
      { name: "Control System", slug: "control-system", partType: "System integration", advantage: "PLC-based coordination" },
    ],
    capabilities: [
      { title: "Linear Feed Track Design", description: "Custom track profiles for precise part transport from bowl feeder to assembly station with controlled spacing and orientation maintenance." },
      { title: "Noise Reduction Solutions", description: "Sound enclosures with acoustic dampening achieve < 65dB operation for operator comfort and regulatory compliance." },
      { title: "Integrated Control Systems", description: "PLC-based controllers coordinate feeders, hoppers, sensors, and downstream equipment with standard communication protocols." },
    ],
    applications: [
      "Complete feeding system integration",
      "Noise reduction for production floors",
      "Automated bulk part replenishment",
      "Multi-feeder system coordination",
      "Safety enclosure requirements",
      "Custom frame and mounting solutions",
    ],
    specifications: [
      { parameter: "Linear Track Length", range: "100mm – 2000mm" },
      { parameter: "Sound Enclosure Reduction", range: "10-20dB attenuation" },
      { parameter: "Hopper Capacity", range: "10L – 200L" },
      { parameter: "Frame Material", range: "Aluminum extrusion / Steel" },
      { parameter: "Control Interface", range: "Siemens, Allen-Bradley, Mitsubishi PLC" },
      { parameter: "Power Supply", range: "220V/380V, 50/60Hz" },
    ],
    faqs: [
      { question: "What linear track configurations are available?", answer: "Straight, curved, and multi-lane tracks with gravity, vibratory, or belt-driven transport. Custom profiles match your part geometry and station requirements." },
      { question: "How much noise reduction do enclosures provide?", answer: "Standard enclosures achieve 10-15dB reduction. Premium acoustic panels with seals achieve 15-20dB, bringing typical systems below 65dB." },
      { question: "Can existing equipment be integrated?", answer: "Yes. We provide custom mounting solutions and control integration for existing bowl feeders, hoppers, and production equipment." },
      { question: "What hopper sizes are available?", answer: "Standard hoppers from 10L to 200L capacity. Custom sizes and configurations available for specific bulk packaging formats." },
      { question: "What control systems are supported?", answer: "We integrate with all major PLC platforms including Siemens, Allen-Bradley, and Mitsubishi. Standard protocols include Ethernet/IP, PROFINET, and Modbus." },
      { question: "Are safety features included?", answer: "Enclosures include interlocked access doors, emergency stops, and status indicators. Systems designed to meet CE and relevant safety standards." },
    ],
  },
}

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const data = categoryData[category]
  
  if (!data) {
    return { title: "Category Not Found" }
  }

  return {
    title: `${data.title} - Industrial Feeding Systems`,
    description: data.valueProposition,
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({ category }))
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const data = categoryData[category]

  if (!data) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Category Hero */}
      <section className="bg-[#1F1F1F] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-xs text-white/50 hover:text-[#F6A12A] transition-colors mb-8 uppercase tracking-wider"
          >
            <ArrowLeft className="mr-2 h-3 w-3" />
            All Products
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
                {data.tagline}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {data.title}
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed">
                {data.valueProposition}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold rounded-none h-12 px-8 bg-transparent">
                  <Link href="/contact#engineer">
                    <Phone className="mr-2 h-5 w-5" />
                    Talk to an Engineer
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden border border-white/10">
                <Image
                  src={`/images/products/${category}/system-01.jpg`}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#1F1F1F] border border-white/10 px-4 py-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Category</p>
                <p className="text-sm font-medium text-white mt-0.5">{data.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Systems List */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
                Available Systems
              </p>
              <h2 className="text-3xl font-bold text-[#1F1F1F] tracking-tight">
                Product Configurations
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.systems.map((system, index) => (
              <Link 
                key={system.slug} 
                href={`/products/${category}/${system.slug}`}
                className="group block border border-[#E5E5E5] hover:border-[#F6A12A]/30 transition-colors"
              >
                {/* System Image */}
                <div className="aspect-[4/3] bg-[#F5F5F5] relative overflow-hidden">
                  <Image
                    src={`/images/products/${category}/${system.slug}.jpg`}
                    alt={system.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] text-[#9CA3AF] font-mono tracking-wider bg-white/90 px-2 py-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                    {system.name}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Part Type</p>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">{system.partType}</p>
                    </div>
                    <p className="text-xs text-[#1F1F1F] font-medium flex items-center gap-2">
                      <span className="w-3 h-px bg-[#F6A12A]" />
                      {system.advantage}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-medium text-[#6B6B6B] group-hover:text-[#F6A12A] transition-colors">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Capabilities */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Engineering Capabilities
            </p>
            <h2 className="text-3xl font-bold text-[#1F1F1F] tracking-tight">
              Technical Expertise
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-px bg-[#E5E5E5]">
            {data.capabilities.map((capability) => (
              <div key={capability.title} className="bg-white p-8">
                <h3 className="font-semibold text-[#1F1F1F] text-base mb-3">
                  {capability.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Applications */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
                Applications
              </p>
              <h2 className="text-3xl font-bold text-[#1F1F1F] tracking-tight">
                Typical Use Cases
              </h2>
              <p className="mt-4 text-[#6B6B6B] text-sm leading-relaxed">
                Our {data.title.toLowerCase()} systems are deployed across diverse manufacturing operations requiring reliable, automated part feeding.
              </p>
              <ul className="mt-8 space-y-4">
                {data.applications.map((application) => (
                  <li key={application} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-[#F6A12A] mt-2 flex-shrink-0" />
                    <span className="text-[#1F1F1F] text-sm">{application}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden border border-[#E5E5E5]">
                <Image
                  src={`/images/products/${category}/application-01.jpg`}
                  alt={`${data.title} application`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white border border-[#E5E5E5] px-4 py-3">
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Application</p>
                <p className="text-sm font-medium text-[#1F1F1F] mt-0.5">Industrial Manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specification Range Table */}
      <section className="py-20 lg:py-28 bg-[#FAFAFA] border-t border-[#E5E5E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Technical Data
            </p>
            <h2 className="text-3xl font-bold text-[#1F1F1F] tracking-tight">
              Specification Range
            </h2>
          </div>
          
          <div className="border border-[#E5E5E5] bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#1F1F1F] uppercase tracking-wider">Parameter</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#1F1F1F] uppercase tracking-wider">Range</th>
                </tr>
              </thead>
              <tbody>
                {data.specifications.map((spec, index) => (
                  <tr key={spec.parameter} className={index !== data.specifications.length - 1 ? "border-b border-[#E5E5E5]" : ""}>
                    <td className="px-6 py-4 text-sm font-medium text-[#1F1F1F]">{spec.parameter}</td>
                    <td className="px-6 py-4 text-sm text-[#6B6B6B]">{spec.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-xs text-[#9CA3AF]">
            Specifications vary by model and configuration. Contact engineering for application-specific requirements.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[#F6A12A] font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Technical FAQ
            </p>
            <h2 className="text-3xl font-bold text-[#1F1F1F] tracking-tight">
              Engineering Questions
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
            {data.faqs.map((faq, index) => (
              <div key={faq.question} className="border-t border-[#E5E5E5] py-6">
                <details className="group">
                  <summary className="flex items-start justify-between cursor-pointer list-none">
                    <span className="flex items-start gap-3">
                      <span className="text-[10px] text-[#9CA3AF] font-mono mt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium text-[#1F1F1F] group-hover:text-[#F6A12A] transition-colors">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-[#9CA3AF] flex-shrink-0 ml-4 mt-0.5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-sm text-[#6B6B6B] leading-relaxed pl-7">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section className="py-16 lg:py-20 bg-[#1F1F1F] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Request a Custom Quotation
              </h2>
              <p className="mt-2 text-white/60 text-sm max-w-lg">
                Provide your part details and production requirements. Our engineering team will respond with a tailored solution proposal within 48 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#F6A12A] hover:bg-[#D4871F] text-white font-semibold rounded-none h-12 px-8">
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold rounded-none h-12 px-8 bg-transparent">
                <Link href="/contact#engineer">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to an Engineer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
