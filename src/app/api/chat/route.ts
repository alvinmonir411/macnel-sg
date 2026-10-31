import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";
import { siteConfig } from "@/config/site";

const DEFAULT_SYSTEM_PROMPT = `You are the official customer service assistant for Renovation Contractor SG (https://renovationcontractorsg.org), a premier renovation contractor and specialist in Singapore.

COMPANY FACTS:
- Brand Name: Renovation Contractor SG | ACRA UEN: 202402481G | Company: MACNEL CONSTRUCTION PTE LTD
- 100% In-House Master Tradesmen (Tilers, Plumbers, Carpenters, Electricians, Plasterers, Painters). Zero ID middleman markups (clients save 20% to 35% on direct contractor rates).
- BCA Registered Contractor (CR06 / L1 Interior Decoration) & HDB Directory. 12-Month Structural & Workmanship Warranty with 24-48h response.
- Office & Showroom: 101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511.
- Direct Hotline: +65 8653 1076 | WhatsApp: +65 8170 4063.
- Free on-site inspection and itemized quote within 2 hours.

SERVICES: Toilet Renovation with 3-layer waterproofing, Whole House Renovation (HDB BTO/Resale, Condo, Landed, Commercial), Floor & Wall Tiling, False Ceiling & Partition, House Painting & Plastering, Doors & Windows, SPC Vinyl Flooring, Electrical Rewiring, Carpentry & Cabinetry.

CRITICAL RULES FOR RESPONSES:
1. VERY SHORT & CONCISE: Answers MUST be only 2 to 3 sentences maximum! Never write long essays or 10-point lists. Answer directly and concisely.
2. NO ASTERISKS: NEVER use markdown bold asterisks (**like this**) and NEVER use list asterisks (*). Write clean, natural, fluid sentences.
3. NO RAW LINKS: Never write bracketed markdown links like [WhatsApp](...). The chat interface displays clickable Call and WhatsApp action buttons automatically.
4. STRICT OFF-TOPIC REFUSAL (DO NOT WASTE TOKENS):
   You are strictly forbidden from answering anything unrelated to Singapore renovation, contracting works, pricing, or our company.
   If the user asks about ANYTHING ELSE (e.g. coding, math, general trivia, weather, cooking, jokes, politics, school homework):
   Refuse politely in 1 short sentence:
   - Bengali: "আমি শুধুমাত্র সিঙ্গাপুরের হোম ও কমার্শিয়াল রেনোভেশন সংক্রান্ত তথ্যে সাহায্য করতে পারি। আপনার রেনোভেশন প্রজেক্ট নিয়ে যেকোনো প্রশ্ন করতে পারেন।"
   - English: "I can only assist with Singapore home and commercial renovation inquiries. How can I help with your renovation project?"
5. ACCURATELY UNDERSTAND ALL QUESTIONS: Understand any phrasing, slang, Singlish, Banglish ("koto dam", "toilet khoroc", "office koi"), English, Bengali, Chinese, Malay, Hindi, Urdu, or Arabic, and answer with contractor accuracy.`;

// Helper to detect language code from text or language tag
function detectLanguage(lang?: string, text?: string): string {
  if (lang) {
    const l = lang.toLowerCase();
    if (l.includes("বাংলা") || l === "bn" || l === "bangla" || l === "bengali") return "bn";
    if (l.includes("中文") || l === "zh" || l === "chinese") return "zh";
    if (l.includes("melayu") || l === "ms" || l === "malay") return "ms";
    if (l.includes("हिन्दी") || l === "hi" || l === "hindi") return "hi";
    if (l.includes("اردو") || l === "ur" || l === "urdu") return "ur";
    if (l.includes("العربية") || l === "ar" || l === "arabic") return "ar";
    if (l === "en" || l.includes("english")) return "en";
  }

  if (text) {
    if (/[\u0980-\u09FF]/.test(text)) return "bn";
    if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
    if (/[\u0900-\u097F]/.test(text)) return "hi";
    if (/[\u0600-\u06FF]/.test(text)) {
      if (text.includes("ہیں") || text.includes("ہے") || text.includes("کی") || text.includes("آپ")) return "ur";
      return "ar";
    }
  }

  return "en";
}

// Highly responsive local contractor knowledge base
function getSmartContractorReply(userMessage: string, lang: string): string {
  const detected = detectLanguage(lang, userMessage);
  const isBn = detected === "bn";
  const lower = userMessage.toLowerCase().trim();

  // 1. Toilet / Bathroom / Waterproofing
  if (
    lower.includes("toilet") || lower.includes("bath") || lower.includes("washroom") ||
    lower.includes("leak") || lower.includes("waterproof") || lower.includes("পুকুর") ||
    lower.includes("টয়লেট") || lower.includes("বাথরুম") || lower.includes("লিক") || lower.includes("পানি")
  ) {
    if (isBn) {
      return "আমাদের নিজস্ব প্লাম্বার ও টাইলস মিস্ত্রি দল দিয়ে আমরা সিঙ্গাপুরে সম্পূর্ণ টয়লেট ও বাথরুম রেনোভেশন করি। কাজের মধ্যে রয়েছে সম্পূর্ণ হ্যাকিং, ৩-কোট সিকা ওয়াটারপ্রুফিং মেমব্রেন, বাধ্যতামূলক ৪৮ ঘণ্টার ওয়াটার পন্ডিং লিক টেস্ট, অ্যান্টি-স্লিপ হোমোজিনাস টাইলস এবং স্যানিটারি ফিটিংস ইন্সটলেশন (৭-১০ দিনের কাজ ও ৫ বছরের লিক গ্যারান্টি)। ফ্রি পরিদর্শনের জন্য হোয়াটসঅ্যাপে মেসেজ দিন: +65 8170 4063 বা কল করুন: +65 8653 1076।";
    }
    return "Our in-house master plumbers and tilers handle complete toilet and bathroom renovations across Singapore. Works include full hacking, 3-coat Sika/Davco waterproofing with mandatory 48-hour water ponding leak test, anti-slip homogeneous tiles, and sanitary fixture installation (7 to 10 days turnaround with 5-year waterproofing warranty). WhatsApp +65 8170 4063 or call +65 8653 1076 for a free on-site quote.";
  }

  // 2. Pricing, Cost, Rates, Quotation
  if (
    lower.includes("price") || lower.includes("cost") || lower.includes("quote") ||
    lower.includes("budget") || lower.includes("dam") || lower.includes("khoroc") ||
    lower.includes("খরচ") || lower.includes("দাম") || lower.includes("কত") ||
    lower.includes("rate") || lower.includes("package")
  ) {
    if (isBn) {
      return "সরাসরি কন্ট্রাক্টর হওয়ায় আমাদের রেট পুরোপুরি পাইকারি ও স্বচ্ছ, কোনো ইন্টেরিয়র ডিজাইনার মিডলম্যান চার্জ নেই (আইডি ফার্মের চেয়ে ২০-৩৫% সাশ্রয়ী)। সাইট পরিদর্শন, মাপজোখ এবং কোটেশন সম্পূর্ণ ফ্রি। আপনার ফ্লোর প্ল্যান বা কাজের বিবরণ সহ বিস্তারিত খরচের জন্য আমাদের সাথে সরাসরি হোয়াটসঅ্যাপে +65 8170 4063 নম্বরে যোগাযোগ করুন।";
    }
    return "As direct in-house contractors, our pricing is fully itemized with zero middleman or interior design markups (saving you 20% to 35% on direct trade rates). We provide 100% free on-site measurements and detailed transparent quotations within 2 to 24 hours. WhatsApp your floor plan to +65 8170 4063 or call +65 8653 1076 for an instant estimate.";
  }

  // 3. Tiling & Flooring & Vinyl
  if (
    lower.includes("tile") || lower.includes("tiling") || lower.includes("floor") ||
    lower.includes("vinyl") || lower.includes("spc") || lower.includes("parquet") ||
    lower.includes("টাইলস") || lower.includes("ফ্লোর") || lower.includes("মেঝে") || lower.includes("ভিনাইল")
  ) {
    if (isBn) {
      return "আমরা হেভি-ডিউটি হোমোজিনাস ফ্লোর ও ওয়াল টাইলস (৬০০x৬০০, ৩০০x৬০০), বাথরুমের অ্যান্টি-স্লিপ টাইলস এবং ৫ মিমি ওয়াটারপ্রুফ এসপিসি ক্লিক-লক ভিনাইল ফ্লোরিং সরাসরি ফ্যাক্টরি রেটে সরবরাহ ও স্থাপন করি। লেজার অ্যালাইনমেন্ট ও ওয়াটারপ্রুফ গ্রাউটিং অন্তর্ভুক্ত। ফ্রি স্যাম্পল ও মাপের জন্য হোয়াটসঅ্যাপ করুন: +65 8170 4063।";
    }
    return "We supply and install premium 600x600 homogeneous floor and wall tiles, anti-slip bathroom tiles, and 5mm heavy-duty waterproof SPC click-lock vinyl flooring. All works include precision laser leveling, waterproof grouting, and defect checks. WhatsApp +65 8170 4063 for material samples and a free on-site measurement.";
  }

  // 4. Painting & Plastering
  if (
    lower.includes("paint") || lower.includes("plaster") || lower.includes("skim") ||
    lower.includes("wall repair") || lower.includes("crack") || lower.includes("colour") ||
    lower.includes("রং") || lower.includes("পেইন্ট") || lower.includes("প্লাস্টার")
  ) {
    if (isBn) {
      return "আমরা অরিজিনাল নিপ্পন পেইন্ট (ভিনিলেক্স ৫০০০ / ওডোর-লেস) ও ডুল্যাক্স দিয়ে ৩-কোট সিস্টেমে (১টি সিলার + ২টি ফিনিশ কোট) নিখুঁত রঙ ও প্লাস্টারিং কাজ করি। দেয়ালের ফাটল মেরামত, স্কিম কোটিং এবং লেভেল ৫ স্মুথ ফিনিশিং অন্তর্ভুক্ত। হোয়াটসঅ্যাপে যোগাযোগ করুন: +65 8170 4063 বা কল করুন: +65 8653 1076।";
    }
    return "We provide professional painting and plastering using authentic Nippon Paint (Vinilex 5000 / Odour-less) and Dulux with a strict 3-coat system (1 anti-alkali sealer + 2 topcoats). Our services also include Level 5 skim coating, crack mesh reinforcement, and hollow wall repairs. WhatsApp +65 8170 4063 for an instant quotation.";
  }

  // 5. False Ceiling & Partitions
  if (
    lower.includes("ceiling") || lower.includes("partition") || lower.includes("l-box") ||
    lower.includes("cove") || lower.includes("gypsum") || lower.includes("সিলিং") || lower.includes("পার্টেশন")
  ) {
    if (isBn) {
      return "আমরা সেন্ট-গোবেন ময়েসচার-রেজিস্ট্যান্ট প্লাস্টারবোর্ড ও হট-ডিপড গ্যালভানাইজড স্টিল ফ্রেম দিয়ে ফলস সিলিং, এল-বক্স, কোভ লাইটিং পেলমেট এবং ড্রাইয়াল পার্টেশন তৈরি করি। দ্রুত মাপ ও কোটেশনের জন্য হোয়াটসঅ্যাপে মেসেজ দিন: +65 8170 4063।";
    }
    return "We fabricate moisture-resistant plasterboard false ceilings, cove lighting pelmets, curtain pelmets, and acoustic drywall partitions using hot-dipped galvanized steel channels. WhatsApp +65 8170 4063 to schedule a free site measurement and lighting layout review.";
  }

  // 6. Custom Carpentry & Kitchen Cabinets
  if (
    lower.includes("carpentry") || lower.includes("cabinet") || lower.includes("wardrobe") ||
    lower.includes("kitchen") || lower.includes("wood") || lower.includes("কাঠ") || lower.includes("কেবিনেট")
  ) {
    if (isBn) {
      return "আমাদের নিজস্ব সিঙ্গাপুর কারপেন্ট্রি ওয়ার্কশপে সলিড প্লাইউড ও অস্ট্রিয়ান ব্লুম সফট-ক্লোজ কব্জা দিয়ে কিচেন কেবিনেট, ফুল-হাইট ওয়ারড্রোব ও টিভি ফিচার ওয়াল তৈরি করি (আইডি ফি ছাড়া সরাসরি ফ্যাক্টরি রেটে)। হোয়াটসঅ্যাপে যোগাযোগ করুন: +65 8170 4063।";
    }
    return "We fabricate bespoke kitchen cabinets, full-height wardrobes, and TV feature walls directly in our Singapore carpentry workshop using solid plywood carcasses and genuine Blum soft-close fittings (saving you 20% to 35% on ID markups). WhatsApp +65 8170 4063 for a free 3D design consultation.";
  }

  // 7. Doors & Windows
  if (
    lower.includes("door") || lower.includes("window") || lower.includes("grille") ||
    lower.includes("slide") || lower.includes("দরজা") || lower.includes("জানালা")
  ) {
    if (isBn) {
      return "আমরা বিসিএ ও এইচডিবি অনুমোদিত অ্যালুমিনিয়াম স্লাইড-অ্যান্ড-ফোল্ড টয়লেট দরজা, সাউন্ডপ্রুফ স্লাইডিং জানালা এবং সলিড টিম্বার বেডরুমের দরজা ফ্যাক্টরি রেটে সরবরাহ ও লাগিয়ে দিই। ক্যাটালগ ও দামের জন্য হোয়াটসঅ্যাপ করুন: +65 8170 4063।";
    }
    return "We supply and install BCA and HDB compliant aluminium slide-and-fold toilet doors, double-glazed soundproof casement windows, safety grilles, and solid core timber veneer bedroom doors. WhatsApp +65 8170 4063 for our full product catalogue and pricing.";
  }

  // 8. Electrical & Wiring
  if (
    lower.includes("electric") || lower.includes("wiring") || lower.includes("rewir") ||
    lower.includes("socket") || lower.includes("lighting") || lower.includes("db box") ||
    lower.includes("ইলেকট্রিক") || lower.includes("ওয়ারিং") || lower.includes("সকেট")
  ) {
    if (isBn) {
      return "আমাদের সমস্ত ইলেকট্রিক্যাল কাজ লাইসেন্সপ্রাপ্ত EMA ইলেকট্রিশিয়ান দ্বারা সম্পন্ন হয়। সম্পূর্ণ বাড়ি রিওয়্যারিং, ডিবি বক্স আপগ্রেড, লাইটিং পয়েন্ট ও পাওয়ার সকেট ইনস্টলেশন নিরাপদভাবে করা হয়। ফ্রি পরিদর্শনের জন্য কল করুন: +65 8653 1076 বা হোয়াটসঅ্যাপ করুন: +65 8170 4063।";
    }
    return "All electrical works and full-house rewiring are executed by licensed EMA electricians with official certification. We handle DB box upgrades, concealed conduit rewiring, LED lighting points, and power socket relocations. WhatsApp +65 8170 4063 or call +65 8653 1076 for an inspection.";
  }

  // 9. Contact, Office Location, Phone, WhatsApp
  if (
    lower.includes("contact") || lower.includes("whatsapp") || lower.includes("phone") ||
    lower.includes("call") || lower.includes("number") || lower.includes("address") ||
    lower.includes("location") || lower.includes("office") || lower.includes("thikana") ||
    lower.includes("ঠিকানা") || lower.includes("যোগাযোগ") || lower.includes("ফোন") || lower.includes("অফিস")
  ) {
    if (isBn) {
      return "আমাদের অফিসের ঠিকানা: 101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511। কাজের সময়: সোমবার থেকে শনিবার সকাল ৯:০০ টা থেকে সন্ধ্যা ৬:৩০ টা। সরাসরি কথা বলতে বা ফ্রি সাইট ভিজিট বুক করতে হোয়াটসঅ্যাপে মেসেজ দিন: +65 8170 4063 বা হটলাইনে কল করুন: +65 8653 1076।";
    }
    return "Our office & showroom is located at 101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511. Hours: Monday to Saturday, 9:00 AM – 6:30 PM. To speak with our project supervisor or book a free site visit, WhatsApp us directly at +65 8170 4063 or call our hotline at +65 8653 1076.";
  }

  // 10. Permits & BCA / HDB / Condo MCST
  if (
    lower.includes("permit") || lower.includes("license") || lower.includes("acra") ||
    lower.includes("bca") || lower.includes("hdb") || lower.includes("mcst") ||
    lower.includes("approval") || lower.includes("অনুমোদন") || lower.includes("লাইসেন্স")
  ) {
    if (isBn) {
      return "হ্যাঁ! আমরা বিসিএ রেজিস্টার্ড কন্ট্রাক্টর (CR06 / L1 Interior Decoration) এবং এসিআরএ রেজিস্টার্ড (UEN: 202402481G, MACNEL CONSTRUCTION PTE LTD)। সমস্ত এইচডিবি রেনোভেশন পারমিট সাবমিশন এবং কনডো এমসিএসটি প্রটেকশন ডিপোজিট ও অনুমোদন আমরা সরাসরি পরিচালনা করি।";
    }
    return "Yes! We are an ACRA registered Singapore entity (UEN: 202402481G, MACNEL CONSTRUCTION PTE LTD) and BCA Registered Contractor (CR06 / L1 Interior Decoration). We handle all required HDB renovation permits, structural forms, and condominium MCST approvals directly with zero hassle for you.";
  }

  // 11. Warranty
  if (
    lower.includes("warranty") || lower.includes("guarantee") || lower.includes("গ্যারান্টি") || lower.includes("ওয়ারেন্টি")
  ) {
    if (isBn) {
      return "আমাদের প্রতিটি কাজের সাথে অফিসিয়াল লিখিত চুক্তি ও ওয়ারেন্টি থাকে: ওয়াটারপ্রুফিংয়ে ৫ বছরের লিক গ্যারান্টি, টাইলিং ও কারপেন্ট্রিতে ১২ মাসের কাঠামোগত ওয়ারেন্টি এবং ২৪-৪৮ ঘণ্টার দ্রুত ডিফেক্ট রেসপন্স। বিস্তারিত তথ্যের জন্য হোয়াটসঅ্যাপ করুন: +65 8170 4063।";
    }
    return "Every project is backed by written contractual warranties: 5-year warranty on waterproofing membranes against leaks, 12-month structural and workmanship warranty on tiling and carpentry, and fast 24 to 48 hour defect response. WhatsApp +65 8170 4063 for details.";
  }

  // Default welcome & services summary
  if (isBn) {
    return "আপনাকে স্বাগতম! Renovation Contractor SG-তে আমরা সরাসরি ইন-হাউস কারিগরদের মাধ্যমে টয়লেট সংস্কার, সম্পূর্ণ বাড়ি রেনোভেশন, টাইলিং, ফলস সিলিং, পেইন্টিং, কারপেন্ট্রি ও ইলেকট্রিক্যাল কাজ করি (আইডি চার্জ ছাড়া ২০-৩৫% সাশ্রয়ী)। আপনি কোন কাজটির খরচ বা বিস্তারিত জানতে চান? ফ্রি সাইট পরিদর্শনের জন্য হোয়াটসঅ্যাপে মেসেজ দিন: +65 8170 4063 বা কল করুন: +65 8653 1076।";
  }
  return "Welcome to Renovation Contractor SG! We are Singapore's direct contractor specializing in toilet renovations, whole-house remodelling, homogeneous tiling, false ceiling, painting, carpentry, and electrical works (saving you 20% to 35% on direct rates). Which service or project would you like assistance with? WhatsApp +65 8170 4063 or call +65 8653 1076 for free advice.";
}

// GET: Return public chat assistant configuration
export async function GET() {
  try {
    const settings = await getSettings();
    const ai = settings?.ai || {};
    const contact = settings?.contact || {};

    const rawKey = (ai.geminiApiKey || process.env.GEMINI_API_KEY || "").trim();
    const isAiConfigured = Boolean(
      rawKey && rawKey.startsWith("AIzaSy") && rawKey.length >= 35 && !rawKey.includes("@")
    );

    return NextResponse.json({
      success: true,
      botName: ai.botName || "Chat with contractor",
      botSubtitle: ai.botSubtitle || "AI assistant · replies instantly",
      whatsapp: ai.whatsapp || contact.whatsapp || siteConfig.contact.whatsapp,
      welcomeMessageEn: ai.welcomeMessageEn || "Hi! How can we help you today?",
      welcomeMessageBn:
        ai.welcomeMessageBn ||
        "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
      model: ai.model || "gemini-2.5-flash",
      isAiConfigured,
    });
  } catch {
    return NextResponse.json({
      success: true,
      botName: "Chat with contractor",
      botSubtitle: "AI assistant · replies instantly",
      whatsapp: siteConfig.contact.whatsapp,
      welcomeMessageEn: "Hi! How can we help you today?",
      welcomeMessageBn:
        "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
      model: "gemini-2.5-flash",
      isAiConfigured: false,
    });
  }
}

// Fast rule-based guardrail to reject completely off-topic questions
function isOffTopicQuery(message: string): boolean {
  const text = message.toLowerCase().trim();
  if (!text || text.length < 2) return false;

  const onTopicKeywords = [
    "renov", "contractor", "toilet", "bath", "hack", "waterproof", "tile", "tiling",
    "floor", "wall", "paint", "plaster", "ceiling", "partition", "door", "window",
    "vinyl", "carpet", "electric", "rewir", "wire", "pipe", "plumb", "leak",
    "cabinet", "carpentry", "kitchen", "wardrobe", "hdb", "bto", "resale", "condo",
    "landed", "office", "commercial", "quote", "price", "cost", "dam", "khoroch", "budget",
    "inspect", "visit", "warranty", "license", "acra", "bca", "address",
    "location", "contact", "phone", "call", "whatsapp", "number", "book", "appointment",
    "measurement", "showroom", "worker", "supervisor", "site", "rate", "hello", "hi", "hey",
    "রেনোভেশন", "টয়লেট", "বাথরুম", "টাইলস", "রং", "পেইন্ট", "সিলিং", "দরজা", "জানালা",
    "ফ্লোর", "ইলেকট্রিক", "প্লাম্বিং", "কাঠ", "কেবিনেট", "খরচ", "দাম", "ঠিকানা", "অফিস",
    "ফোন", "যোগাযোগ", "কন্ট্রাক্টর", "ফ্ল্যাট", "বাড়ি", "সিঙ্গাপুর", "কোটেশন", "কেমন"
  ];

  if (onTopicKeywords.some((kw) => text.includes(kw))) {
    return false;
  }

  const offTopicTriggers = [
    /\b(python|javascript|typescript|react|html|css|c\+\+|java\b|sql|coding|write code|debug|algorithm|function|variable)\b/i,
    /\b(write an essay|write a poem|write a song|solve this|equation|calculus|algebra|homework|quantum physics|chemistry formula)\b/i,
    /\b(recipe|how to cook|ingredients for|biryani|chicken curry|bake a cake)\b/i,
    /\b(who is the president|prime minister|capital of|weather in|who won the match|football score|cricket match|bitcoin|crypto price)\b/i,
    /\b(flight ticket|visa process|hotel booking|tourist pass|job apply|software engineer hiring)\b/i,
    /\b(কুকিং|রেসিপি|কবিতা লেখ|গান লেখ|কোডিং|রাজনীতি|প্রধান মন্ত্রী|আবহাওয়া|ক্রিকেট|ফুটবল|বিটকয়েন)\b/i,
  ];

  return offTopicTriggers.some((rgx) => rgx.test(text));
}

// POST: Process chat message with Google Gemini API & smart contractor engine
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, language, testKey, testModel } = body;

    const isTest = Boolean(testKey !== undefined);

    const settings = await getSettings();
    const ai = settings?.ai || {};

    // Clean & sanitize key
    let rawKey = (
      testKey !== undefined
        ? testKey
        : ai.geminiApiKey || process.env.GEMINI_API_KEY || ""
    ).trim();

    // Remove any leading 'GEMINI_API_KEY=', surrounding quotes, or whitespace
    rawKey = rawKey
      .replace(/^GEMINI_API_KEY\s*=\s*/i, "")
      .replace(/^["'`]|["'`]$/g, "")
      .trim();

    const isEmail = rawKey.includes("@") || rawKey.includes("mailto:");
    const hasKey = Boolean(rawKey && rawKey.length > 5 && !isEmail);
    const apiKey = hasKey ? rawKey : "";

    const selectedModel = (testModel || ai.model || "gemini-2.5-flash").trim();
    const systemPrompt = ai.systemPrompt || DEFAULT_SYSTEM_PROMPT;

    const lastUserMessage = Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1].content
      : (isTest ? "Hello! Please confirm connection in one sentence." : "");

    const detectedLang = detectLanguage(language, lastUserMessage);

    // 0. Off-Topic Pre-check: Save API Quota!
    if (!isTest && isOffTopicQuery(lastUserMessage)) {
      const isBn = detectedLang === "bn";
      return NextResponse.json({
        success: true,
        reply: isBn
          ? "আমি শুধুমাত্র সিঙ্গাপুরের হোম ও কমার্শিয়াল রেনোভেশন সংক্রান্ত তথ্যে সাহায্য করতে পারি। আপনার ফ্ল্যাট, বাথরুম বা রেনোভেশন কাজ নিয়ে যেকোনো প্রশ্ন করতে পারেন অথবা নিচে সরাসরি কল বা হোয়াটসঅ্যাপ করুন।"
          : "I can only assist with Singapore home and commercial renovation inquiries. Please feel free to ask about your renovation project or tap the Call and WhatsApp buttons below!",
        source: "scope_guard_rejected",
        isOffTopic: true,
      });
    }

    // 1. If key is missing or is an email:
    if (!apiKey) {
      if (isTest) {
        if (isEmail) {
          return NextResponse.json(
            {
              success: false,
              error: "An email address was entered instead of an API key. Please copy your Google Gemini API key from Google AI Studio (https://aistudio.google.com/app/apikey).",
            },
            { status: 400 }
          );
        }
        return NextResponse.json(
          {
            success: false,
            error: "No API key entered. Please paste your Gemini API key from Google AI Studio (https://aistudio.google.com/app/apikey).",
          },
          { status: 400 }
        );
      }

      // Instant high-accuracy response from local contractor engine
      const smartReply = getSmartContractorReply(lastUserMessage, detectedLang);
      return NextResponse.json({
        success: true,
        reply: smartReply,
        source: "smart_contractor_engine",
        isAiConfigured: false,
      });
    }

    // 2. If valid key provided, call Google Gemini API
    const modelsToTry = [
      selectedModel,
      "gemini-2.5-flash",
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-flash-latest"
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    let lastError = "";
    let geminiReply = "";
    let usedModel = modelsToTry[0];

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(messages) && messages.length > 0) {
      const recent = messages.slice(-6);
      for (const m of recent) {
        contents.push({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: String(m.content) }],
        });
      }
    } else {
      contents.push({
        role: "user",
        parts: [{ text: lastUserMessage || "Hello" }],
      });
    }

    for (const modelCandidate of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelCandidate}:generateContent?key=${apiKey}`;
        const payload = {
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const parts = data.candidates?.[0]?.content?.parts || [];
          const textPart = parts.find((p: any) => p.text && !p.thought) || parts[0];
          const text = textPart?.text || "";
          if (text) {
            geminiReply = text.trim();
            usedModel = modelCandidate;
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData?.error?.message || `HTTP ${response.status}`;
        }
      } catch (err: any) {
        lastError = err?.message || String(err);
      }
    }

    if (geminiReply) {
      const cleaned = geminiReply
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^[\s]*[\*\-][\s]+/gm, "• ")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
        .trim();

      return NextResponse.json({
        success: true,
        reply: cleaned,
        source: "gemini",
        model: usedModel,
        isAiConfigured: true,
      });
    }

    if (isTest) {
      return NextResponse.json(
        {
          success: false,
          error: lastError || "Failed to connect to Google Gemini API. Please check your API key.",
        },
        { status: 400 }
      );
    }

    // Graceful fallback if Gemini call had a transient error
    const smartReply = getSmartContractorReply(lastUserMessage, detectedLang);
    return NextResponse.json({
      success: true,
      reply: smartReply,
      source: "smart_contractor_engine",
      apiError: lastError,
      isAiConfigured: true,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      success: true,
      reply: "Thank you for contacting Renovation Contractor SG! Please message our senior supervisor directly on WhatsApp at +65 8170 4063 or call us at +65 8653 1076 for an instant quotation.",
      source: "emergency_fallback",
    });
  }
}
