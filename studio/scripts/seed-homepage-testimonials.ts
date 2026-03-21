/**
 * 将首页「客户评价」默认文案写入 Sanity（与旧版前台硬编码一致），便于在 Studio 中编辑。
 *
 * 用法（在 studio 目录）：
 *   npm run seed:testimonials
 * 若已有数据需覆盖：
 *   npm run seed:testimonials -- --force
 *
 * 需配置 SANITY_WRITE_TOKEN（或 studio/.env.local 中 SANITY_WRITE_TOKEN / SANITY_API_TOKEN）
 */
import fs from "node:fs"
import path from "node:path"
import { createClient } from "@sanity/client"

type Env = Record<string, string>

function parseEnvFile(filePath: string): Env {
  if (!fs.existsSync(filePath)) return {}
  const content = fs.readFileSync(filePath, "utf8")
  const env: Env = {}
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith("#")) continue
    const idx = line.indexOf("=")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "Hongchao delivered our vibratory bowl feeders ahead of schedule with zero defects. Their engineering team responded within hours at every stage — that level of service is simply rare in this industry.",
    name: "Thomas Becker",
    title: "Head of Production Engineering",
    company: "Becker Precision GmbH",
    country: "Germany",
    focus: "Service",
  },
  {
    quote:
      "We've sourced feeding systems from three continents. Nothing matches the dimensional consistency and finish quality we receive from Hongchao. Every unit performs exactly to spec, batch after batch.",
    name: "Hiroshi Tanaka",
    title: "Senior Automation Manager",
    company: "Tanaka Robotics Co.",
    country: "Japan",
    focus: "Quality",
  },
  {
    quote:
      "Our production line could not wait. Hongchao compressed a 12-week lead time down to 7 weeks without any compromise on quality. The system was running on day one of installation.",
    name: "Amara Osei",
    title: "VP of Operations",
    company: "Precision Parts Africa",
    country: "South Africa",
    focus: "Delivery",
  },
  {
    quote:
      "The custom centrifugal feeder they designed for our micro-component line handles parts under 2mm flawlessly. The engineering expertise and attention to detail sets Hongchao apart from every competitor we evaluated.",
    name: "Elena Vasquez",
    title: "Automation Systems Director",
    company: "Vasquez Industrial S.A.",
    country: "Mexico",
    focus: "Quality",
  },
  {
    quote:
      "From our first inquiry to final delivery, communication was transparent and proactive. Hongchao's after-sales support team resolved our integration query on the same day. Exceptional partnership.",
    name: "James Whitfield",
    title: "Plant Manager",
    company: "Whitfield Assemblies Ltd.",
    country: "United Kingdom",
    focus: "Service",
  },
  {
    quote:
      "We placed a large order with a tight shipment window. Every unit arrived correctly documented, packaged, and on time. Reliability like this is why we have reordered four times in three years.",
    name: "Sven Lindqvist",
    title: "Procurement Lead",
    company: "Nordic Auto Systems",
    country: "Sweden",
    focus: "Delivery",
  },
] as const

async function main() {
  const force = process.argv.includes("--force")
  const repoRoot = path.resolve(__dirname, "..", "..")
  const studioEnv = parseEnvFile(path.join(repoRoot, "studio", ".env.local"))
  const webEnv = parseEnvFile(path.join(repoRoot, "web", ".env.local"))

  const projectId =
    process.env.SANITY_STUDIO_PROJECT_ID ||
    studioEnv.SANITY_STUDIO_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    webEnv.NEXT_PUBLIC_SANITY_PROJECT_ID

  const dataset =
    process.env.SANITY_STUDIO_DATASET ||
    studioEnv.SANITY_STUDIO_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    webEnv.NEXT_PUBLIC_SANITY_DATASET ||
    "production"

  const token =
    process.env.SANITY_WRITE_TOKEN ||
    studioEnv.SANITY_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    studioEnv.SANITY_API_TOKEN

  if (!projectId || !token) {
    throw new Error("Missing Sanity projectId/token (SANITY_WRITE_TOKEN or SANITY_API_TOKEN)")
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  })

  const existing = await client.fetch<{ testimonials?: unknown[] | null } | null>(
    `*[_id == "homepage"][0]{ testimonials }`
  )
  const count = Array.isArray(existing?.testimonials) ? existing!.testimonials!.length : 0
  if (count > 0 && !force) {
    console.log(`首页已有 ${count} 条客户评价，跳过写入。需要覆盖请加参数：--force`)
    return
  }

  await client
    .patch("homepage")
    .set({ testimonials: [...DEFAULT_TESTIMONIALS] })
    .commit({ autoGenerateArrayKeys: true })

  console.log(`已写入 ${DEFAULT_TESTIMONIALS.length} 条客户评价到 homepage（${force ? "强制覆盖" : "首次写入"}）。`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
