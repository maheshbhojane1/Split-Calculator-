# Split Calculator

Free, no-login calculators for splitting money fairly. Everything runs in the browser, and nothing a visitor enters is stored or sent anywhere.

| Page | URL | What it does |
|---|---|---|
| Split bill | `/` | Adds tax and tip, then splits a bill evenly between any number of people |
| Split rent | `/split-rent-calculator/` | Divides rent equally, by room size, or by income |
| Split expenses | `/split-expenses-calculator/` | Tracks who paid what and finds the fewest payments to settle up |

## Tech stack

- **React 18** with **react-router-dom 6**
- **Vite 5** for the build
- **vite-react-ssg** to prerender every route to static HTML, so search engines receive the full page content instead of an empty app shell
- Plain CSS in `src/styles.css`, with no UI framework
- Deployed as a static site on **Cloudflare**

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # local development server
npm run build      # prerenders all pages into /dist
npm run preview    # serves the built site locally
```

After `npm run build`, open `dist/index.html` or `dist/split-rent-calculator/index.html` and confirm the H1, title, canonical tag, and JSON-LD are in the raw HTML. That is what search engines read.

## Project structure

```
.
├── index.html              # HTML shell
├── package.json
├── vite.config.js          # enables nested output (/page/index.html)
├── wrangler.jsonc          # Cloudflare static-assets deploy config
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── 404.html            # served for unknown URLs
└── src/
    ├── main.jsx            # vite-react-ssg entry
    ├── pages.jsx           # layout, SEO component, and the three pages
    ├── lib.js              # money maths and input limits
    └── styles.css
```

## Configuration

Set these before launch.

| Setting | Where | Notes |
|---|---|---|
| `SITE` | `src/pages.jsx` | Your live address, for example `https://example.com`. Used for canonical URLs and schema |
| `BRAND` | `src/pages.jsx` | Shown in the logo, footer, and the end of each title tag |
| `SOCIAL` | `src/pages.jsx` | Footer profile links |
| Sitemap URLs | `public/sitemap.xml` | Must match each page's canonical URL exactly, including the trailing slash |
| Sitemap line | `public/robots.txt` | Point it at your domain's `/sitemap.xml` |

Keep the trailing slash on every internal link, canonical URL, and sitemap entry. The build writes each page as a folder, so the slash version is the real URL.

## How the calculations work

All logic is in `src/lib.js`.

- **`allocate(total, weights)`** works in whole cents and uses the largest-remainder method. Shares always add up to the exact total. Leftover cents go to the largest fractional remainders, so no cent is lost.
- **`settle(balances)`** takes each person's net balance and matches debtors to creditors, largest first, to produce a short list of transfers. It is a greedy method that gives few payments but doesn't guarantee the mathematical minimum.
- **`lim()` and `clamp()`** keep inputs sane. Amounts are capped at 100,000,000 to avoid floating-point precision errors, percentages at 100, and negatives become 0.

## SEO setup

- Each page has a unique title, meta description, canonical URL, Open Graph tags, and `WebApplication` plus `FAQPage` JSON-LD.
- Each page has one H1 containing its target keyword, a how-to section, an example, an FAQ, and links to the other tools.
- `robots.txt` and `sitemap.xml` live in `public/` and are copied to the site root on build.

After deploying:

1. Add the site to **Google Search Console** and **Bing Webmaster Tools**.
2. Submit `sitemap.xml`.
3. Use URL Inspection to request indexing for the three pages.

## Deployment (Cloudflare)

Configured as a Worker serving static assets. `wrangler.jsonc` points at `dist` and serves `404.html` for unknown URLs.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | blank |

Notes:

- Keep `wrangler.jsonc` in the repository root with content. An empty file fails the deploy.
- Don't add a rewrite-everything-to-`index.html` rule. Every route already has a real HTML file, and a catch-all would serve the homepage with a 200 status for broken URLs.
- If you connect a custom domain, its DNS needs to be managed by Cloudflare. Add it under the Worker's Domains and Routes settings.

## Known limitations

- Renaming a person on the expenses page after choosing them as a payer silently reassigns that expense to the first person.
- The expenses page shows "Add an expense to see who owes whom" even when everyone is already settled.
- Expenses are always split equally. Uneven splits (by percentage, exact amount, or shares) are not supported yet.
- Results can't be shared as a link, and there is no export.
- The page does not scroll back to the top when navigating between tools.
- Pasting numbers with thousands separators (for example `1,200`) into the amount fields is not handled.
- No Privacy, Terms, About, or Contact pages yet. Add them before applying for ad networks.
- No automated tests yet. `allocate` and `settle` in `src/lib.js` are the first candidates.

## Ideas for later

- Custom percentage, exact amount, and shares modes
- Shareable result links
- Guide articles that link to each calculator
- Region-aware defaults (currency, tip presets, tax or VAT label)
