const encoder = new TextEncoder();

export const oauthStateCookie = "loudr_decap_oauth_state";

export function oauthCredentials() {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function safeEqual(left: string, right: string) {
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a[index] ^ b[index];
  }
  return difference === 0;
}

export function authResponse(
  status: "success" | "error",
  content: Record<string, unknown>,
) {
  const message = JSON.stringify(
    `authorization:github:${status}:${JSON.stringify(content)}`,
  ).replace(/</g, "\\u003c");

  return new Response(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Authorizing Loudr CMS</title></head>
<body>
  <p id="status">Completing GitHub authorization…</p>
  <script>
    (() => {
      const authMessage = ${message};
      const status = document.getElementById('status');
      if (!window.opener) {
        status.textContent = 'The CMS login window is no longer available. Close this tab and try again.';
        return;
      }
      const receiveMessage = (event) => {
        window.opener.postMessage(authMessage, event.origin);
        window.removeEventListener('message', receiveMessage);
        status.textContent = 'Authorized. You can close this window.';
        window.close();
      };
      window.addEventListener('message', receiveMessage);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script>
</body>
</html>`, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
