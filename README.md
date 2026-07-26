# The Valley Sports Cards & Collectibles

Production-ready marketing + storefront site for **The Valley Sports Cards &
Collectibles**, a family-run card shop with two locations in New York's
Mohawk Valley: **Herkimer** and **Cooperstown**.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (+ `@tailwindcss/typography`)
- **lucide-react** for icons
- eBay **Browse API** for live shop listings, via a server-side integration
  with ISR (`revalidate: 3600`)
- No client-side framework beyond what Next.js ships; no database required

## Pages

| Route     | Description                                                                 |
| --------- | ---------------------------------------------------------------------------- |
| `/`       | Hero with the shop's logo, tagline, and both store locations with hours    |
| `/about`  | The shop's story — ownership, history, and both locations                  |
| `/shop`   | Live eBay inventory with sort (price, newest, ending soonest) and filters (category, condition, price range) |

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

The Shop page pulls live listings from eBay's **Browse API** using a
client-credentials OAuth grant. Without these two variables set, the Shop
page gracefully falls back to a "Shop on eBay" call-to-action instead of
failing the build or the page render.

Create a `.env.local` file (never commit this):

```bash
EBAY_CLIENT_ID=your-ebay-app-client-id
EBAY_CLIENT_SECRET=your-ebay-app-client-secret
```

### How to get eBay API credentials

1. Register/sign in at the [eBay Developers Program](https://developer.ebay.com/).
2. Create a **Production** keyset for an application.
3. Copy the **App ID (Client ID)** and **Cert ID (Client Secret)** into the
   env vars above.
4. No user OAuth or redirect URIs are required — the Browse API search used
   here only needs the `client_credentials` (application) grant, which is
   handled automatically in `lib/ebay.ts`.
5. The integration is hard-wired to the shop's real eBay store username,
   `lyonman24collectables` (store: [ebay.com/str/lyonman24collectables](https://www.ebay.com/str/lyonman24collectables)),
   via the `sellers:{...}` filter — no further configuration needed.

The Browse API's own `sort` and `filter` parameters power the Low→High /
High→Low / Newest / Ending Soonest sorting and the condition/price-range
filtering, so behavior matches eBay's own search semantics. Category
filtering uses the category buttons as a keyword search scoped to the
seller's store (Browse API doesn't expose arbitrary category browsing for a
single seller without hard-coded eBay category IDs).

## Deployment (Vercel or Netlify)

This app has zero special build requirements — it's a standard Next.js app.

**Vercel**
1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add `EBAY_CLIENT_ID` and `EBAY_CLIENT_SECRET` under Project Settings →
   Environment Variables.
3. Deploy — the default build command (`next build`) and output are used
   as-is.

**Netlify**
1. Import the repo, framework preset "Next.js".
2. Add the same two environment variables under Site Settings →
   Environment Variables.
3. Deploy with the default `next build` command (Netlify's Next.js runtime
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
- `npm run build` — clean production build (all routes compile; `/shop` is
  server-rendered per-request due to `searchParams`-based filtering, with
  the underlying eBay fetch cached via ISR for up to an hour)
- Manual browser check (desktop 1440px and mobile 390px viewports) via
  Playwright/Chromium: zero console errors on Home, About, and Shop
- Shop page verified in both of its states: the "not configured" fallback
  (no API keys set) and the empty-results state; live-listing rendering
  itself could not be exercised end-to-end in this sandbox because outbound
  requests to `api.ebay.com` are blocked by this session's network policy —
  test it against your real eBay credentials in a normal deploy before
  relying on it.

## Project Structure

```
app/
  layout.tsx        Root layout, header/footer, metadata
  page.tsx           Homepage
  about/page.tsx     About page
  shop/page.tsx      Shop page (server component, reads searchParams)
  globals.css
components/
  Header.tsx
  Footer.tsx
  SocialIcons.tsx
  shop/
    ShopFilters.tsx  Client component driving sort/filter URL state
    ListingCard.tsx
    EbayFallback.tsx
lib/
  data.ts            Real business data (locations, hours, socials)
  ebay.ts            eBay Browse API client (OAuth + search)
public/
  images/            Extracted logo + favicon assets
```
