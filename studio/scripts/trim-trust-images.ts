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
    const eq = line.indexOf("=")
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

async function main() {
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
    studioEnv.SANITY_API_TOKEN ||
    process.env.SANITY_STUDIO_TOKEN ||
    studioEnv.SANITY_STUDIO_TOKEN

  if (!projectId) throw new Error("Missing projectId (SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID).")
  if (!token) throw new Error("Missing write token (SANITY_WRITE_TOKEN / SANITY_API_TOKEN).")

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  })

  const homepageId = "homepage"
  const doc = await client.fetch<{
    _id: string
    trustSection?: {
      exhibitionImages?: unknown[]
      clientVisitImages?: unknown[]
    }
  }>(`*[_id == "homepage"][0]{ _id, trustSection{ exhibitionImages, clientVisitImages } }`)

  if (!doc?._id) throw new Error('Homepage document "homepage" not found')

  const ex = Array.isArray(doc.trustSection?.exhibitionImages) ? doc.trustSection!.exhibitionImages! : []
  const cv = Array.isArray(doc.trustSection?.clientVisitImages) ? doc.trustSection!.clientVisitImages! : []

  const exTrimmed = ex.slice(0, 6)
  const cvTrimmed = cv.slice(0, 6)

  const res = await client
    .patch(homepageId)
    .setIfMissing({ trustSection: {} })
    .set({ "trustSection.exhibitionImages": exTrimmed })
    .set({ "trustSection.clientVisitImages": cvTrimmed })
    .commit({ autoGenerateArrayKeys: true })

  console.log("Trimmed trustSection arrays to 6 each.")
  console.log("Counts:", { exhibition: ex.length + " -> " + exTrimmed.length, clientVisit: cv.length + " -> " + cvTrimmed.length })
  console.log("Patched homepage:", res._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

