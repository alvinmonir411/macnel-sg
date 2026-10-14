# 🇸🇬 CLIENT DATA SETUP CHECKLIST (`TODO_CLIENT_DATA.md`)

This website is engineered according to the **Golden Rule: Never Invent Facts**. All placeholders requiring real business data are clearly marked with `"TODO_REPLACE"` and centralized in configuration and data files.

Use this checklist to replace all placeholder data with your official business information.

---

## 📁 1. Master Business Configuration: `data/siteConfig.ts`

| Item | Field Name | Description | Current Placeholder |
|---|---|---|---|
| **[ ] Legal Entity Name** | `legalName` | Official registered ACRA company name | `TODO_REPLACE: Registered Company Pte. Ltd.` |
| **[ ] ACRA UEN** | `uen` | Unique Entity Number (9-10 chars, e.g. `202312345A`) | `TODO_REPLACE: 202312345A` |
| **[ ] HDB Directory License** | `hdbLicense` | HDB Registered Renovation Contractor Directory No. (or leave `""`) | `TODO_REPLACE: HDB Registered Contractor No. HB-00-0000X` |
| **[ ] BCA Registry License** | `bcaLicense` | BCA Registered Contractor / Builder License (or leave `""`) | `TODO_REPLACE: BCA Registered Contractor (CR06 / General Builder)` |
| **[ ] Years in Business** | `yearsInBusiness` | Years operating in Singapore (e.g. `"12"`) | `TODO_REPLACE: 12` |
| **[ ] Work Injury Compensation** | `insurance.workInjuryCompensation` | Insurer name & Policy Number | `TODO_REPLACE: Insured with NTUC Income (Policy #WIC-XXXXX)` |
| **[ ] Public Liability Insurance** | `insurance.publicLiability` | Coverage amount & Policy Number | `TODO_REPLACE: S$1,000,000 Public Liability Coverage (Policy #PL-XXXXX)` |
| **[ ] Office / Showroom Address** | `contact.address` | Registered office or showroom address | `TODO_REPLACE: 101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511` |
| **[ ] Showroom Notice** | `contact.showroomNote` | Showroom visit instructions | `TODO_REPLACE: Showroom visits and material consultations available by appointment` |
| **[ ] Google Maps Embed** | `contact.googleMapsEmbedUrl` | Google Maps `iframe` `src` URL for your address | Embed URL for Jalan Besar Plaza |
| **[ ] Response Time** | `contact.quoteTurnaroundHours` | Number of hours to reply to quotes (e.g. `2` or `24`) | `2` |
| **[ ] Google Reviews URL** | `reviews.googleReviewsUrl` | Verified Google Business Review link (leave `""` until verified) | `""` *(Rating badge stays hidden until real URL is provided)* |
| **[ ] Google Rating & Count** | `reviews.rating` & `reviews.reviewCount` | Real Google rating score (e.g. `4.9`) and count (e.g. `120`) | `null` |
| **[ ] Google Business Profile** | `socials.googleBusiness` | Direct Google Business link | `TODO_REPLACE: https://g.page/r/your-google-business-id` |
| **[ ] Facebook Page** | `socials.facebook` | Official Facebook URL | `TODO_REPLACE: https://facebook.com/your-business-page` |
| **[ ] Instagram Page** | `socials.instagram` | Official Instagram URL | `TODO_REPLACE: https://instagram.com/your-business-profile` |
| **[ ] Verified Awards** | `awards` | Array of strings for verified awards (leave `[]` if none) | `[]` |
| **[ ] Warranty Duration** | `claims.warrantyDuration` | Written workmanship warranty claim | `TODO_REPLACE: 12-Month Structural Workmanship Warranty` |

---

## 📁 2. Customer Reviews: `data/reviews.json`

| Item | Description | Action Required |
|---|---|---|
| **[ ] Real Reviews Flag** | `"isRealData": false` | Change to `true` **only** after replacing sample reviews with real customer testimonials. When `false`, a dev banner is displayed. |
| **[ ] Review 1** | Customer Name, Property Type/Area, Rating, Date, Review Text | Replace `TODO_REPLACE` in `reviews[0]` |
| **[ ] Review 2** | Customer Name, Property Type/Area, Rating, Date, Review Text | Replace `TODO_REPLACE` in `reviews[1]` |
| **[ ] Review 3** | Customer Name, Property Type/Area, Rating, Date, Review Text | Replace `TODO_REPLACE` in `reviews[2]` |

---

## 📁 3. Portfolio Projects: `data/projects.json`

| Item | Description | Action Required |
|---|---|---|
| **[ ] Project 1** | 4-Room BTO Full Makeover | Replace title, size, cost range, scope, duration, and photos |
| **[ ] Project 2** | Toilet & Kitchen Tiling Overhaul | Replace title, size, cost range, scope, duration, and photos |
| **[ ] Project 3** | Private Condominium Refresh | Replace title, size, cost range, scope, duration, and photos |
| **[ ] Real Photos** | Drop real before/after JPEG or WebP photos into `/public/images/projects/` | Name files e.g. `proj-1-before.jpg`, `proj-1-after.jpg` (or the `<ProjectImage>` component will show neutral placeholders) |

---

## 📁 4. Transparent Pricing Guide: `data/pricing.json`

| Item | Category | Action Required |
|---|---|---|
| **[ ] Toilet Renovation Ranges** | 1 Toilet overlay, Full hacking, 2 Toilets | Replace indicative price ranges and timelines in `pricing.json` |
| **[ ] Whole House Renovation** | 3-Room, 4-Room, 5-Room HDB, Condo | Replace indicative price ranges and timelines in `pricing.json` |
| **[ ] Tiling & Flooring** | Tile laying per sqft, SPC vinyl, Parquet | Replace indicative rates per sqft in `pricing.json` |
| **[ ] Ceiling, Paint & Carpentry** | False ceiling per sqft, Full house paint, Kitchen cabinet per foot run | Replace indicative rates in `pricing.json` |

---

## 📁 5. Team Leadership & Story: `data/team.json`

| Item | Description | Action Required |
|---|---|---|
| **[ ] Company Story** | Founding background & philosophy | Replace `companyStory` with your true company founding story |
| **[ ] Managing Director / Founder** | Name, role, years of experience, bio | Replace `members[0]` in `team.json` |
| **[ ] Senior Tiler / Masonry Lead** | Name, role, years of experience, bio | Replace `members[1]` in `team.json` |
| **[ ] Carpentry Director** | Name, role, years of experience, bio | Replace `members[2]` in `team.json` |
| **[ ] Leadership Photos** | Place profile photos in `/public/images/team/` | Update `photo` paths in `team.json` (or `<ProjectImage>` will show fallback) |

---

## 📁 6. Warranty & Payment Terms: `data/warrantyTerms.json`

| Item | Trade | Action Required |
|---|---|---|
| **[ ] Waterproofing Warranty** | Duration & coverage details | Replace `duration` (e.g. `5-Year Leak-Proof Warranty`) |
| **[ ] Tiling Warranty** | Duration & coverage details | Replace `duration` (e.g. `12-Month Workmanship Warranty`) |
| **[ ] Carpentry Warranty** | Duration & coverage details | Replace `duration` (e.g. `12-Month Workmanship Warranty`) |
| **[ ] Electrical & Plumbing** | Duration & coverage details | Replace `duration` (e.g. `6-Month Workmanship Warranty`) |
| **[ ] Milestone Payment Schedule** | Percentage breakdown across 5 milestones | Verify milestone percentages (10%, 40%, 30%, 15%, 5%) match your standard contract |
| **[ ] Sample Quotation PDF** | Replace sample PDF file | Upload your actual anonymized sample quotation PDF to `/public/docs/sample-quotation.pdf` |

---

## 📁 7. Legal Compliance: `src/app/privacy-policy/` & `src/app/terms/`

| Item | File | Action Required |
|---|---|---|
| **[ ] Privacy Policy Review** | `src/app/privacy-policy/page.tsx` | Have legal counsel review the Singapore PDPA terms, then remove the `TODO_REPLACE: review with lawyer` notice |
| **[ ] Terms of Service Review** | `src/app/terms/page.tsx` | Have legal counsel review the contractor terms of service, then remove the `TODO_REPLACE: review with lawyer` notice |
