import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getSettings, saveSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// Initialize Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k",
  api_key: process.env.CLOUDINARY_API_KEY || "875271365121148",
  api_secret: process.env.CLOUDINARY_API_SECRET || "iK1IexEaZEoKT_UFPr0Rlrc6QFs",
  secure: true,
});

// Defined image slots across website
export const DEFAULT_IMAGE_SLOTS = [
  // ==========================================
  // 1. HOMEPAGE & BRAND ASSETS
  // ==========================================
  {
    id: "hero_desktop",
    category: "hero",
    pagePath: "/",
    pageTitle: "Homepage",
    sectionName: "Hero Banner (Desktop)",
    label: "Homepage Desktop Hero Banner",
    description: "Main full-width desktop background banner on homepage",
    paths: ["/hero-modern-desktop.webp", "/hero-poster.webp"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/roepaxqzy8zxviqaydjp.webp",
  },
  {
    id: "hero_mobile",
    category: "hero",
    pagePath: "/",
    pageTitle: "Homepage",
    sectionName: "Hero Banner (Mobile)",
    label: "Homepage Mobile Hero Banner",
    description: "Mobile-optimized header visual for smartphone screens",
    paths: ["/hero-modern-mobile.webp", "/hero-poster-mobile.webp"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/bzajapadazjq33qpohdw.webp",
  },
  {
    id: "hero_video",
    category: "hero",
    pagePath: "/",
    pageTitle: "Homepage",
    sectionName: "Hero Background Video",
    label: "Homepage Background Video (.mp4)",
    description: "Ambient background video loop on desktop (MP4 format)",
    paths: ["/hero-video.mp4"],
    defaultUrl: "/hero-video.mp4",
  },
  {
    id: "brand_logo",
    category: "hero",
    pagePath: "/",
    pageTitle: "Global Navbar & Footer",
    sectionName: "Brand Logo",
    label: "Site Brand Logo / Icon",
    description: "Shown in Navbar header and Footer across all pages",
    paths: ["/macnel-icon.svg"],
    defaultUrl: "/macnel-icon.svg",
  },

  // ==========================================
  // 2. ABOUT US & TEAM
  // ==========================================
  {
    id: "owner_photo",
    category: "team",
    pagePath: "/about-us",
    pageTitle: "About Us & Team",
    sectionName: "Founder & Managing Director",
    label: "Founder & MD On-Site Photo",
    description: "Shown on About Us & Credentials sections as the lead site supervisor",
    paths: ["/images/team/owner.jpg", "/images/owner.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793201127/renovation-contractor-sg/dashboard-uploads/sgnfnlcqlqgwgraromnp.jpg",
  },

  // ==========================================
  // 2B. 🛠️ CORE SERVICES DIRECTORY CARDS (Homepage & /services)
  // ==========================================
  {
    id: "service_house_renovation",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 01 · House Renovation",
    label: "House Renovation Card Photo",
    description: "Featured visual on the Core Services card on homepage & /services",
    paths: ["/images/services/house-renovation.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793289125/renovation-contractor-sg/dashboard-uploads/f0ozp82bcj8s6fex6c1b.jpg",
  },
  {
    id: "service_tiling",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 02 · Tiling Services",
    label: "Tiling Services Card Photo",
    description: "Featured visual on the Tiling Services card on homepage & /services",
    paths: ["/images/services/tiling-services.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },
  {
    id: "service_door_window",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 03 · Doors & Windows",
    label: "Door & Window Services Card Photo",
    description: "Featured visual on the Doors & Windows card on homepage & /services",
    paths: ["/images/services/door-window.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/door-window/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "service_ceiling_partition",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 04 · False Ceiling",
    label: "False Ceiling & Partition Card Photo",
    description: "Featured visual on the False Ceiling & Partition card on homepage & /services",
    paths: ["/images/services/false-ceiling.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "service_painting",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 05 · Painting Services",
    label: "Painting Services Card Photo",
    description: "Featured visual on the Painting Services card on homepage & /services",
    paths: ["/images/services/painting-services.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "service_plastering",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 06 · Plastering Services",
    label: "Plastering Services Card Photo",
    description: "Featured visual on the Plastering Services card on homepage & /services",
    paths: ["/images/services/plastering-services.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "service_flooring_carpet",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 07 · Flooring & Carpet",
    label: "Flooring & Carpet Card Photo",
    description: "Featured visual on the Flooring & Carpet card on homepage & /services",
    paths: ["/images/services/flooring-carpet.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  {
    id: "service_toilet_renovation",
    category: "services",
    pagePath: "/#services",
    pageTitle: "Core Services Cards",
    sectionName: "Service Card 08 · Toilet Renovation",
    label: "Toilet Renovation Card Photo",
    description: "Featured visual on the Toilet Renovation card on homepage & /services",
    paths: ["/images/services/toilet-renovation.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },

  // ==========================================
  // 3. 🏠 HOUSE RENOVATION (/house-renovation)
  // ==========================================
  {
    id: "house_reno_hero",
    category: "house-renovation",
    pagePath: "/house-renovation",
    pageTitle: "House Renovation",
    sectionName: "Hero Header Banner",
    label: "House Renovation - Hero Banner Background",
    description: "Full-width background image in the hero banner of the House Renovation page",
    paths: ["/images/house-reno/hero.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092307/renovation-contractor-sg/House_reno/kp1ixhf6xovgkbyehhwn.jpg",
  },
  {
    id: "house_reno_phase_1",
    category: "house-renovation",
    pagePath: "/house-renovation",
    pageTitle: "House Renovation",
    sectionName: "Phase 01 · Site Prep & Demolition",
    label: "Phase 01: HDB/BCA Permits & Structural Hacking",
    description: "Lift padding corridor protection, load-bearing verification, and pneumatic hacking",
    paths: ["/images/house-reno/1.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092307/renovation-contractor-sg/House_reno/kp1ixhf6xovgkbyehhwn.jpg",
  },
  {
    id: "house_reno_phase_2",
    category: "house-renovation",
    pagePath: "/house-renovation",
    pageTitle: "House Renovation",
    sectionName: "Phase 02 · Wet Trade & Masonry",
    label: "Phase 02: Wet Trade Masonry, Screeding & Tiling",
    description: "Reinforced kerbs, pre-packed screed beds, laser 3D leveling, and waterproof tile bonding",
    paths: ["/images/doc-updates/image75.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "house_reno_phase_3",
    category: "house-renovation",
    pagePath: "/house-renovation",
    pageTitle: "House Renovation",
    sectionName: "Phase 03 · False Ceilings",
    label: "Phase 03: Architectural False Ceilings & Partitions",
    description: "Seamless drop ceilings, cove lighting pelmets, and acoustic drywall acoustic dividers",
    paths: ["/images/doc-updates/image29.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "house_reno_phase_4",
    category: "house-renovation",
    pagePath: "/house-renovation",
    pageTitle: "House Renovation",
    sectionName: "Phase 04 · Painting & Handover",
    label: "Phase 04: Surface Painting, Chemical Wash & Handover",
    description: "Skim coating, Nippon Odourless painting, deep chemical acid wash, and handover",
    paths: ["/images/doc-updates/image25.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },

  // ==========================================
  // 4. 🚿 TOILET RENOVATION (/toilet-renovation-in-singapore)
  // ==========================================
  {
    id: "toilet_reno_hero",
    category: "toilet-renovation",
    pagePath: "/toilet-renovation-in-singapore",
    pageTitle: "Toilet Renovation",
    sectionName: "Hero Header",
    label: "Toilet Renovation - Hero Spotlight",
    description: "Header visual on the Toilet & Bathroom Renovation page",
    paths: ["/images/tiling/7.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },
  {
    id: "toilet_stage_1",
    category: "toilet-renovation",
    pagePath: "/toilet-renovation-in-singapore",
    pageTitle: "Toilet Renovation",
    sectionName: "Stage 01 · Controlled Hacking",
    label: "Stage 01: Controlled Hacking & Site Demolition",
    description: "Safe removal of old wall & floor tiles, mortar screed, and old sanitary fixtures",
    paths: ["/images/doc-updates/image62.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "toilet_stage_2",
    category: "toilet-renovation",
    pagePath: "/toilet-renovation-in-singapore",
    pageTitle: "Toilet Renovation",
    sectionName: "Stage 02 · 3-Coat Waterproofing",
    label: "Stage 02: 3-Coat Waterproofing & 24-Hr Ponding Test",
    description: "Elastomeric polymer membrane, corner mesh reinforcement & 24-hour water ponding test",
    paths: ["/images/doc-updates/image79.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "toilet_stage_3",
    category: "toilet-renovation",
    pagePath: "/toilet-renovation-in-singapore",
    pageTitle: "Toilet Renovation",
    sectionName: "Stage 03 · Laser Tiling",
    label: "Stage 03: Laser-Aligned Floor & Wall Tiling",
    description: "1:80 fall gradient towards floor traps for instant drainage and anti-slip tiles",
    paths: ["/images/doc-updates/image47.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "toilet_stage_4",
    category: "toilet-renovation",
    pagePath: "/toilet-renovation-in-singapore",
    pageTitle: "Toilet Renovation",
    sectionName: "Stage 04 · Concealed Plumbing",
    label: "Stage 04: Concealed Stainless / PPR Plumbing",
    description: "PUB licensed water service plumbing with concealed Grade 304 pressure-tested lines",
    paths: ["/images/doc-updates/image90.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "toilet_stage_5",
    category: "toilet-renovation",
    pagePath: "/toilet-renovation-in-singapore",
    pageTitle: "Toilet Renovation",
    sectionName: "Stage 05 · Fixtures & Glass Screen",
    label: "Stage 05: Sanitary Fixture & Glass Screen Installation",
    description: "Toilet bowl, vanity, mixer taps and 10mm tempered shower screen installation",
    paths: ["/images/tiling/12.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },

  // ==========================================
  // 5. 🧱 TILING WORKS (/tiling-works)
  // ==========================================
  {
    id: "tiling_hero",
    category: "tiling",
    pagePath: "/tiling-works",
    pageTitle: "Tiling Works",
    sectionName: "Hero Header",
    label: "Tiling Works - Hero Background",
    description: "Header visual on Tiling Works page",
    paths: ["/images/tiling/hero.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/s29ff99hvhg4hft2d9v5.jpg",
  },
  {
    id: "tiling_step_1",
    category: "tiling",
    pagePath: "/tiling-works",
    pageTitle: "Tiling Works",
    sectionName: "Workmanship 01 · Solid Buttering",
    label: "Step 01: 100% Solid Buttering (Zero Hollow Tiles)",
    description: "Full-coverage combed polymer mortar eliminating hollow pockets and popped tiles",
    paths: ["/images/tiling/38.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/s29ff99hvhg4hft2d9v5.jpg",
  },
  {
    id: "tiling_step_2",
    category: "tiling",
    pagePath: "/tiling-works",
    pageTitle: "Tiling Works",
    sectionName: "Workmanship 02 · Laser Alignment",
    label: "Step 02: Laser Cross-Line Optical Alignment",
    description: "3D multi-line laser leveling instruments and reusable leveling clips for zero lippage",
    paths: ["/images/tiling/44.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/s29ff99hvhg4hft2d9v5.jpg",
  },
  {
    id: "tiling_step_3",
    category: "tiling",
    pagePath: "/tiling-works",
    pageTitle: "Tiling Works",
    sectionName: "Workmanship 03 · Mitred Edges",
    label: "Step 03: 45-Degree Mitred Edge Finishing",
    description: "Wet-cut tile edges to exact 45° angles for seamless architectural stone junctions",
    paths: ["/images/tiling/11.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  {
    id: "tiling_step_4",
    category: "tiling",
    pagePath: "/tiling-works",
    pageTitle: "Tiling Works",
    sectionName: "Workmanship 04 · Epoxy Grouting",
    label: "Step 04: Anti-Mold Epoxy Grouting (Mapei)",
    description: "Two-part 100% waterproof, stain-proof epoxy grout that never turns black",
    paths: ["/images/tiling/13.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/s29ff99hvhg4hft2d9v5.jpg",
  },

  // ==========================================
  // 6. 🪚 CARPENTRY SERVICES (/carpentry-services)
  // ==========================================
  {
    id: "carpentry_hero",
    category: "carpentry",
    pagePath: "/carpentry-services",
    pageTitle: "Carpentry Services",
    sectionName: "Hero Header",
    label: "Carpentry - Hero Showcase",
    description: "Main header visual on Custom In-House Carpentry page",
    paths: ["/images/carpentry/5.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/images/carpentry/vmqoqcizb3esgu9rrign.jpg",
  },
  {
    id: "carpentry_std_1",
    category: "carpentry",
    pagePath: "/carpentry-services",
    pageTitle: "Carpentry Services",
    sectionName: "Standard 01 · Solid Marine Plywood",
    label: "Standard 01: 100% Solid Marine-Grade Plywood (Zero Chipboard)",
    description: "Heavy-duty solid plywood carcasses that withstand heavy loads, moisture, and pests",
    paths: ["/images/carpentry/4.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/images/carpentry/vmqoqcizb3esgu9rrign.jpg",
  },
  {
    id: "carpentry_std_2",
    category: "carpentry",
    pagePath: "/carpentry-services",
    pageTitle: "Carpentry Services",
    sectionName: "Standard 02 · ABS Edge Banding",
    label: "Standard 02: Seamless 1mm ABS Edge Banding",
    description: "1mm high-pressure ABS edge banding applied with computer-controlled hot-melt technology",
    paths: ["/images/carpentry/7.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/images/carpentry/vmqoqcizb3esgu9rrign.jpg",
  },
  {
    id: "carpentry_std_3",
    category: "carpentry",
    pagePath: "/carpentry-services",
    pageTitle: "Carpentry Services",
    sectionName: "Standard 03 · Blum Hardware",
    label: "Standard 03: Authentic Blum & Austrian Hydraulic Hardware",
    description: "Genuine Blum BLUMOTION soft-close hinges, AVENTOS lift-up systems, and drawer runners",
    paths: ["/images/carpentry/2.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/images/carpentry/vmqoqcizb3esgu9rrign.jpg",
  },

  // ==========================================
  // 7. 🪜 FALSE CEILING & PARTITION (/false-ceiling)
  // ==========================================
  {
    id: "false_ceiling_hero",
    category: "false-ceiling",
    pagePath: "/false-ceiling",
    pageTitle: "False Ceiling",
    sectionName: "Hero Header",
    label: "False Ceiling - Hero Showcase",
    description: "Header visual on the False Ceiling & Partition page",
    paths: ["/images/partition-ceiling/12.jpeg", "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "false_ceiling_std_1",
    category: "false-ceiling",
    pagePath: "/false-ceiling",
    pageTitle: "False Ceiling",
    sectionName: "Standard 01 · Metal Stud Framework",
    label: "Standard 01: Heavy-Duty Galvanised Metal Stud Framework",
    description: "Galvanised steel furring channels spaced at 400mm centers with zinc-coated threaded rods",
    paths: ["/images/doc-updates/image31.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "false_ceiling_std_2",
    category: "false-ceiling",
    pagePath: "/false-ceiling",
    pageTitle: "False Ceiling",
    sectionName: "Standard 02 · Saint-Gobain Gyproc Boards",
    label: "Standard 02: Saint-Gobain Gyproc Fire-Rated Boards",
    description: "Certified plasterboards precision-cut with bevelled edges for invisible compound seams",
    paths: ["/images/doc-updates/image60.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },
  {
    id: "false_ceiling_std_3",
    category: "false-ceiling",
    pagePath: "/false-ceiling",
    pageTitle: "False Ceiling",
    sectionName: "Standard 03 · 3-Coat Joint Taping",
    label: "Standard 03: 3-Coat Joint Taping (Zero Hairline Cracks)",
    description: "High-tensile fiberglass perforated joint tape embedded with 3 feathered compound coats",
    paths: ["/images/doc-updates/image66.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/vks1v9m8a1naw5o2r6j2.jpg",
  },

  // ==========================================
  // 8. 💡 ELECTRICAL WORKS (/electrical-works-rewiring)
  // ==========================================
  {
    id: "electrical_hero",
    category: "electrical",
    pagePath: "/electrical-works-rewiring",
    pageTitle: "Electrical & Rewiring",
    sectionName: "Hero Header",
    label: "Electrical Works - Hero Spotlight",
    description: "Header visual on Electrical & Rewiring page",
    paths: ["/images/electrical/hero.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "electrical_feat_1",
    category: "electrical",
    pagePath: "/electrical-works-rewiring",
    pageTitle: "Electrical Works",
    sectionName: "Feature 01 · House Rewiring",
    label: "Feature 01: Complete Whole-House Rewiring",
    description: "Concealed PVC/GI conduit chasing, high-grade copper cables & testing",
    paths: ["/images/partition-ceiling/2.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "electrical_feat_2",
    category: "electrical",
    pagePath: "/electrical-works-rewiring",
    pageTitle: "Electrical Works",
    sectionName: "Feature 02 · DB Box Upgrades",
    label: "Feature 02: Distribution Board (DB) Box Upgrades",
    description: "RCCB, MCB surge protection breakers & certified EMA/LEW testing",
    paths: ["/images/partition-ceiling/10.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "electrical_feat_3",
    category: "electrical",
    pagePath: "/electrical-works-rewiring",
    pageTitle: "Electrical Works",
    sectionName: "Feature 03 · LED Lighting",
    label: "Feature 03: Architectural LED Cove & Spotlights",
    description: "Energy-efficient recessed downlights, track lights & strip LEDs",
    paths: ["/images/partition-ceiling/1.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "electrical_feat_4",
    category: "electrical",
    pagePath: "/electrical-works-rewiring",
    pageTitle: "Electrical Works",
    sectionName: "Feature 04 · Sockets & Switches",
    label: "Feature 04: Designer Sockets & Smart Switches",
    description: "Legrand / Schneider switches, 13A double sockets & USB charging points",
    paths: ["/images/carpentry/6.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/images/carpentry/vmqoqcizb3esgu9rrign.jpg",
  },

  // ==========================================
  // 9. 🎨 PAINTING & PLASTERING (/house-painting-plastering)
  // ==========================================
  {
    id: "painting_hero",
    category: "painting",
    pagePath: "/house-painting-plastering",
    pageTitle: "Painting & Plastering",
    sectionName: "Hero Header",
    label: "Painting - Hero Header",
    description: "Header visual on Painting & Plastering page",
    paths: ["/images/painting/hero.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "painting_std_1",
    category: "painting",
    pagePath: "/house-painting-plastering",
    pageTitle: "Painting & Plastering",
    sectionName: "Process 01 · Protection & Wrapping",
    label: "Process 01: 100% Furniture Wrapping & Floor Protection",
    description: "Heavy-duty corrugated cardboard floor cover and electrostatic dust-protection plastic wraps",
    paths: ["/images/doc-updates/image41.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "painting_std_2",
    category: "painting",
    pagePath: "/house-painting-plastering",
    pageTitle: "Painting & Plastering",
    sectionName: "Process 02 · Scraping & Patching",
    label: "Process 02: Surface Scraping, Plaster Patching & Skimming",
    description: "Scraping loose flaking paint, patching wall cracks, and skimming uneven patches until smooth",
    paths: ["/images/doc-updates/image68.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },
  {
    id: "painting_std_3",
    category: "painting",
    pagePath: "/house-painting-plastering",
    pageTitle: "Painting & Plastering",
    sectionName: "Process 03 · Sealer & 2 Coats",
    label: "Process 03: Alkaline-Resistant Sealer & 2 Finish Coats (Nippon Paint)",
    description: "Alkali-resistant moisture barrier primer plus two thick, uniform topcoats of Nippon Paint",
    paths: ["/images/doc-updates/image5.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092314/renovation-contractor-sg/images/partition-ceiling/aedg32l78d91g8b6uh1k.jpg",
  },

  // ==========================================
  // 10. 🚪 DOORS & WINDOWS (/door-window-services)
  // ==========================================
  {
    id: "doors_windows_hero",
    category: "doors-windows",
    pagePath: "/door-window-services",
    pageTitle: "Doors & Windows",
    sectionName: "Hero Header",
    label: "Doors & Windows - Hero Showcase",
    description: "Header visual on Door & Window Services page",
    paths: ["/images/door-window/4.jpeg", "/images/door-window/1.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092302/renovation-contractor-sg/Door_window/nch930yir3js4pchyjoa.jpg",
  },
  {
    id: "door_cat_1",
    category: "doors-windows",
    pagePath: "/door-window-services",
    pageTitle: "Doors & Windows",
    sectionName: "Trade 01 · Main Doors & Gates",
    label: "Trade 01: Fire-Rated Main Entrance Doors & Matching Designer Metal Gates",
    description: "Solid core acoustic insulation with 1/2hr - 1hr fire certificate & custom privacy gates",
    paths: ["/images/doc-updates/image3.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092302/renovation-contractor-sg/Door_window/nch930yir3js4pchyjoa.jpg",
  },
  {
    id: "door_cat_2",
    category: "doors-windows",
    pagePath: "/door-window-services",
    pageTitle: "Doors & Windows",
    sectionName: "Trade 02 · Aluminium Windows",
    label: "Trade 02: BCA-Certified Aluminium Casement & Sliding Windows",
    description: "SS 212 safety certified with heavy-duty SS304 rivets, acoustic glass & grilles",
    paths: ["/images/doc-updates/image67.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092302/renovation-contractor-sg/Door_window/nch930yir3js4pchyjoa.jpg",
  },
  {
    id: "door_cat_3",
    category: "doors-windows",
    pagePath: "/door-window-services",
    pageTitle: "Doors & Windows",
    sectionName: "Trade 03 · Interior Doors",
    label: "Trade 03: Toilet Bi-Fold Doors, Slide & Swing, and Pocket Bedroom Doors",
    description: "Space-saving trackless bottom aluminium bi-fold systems with silent top rollers",
    paths: ["/images/doc-updates/image37.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092302/renovation-contractor-sg/Door_window/nch930yir3js4pchyjoa.jpg",
  },

  // ==========================================
  // 11. 🪵 FLOORING & CARPET (/flooring-carpet-services)
  // ==========================================
  {
    id: "flooring_hero",
    category: "flooring",
    pagePath: "/flooring-carpet-services",
    pageTitle: "Flooring & Carpet",
    sectionName: "Hero Header",
    label: "Flooring - Hero Showcase",
    description: "Header visual on Flooring & Carpet Services page",
    paths: ["/images/flooring/hero.jpeg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  {
    id: "floor_cat_1",
    category: "flooring",
    pagePath: "/flooring-carpet-services",
    pageTitle: "Flooring & Carpet",
    sectionName: "Trade 01 · Hardwood Restoration",
    label: "Trade 01: Solid Parquet & Hardwood Floor Sanding, Staining & Varnishing",
    description: "German Bona dust-free belt sanding & non-toxic Traffic HD commercial polyurethane",
    paths: ["/images/doc-updates/image69.png"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  {
    id: "floor_cat_2",
    category: "flooring",
    pagePath: "/flooring-carpet-services",
    pageTitle: "Flooring & Carpet",
    sectionName: "Trade 02 · SPC & Luxury Vinyl",
    label: "Trade 02: 100% Waterproof SPC Rigid Core & Luxury Vinyl Tile (LVT)",
    description: "5mm - 7.5mm click-lock planks with integrated acoustic IXPE underlay",
    paths: ["/images/doc-updates/image40.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  {
    id: "floor_cat_3",
    category: "flooring",
    pagePath: "/flooring-carpet-services",
    pageTitle: "Flooring & Carpet",
    sectionName: "Trade 03 · Commercial Carpet",
    label: "Trade 03: Commercial Carpet Tiles & Heavy-Duty Wall-to-Wall Broadloom",
    description: "Heavy commercial traffic Class 33 nylon carpet tiles with stain-resistant protection",
    paths: ["/images/doc-updates/image85.png"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },
  {
    id: "floor_cat_4",
    category: "flooring",
    pagePath: "/flooring-carpet-services",
    pageTitle: "Flooring & Carpet",
    sectionName: "Trade 04 · Stone Restoration",
    label: "Trade 04: Diamond Pad Marble, Granite & Terrazzo Floor Crystallization",
    description: "Sequential diamond resin grinding & Italian Klindex crystallization mirror finish",
    paths: ["/images/doc-updates/image76.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/p4u1m6f9f9yq46r9f4w4.jpg",
  },

  // ==========================================
  // 12. 📸 PORTFOLIO PROJECTS (Before / After)
  // ==========================================
  {
    id: "project_1_before",
    category: "projects",
    pagePath: "/projects",
    pageTitle: "Projects & Portfolio",
    sectionName: "4-Room BTO Project · Before",
    label: "Project 1 (4-Room BTO) - Bare Screed Condition",
    description: "Bare screed condition before full turnkey renovation",
    paths: ["/images/projects/proj-1-before.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/aqhvpkoy2mrbwng2bbrk.jpg",
  },
  {
    id: "project_1_after",
    category: "projects",
    pagePath: "/projects",
    pageTitle: "Projects & Portfolio",
    sectionName: "4-Room BTO Project · After",
    label: "Project 1 (4-Room BTO) - Completed Makeover",
    description: "Completed modern luxury makeover with cove lighting and full carpentry",
    paths: ["/images/projects/proj-1-after.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092305/renovation-contractor-sg/root/roepaxqzy8zxviqaydjp.webp",
  },
  {
    id: "project_2_before",
    category: "projects",
    pagePath: "/projects",
    pageTitle: "Projects & Portfolio",
    sectionName: "Master Toilet · Before",
    label: "Project 2 (Master Toilet) - Before Hacking",
    description: "Existing worn bathroom tiles before pneumatic hacking and re-screeding",
    paths: ["/images/doc-updates/image24.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092309/renovation-contractor-sg/images/doc-updates/d30kkw2q72m8y7vj5r3z.jpg",
  },
  {
    id: "project_2_after",
    category: "projects",
    pagePath: "/projects",
    pageTitle: "Projects & Portfolio",
    sectionName: "Master Toilet · After",
    label: "Project 2 (Master Toilet) - Hotel-Grade Finish",
    description: "Hotel-grade master toilet with concealed plumbing and frameless glass",
    paths: ["/images/projects/proj-2-after.jpg"],
    defaultUrl: "https://res.cloudinary.com/dgaiqqh7k/image/upload/v1793092323/renovation-contractor-sg/images/tiling/pgg34u2g076q3f4zhyjh.jpg",
  },
];

async function getLocalCloudinaryData() {
  const filePath = path.join(process.cwd(), "data", "cloudinaryImages.json");
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { urlMap: {}, images: [] };
  }
}

async function saveLocalCloudinaryData(data: any) {
  try {
    const filePath = path.join(process.cwd(), "data", "cloudinaryImages.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Expected on Vercel/serverless environments where filesystem is read-only.
    // Database overrides in Neon PostgreSQL guarantee live persistence.
    console.warn("Local cloudinaryImages.json write skipped (read-only environment):", err);
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getSettings();
    const dbImageOverrides = settings?.site_images || {};
    const localData = await getLocalCloudinaryData();
    const urlMap = localData.urlMap || {};

    // Combine default slots with live overrides
    const slots = DEFAULT_IMAGE_SLOTS.map((slot) => {
      const dbUrl = dbImageOverrides[slot.id];
      const mappedUrl = slot.paths.map((p) => urlMap[p]).find(Boolean);
      const activeUrl = dbUrl || mappedUrl || slot.defaultUrl;

      return {
        ...slot,
        currentUrl: activeUrl,
        isCustomized: Boolean(dbUrl || (mappedUrl && mappedUrl !== slot.defaultUrl)),
      };
    });

    return NextResponse.json({
      success: true,
      slots,
      overrides: dbImageOverrides,
      totalMappedImages: Object.keys(urlMap).length,
      sampleImages: (localData.images || []).slice(0, 80),
    });
  } catch (error: any) {
    console.error("Failed to fetch image manager data:", error);
    return NextResponse.json(
      { error: "Failed to load images", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";

    // 1. Direct File Upload via FormData
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const slotId = formData.get("slotId") as string | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dgaiqqh7k";
      const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || "renovation_preset";

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mime = file.type || "image/jpeg";
      const fileName = file.name || "upload.jpg";

      let uploadedUrl = "";

      // 0. If this is the Hero Video, write directly to public/hero-video.mp4
      if (slotId === "hero_video" || fileName.endsWith(".mp4") || mime.includes("video")) {
        try {
          const videoDest = path.join(process.cwd(), "public", "hero-video.mp4");
          await fs.writeFile(videoDest, buffer);
          uploadedUrl = `/hero-video.mp4?v=${Date.now()}`;
        } catch (vidErr: any) {
          console.warn("Direct hero video write error:", vidErr);
        }
      }

      // 1. Try Cloudinary Direct Upload using the configured upload_preset
      if (!uploadedUrl) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append("upload_preset", uploadPreset);
          uploadFormData.append("folder", "renovation-contractor-sg/dashboard-uploads");

          const blob = new Blob([buffer], { type: mime });
          uploadFormData.append("file", blob, fileName);

          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: uploadFormData,
          });

          if (res.ok) {
            const data = await res.json();
            uploadedUrl = data.secure_url || data.url;
          } else {
            const errText = await res.text();
            console.warn("Cloudinary upload returned non-200, trying signed upload:", errText);
          }
        } catch (cloudErr) {
          console.warn("Cloudinary direct upload fetch error:", cloudErr);
        }
      }

      // 2. If direct preset failed, try signed SDK upload
      if (!uploadedUrl) {
        try {
          const base64Uri = `data:${mime};base64,${buffer.toString("base64")}`;
          const uploadRes = await cloudinary.uploader.upload(base64Uri, {
            folder: "renovation-contractor-sg/dashboard-uploads",
            resource_type: "image",
          });
          uploadedUrl = uploadRes.secure_url;
        } catch (signedErr) {
          console.warn("Cloudinary signed upload error:", signedErr);
        }
      }

      // 3. Robust Local Fallback (if Cloudinary is unavailable)
      if (!uploadedUrl) {
        try {
          const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
          await fs.mkdir(uploadsDir, { recursive: true });
          const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const filePath = path.join(uploadsDir, safeName);
          await fs.writeFile(filePath, buffer);
          uploadedUrl = `/images/uploads/${safeName}`;
        } catch (localErr: any) {
          throw new Error(`Failed to save image locally and to Cloudinary: ${localErr.message}`);
        }
      }


      // If slotId is provided, save image override into Neon PostgreSQL & local map!
      if (slotId) {
        const slot = DEFAULT_IMAGE_SLOTS.find((s) => s.id === slotId);
        const settings = await getSettings();
        const existingOverrides = settings?.site_images || {};

        existingOverrides[slotId] = uploadedUrl;
        if (slot) {
          for (const p of slot.paths) {
            existingOverrides[p] = uploadedUrl;
          }
        }
        await saveSettings("site_images", existingOverrides);

        // Also update local cloudinary mapping for all matching paths
        const localData = await getLocalCloudinaryData();
        if (slot) {
          for (const p of slot.paths) {
            localData.urlMap[p] = uploadedUrl;
          }
          await saveLocalCloudinaryData(localData);
        }

        try { revalidatePath("/", "layout"); } catch (e) { console.warn("revalidatePath error:", e); }
        return NextResponse.json({
          success: true,
          url: uploadedUrl,
          slotId,
          message: `Photo successfully updated for ${slot?.label || slotId}!`,
        });
      }

      return NextResponse.json({
        success: true,
        url: uploadedUrl,
        message: "Image uploaded successfully!",
      });
    }


    // 2. JSON actions: update_slot or reset_slot or custom_path
    const body = await request.json();
    const { action, slotId, newUrl, customPath } = body;

    const settings = await getSettings();
    const existingOverrides = settings?.site_images || {};
    const localData = await getLocalCloudinaryData();

    if (action === "update_slot") {
      if (!slotId || !newUrl) {
        return NextResponse.json(
          { error: "slotId and newUrl are required" },
          { status: 400 }
        );
      }

      const slot = DEFAULT_IMAGE_SLOTS.find((s) => s.id === slotId);

      // Save in Neon DB & siteSettings
      existingOverrides[slotId] = newUrl;
      if (slot) {
        for (const p of slot.paths) {
          existingOverrides[p] = newUrl;
        }
      }
      await saveSettings("site_images", existingOverrides);

      // Save in urlMap for all paths associated with this slot
      if (slot) {
        for (const p of slot.paths) {
          localData.urlMap[p] = newUrl;
        }
        await saveLocalCloudinaryData(localData);
      }

      try { revalidatePath("/", "layout"); } catch (e) { console.warn("revalidatePath error:", e); }
      return NextResponse.json({
        success: true,
        message: `Updated image for ${slot?.label || slotId}!`,
        currentUrl: newUrl,
      });
    }

    if (action === "reset_slot") {
      if (!slotId) {
        return NextResponse.json({ error: "slotId is required" }, { status: 400 });
      }

      const slot = DEFAULT_IMAGE_SLOTS.find((s) => s.id === slotId);

      delete existingOverrides[slotId];
      if (slot) {
        for (const p of slot.paths) {
          delete existingOverrides[p];
          localData.urlMap[p] = slot.defaultUrl;
        }
      }
      await saveSettings("site_images", existingOverrides);
      await saveLocalCloudinaryData(localData);

      try { revalidatePath("/", "layout"); } catch (e) { console.warn("revalidatePath error:", e); }
      return NextResponse.json({
        success: true,
        message: `Reset ${slot?.label || slotId} to default image.`,
        currentUrl: slot?.defaultUrl,
      });
    }

    if (action === "custom_path") {
      if (!customPath || !newUrl) {
        return NextResponse.json(
          { error: "customPath and newUrl are required" },
          { status: 400 }
        );
      }

      const cleanPath = customPath.startsWith("/") ? customPath : `/${customPath}`;
      localData.urlMap[cleanPath] = newUrl;
      await saveLocalCloudinaryData(localData);

      existingOverrides[`custom_${cleanPath}`] = newUrl;
      await saveSettings("site_images", existingOverrides);

      return NextResponse.json({
        success: true,
        message: `Path ${cleanPath} successfully mapped to new image.`,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("Image operation failed:", error);
    return NextResponse.json(
      { error: "Failed to process image operation", details: error.message },
      { status: 500 }
    );
  }
}
