import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/** POST /api/inquiry — 接收询盘表单，写入 Sanity inquiry 文档 */
export async function POST(request: Request) {
  if (!projectId || !dataset || !token) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server misconfiguration",
        hint: "SANITY_WRITE_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET must be set",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email is required" },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Message is required" },
      { status: 400 }
    );
  }

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : undefined;
  const company = typeof raw.company === "string" ? raw.company.trim() : undefined;
  const sourcePage = typeof raw.sourcePage === "string" && raw.sourcePage ? raw.sourcePage.trim() : undefined;

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const doc = {
    _type: "inquiry" as const,
    name: name || "—",
    email,
    ...(phone && { phone }),
    ...(company && { company }),
    message,
    ...(sourcePage && { sourcePage }),
    status: "new" as const,
    createdAt: new Date().toISOString(),
  };

  try {
    const id = await client.create(doc);
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error("[inquiry] Sanity create failed:", e);
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, error: "Failed to save inquiry", detail: message },
      { status: 502 }
    );
  }
}
