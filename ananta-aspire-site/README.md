# The Ananta Aspire Zirakpur — Lead Gen Website (production build)

## What changed in this pass (post-audit fixes)
- **Fixed a real bug:** the Master Plan section was showing a living room photo instead of the actual master plan graphic (left over from an earlier image swap). Restored the correct master plan image there, and put the living room photo back in the Gallery.
- **Replaced the Tailwind Play CDN with a compiled production stylesheet** (`tailwind.css`, ~20KB, built via the Tailwind CLI from the site's actual markup). This was the single biggest Core Web Vitals issue flagged in the audit — the Play CDN ships a full JIT compiler to the browser and Tailwind's own docs say it isn't for production. No visual changes, just faster.
- Added keyword-rich alt text across gallery and floor plan images (now include "The Ananta Aspire Zirakpur" + what's shown).
- Added "Zirakpur" to the H1.
- Added Review structured data (schema.org) for the 4 testimonials, and a BreadcrumbList schema.
- Added a small "last updated" line in the footer for freshness.

## Still worth doing (from the audit, needs your input — not done here)
- A Google Business Profile for your channel-partner business — the single highest-leverage local SEO action available, bigger than anything on this page.
- A short "About the advisory" trust section — who's behind this site, track record. I didn't add placeholder/invented content here; this needs real details from you.
- Re-adding a visible phone number (even just as text) for NAP consistency — currently removed per your instruction; flagging the trade-off again since it's a real local-SEO signal, but not reversing it without your confirmation.

## What's included
- `index.html`, `styles.css`, `script.js`, `tailwind.css` (compiled) — the site
- `images/` — real floor plan images, `images/gallery/` (11 brochure photos), `images/master-plan.jpg`, `images/location-map.jpg`
- `robots.txt`, `sitemap.xml`, `manifest.json`, `browserconfig.xml`, `schema.json` — technical SEO
- `privacy-policy.html`, `terms.html`

## Before you deploy
1. Confirm the lead endpoint (Google Apps Script) with a real test submission.
2. Consider the Google Business Profile + About-us items above — they'll do more for rankings than further on-page tweaks.
3. If you ever add new sections/classes to the HTML, the compiled `tailwind.css` won't automatically include new utility classes — you'd need to rebuild it (or ask me to).

## Deploying (GitHub Pages + Cloudflare, same as your other sites)
1. Push this folder's contents to your `theanantaaspirezirakpur.com` repo root.
2. Point Cloudflare DNS at your GitHub Pages target.
3. Enable Pages in repo settings, then submit `sitemap.xml` to Search Console once live.
