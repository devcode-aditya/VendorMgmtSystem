import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body) return new Response(JSON.stringify({ error: "Missing body" }), { status: 400 });

    // Placeholder mapping to Business Central payload
    const bcPayload = {
      // Map fields from `body` to BC expected structure here
      ...body,
    };

    const baseUrl = process.env.BC_API_URL || process.env.NEXT_PUBLIC_BC_API_URL;
    const username = process.env.BC_USERNAME || process.env.NEXT_PUBLIC_BC_USERNAME;
    const password = process.env.BC_PASSWORD || process.env.NEXT_PUBLIC_BC_PASSWORD;

    if (!baseUrl || !username || !password) {
      // Leave API mapping and credential config to environment setup
      return new Response(JSON.stringify({ message: "BC forwarding skipped (configure BC_* env).", bcPayload }), { status: 202 });
    }

    const authHeader = "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    const res = await fetch(`${baseUrl}/purchaseOrders`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bcPayload),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: "BC request failed", details: err }), { status: 502 });
    }

    const result = await res.json();
    return Response.json({ forwarded: true, result });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Failed to create purchase order" }), { status: 500 });
  }
}


