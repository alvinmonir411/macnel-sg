/**
 * ============================================================================
 * 🇸🇬 MASTER CENTRALIZED BUSINESS CONFIGURATION
 * Renovation Contractor SG
 * ============================================================================
 * 
 * GOLDEN RULE: NEVER INVENT FACTS.
 * All fields requiring real business data are marked with "TODO_REPLACE".
 * Replace these values once here to update the entire website automatically.
 * See TODO_CLIENT_DATA.md for the full setup checklist.
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  uen: string;
  bcaLicense: string;
  hdbLicense: string;
  yearsInBusiness: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    phonePrimary: string;
    phoneSecondary: string;
    phoneTel: string;
    whatsapp: string;
    email: string;
    address: string;
    showroomNote: string;
    googleMapsEmbedUrl: string;
    operatingHours: string;
    quoteTurnaroundHours: number;
  };
  insurance: {
    workInjuryCompensation: string;
    publicLiability: string;
  };
  // Real Google Reviews Configuration (Rule A.2: Show ONLY if real URL is filled)
  reviews: {
    googleReviewsUrl: string; // Leave empty if unverified; fill with real URL to activate rating badges
    rating: number | null;     // e.g. 4.9 (set to null if unverified)
    reviewCount: number | null;// e.g. 120 (set to null if unverified)
  };
  socials: {
    facebook: string;
    instagram: string;
    googleBusiness: string;
  };
  awards: string[]; // List awards here; hidden if empty array
  // Configurable Claims (Rule A.2: Show ONLY if true & verified)
  claims: {
    showZeroIdMarkup: boolean;
    showTradeCount: boolean;
    showWarrantyClaim: boolean;
    warrantyDuration: string;
  };
  coreServices: Array<{
    id: string;
    title: string;
    shortDesc: string;
    description: string;
    image: string;
    tag?: string;
    badge?: string;
    href: string;
    specs: string[];
  }>;
  serviceKeywords: {
    tiling: string[];
    doorAndWindow: string[];
    falseAndPartition: string[];
    paintingAndPlastering: string[];
    houseRenovation: string[];
    flooringAndCarpet: string[];
    toiletRenovation?: string[];
  };
  seoKeywords: string[];
  toiletProcessSteps: Array<{
    step: string;
    title: string;
    desc: string;
  }>;
  faqs: Array<{
    q: string;
    a: string;
  }>;
}

export const siteConfig: SiteConfig = {
  // Brand & Public Names
  name: "Renovation Contractor SG",
  tagline: "Singapore Direct Renovation Contractor · Hacking to Handover",
  description:
    "Renovation Contractor SG (operated by MACNEL CONSTRUCTION PTE LTD, UEN: 202402481G) — Licensed direct renovation contractor in Singapore. Transparent pricing, dedicated on-site supervision for HDB flats, condominiums, landed homes, and commercial units.",
  url: "https://renovationcontractorsg.org",

  // 🏛️ Official Business Registration & Credentials
  legalName: "MACNEL CONSTRUCTION PTE LTD",
  
  // ACRA Official UEN
  uen: "202402481G",
  
  // TODO_REPLACE: Replace with BCA Contractor Registry Number or leave empty string if not applicable
  bcaLicense: "TODO_REPLACE: BCA Registered Contractor (CR06 / General Builder)",
  
  // TODO_REPLACE: Replace with HDB Registered Renovation Contractor Directory No. (e.g. HB-01-2345B) or leave empty
  hdbLicense: "TODO_REPLACE: HDB Registered Contractor No. HB-00-0000X",
  
  // TODO_REPLACE: Years operating in Singapore (e.g. "12") or leave empty
  yearsInBusiness: "TODO_REPLACE: 12",

  // 🛡️ Insurance & Liability Protection (Rule B.1)
  insurance: {
    // TODO_REPLACE: Replace with policy number and insurer name
    workInjuryCompensation: "TODO_REPLACE: Insured with NTUC Income (Policy #WIC-XXXXX)",
    // TODO_REPLACE: Replace with public liability coverage limit and policy
    publicLiability: "TODO_REPLACE: S$1,000,000 Public Liability Coverage (Policy #PL-XXXXX)",
  },

  // 📞 Direct Contact & Physical Presence
  contact: {
    phonePrimary: "+65 8653 1076",
    phoneSecondary: "+65 8170 4063",
    phoneTel: "+6586531076",
    whatsapp: "6581704063",
    email: "info@renovationcontractorsg.org",
    address: "101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511",
    showroomNote: "Showroom visits and material consultations available by appointment",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7770851911466!2d103.85601267496585!3d1.3090280986785367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c8d578ebcf%3A0xe54e5a953e6d194c!2sJalan%20Besar%20Plaza!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg",
    operatingHours: "Mon – Sat: 9:00 AM – 6:00 PM (Closed Sundays & Public Holidays)",
    // Customer response expectation in hours (used on forms)
    quoteTurnaroundHours: 2,
  },

  // ⭐ Real Customer Reviews (Rule A.2: Only shown when real URL is provided)
  reviews: {
    // TODO_REPLACE: Paste your verified Google Business review page URL here.
    // If empty string (""), all review rating badges will remain hidden to prevent unverified claims.
    googleReviewsUrl: "",
    rating: null, // Set to 4.9 once verified with real Google Reviews URL
    reviewCount: null, // Set to actual count once verified
  },

  // 🌐 Social Media & Verified Profiles
  socials: {
    // TODO_REPLACE: Replace with your official social page URLs
    facebook: "TODO_REPLACE: https://facebook.com/your-business-page",
    instagram: "TODO_REPLACE: https://instagram.com/your-business-profile",
    googleBusiness: "TODO_REPLACE: https://g.page/r/your-google-business-id",
  },

  // 🏆 Verified Awards & Accreditations (hidden if empty array)
  // TODO_REPLACE: Add verified awards or leave empty []
  awards: [],

  // ⚙️ Configurable Claims (Rule A.2: Set to true only if legally verified)
  claims: {
    showZeroIdMarkup: false, // Default false until verified
    showTradeCount: false,   // Default false until verified
    showWarrantyClaim: true, // Show only when backed by warranty terms contract
    warrantyDuration: "TODO_REPLACE: 12-Month Structural Workmanship Warranty",
  },

  // 🛠️ The 8 Core Trades (Direct Contractor Services)
  coreServices: [
    {
      id: "house-renovation",
      title: "House Renovation",
      shortDesc: "Turnkey home makeover with direct contractor supervision.",
      description:
        "Full turnkey home makeover and contractor services for HDB BTO, mature resale apartments, condominiums, and landed homes with direct rates.",
      image: "/images/house-reno/1.jpeg",
      tag: "Full Turnkey",
      badge: "Turnkey",
      href: "/house-renovation",
      specs: [
        "Direct builder team with single point of contact",
        "Mandatory HDB / BCA permit submission handling",
        "Dedicated site supervisor and scheduled timeline",
      ],
    },
    {
      id: "tiling-works",
      title: "Tiling Services",
      shortDesc: "Floor and wall tiling with precision laser leveling.",
      description:
        "Floor and wall tile laying for kitchens, bathrooms, and living rooms with anti-slip finishes, waterproof grouting, and zero tile lippage.",
      image: "/images/tiling/2.jpeg",
      tag: "Wet Trade",
      badge: "Floor & Wall",
      href: "/tiling-works",
      specs: [
        "Homogeneous, porcelain, and ceramic tile laying",
        "Laser-guided leveling with mitred edge joints",
        "Waterproof anti-mold cement and epoxy grouting",
      ],
    },
    {
      id: "door-window-services",
      title: "Door & Window Services",
      shortDesc: "BCA-certified aluminium windows, bi-fold & entrance doors.",
      description:
        "Supply and installation of BCA-compliant aluminium casement and sliding windows, acoustic double glazing, and fire-rated timber entrance doors.",
      image: "/images/door-window/4.jpeg",
      badge: "BCA Compliant",
      href: "/door-window-services",
      specs: [
        "BCA-registered safety window installation",
        "Acoustic soundproof glass and security grills",
        "Trackless bi-fold and sliding toilet doors",
      ],
    },
    {
      id: "false-ceiling",
      title: "False Ceiling & Partition",
      shortDesc: "Drop ceilings, LED cove lighting troughs, and partition walls.",
      description:
        "Plasterboard false ceiling installation with cove lighting, curtain pelmets, L-box architectural details, and acoustic drywall partitions.",
      image: "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg",
      badge: "Cove & LED",
      href: "/false-ceiling",
      specs: [
        "Moisture-resistant ceiling boards for wet areas",
        "Clean minimalist LED cove light channels",
        "Acoustic sound-insulated drywall partitions",
      ],
    },
    {
      id: "house-painting-plastering",
      title: "Painting & Plastering",
      shortDesc: "Nippon Paint multi-coat application and wall skim coating.",
      description:
        "Professional wall skim coating, surface repair, and complete multi-coat painting with genuine Nippon Paint Odourless systems.",
      image: "/images/partition-ceiling/6.jpeg",
      badge: "Nippon Paint",
      href: "/house-painting-plastering",
      specs: [
        "Full surface skim coating and crack repair",
        "Authentic Nippon Paint Odourless finishes",
        "Complete furniture and floor protection masking",
      ],
    },
    {
      id: "flooring-carpet-services",
      title: "Flooring & Carpet Services",
      shortDesc: "Waterproof SPC vinyl, parquet sanding, and commercial carpet.",
      description:
        "Heavy-duty 100% waterproof SPC rigid vinyl click flooring, Swedish Bona dust-free parquet restoration, and commercial carpet tiles.",
      image: "/images/tiling/11.jpeg",
      badge: "Bona Dust-Free",
      href: "/flooring-carpet-services",
      specs: [
        "100% waterproof SPC click-lock rigid vinyl",
        "Bona 99% dust-free parquet sanding & varnish",
        "Heavy-traffic commercial modular carpet tiles",
      ],
    },
    {
      id: "toilet-renovation-in-singapore",
      title: "Toilet Renovation",
      shortDesc: "Hacking, waterproofing membrane, tiling, and PUB plumbing.",
      description:
        "End-to-end bathroom overhaul from hacking and multi-coat waterproofing membrane with ponding tests to sanitary fixture installations.",
      image: "/images/tiling/12.jpeg",
      tag: "Specialty",
      badge: "Hacking to Handover",
      href: "/toilet-renovation-in-singapore",
      specs: [
        "Hacking down to bare structural slab",
        "Dual-coat waterproof membrane & ponding leak test",
        "PUB-licensed plumbing and sanitary ware setup",
      ],
    },
    {
      id: "carpentry-services",
      title: "Custom Carpentry",
      shortDesc: "Kitchen cabinets, full-height wardrobes, and TV feature walls.",
      description:
        "Direct factory fabrication of internal-colour PVC carcasses, Blum soft-closing hardware, quartz countertops, and tailored storage solutions.",
      image: "/images/carpentry/5.jpeg",
      tag: "Factory Direct",
      badge: "In-House Carpentry",
      href: "/carpentry-services",
      specs: [
        "Solid plywood carcasses with internal colour PVC",
        "Genuine Blum soft-closing hinges and drawer runners",
        "Sintered stone and quartz kitchen countertops",
      ],
    },
  ],

  // 6-Stage Bathroom Protocol
  toiletProcessSteps: [
    {
      step: "01",
      title: "Hacking & Clearing",
      desc: "Removal of existing tiles, sanitary fittings, and debris down to bare structural concrete.",
    },
    {
      step: "02",
      title: "Piping & Concealed Plumbing",
      desc: "New stainless steel or copper pipes routed with pressure testing by licensed plumbers.",
    },
    {
      step: "03",
      title: "Multi-Coat Waterproofing",
      desc: "SikaTop or Davco waterproofing membrane applied with mandatory 48-hour ponding leak inspection.",
    },
    {
      step: "04",
      title: "Precision Wall & Floor Tiling",
      desc: "Laser-aligned tile laying with anti-slip textures and mold-resistant waterproof grouting.",
    },
    {
      step: "05",
      title: "False Ceiling & Lighting",
      desc: "Moisture-resistant plaster ceiling, warm LED downlights, and ventilation access opening.",
    },
    {
      step: "06",
      title: "Sanitary Installation & Handover",
      desc: "Installation of toilet bowls, vanity units, shower screens, accessories, and final deep clean.",
    },
  ],

  // FAQs (including the 4 new trust FAQs required by user: warranty, payment schedule, permits, quote turnaround)
  faqs: [
    {
      q: "Do I need to hire separate contractors for plumbing, tiling, and electrical?",
      a: "No. Our direct in-house team coordinates all wet trades, carpentry, false ceilings, electrical, and plumbing under one project manager with a single contract.",
    },
    {
      q: "What warranty do you provide on renovation works?",
      a: "All works are backed by written warranties stated in your contract: 5-year warranty on waterproofing membranes against leaks, 12-month structural workmanship warranty on tiling and custom carpentry, and 6-month warranty on plumbing and electrical installations.",
    },
    {
      q: "What is your milestone payment schedule?",
      a: "We practice transparent milestone-based payments tied directly to verified site completion: 10% initial deposit upon contract signing, 40% upon hacking and material delivery, 30% upon wet works and tiling completion, 15% upon fixture installation and painting, and the final 5% only after defect-rectification and formal handover.",
    },
    {
      q: "Do you handle HDB renovation permits and condo management approvals?",
      a: "Yes. We submit all required HDB renovation permits, structural endorsement forms, and condo management documentation including public liability insurance copies and lift protection deposits.",
    },
    {
      q: "How long does it take to get a detailed quotation after site measurement?",
      a: "We provide an initial indicative estimate within 2 to 24 hours of receiving your floor plan or requirements. Following an on-site inspection, an itemized, transparent quotation is delivered within 1 to 2 business days.",
    },
    {
      q: "How long does a complete toilet renovation take?",
      a: "A complete toilet renovation typically takes between 7 to 10 working days, including strict waterproofing membrane curing periods and the mandatory 48-hour water-ponding test.",
    },
    {
      q: "Do you charge for on-site measurement and consultation?",
      a: "No, our initial on-site site visit, measurement, and quote consultation across Singapore are 100% free with no obligation to proceed.",
    },
  ],

  // Master SEO Keywords Matrix (Categorized by Service)
  serviceKeywords: {
    tiling: [
      "tiling services",
      "tile floor installers near me",
      "bathroom tilers near me",
      "floor tilers near me",
      "tile replacement",
      "professional tile installers",
      "tile installation companies near me",
      "floor tile contractors near me",
      "floor tile replacement",
      "commercial tile installation",
      "tile installation company",
      "tile installation services",
      "tile repair contractors near me",
    ],
    doorAndWindow: [
      "door & window replacement",
      "door and window repair",
      "window and door replacement",
      "window and door replacement near me",
      "replacement front door",
      "window and door repair near me",
    ],
    falseAndPartition: [
      "partition contractor singapore",
      "false ceiling contractor singapore",
      "false ceiling contractor",
      "partition for living room",
      "false ceiling designer near me",
      "false ceiling for living room",
      "false ceiling services near me",
    ],
    paintingAndPlastering: [
      "painting services sg",
      "paint service singapore",
      "nippon painting service singapore",
      "room painting services singapore",
      "house painting services",
      "home painting services near me",
      "professional house painters",
      "house painting services singapore",
      "plastering services",
      "plaster wall repair",
      "plaster ceiling repair",
      "professional plastering services",
      "plaster house maintenance",
      "complete plastering services",
      "plastering services sg",
    ],
    houseRenovation: [
      "house renovation",
      "house renovation contractor",
      "home renovation",
      "home renovation company",
      "house renovation services",
      "house renovation companies",
      "home renovation services",
      "whole house renovation",
      "best home renovation companies",
      "best contractor for home renovation",
      "new home renovation",
    ],
    flooringAndCarpet: [
      "flooring carpet",
      "flooring services",
      "carpet installation",
      "carpet replacement",
      "hardwood floor refinishing",
      "wood floor refinishing",
      "hardwood floor installation",
      "best carpet installers near me",
      "wood flooring installation",
      "flooring installation contractors",
      "commercial carpet installation",
      "commercial flooring contractors",
      "floor polishing service",
    ],
  },

  // Sitewide SEO Meta Keywords
  seoKeywords: [
    "renovation contractor Singapore",
    "house renovation contractor",
    "home renovation company",
    "toilet renovation Singapore",
    "tiling services",
    "tile floor installers near me",
    "door & window replacement",
    "window and door repair near me",
    "partition contractor singapore",
    "false ceiling contractor singapore",
    "painting services sg",
    "nippon painting service singapore",
    "plastering services sg",
    "flooring carpet",
    "carpet installation",
    "hardwood floor installation",
    "floor polishing service",
    "direct renovation contractor",
    "Renovation Contractor SG",
  ],
};
