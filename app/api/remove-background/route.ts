import { NextRequest, NextResponse } from "next/server";
import { reserveRemoval, finishRemoval, visitorDigest } from "@/lib/bg-quota";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
type Step = "auth" | "start" | "upload" | "process" | "download";

function safeErrorDetails(data: unknown): { type: string; code: number | null; param: string } {
  const root = data && typeof data === "object" ? data as Record<string, unknown> : {};
  const detail = root.error && typeof root.error === "object" ? root.error as Record<string, unknown> : {};
  const allowed = new Set(["server", "task", "tool", "region", "file", "files", "filename", "authorization", "public_key", "credits", "limit"]);
  let param = "UNSPECIFIED";
  if (typeof detail.param === "string" && allowed.has(detail.param.toLowerCase())) param = detail.param.toLowerCase();
  else if (detail.param && typeof detail.param === "object" && !Array.isArray(detail.param)) {
    param = "FIELDS:" + Object.keys(detail.param).filter(k => allowed.has(k.toLowerCase())).slice(0, 6).join(",");
  }
  return {
    type: typeof detail.type === "string" && /^[A-Za-z]{1,40}$/.test(detail.type) ? detail.type : "UNKNOWN",
    code: typeof detail.code === "number" ? detail.code : null,
    param,
  };
}

async function checkedFetch(stage: Step, url: string, init: RequestInit): Promise<Response> {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(stage === "process" ? 85000 : 30000),
  });
  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    console.error("PALJALE iLoveAPI", { stage, status: response.status, ...safeErrorDetails(data) });
    throw new Error(`UPSTREAM_${stage}_${response.status}`);
  }
  return response;
}

async function getToken(publicKey: string): Promise<string> {
  const response = await checkedFetch("auth", "https://api.ilovepdf.com/v1/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ public_key: publicKey }),
  });
  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || !("token" in data) || typeof data.token !== "string" || data.token.length < 20) {
    throw new Error("INVALID_AUTH_RESPONSE");
  }
  return data.token;
}

function imageFilename(type: string): string {
  if (type === "image/png") return "paljale-image.png";
  if (type === "image/webp") return "paljale-image.webp";
  return "paljale-image.jpg";
}

export async function POST(request: NextRequest) {
  // El presupuesto y la quota se verifican antes de consultar al proveedor.
  if (process.env.PALJALE_BG_ENABLED !== "true") return NextResponse.json({ error: "OFFLINE" }, { status: 503 });
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ error: "ORIGIN" }, { status: 403 });
    } catch {
      return NextResponse.json({ error: "ORIGIN" }, { status: 403 });
    }
  }
  const publicKey = process.env.ILOVEAPI_PUBLIC_KEY?.trim();
  const secretKey = process.env.ILOVEAPI_SECRET_KEY?.trim();
  if (!publicKey || !secretKey) return NextResponse.json({ error: "NOT_CONFIGURED" }, { status: 503 });

  let file: File;
  try {
    const form = await request.formData();
    const value = form.get("image");
    if (!(value instanceof File) || !ALLOWED_TYPES.has(value.type) || value.size < 1 || value.size > MAX_BYTES) {
      throw new Error("INVALID_FILE");
    }
    file = value;
  } catch {
    return NextResponse.json({ error: "INVALID_FILE" }, { status: 400 });
  }

  let digest: string;
  try { digest = visitorDigest(request); }
  catch { return NextResponse.json({ error: "OFFLINE" }, { status: 503 }); }
  let reservationId: string;
  try {
    const quota = await reserveRemoval(digest);
    if (quota.status === "limit") return NextResponse.json({ error: "WEEKLY_LIMIT", reset_at: quota.reset_at ?? null }, { status: 429 });
    if (quota.status !== "allowed" || !quota.reservation_id) return NextResponse.json({ error: "OFFLINE" }, { status: 503 });
    reservationId = quota.reservation_id;
  } catch {
    console.error("PALJALE quota unavailable");
    return NextResponse.json({ error: "OFFLINE" }, { status: 503 });
  }
  let stage: Step = "auth";
  try {
    const token = await getToken(publicKey);
    const headers = { Authorization: `Bearer ${token}` };

    stage = "start";
    const started = await checkedFetch(stage, "https://api.ilovepdf.com/v1/start/removebackgroundimage/eu", { method: "GET", headers });
    const job: unknown = await started.json();
    if (!job || typeof job !== "object") throw new Error("INVALID_UPSTREAM_TASK");
    const { server, task } = job as { server?: unknown; task?: unknown };
    // Solo se aceptan subdominios de los dominios oficiales del proveedor.
    // No se admiten esquemas, rutas, puertos, IP, dominios similares ni hosts externos.
    if (typeof server !== "string") throw new Error("INVALID_UPSTREAM_SERVER");
    const hostname = server.toLowerCase();
    if (!/^[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:ilovepdf|iloveimg)\.com$/.test(hostname)) {
      console.error("PALJALE iLoveAPI host validation", { kind: "UNRECOGNIZED_HOST", hostCategory: hostname.endsWith(".iloveimg.com") ? "IMG" : hostname.endsWith(".ilovepdf.com") ? "PDF" : "OTHER" });
      throw new Error("INVALID_UPSTREAM_SERVER");
    }
    if (typeof task !== "string" || !/^[A-Za-z0-9_-]{10,200}$/.test(task)) {
      console.error("PALJALE iLoveAPI task validation", { kind: "UNRECOGNIZED_TASK_FORMAT", valueType: typeof task, length: typeof task === "string" ? task.length : null });
      throw new Error("INVALID_UPSTREAM_TASK");
    }
    const base = `https://${hostname}`;
    const filename = imageFilename(file.type);

    stage = "upload";
    const uploadForm = new FormData();
    uploadForm.set("task", task);
    uploadForm.set("file", file, filename);
    const uploadedResponse = await checkedFetch(stage, `${base}/v1/upload`, { method: "POST", headers, body: uploadForm });
    const uploaded: unknown = await uploadedResponse.json();
    if (!uploaded || typeof uploaded !== "object" || !("server_filename" in uploaded) ||
        typeof uploaded.server_filename !== "string" || !uploaded.server_filename) {
      throw new Error("MISSING_UPLOADED_FILE");
    }

    stage = "process";
    const processedResponse = await checkedFetch(stage, `${base}/v1/process`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        task,
        tool: "removebackgroundimage",
        files: [{ server_filename: uploaded.server_filename, filename }],
      }),
    });
    const processData: unknown = await processedResponse.json().catch(() => null);
    if (processData && typeof processData === "object" && "status" in processData &&
        typeof processData.status === "string" && !["TaskSuccess", "TaskSuccessWithWarnings"].includes(processData.status)) {
      throw new Error("PROCESS_STATUS_UNSUCCESSFUL");
    }

    stage = "download";
    const downloaded = await checkedFetch(stage, `${base}/v1/download/${encodeURIComponent(task)}`, { method: "GET", headers });
    const bytes = new Uint8Array(await downloaded.arrayBuffer());
    const png = [137, 80, 78, 71, 13, 10, 26, 10];
    if (bytes.byteLength < 8 || bytes.byteLength > 25 * 1024 * 1024 || !png.every((b, index) => bytes[index] === b)) {
      throw new Error("INVALID_IMAGE_RESULT");
    }
    // Si la cuota no puede cerrarse de forma fiable, no entregamos éxito.
    const result = await finishRemoval(reservationId, true);
    if (result.status !== "ok") throw new Error("QUOTA_FINISH_FAILED");
    return new NextResponse(bytes.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": "image/png", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
        "X-Paljale-Remaining": String(Math.max(0, 3 - (result.successes ?? 3))),
        ...(result.reset_at ? { "X-Paljale-Reset": result.reset_at } : {}),
      },
    });
  } catch (error) {
    // La reserva NO se reembolsa automaticamente: podria haberse cobrado en /process.
    try { await finishRemoval(reservationId, false); }
    catch { console.error("PALJALE quota close failed"); }
    const message = error instanceof Error ? error.message : "UNKNOWN";
    const safeCode = /^(UPSTREAM_(?:auth|start|upload|process|download)_\d+|INVALID_AUTH_RESPONSE|INVALID_UPSTREAM_SERVER|INVALID_UPSTREAM_TASK|MISSING_UPLOADED_FILE|PROCESS_STATUS_UNSUCCESSFUL|INVALID_IMAGE_RESULT)$/.test(message)
      ? message : "NETWORK_OR_UNEXPECTED_ERROR";
    // No se imprimen credenciales, tokens, identificadores de tarea ni mensajes crudos del proveedor.
    console.error("PALJALE iLoveAPI failure", { stage, reason: safeCode });
    return NextResponse.json({ error: "PROCESS_FAILED" }, { status: 502 });
  }
}
