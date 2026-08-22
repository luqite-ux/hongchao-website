import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeInquiry } from "@/lib/inquiries";
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from "@/lib/inquiry-captcha";

/** POST /api/inquiry — 接收询盘表单，写入统一后台 inquiries */
export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim();
  if (!url || !anonKey || !tenantId) {
    return NextResponse.json(
      {
        ok: false,
        error: "Server misconfiguration",
        hint: "Supabase public configuration is incomplete",
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

  let row;
  try { row = normalizeInquiry(body as Record<string, unknown>, tenantId); }
  catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Invalid inquiry" }, { status: 400 }); }

  try {
    const captchaBody = body as Record<string, unknown>;
    const secret = process.env.CAPTCHA_SECRET?.trim();
    if (!secret) {
      return NextResponse.json({ ok: false, error: "CAPTCHA service unavailable" }, { status: 503 });
    }
    const { store, tenantId: captchaTenantId, siteScope } = createSupabaseCaptchaContextFromEnv()
    const captchaResult = await verifyCaptchaSubmission({
      secret,
      store,
      tenantId: captchaTenantId,
      siteScope,
      scope: String(captchaBody.captchaScope ?? ""),
      token: String(captchaBody.captchaToken ?? ""),
      answer: String(captchaBody.captchaAnswer ?? ""),
    });
    if (!captchaResult.ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid or expired CAPTCHA. Please refresh and try again." },
        { status: 400 },
      );
    }
    const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
    const { error } = await supabase.from("inquiries").insert(row);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : typeof e === "object" && e && "message" in e ? String(e.message) : String(e);
    console.error("[inquiry] Supabase insert failed:", { tenantId, message });
    return NextResponse.json(
      { ok: false, error: "Failed to save inquiry", detail: message },
      { status: 502 }
    );
  }
}
