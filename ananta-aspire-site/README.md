# The Ananta Aspire Zirakpur — Lead Gen Website (v2, brochure-driven)

## What changed in this pass
- Full re-review of the 49-page official brochure (rasterized every page + extracted all embedded photos) instead of relying only on the earlier floor-plan PDFs and official website.
- Theme rebuilt to actually match the brochure's own look: onyx/charcoal background, warm gold accents, Fraunces display serif — not a generic light theme.
- Hero is now a crossfading carousel of 3 real brochure renders (resort pool at dusk, entrance gate, tower+pool view) instead of one static image.
- New **Dual Core Design** section explaining the real two-apartment-per-floor / cross-ventilation concept from the brochure, in original wording.
- New **Master Plan** section using the actual RERA-filed master plan graphic (high-res, click to view full size).
- Expanded **Gallery** to 11 real images extracted directly from the brochure (living room, bedroom, clubhouse, facade detail, entrance gate, street view, aerial, pool day/night) — all click-to-enlarge via a lightbox.
- Distance/location table corrected to match the brochure's own nearby-attractions list exactly (HLP Social Square, Radisson, Mohali City Square, etc.), replacing the earlier approximate version.
- Added scroll-reveal animations (respects reduced-motion) and a subtle geometric star mark in the header, echoing the brochure's own mandala logo motif.

## What's included
- `index.html`, `styles.css`, `script.js` — the site
- `images/` — real floor plan images + `images/gallery/` (11 brochure photos) + `images/master-plan.jpg`
- `robots.txt`, `sitemap.xml`, `manifest.json`, `browserconfig.xml`, `schema.json` — technical SEO
- `privacy-policy.html`, `terms.html`

## Before you deploy
1. Replace the placeholder favicon at `images/favicon.png` with your real logo mark.
2. Everything routes to your shared Google Apps Script endpoint with `project: "The Ananta Aspire"` — confirm your Sheet is picking it up.
3. Pricing is intentionally not shown anywhere, per your instruction.

## Deploying (GitHub Pages + Cloudflare, same as your other sites)
1. Push this folder's contents to your `theanantaaspirezirakpur.com` repo root.
2. Point Cloudflare DNS at your GitHub Pages target.
3. Enable Pages in repo settings, then submit `sitemap.xml` to Search Console once live.
