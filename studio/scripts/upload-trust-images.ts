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

async function uploadImage(client: ReturnType<typeof createClient>, filePath: string) {
  const filename = path.basename(filePath)
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload("image", stream, { filename })
  return asset
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

  const imagePaths = [
    path.resolve(
      repoRoot,
      "assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_4f270caae2ea4da141787410480aae47_images_image-f3483237-8a0d-454c-8b8e-e0c59278173c.png"
    ),
    path.resolve(
      repoRoot,
      "assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_4f270caae2ea4da141787410480aae47_images_image-6c5ba9ca-593f-459d-b0be-56db6ddc1695.png"
    ),
  ]

  for (const p of imagePaths) {
    if (!fs.existsSync(p)) throw new Error(`Image file not found: ${p}`)
  }

  const [exhibitionImg, clientVisitImg] = await Promise.all([
    uploadImage(client, imagePaths[0]!),
    uploadImage(client, imagePaths[1]!),
  ])

  const exhibitionImageValue = { _type: "image", asset: { _type: "reference", _ref: exhibitionImg._id } }
  const clientVisitImageValue = { _type: "image", asset: { _type: "reference", _ref: clientVisitImg._id } }

  const homepageId = "homepage"
  const res = await client
    .patch(homepageId)
    .setIfMissing({ trustSection: {} })
    .setIfMissing({ "trustSection.exhibitionImages": [] })
    .setIfMissing({ "trustSection.clientVisitImages": [] })
    .append("trustSection.exhibitionImages", [exhibitionImageValue])
    .append("trustSection.clientVisitImages", [clientVisitImageValue])
    .commit({ autoGenerateArrayKeys: true })

  console.log("Uploaded assets:", { exhibition: exhibitionImg._id, clientVisit: clientVisitImg._id })
  console.log("Patched homepage:", res._id)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

