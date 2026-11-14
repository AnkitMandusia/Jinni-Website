# Jinni public website

A responsive, customer-facing marketing site for Jinni, focused on **food and grocery**. This repository is intentionally separate from the operational Jinni application.

## Repositories and responsibilities

| Repository | Owns |
| --- | --- |
| [Jinni](https://github.com/AnkitMandusia/Jinni) | Mobile app, backend integration, authentication, Super Admin, restaurant and grocery dashboards |
| [Jinni-Website](https://github.com/AnkitMandusia/Jinni-Website) | Public homepage, marketing content, SEO metadata and partner entry links |

The website does not copy dashboard code, user records, orders or API logic. Partner buttons open the existing dashboard deployment. Both deployments can continue using the same Jinni backend and database.

## Vercel setup — public website

1. Sign in to [Vercel](https://vercel.com/) with the GitHub account that owns this repository.
2. Choose **Add New → Project**, import `AnkitMandusia/Jinni-Website`, then configure:
   - Framework Preset: **Vite**
   - Root Directory: `./` (repository root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Production Branch: `main`
3. Click **Deploy**. Vercel will build the site and assign a temporary `.vercel.app` URL.
4. In **Project → Settings → Environment Variables**, optionally set:
   - Name: `VITE_PARTNER_PORTAL_URL`
   - Value: `https://partners.jinniwishes.in`
   - Environments: Production, Preview, Development
   The source includes this default already; add the variable only if you need to change the dashboard hostname. Redeploy after changing environment variables.
5. In **Project → Settings → Domains**, add `jinniwishes.in` and `www.jinniwishes.in`. Choose the canonical hostname and configure the other to redirect to it.

Vercel automatically creates Preview Deployments for pull requests and deploys the configured production branch when changes reach `main`.

## GoDaddy DNS for the public website

Keep DNS hosted at GoDaddy. After adding the domains in Vercel, open each domain's Vercel configuration screen and copy the **exact records Vercel shows for this project**. In GoDaddy: Domain Portfolio → `jinniwishes.in` → DNS → Add New Record.

Typical Vercel records are:
- Apex/root (`@`): A record to `76.76.21.21`
- `www`: CNAME to `cname.vercel-dns-0.com`

These are general-purpose Vercel values, not a substitute for checking the domain-specific records shown in your Vercel project. Remove or replace conflicting records for the same host only after confirming they are old website records. Do not delete MX, mail-related TXT, or unrelated subdomain records. Do not change nameservers merely to deploy this site. Vercel provisions HTTPS after DNS verification.

## Existing dashboard deployment — separate Vercel project

The existing web dashboards are in the original Jinni repository under `superapp-admin` (the changes are currently proposed in [PR #2](https://github.com/AnkitMandusia/Jinni/pull/2)). They are **not hosted by this marketing website**.

After PR #2 is reviewed/merged, create a second Vercel project from `AnkitMandusia/Jinni`:
- Root Directory: `superapp-admin`
- Framework: Vite
- Use the build command and output directory from that app's `package.json`/Vite configuration (expected Vite defaults: `npm run build` and `dist`; verify during import).
- Add the dashboard environment variable `VITE_API_URL` with the public backend origin only (for example, `https://api.your-domain` — use your actual deployed API host, without `/api/v1` or a trailing slash). The dashboard client appends `/api/v1` automatically. The current app defaults to `/api/v1` on its own host when this variable is missing, which is not correct for a separate dashboard host unless you have deliberately configured a same-host API proxy.
- Confirm the backend CORS allowlist includes `https://partners.jinniwishes.in` if the API enforces browser-origin restrictions. Never put backend secrets or private keys in Vite environment variables; `VITE_` values are exposed in the browser.

Assign the dashboard Vercel project the subdomain `partners.jinniwishes.in`. Once it is live, the portal routes are:
- `https://partners.jinniwishes.in/admin`
- `https://partners.jinniwishes.in/restaurant`
- `https://partners.jinniwishes.in/store`

The marketing site's restaurant/store partner buttons go to the same portal host plus the corresponding route. Super Admin is not promoted as a public-facing link.

In GoDaddy, add the dashboard subdomain DNS record using the exact CNAME target Vercel provides for `partners.jinniwishes.in`. This is separate from the apex and `www` records.

## How updates work

- Update homepage text/design/SEO in this repository.
- Update dashboard screens, dashboard API calls, login and backend features in the original Jinni repository.
- The two web deployments remain separate; sharing the backend API does not require sharing a repository.
- When a change is pushed to the production branch connected to Vercel, Vercel deploys it automatically. Pull requests produce preview URLs.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

No checkout, payment, or live order-placement flow is claimed by this marketing-only frontend.


## Public website features and configuration

The homepage includes a PIN-code availability checker backed by the existing Jinni API:
- Restaurant listings: \`GET /api/v1/food/restaurants?pincode={pincode}&page=1&page_size=1\`
- Grocery stores: \`GET /api/v1/grocery/stores?pincode={pincode}\`

Set these Vercel environment variables for the **public website** project:
- \`VITE_PARTNER_PORTAL_URL\`: partner dashboard origin (defaults to \`https://partners.jinniwishes.in\`).
- \`VITE_API_URL\`: actual deployed FastAPI origin only, without \`/api/v1\` and without a trailing slash. The website appends \`/api/v1\` to call the two read-only lookup endpoints. No API hostname is hardcoded because the repository does not identify the production backend host. The checker displays a clear setup message while this value is unset; it does not show sample or fabricated availability.

After setting or changing Vercel environment variables, redeploy the website. Test the checker with a PIN code that has known active listings and another that has none. Verify both restaurant and grocery responses in the browser Network panel.

## Website sections and links

The public homepage includes:
- Food and grocery discovery sections
- Live PIN-code lookup (requires \`VITE_API_URL\`)
- Three-step explanation, partner login/contact paths, FAQ and contact section
- Standalone \`/privacy.html\` and \`/terms.html\` pages

The website does not include payment flows, customer account creation, a fake order form, store availability promises, app-download links, or claims that ordering is active in every area. The privacy and terms pages are scoped to this public website; have the appropriate legal owner review them before public launch and publish separate notices for the app/dashboard as required.

## Image assets

The homepage references the food, grocery and Jinni hero images already present in \`AnkitMandusia/Jinni\` under \`superapp-mobile/assets\`, served from the repository's public raw-content URLs. If the source asset paths are renamed, update \`ASSETS\` in \`src/main.jsx\`. For a fully self-contained deployment, copy approved production image files into this repository's \`public/images\` folder and update those references.
