# 🏛️ Master Services & SEO Architecture Plan

> **Official Business Domain:** `https://renovationcontractorsg.org`  
> **Brand Name:** Renovation Contractor SG (Singapore)  
> **Status:** Active & Mandatory Directive — All current and future development MUST follow this architecture at all times.

---

## 🎯 1. Core Service Pillars & Targeted Keyword Matrix

This table defines the 6 core pillars, their respective URL route paths, target primary and LSI search keywords, and search intent:

| Service Category | Official URL Route | Primary Keywords | Secondary & Long-Tail Search Queries |
| :--- | :--- | :--- | :--- |
| **1. Tiling Services** | `/tiling-works` | `tiling services`, `tile floor installers near me`, `tile installation services` | `bathroom tilers near me`<br>`floor tilers near me`<br>`tile replacement`<br>`professional tile installers`<br>`tile installation companies near me`<br>`floor tile contractors near me`<br>`floor tile replacement`<br>`commercial tile installation`<br>`tile installation company`<br>`tile repair contractors near me` |
| **2. Door & Window** | `/door-window-services` | `door & window replacement`, `window and door replacement` | `door and window repair`<br>`window and door replacement near me`<br>`replacement front door`<br>`window and door repair near me` |
| **3. False & Partition** | `/false-ceiling-partition` | `partition contractor singapore`, `false ceiling contractor singapore` | `false ceiling contractor`<br>`partition for living room`<br>`false ceiling designer near me`<br>`false ceiling for living room`<br>`false ceiling services near me` |
| **4. Painting Services** (Painting & Plastering) | `/house-painting-plastering` | `painting services sg`, `paint service singapore`, `plastering services` | `nippon painting service singapore`<br>`room painting services singapore`<br>`house painting services`<br>`home painting services near me`<br>`professional house painters`<br>`house painting services singapore`<br>`plaster wall repair`<br>`plaster ceiling repair`<br>`professional plastering services`<br>`plaster house maintenance`<br>`complete plastering services`<br>`plastering services sg` |
| **5. House Renovation** | `/house-renovation` | `house renovation`, `house renovation contractor`, `home renovation` | `home renovation company`<br>`house renovation services`<br>`house renovation companies`<br>`home renovation services`<br>`whole house renovation`<br>`best home renovation companies`<br>`best contractor for home renovation`<br>`new home renovation` |
| **6. Flooring & Carpet Services** | `/flooring-carpet-services` | `flooring carpet`, `flooring services`, `carpet installation` | `carpet replacement`<br>`hardwood floor refinishing`<br>`wood floor refinishing`<br>`hardwood floor installation`<br>`best carpet installers near me`<br>`wood flooring installation`<br>`flooring installation contractors`<br>`commercial carpet installation`<br>`commercial flooring contractors`<br>`floor polishing service` |

---

## 🏗️ 2. Signature & Specialized Trade Extensions

In addition to the 6 primary categories, the architecture maintains dedicated high-converting landing pages for Singapore's most requested direct trade works:

| Specialized Service | Dedicated URL Route | Role & Key Focal Areas |
| :--- | :--- | :--- |
| **Toilet Renovation** | `/toilet-renovation-in-singapore` | **Signature Hero Service:** 6-stage hacking, certified waterproofing membrane, 48hr water ponding test, anti-slip tiling, plumbing & sanitary fittings. |
| **Custom Carpentry** | `/carpentry-services` | Kitchen cabinets, wardrobes, TV consoles, quartz/solid surface countertops with millimeter precision. |
| **Electrical Works & Rewiring** | `/electrical-works-rewiring` | EMA-licensed electricians, DB box upgrade, concealed conduit rewiring, LED cove lighting. |
| **Booking & Site Inspection Engine** | `/book` | 4-step live scheduling engine (Trade $\rightarrow$ Property $\rightarrow$ 14-Day Calendar $\rightarrow$ WhatsApp & `.ics` Calendar sync). |
| **Complete Directory** | `/services` | Central directory covering all 18 in-house trades without third-party middlemen. |

---

## 🌐 3. Domain & Technical SEO Protocols

1. **Canonical Domain Base:**  
   Every page, sitemap link, OpenGraph tag, and canonical link MUST use `https://renovationcontractorsg.org`.
2. **Metadata Rule:**  
   - **Title Tag Format:** `<Service Name> | Renovation Contractor Singapore`
   - **Meta Description:** Must feature primary keyword in the first 80 characters, mention in-house craftsmen, transparent quotes, and target Singapore residential/commercial properties.
   - **OpenGraph & Twitter Card:** Pre-configured with Singapore geotags (`en_SG`, `latitude: 1.3521`, `longitude: 103.8198`).
3. **Structured Data (Schema.org):**  
   - `HomeAndConstructionBusiness` schema injected sitewide on root layout.
   - `Service` and `OfferCatalog` schema linked to all core service categories.
   - `FAQPage` schema on the home and FAQ sections.
4. **Performance & Vitals Guarantee:**  
   - Next.js 16 Static Site Generation (SSG) for sub-second page loads.
   - Native lazy loading on all media assets.
   - Fully optimized for Google Core Web Vitals (LCP < 1.2s, CLS = 0, FID < 50ms).

---

## 📱 4. Conversion & User Action Blueprint

- **Free Quote CTA:** All quotation buttons route directly to WhatsApp (`+65 8936 1834`) with pre-filled, service-specific text prompts.
- **Book Now CTA:** Direct link to the world-class interactive scheduler at `/book`.
- **Phone Calls:** Click-to-call links targeting primary hotlines: `+65 8936 1834` / `+65 9120 7650`.
- **Zero Hidden Costs:** Direct in-house contractor rates with no agent or interior design (ID) markup fees.

---

## 📌 5. Compliance & Maintenance Instruction

- Whenever adding new sections, blog posts, or service landing pages, the developer and AI agents **MUST consult this file first** to ensure exact keyword matching, routing consistency, and schema integrity.
- Never change the base domain from `https://renovationcontractorsg.org` without an explicit user instruction.
