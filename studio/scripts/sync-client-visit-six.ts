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

async function uploadImage(client: ReturnType<typeof createClient>, filePath: string) {
  const stream = fs.createReadStream(filePath)
  return client.assets.upload("image", stream, { filename: path.basename(filePath) })
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
    studioEnv.SANITY_API_TOKEN

  if (!projectId || !token) {
    throw new Error("Missing Sanity projectId/token")
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  })

  const sixFiles = [
    "8ad12081ccf00c617dcd03ff1d4ae6e5.jpg",
    "96f6271de453711fd6ad1a90b4d343cd.jpg",
    "微信图片_20230420142606.jpg",
    "微信图片_20230420143000.jpg",
    "微信图片_20230420143139.jpg",
    "微信图片_20230420143239.jpg",
  ].map((name) => path.join(repoRoot, "web", "public", "images", "client-visit", name))

  for (const fp of sixFiles) {
    if (!fs.existsSync(fp)) throw new Error(`Missing client-visit file: ${fp}`)
  }

  const uploaded = await Promise.all(sixFiles.map((fp) => uploadImage(client, fp)))
  const clientVisitImages = uploaded.map((a) => ({
    _type: "image",
    asset: { _type: "reference", _ref: a._id },
  }))

  await client
    .patch("homepage")
    .setIfMissing({ trustSection: {} })
    .set({ "trustSection.clientVisitImages": clientVisitImages })
    .commit({ autoGenerateArrayKeys: true })

  console.log("Synced clientVisitImages to exactly 6 items.")
  console.log(uploaded.map((a) => a._id))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

