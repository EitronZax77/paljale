import { createHmac } from "node:crypto";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

type QuotaResult = { status: string; reservation_id?: string; reset_at?: string | null; successes?: number };

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("QUOTA_NOT_CONFIGURED");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export function visitorDigest(request: NextRequest): string {
  // Solo aceptar IP recibida desde el proxy de confianza de Vercel.
  // En desarrollo local usar IP de loopback; no fiarse de cabeceras arbitrarias.
  const raw = process.env.NODE_ENV === "production"
    ? request.headers.get("x-vercel-forwarded-for")
    : "127.0.0.1";
  const ip = raw?.split(",")[0]?.trim();
  const secret = process.env.PALJALE_IP_HASH_SECRET;
  if (!ip || !secret || secret.length < 32 || ip.length > 64 || !/^[a-fA-F0-9:.]+$/.test(ip)) {
    throw new Error("VISITOR_UNAVAILABLE");
  }
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function reserveRemoval(digest: string): Promise<QuotaResult> {
  const { data, error } = await admin().rpc("paljale_bg_reserve", { p_digest: digest });
  if (error || !data || typeof data.status !== "string") throw new Error("QUOTA_RESERVE_UNAVAILABLE");
  return data as QuotaResult;
}

export async function finishRemoval(reservationId: string, success: boolean): Promise<QuotaResult> {
  const { data, error } = await admin().rpc("paljale_bg_finish", {
    p_reservation: reservationId, p_success: success,
  });
  if (error || !data || typeof data.status !== "string") throw new Error("QUOTA_FINISH_UNAVAILABLE");
  return data as QuotaResult;
}
