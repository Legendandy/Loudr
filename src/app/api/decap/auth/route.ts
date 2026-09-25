import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { oauthCredentials, oauthStateCookie } from "@/lib/decap-oauth";

export async function GET(request: NextRequest) {
  const credentials = oauthCredentials();
  if (!credentials) {
    return new Response("Decap CMS authentication is not configured.", { status: 503 });
  }

  const state = randomBytes(24).toString("hex");
  const callback = new URL("/api/decap/callback", request.nextUrl.origin);
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", credentials.clientId);
  authorize.searchParams.set("redirect_uri", callback.toString());
  authorize.searchParams.set("scope", "repo,user");
  authorize.searchParams.set("state", state);

  const response = NextResponse.redirect(authorize);
  response.cookies.set(oauthStateCookie, state, {
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax",
    path: "/api/decap/callback",
    maxAge: 600,
  });
  return response;
}
