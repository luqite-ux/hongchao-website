import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity.client";
import { translateText } from "@/lib/translator";
import { isValidSignature } from "@sanity/webhook";

export const runtime = "nodejs";

type WebhookPayload = Record<string, unknown>;

function pickString(v: unknown) {
  return typeof v === "string" ? v : "";
}

/**
 * POST /api/auto-translate
 * - 接收 Sanity Webhook 发送的产品数据（至少需要 _id + title + description/summary）
 * - 翻译 title/description 从英文到德语/西班牙语
 * - 回写到 Sanity：title_de/description_de/title_es/description_es
 * - 使用 SANITY_WEBHOOK_SECRET + x-sanity-signature 验证 webhook 签名
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET || "";
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration", hint: "SANITY_WEBHOOK_SECRET must be set" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("x-sanity-signature") || "";
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const valid = isValidSignature(rawBody, signature, secret);
  if (!valid) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const raw = body as WebhookPayload;

  // 兼容常见 webhook 形状：直接给文档 / 或包在 document 里 / 或使用 documentId
  const doc =
    (raw.document as WebhookPayload | undefined) ||
    (raw.data as WebhookPayload | undefined) ||
    raw;

  const productId =
    pickString(doc._id) ||
    pickString(raw._id) ||
    pickString(raw.documentId) ||
    pickString((raw.ids as any)?.updated?.[0]) ||
    pickString((raw.ids as any)?.created?.[0]);

  const titleEn = pickString(doc.title);
  const descriptionEn =
    pickString((doc as any).description) || pickString((doc as any).summary);

  if (!productId) {
    return NextResponse.json(
      { ok: false, error: "Missing product id" },
      { status: 400 }
    );
  }
  if (!titleEn && !descriptionEn) {
    return NextResponse.json(
      { ok: false, error: "Missing product title/description" },
      { status: 400 }
    );
  }

  // 写入需要 write token。复用 sanityClient，但在服务端叠加 token（若存在）。
  const writeToken = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
  const client = writeToken
    ? sanityClient.withConfig({ token: writeToken, useCdn: false })
    : sanityClient.withConfig({ useCdn: false });

  try {
    const [[titleDe, titleEs], [descDe, descEs]] = await Promise.all([
      Promise.all([
        titleEn ? translateText(titleEn, "de") : Promise.resolve(""),
        titleEn ? translateText(titleEn, "es") : Promise.resolve(""),
      ]),
      Promise.all([
        descriptionEn ? translateText(descriptionEn, "de") : Promise.resolve(""),
        descriptionEn ? translateText(descriptionEn, "es") : Promise.resolve(""),
      ]),
    ]);

    const patch: Record<string, string> = {};
    if (titleEn) {
      patch.title_de = titleDe || titleEn;
      patch.title_es = titleEs || titleEn;
    }
    if (descriptionEn) {
      patch.description_de = descDe || descriptionEn;
      patch.description_es = descEs || descriptionEn;
    }

    const result = await client.patch(productId).set(patch).commit();

    return NextResponse.json({
      ok: true,
      productId,
      updatedFields: Object.keys(patch),
      result,
    });
  } catch (e) {
    console.error("[auto-translate] patch failed:", e);
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, error: "Failed to translate or patch product", detail: message },
      { status: 502 }
    );
  }
}

