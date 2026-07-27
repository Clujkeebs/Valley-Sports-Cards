# The Valley Sports Cards & Collectibles

Production-ready marketing + storefront site for **The Valley Sports Cards &
Collectibles**, a family-run card shop with two locations in New York's
Mohawk Valley: **Herkimer** and **Cooperstown**.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (+ `@tailwindcss/typography`)
- **lucide-react** for icons
- No client-side framework beyond what Next.js ships; no API keys, no database

## Pages

| Route     | Description                                                                 |
| --------- | ---------------------------------------------------------------------------- |
| `/`       | Hero with the shop's logo, tagline, and both store locations with hours    |
| `/about`  | The shop's story — ownership, history, and both locations                  |

Every "Shop" link (header nav, hero button, homepage call-to-action, social
icons) points straight at the shop's eBay store,
[ebay.com/str/lyonman24collectables](https://www.ebay.com/str/lyonman24collectables),
opened in a new tab. The URL lives in `business.ebayStoreUrl` in `lib/data.ts`
— change it there and every link follows.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deployment (Vercel or Netlify)

This app has zero special build requirements and no environment variables —
it's a standard static-friendly Next.js app.

**Vercel**
1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Deploy — the default build command (`next build`) and output are used
   as-is.

**Netlify**
1. Import the repo, framework preset "Next.js".
2. Deploy with the default `next build` command (Netlify's Next.js runtime
   handles the rest).

## Content & Image Sourcing

- **Logo**: extracted directly from the storefront business card photo
  provided for this project (background removed, cropped, and exported as
  transparent PNG — see `public/images/valley-sports-cards-logo.png`).
- **Business facts** (both addresses, phone, email, hours, founding year,
  ownership, eBay handle) were verified via public sources: the Herkimer
  County Chamber of Commerce directory, Facebook business pages for both
  locations (Herkimer & Cooperstown), the shop's Instagram
  (`@valleysportscards`), and the shop's eBay store listing.
- **About page copy** was written from those verified facts — it is not
  copied verbatim from any single source, since this build environment's
  network access could not reach Facebook/Instagram/eBay directly to pull
  raw bio text (outbound requests to those hosts are blocked by this
  session's egress policy). Please compare the About page against the
  shop's own Facebook "About" text and adjust wording/quotes if you'd like
  it to match verbatim.
- **Photos**: per the project's "real photos only, no AI-generated images"
  requirement, and because this build environment could not fetch images
  from Facebook, Instagram, or Google Images (network access to those hosts
  is blocked here), **no interior/product photography is included**. The
  homepage and About page intentionally use the extracted logo plus a
  subtle CSS pattern instead of placeholder or stock photos. Drop real
  photos into `public/images/` and reference them with `next/image` in
  `app/page.tsx` / `app/about/page.tsx` whenever you have them exported
  from the shop's own camera roll or social accounts — the layout is built
  to accept them.
- **Social links** verified as real, existing accounts:
  - Facebook (Herkimer): https://www.facebook.com/p/The-Valley-Sports-Cards-Collectibles-100057453068756/
  - Facebook (Cooperstown): https://www.facebook.com/p/Valley-Sports-Cards-Collectibles-Cooperstown-61558990273481/
  - Instagram: https://www.instagram.com/valleysportscards/
  - eBay Store: https://www.ebay.com/str/lyonman24collectables
  - No Twitter/X, YouTube, or TikTok accounts were found for this business;
    none are linked to avoid guessing or linking to unrelated accounts.

## QA Performed

- `npm run lint` — clean, no errors
- `npm run build` — clean production build (both routes prerendered as static)
- Manual browser check (desktop and mobile viewports): logo and favicon
  assets load, layout is centered, Shop links open the eBay store

## Project Structure

```
app/
  layout.tsx        Root layout, header/footer, metadata
  page.tsx           Homepage
  about/page.tsx     About page
  globals.css
components/
  Header.tsx
  Footer.tsx
  SocialIcons.tsx
lib/
  data.ts            Real business data (locations, hours, socials, eBay URL)
public/
  images/            Extracted logo + favicon assets
```
