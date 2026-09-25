# Loudr

Custom Next.js App Router website for Loudr.me. No page builder, payments, login or customer dashboard.

## Local development

Requires Node.js 20.9+.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Run `npm run build` for a production build, `npm run typecheck` for TypeScript checks and `npm test` for browser checks. Browser checks require `npx playwright install chromium` and a running development server.

## Contact delivery

Campaign requests are delivered to Gmail through a private Google Apps Script web app. Copy `.env.example` to `.env.local` and set `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET`. The secret must match the Apps Script `FORM_SECRET` script property. The visitor's email is used as Reply-To, so replying to the notification reaches the person who submitted the form. Only successful delivery produces a success message. Without configuration the form explicitly says it has not sent the request. Submissions are not saved locally or logged. Before public launch, configure rate limiting or abuse protection with the hosting provider.

## Decap CMS

The editor is at `/admin/index.html`. Posts live in `content/blog`, uploaded images in `public/uploads`. A draft is hidden until its Draft toggle is turned off. One original introductory article is included.

For local editing, run `npx decap-server` from the project root in a second terminal, then open `/admin/index.html` while the Next.js server is running. `local_backend: true` uses the local proxy on localhost. Decap loads its editor from a CDN, so internet access is required.

For production:

1. Push this project to your GitHub repository.
2. The production repository is configured as `Legendandy/Loudr` in `public/admin/config.yml`.
3. Create a GitHub OAuth App whose callback is `https://loudr.vercel.app/api/decap/callback`, then add its client ID and secret to Vercel as `GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET`. Never add the client secret to the public config.
4. Connect the GitHub repository to Vercel. Commits made through Decap will trigger fresh site builds.
5. Publish an article through the editor and verify the new deployment before launch.

Official backend setup: https://decapcms.org/docs/github-backend/

## Vercel

Import the Git repository into Vercel, use the detected Next.js preset and add the contact environment variables. Connect Loudr.me in the Vercel domain settings when ready. Nothing has been deployed by this local setup.

## Content needed before launch

- Add the GitHub OAuth App credentials to the production host for Decap CMS.
- Add the Google Apps Script environment variables to the production host.
- Connect contact delivery and Decap authentication.

The campaign progress visual is illustrative and is not represented as an existing customer dashboard. Reduced-motion settings disable motion. Fonts use Google Fonts with local system fallbacks.
