import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeInquiry } from "@/lib/inquiries";

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
    const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
    const { data, error } = await supabase.from("inquiries").insert(row).select("id").single();
    if (error) throw error;
    return NextResponse.json({ ok: true, id: data.id });
  } catch (e) {
    console.error("[inquiry] Supabase insert failed:", e);
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, error: "Failed to save inquiry", detail: message },
      { status: 502 }
    );
  }
}
