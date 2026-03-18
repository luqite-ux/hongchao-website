export type Locale = "en" | "de" | "es"

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "de", "es"] as const

export function normalizeLocale(input: string | null | undefined): Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(input || "") ? (input as Locale) : "en"
}

export function getLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1]
  return normalizeLocale(seg)
}

export function withLocale(href: string, locale: Locale) {
  if (!href.startsWith("/")) return href
  if (locale === "en") return href
  if (href === "/") return `/${locale}`
  const seg = href.split("/")[1]
  if ((SUPPORTED_LOCALES as readonly string[]).includes(seg)) return href
  return `/${locale}${href}`
}

type Dict = Record<string, { en: string; de: string; es: string }>

const dict: Dict = {
  // Header / common
  "nav.home": { en: "Home", de: "Start", es: "Inicio" },
  "nav.products": { en: "Products", de: "Produkte", es: "Productos" },
  "nav.videos": { en: "Videos", de: "Videos", es: "Videos" },
  "nav.technology": { en: "Technology", de: "Technologie", es: "Tecnología" },
  "nav.about": { en: "About", de: "Über uns", es: "Acerca de" },
  "nav.contact": { en: "Contact", de: "Kontakt", es: "Contacto" },
  "cta.requestQuote": { en: "Request a Quote", de: "Angebot anfordern", es: "Solicitar presupuesto" },

  // Hero
  "hero.since": { en: "Since 2005", de: "Seit 2005", es: "Desde 2005" },
  "hero.titleA": { en: "We're experts in", de: "Wir sind Experten für", es: "Somos expertos en" },
  "hero.titleB": { en: "custom parts feeding systems", de: "kundenspezifische Zuführsysteme", es: "sistemas de alimentación a medida" },
  "hero.subtitle": {
    en: "Precision-engineered automation solutions designed to optimize your production line efficiency and reduce operational costs.",
    de: "Präzise konstruierte Automatisierungslösungen zur Optimierung Ihrer Produktionslinien-Effizienz und zur Senkung der Betriebskosten.",
    es: "Soluciones de automatización de ingeniería de precisión para optimizar la eficiencia de su línea de producción y reducir costos operativos.",
  },
  "hero.explore": { en: "Explore Products", de: "Produkte entdecken", es: "Explorar productos" },
  "hero.watch": { en: "Watch Video", de: "Video ansehen", es: "Ver video" },

  // Stats
  "stats.patents": { en: "Patents", de: "Patente", es: "Patentes" },
  "stats.projects": { en: "Projects", de: "Projekte", es: "Proyectos" },
  "stats.countries": { en: "Countries", de: "Länder", es: "Países" },

  // Featured products section
  "featured.eyebrow": { en: "Our Solutions", de: "Unsere Lösungen", es: "Nuestras soluciones" },
  "featured.title": { en: "Featured Products", de: "Top-Produkte", es: "Productos destacados" },
  "featured.subtitle": {
    en: "Precision-engineered feeding systems designed for reliability and performance",
    de: "Präzise Zuführsysteme für Zuverlässigkeit und Leistung",
    es: "Sistemas de alimentación de precisión diseñados para fiabilidad y rendimiento",
  },
  "featured.learnMore": { en: "Learn More", de: "Mehr erfahren", es: "Ver más" },
  "featured.viewAll": { en: "View All Products", de: "Alle Produkte ansehen", es: "Ver todos los productos" },
  "featured.downloadCatalog": { en: "Download Catalog", de: "Katalog herunterladen", es: "Descargar catálogo" },

  // Process
  "process.eyebrow": { en: "How We Work", de: "So arbeiten wir", es: "Cómo trabajamos" },
  "process.title": { en: "Custom Process", de: "Ablauf nach Maß", es: "Proceso a medida" },
  "process.subtitle": {
    en: "From initial consultation to final delivery, we ensure excellence at every step",
    de: "Von der ersten Beratung bis zur finalen Lieferung: Exzellenz in jedem Schritt",
    es: "Desde la consulta inicial hasta la entrega final, garantizamos excelencia en cada paso",
  },
}

export function t(locale: Locale, key: keyof typeof dict) {
  return dict[key][locale]
}

