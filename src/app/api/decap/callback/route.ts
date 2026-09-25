import { NextRequest } from "next/server";
import {
  authResponse,
  oauthCredentials,
  oauthStateCookie,
  safeEqual,
} from "@/lib/decap-oauth";

export async function GET(request: NextRequest) {
  const credentials = oauthCredentials();
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get(oauthStateCookie)?.value;

  if (!credentials || !code || !state || !storedState || !safeEqual(state, storedState)) {
    return authResponse("error", { message: "Invalid or expired GitHub authorization request." });
  }

  const callback = new URL("/api/decap/callback", request.nextUrl.origin);
  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: credentials.clientId,
        client_secret: credentials.clientSecret,
        code,
        redirect_uri: callback.toString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const token = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };
    if (!tokenResponse.ok || !token.access_token) {
      throw new Error(token.error_description || token.error || "GitHub did not return an access token.");
    }

    const response = authResponse("success", {
      token: token.access_token,
      provider: "github",
    });
    response.headers.append(
      "Set-Cookie",
      `${oauthStateCookie}=; Path=/api/decap/callback; Max-Age=0; HttpOnly; SameSite=Lax; Secure`,
    );
    return response;
  } catch {
    const response = authResponse("error", { message: "GitHub authorization could not be completed." });
    response.headers.append(
      "Set-Cookie",
      `${oauthStateCookie}=; Path=/api/decap/callback; Max-Age=0; HttpOnly; SameSite=Lax; Secure`,
    );
    return response;
  }
}
