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
- Configure its existing backend/API and authentication environment variables using the values already used by the app. Never put backend secrets in this public website repository.

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
