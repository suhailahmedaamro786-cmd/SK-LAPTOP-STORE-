export const runtime = "nodejs";
export async function POST(request: Request) {
  const api = process.env.STORE_API_URL;
  if (!api) return Response.json({ error: "checkout_not_configured" }, { status: 503 });
  const idempotencyKey = request.headers.get("Idempotency-Key") ?? "";
  if (!/^[a-zA-Z0-9_-]{16,128}$/.test(idempotencyKey)) return Response.json({ error: "idempotency_key_required" }, { status: 400 });
  const body = await request.text();
  if (body.length > 12_000) return Response.json({ error: "request_too_large" }, { status: 413 });
  try {
    const origin = new URL(request.url).origin;
    const upstream = await fetch(new URL("/api/public/orders", api), {
      method: "POST",
      cache: "no-store",
      headers: { "content-type": "application/json", "Idempotency-Key": idempotencyKey, Origin: origin },
      body,
    });
    const payload = await upstream.text();
    return new Response(payload, { status: upstream.status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
  } catch {
    return Response.json({ error: "checkout_unavailable" }, { status: 503 });
  }
}
