# Brical Group — final design review (v4)

Systems built to measure. Data built to matter.

A static, 16-page website for Brical Group. The continuous BG monogram, restrained
monochrome/blue palette, and Capture / Understand / Improve interaction define this
release. Existing service, reporting, field-operations, and insight pages are retained.

## Important status

This package does not change GitHub, Cloudflare, Porkbun, DNS, or the live website.
It is the final design candidate for review, not evidence of a completed deployment.

## Preview the complete site before publishing

Open `OPEN-PREVIEW.html` from the outer review package in a browser with JavaScript
enabled. The preview is one self-contained HTML file. All 16 pages, styles, scripts,
and logo assets are embedded. Navigation, report tabs, and the inquiry draft builder
work locally without a server. The small private-preview toolbar is NOT on the
production site. Its simulated local routing is only a review convenience.

For a conventional local source preview, open a terminal in this directory and run:

    python -m http.server 8000

Then visit `http://localhost:8000` in a browser. Do not use this development server
as public hosting. A basic Python server does not reproduce Cloudflare response
headers, redirects, or managed HTTPS behavior.

## Deployment — only after approval

1. Download/back up the current GitHub repository.
2. Replace the repository-root website files with the CONTENTS of `website/` from
   the review package. Do not upload the ZIP, preview HTML, or review reports.
3. Do not nest the `website` folder inside the repository. Keep `index.html`,
   `_headers`, `_redirects`, `assets`, and the page directories at the root.
4. Keep the existing Cloudflare Pages project and current custom-domain setup.
   No new DNS, nameserver, SSL, DNSSEC, or www/preview-domain rules are required.
5. Keep the existing static build settings: framework None, build `exit 0`, output `.`.
6. Wait for a successful deployment, then review the real HTTPS site, navigation,
   headers, contact workflow, and canonical redirects before sharing it with prospects.

A push to your production branch may publish automatically. A nonproduction preview
can also be redirected by an existing account-level pages.dev Bulk Redirect that
includes subdomains. The self-contained review file avoids those dependencies.

## Files to edit

- `index.html`: homepage content and workflow demonstration.
- `assets/css/site.v4.css`: responsive layout, shared type, and visual system.
- `assets/js/site.v4.js`: menu, keyboard tabs, inquiry-draft enhancement.
- `assets/brand/monogram-*-v4.svg`: continuous BG vector mark, no crossing overlay.
- `assets/brand/wordmark-*.png`: the supplied BriCal Group wordmark, retained as raster.
- `assets/brand/social-card-v4.jpg`: 1200 x 630 sharing image.
- `assets/sample-lead-summary.csv`: fictional sample data behind the reporting demo.
- `sitemap.xml`, `robots.txt`, `site.webmanifest`: discovery and browser metadata.
- `_headers`: static Pages security, caching, and preview-indexing rules.
- `_redirects`: a few legacy path aliases; domain redirects remain dashboard settings.

Versioned filenames prevent the old monogram and previous CSS being mistaken for
the new design in caches. For future asset changes under a fixed filename, review
its cache behavior before release.

## Service delivery boundaries

Confirm that hello@bricalgroup.com receives mail before customer outreach. The
contact page PREPARES AN EMAIL DRAFT or lets a visitor copy an inquiry. It does not
submit to a backend, send email itself, or claim a successful delivery. A future
server-submitting form needs a separately configured service or backend.

No analytics tracker, CRM, public phone number, credentials, or client records are
included. Review privacy copy against actual operations and any future integrations.
The CSP must be reviewed when adding a form endpoint, analytics, embeds, or remote
scripts. Do not paste credentials into the HTML or repository.

Synthetic example: 48 inquiries, 31 qualified leads (including booked), 17 bookings.
Referrals: 10 inquiries / 5 bookings. Paid search: 12 inquiries / 2 bookings.
These are not client results, a live dashboard, or an available proprietary app.

## Search foundation

The release preserves unique page titles/descriptions, canonical URLs at
https://bricalgroup.com, 15 sitemap URLs, semantic page structure, local context,
internal links, structured data, and a noindex 404. No ranking, traffic, or revenue
outcome is promised. Structured data does not assert fake reviews or credentials.

## Accessibility and validation

Production navigation and primary content remain usable without JavaScript.
The enhanced tabs are keyboard-operable. Menus handle focus and Escape. Short
motion respects the operating system's reduced-motion preference.

See QUALITY-CHECKS.json in the outer package for the completed checks and limits.
The checks are local Chromium rendering, not a cross-browser certification,
independent security audit, screen-reader audit, live delivery test, or measured
field Core Web Vitals result.

## Rights and privacy

This repository is not offered under an open-source license. Existing applicable
rights to supplied and third-party materials remain with their respective holders.
The BG vector is a refinement of the supplied identity, not an imitation of a
reference company's logo. The wordmark is still raster, not falsely labeled vector.
No font files, personal phone number, residential address, tracking IDs, or API keys
are included. System font fallbacks require no font service account or download.
