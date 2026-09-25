import { NextRequest, NextResponse } from "next/server";

const fieldLimits: Record<string, number> = {
  name: 100,
  email: 254,
  artist: 150,
  sound: 2000,
  genre: 100,
  message: 5000,
};

export async function POST(request: NextRequest) {
  const reply = (message: string, status: number) =>
    NextResponse.json({ message }, { status });

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) {
        return reply("Request origin not allowed.", 403);
      }
    } catch {
      return reply("Request origin not allowed.", 403);
    }
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 15_000) return reply("Your request is too long.", 413);
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch {
    return reply("Please send a valid campaign request.", 400);
  }

  if (body.website) return reply("Unable to send this request.", 400);

  const data: Record<string, string> = {};
  for (const [key, max] of Object.entries(fieldLimits)) {
    const value = body[key];
    if (value !== undefined && typeof value !== "string") {
      return reply("Please check your form details.", 400);
    }
    data[key] = (value as string | undefined)?.trim() ?? "";
    if (data[key].length > max || (key !== "message" && !data[key])) {
      return reply("Please complete all required fields within the allowed length.", 400);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return reply("Please enter a valid email address.", 400);
  }

  try {
    const url = new URL(data.sound);
    if (
      url.protocol !== "https:" ||
      (url.hostname !== "tiktok.com" && !url.hostname.endsWith(".tiktok.com")) ||
      url.pathname === "/"
    ) throw new Error();
  } catch {
    return reply("Please enter a valid HTTPS TikTok sound link.", 400);
  }

  const posts = Number(body.posts);
  if (!Number.isInteger(posts) || posts < 1 || posts > 100_000) {
    return reply("Please enter a valid number of posts.", 400);
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const formSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!scriptUrl || !formSecret) {
    return reply("Campaign requests aren’t connected yet. Your request has not been sent.", 503);
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, posts, secret: formSecret }),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) throw new Error(`Apps Script returned ${response.status}`);
    const result = (await response.json()) as { success?: boolean };
    if (!result.success) throw new Error("Apps Script rejected the submission");

    return reply("Your campaign request has been sent. We’ll be in touch to discuss your music.", 200);
  } catch {
    return reply("Your request couldn’t be delivered. Please try again in a moment.", 502);
  }
}
