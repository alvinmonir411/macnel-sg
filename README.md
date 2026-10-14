# Renovation Contractor SG 🇸🇬

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss&style=flat-square)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Neon-PostgreSQL%20Serverless-00e599?logo=postgresql&style=flat-square)](https://neon.tech/)
[![Performance](https://img.shields.io/badge/Lighthouse-100%20SEO%20%7C%20100%20Best%20Practices-success?style=flat-square)](https://pagespeed.web.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#license)

> **Direct-to-Builder Renovation Web Platform.** Built for Singapore homeowners to connect directly with certified, in-house tilers, carpenters, and ceiling specialists — eliminating interior design middleman markups while ensuring strict HDB & BCA regulatory compliance.

---

## 🌟 Executive Summary

This production-grade web application is engineered for speed, conversions, accessibility, and high search engine visibility. It showcases authentic direct-contractor craftsmanship, transparent itemized pricing, milestone contract payment terms, and interactive lead-generation tools.

- **Production URL:** [https://renovationcontractorsg.vercel.app](https://renovationcontractorsg.vercel.app)
- **Primary Market:** Singapore (HDB BTO / Resale, Condominiums, Landed Homes, Commercial Properties)
- **Target Audience:** Singapore homeowners seeking direct contractor rates without middleman fees.

---

## 🚀 Key Features

### 1. Direct Contractor Architecture
- **8 Core Renovation Trades:** Full turnkey House Renovation, Master Tiling, Doors & Windows, False Ceiling & Partition, Painting & Plastering, Vinyl/Parquet Flooring, Toilet/Bathroom Waterproofing, and Custom Carpentry.
- **Milestone Progress Payments:** Transparent 5-stage progressive payment schedule bound by formal Singapore contract terms.
- **Written Warranty Specifications:** Clear 12-month defect liability and multi-year structural waterproofing warranty guidelines.

### 2. High-Converting Lead Generation
- **Dual Direct CTAs:** One-tap WhatsApp quotation dispatch with pre-filled enquiry text + automated booking consultation flow (`/book`).
- **Interactive Cost Calculator:** Instant renovation cost estimation by property type (3-Room, 4-Room, 5-Room HDB, Condo, Landed).
- **Service Search Spotlight:** Global keyboard shortcut (`⌘K` or `/`) modal for instant trade discovery.

### 3. Visual Portfolio & Social Proof
- **Before / After Project Sliders:** High-resolution Japandi, Scandinavian, and Modern Luxury project showcases.
- **Dynamic Customer Reviews:** Real homeowner testimonials with verified review schema markup.

### 4. Admin Management Dashboard (`/admin`)
- PIN-authenticated dashboard (`/admin`) to inspect customer booking consultations, enquiries, service toggles, and dynamic marketing scripts (GA4, GTM, Meta Pixel).

---

## ⚡ Performance & Core Web Vitals Engineering

| Metric | Target | Optimization Technique |
| :--- | :---: | :--- |
| **First Contentful Paint (FCP)** | `< 1.2s` | Zero-blocking CSS, preconnected Google Fonts (`Montserrat` & `Inter` with `display: swap`). |
| **Largest Contentful Paint (LCP)** | `< 1.5s` | Responsive WebP dual-hero imagery (`hero-modern-mobile.webp` 34KB / `hero-modern-desktop.webp` 100KB) with high fetchPriority. |
| **Total Blocking Time (TBT)** | `< 70ms` | Static sections converted to React Server Components (RSC: 0KB client JS), eliminating main-thread hydration thrashing. |
| **Cumulative Layout Shift (CLS)** | `0.00` | Explicit width/height aspect ratios on all image containers and responsive picture tags. |
| **SEO & Best Practices** | `100 / 100` | Automated Schema.org JSON-LD (`HomeAndConstructionBusiness`, `OfferCatalog`, `FAQPage`), clean canonicals, OpenGraph, dynamic sitemap, and robots.txt. |
| **Accessibility (WCAG AA/AAA)** | `> 98%` | High-contrast color tokens, descriptive screen-reader labels, and minimum 48px touch targets. |

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 16.4](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **UI Library:** [React 19.3](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with native CSS variables
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database (Serverless):** [Neon PostgreSQL](https://neon.tech/) via `@neondatabase/serverless`
- **Image Processing:** [Sharp](https://sharp.pixelplumbing.com/) (High-compression modern WebP formats)
- **Deployment & Edge CDN:** [Vercel](https://vercel.com/) Edge Network

---

## 📂 Project Architecture

```plaintext
├── data/                       # Master single-source-of-truth configuration
│   ├── siteConfig.ts           # Central business data, contact, warranty & SEO rules
│   ├── siteSettings.json       # Live editable admin settings (WhatsApp, credentials)
│   ├── pricing.json            # Indicative trade item pricing
│   ├── projects.json           # Portfolio gallery & case studies
│   ├── team.json               # Leadership, craftsmen & 6-step working protocol
│   └── warrantyTerms.json      # Milestone payment schedule & trade warranties
├── public/                     # Static assets, WebP images, vector icons & video
│   ├── hero-modern-desktop.webp# Optimized desktop hero visual (100KB)
│   ├── hero-modern-mobile.webp # Optimized mobile hero visual (34KB)
│   ├── images/                 # Organized trade galleries (tiling, carpentry, etc.)
│   └── macnel-icon.svg         # Crisp SVG brand identity
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── (trades)/           # Deep-dive trade landing pages
│   │   │   ├── house-renovation/
│   │   │   ├── tiling-works/
│   │   │   ├── carpentry-services/
│   │   │   ├── door-window-services/
│   │   │   ├── false-ceiling/
│   │   │   ├── flooring-carpet-services/
│   │   │   ├── house-painting-plastering/
│   │   │   └── toilet-renovation-in-singapore/
│   │   ├── admin/              # Secured administrative management suite
│   │   ├── api/                # Serverless endpoints (bookings, inquiries, auth)
│   │   ├── book/               # Online appointment booking interface
│   │   ├── pricing/            # Full indicative pricing guide
│   │   ├── projects/           # Dynamic case study detail pages ([id])
│   │   ├── layout.tsx          # Root layout, Schema LD+JSON & high-priority preloads
│   │   └── page.tsx            # High-conversion homepage assembly
│   ├── components/             # Reusable UI component library (RSC + Client)
│   │   ├── Header.tsx          # Responsive navigation & Quote Now CTA
│   │   ├── Hero.tsx            # Viewport-docked hero with 8 Core Trades dock
│   │   ├── CredentialsBar.tsx  # React Server Component: ACRA, HDB & BCA badges
│   │   ├── QuoteCalculator.tsx # Dynamic property estimation calculator
│   │   ├── BookingSystem.tsx   # Interactive booking calendar
│   │   └── ...
│   └── lib/                    # Shared utilities, database client & validation
├── tailwind.config.ts          # Modern design system tokens & typography
├── next.config.ts              # Turbopack, image optimization & caching rules
└── package.json                # Dependencies and deployment scripts
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js:** v18.18.0 or later (v20+ LTS recommended)
- **Package Manager:** `npm` (or `pnpm` / `yarn`)

### 1. Clone the Repository
```bash
git clone https://github.com/alvinmonir411/macnel-sg.git
cd macnel-sg
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the project root:
```env
# Optional: Neon Serverless Postgres (Required for dynamic bookings persistence)
DATABASE_URL="postgres://user:password@endpoint.neon.tech/neondb?sslmode=require"

# Optional: Next.js Public Site URL (Defaults to siteConfig fallback)
NEXT_PUBLIC_SITE_URL="https://renovationcontractorsg.vercel.app"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Validation
```bash
# Type-check and create optimized static/SSR build
npm run build

# Start local production server
npm run start
```

---

## 🔐 Admin Dashboard & Operations

1. Navigate to `/admin` in your browser.
2. Enter the secure administrative PIN (configured in `data/siteSettings.json`).
3. Manage incoming customer site-inspection requests and WhatsApp lead records.
4. Toggle marketing scripts (Google Tag Manager, Google Analytics 4, Meta Pixel, TikTok Pixel) without redeploying code.

---

## 🚢 Deployment

The repository is configured for zero-configuration continuous deployment with **Vercel**:

1. Push your changes to the `master` branch:
   ```bash
   git add -A
   git commit -m "Your descriptive commit message"
   git push origin master
   ```
2. Vercel automatically detects the Next.js Turbopack build, generates all static routes, caches serverless functions, and redeploys the Edge CDN in under 60 seconds.

---

## 📄 License & Compliance

- **PDPA Compliance:** All contact forms strictly comply with the Singapore Personal Data Protection Act (PDPA). Customer phone numbers and project scopes are processed exclusively for legitimate quote generation.
- **Copyright:** &copy; 2026 Renovation Contractor SG. All rights reserved.
