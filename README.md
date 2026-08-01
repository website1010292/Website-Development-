# MobileFix Pro — Website

A premium, animated multi-page website for a business offering three services:

- **Mobile Technician** — phone/tablet repair (screens, batteries, water damage, etc.)
- **Website Developing** — business sites, online stores, custom web apps
- **AI Content Creator** — social media, blogs, ad creatives, content calendars

All prices are shown in **PKR**. WhatsApp contact number used throughout: **0314 0303073** (`https://wa.me/923140303073`).

## File structure

```
index.html          Home page — hero, service teasers, sample pricing, testimonials
about.html           About the team, process timeline
services.html        Detailed service info, each service has its own #anchor section
products.html         Full PKR rate list (repairs, web packages, AI content plans)
contact.html          Contact form + WhatsApp deep link + visitor comment section
privacy.html          Privacy policy
terms.html            Terms & conditions
404.html               Custom "page not found" screen (never a browser default 404)

style.css            Core layout & components
responsive.css       Mobile/tablet breakpoints
animation.css        3D tilt, flip cards, reveal-on-scroll, keyframes
colors.css           Brand color variables (derived from the logo)

script.js            Preloader, scroll reveal, tilt cards, FAQ accordion, pricing tabs
menu.js              Mobile burger menu + dropdown "mega menus" for Services / Rate List
slider.js            Generic lightweight carousel (used for testimonials if expanded)
contact.js           Contact form → WhatsApp handoff, newsletter form, comment system

logo.png             Brand logo (used as favicon source, header, footer, and trademark)
hero.jpg / shop.jpg  Generated abstract brand-toned banner art (placeholders — swap for
                     real photography of your workshop/technicians when available)
favicon.ico          Multi-size favicon generated from logo.png

robots.txt           Search engine crawl rules
sitemap.xml          XML sitemap of all pages
manifest.json        Basic web-app manifest (installable icon/theme)
```

## Notes on features

- **Navigation**: "Services" and "Rate List" each open a separate dropdown mega-menu
  linking directly to each service's own section — no dead links, no 404s from any
  menu item.
- **3D animations**: service cards flip in 3D on click/tap, pricing cards & the hero
  device mockups tilt/float, dropdown menus animate open, and scroll sections fade/slide
  into view.
- **Comments**: the contact page includes a comment + star-rating form. Comments are
  currently stored in the visitor's own browser (`localStorage`) so the site works with
  **no backend required**. To collect comments centrally for moderation, connect the
  `commentForm` submit handler in `contact.js` to your own API, spreadsheet, or a service
  like Formspree.
- **WhatsApp**: every "Book" / "Quote" / floating chat button links to
  `https://wa.me/923140303073`, and the contact form auto-opens WhatsApp pre-filled with
  the visitor's details.
- **Images**: `hero.jpg` and `shop.jpg` are generated abstract circuit/gradient art in the
  brand's navy-and-blue palette so the site works instantly with zero copyright risk.
  Replace them with real photos of your workshop, technicians, and team for the most
  authentic result.

## Before going live

1. Replace `hero.jpg` / `shop.jpg` with real photography if available.
2. Update the WhatsApp number, email, and working hours if they change.
3. Point `privacy.html` / `terms.html` domain references and `sitemap.xml` /
   `robots.txt` at your real domain.
4. If you want comments visible to every visitor (not just stored per-browser), wire
   `contact.js` to a real backend.
5. Upload all files to your web host, keeping the flat file structure as-is (all pages
   and assets reference each other with relative paths).
