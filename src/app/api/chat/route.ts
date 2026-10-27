import { NextResponse } from "next/server";
import { getSettings } from "@/lib/db";
import { siteConfig } from "@/config/site";


const DEFAULT_SYSTEM_PROMPT = `You are the official AI Assistant for Renovation Contractor SG (Website: https://renovationcontractorsg.org), a premier direct renovation contractor in Singapore.

🏢 COMPANY CREDENTIALS & VALUES:
- 100% In-House Master Tradesmen (Tilers, Carpenters, Electricians, Plasterers, Painters). No Interior Design (ID) middleman markup—clients save 20% to 35% on direct factory/wholesale rates.
- Official Licenses: HDB Registered Renovation Directory & BCA Registered Contractor.
- 12-Month Structural & Workmanship Warranty on all projects with rapid 24–48 hour on-site service support.
- Office & Showroom: 280 Woodlands Industrial Park E5, #02-14 Harvest @ Woodlands, Singapore 757322.
- Direct Contact / WhatsApp: +65 8936 1834 | Email: contact@renovationcontractorsg.org.
- Turnaround: Free on-site inspection and itemized quote within 2 hours.


🛠️ 8 CORE SPECIALIST SERVICES:
1. Toilet Renovation: Complete hacking, 3-layer waterproofing membrane (BCA/HDB compliant water test), premium floor & wall tiles, plumbing & sanitary fittings.
2. House Renovation: Full turnkey makeover for HDB (BTO & Resale 3/4/5-room), Private Condominium, Landed property, and Commercial retail/office.
3. Floor & Wall Tiling: Large format porcelain, homogeneous, ceramic, marble, and anti-slip bathroom tiles with laser level alignment.
4. False Ceiling & Partition: Gypsum plasterboard, cove lighting pelmets, acoustic soundproof partition walls (Saint-Gobain materials).
5. House Painting & Plastering: Nippon Paint / Dulux anti-mould paint, skimming, wall plastering, hairline crack repair.
6. Door & Window Services: Fire-rated main doors, soundproof sliding aluminium windows, bi-fold bathroom doors, digital locks.
7. Flooring & Vinyl / Carpet: Heavy-duty SPC vinyl click flooring (5mm-6mm with IXPE acoustic underlay, 100% waterproof), office carpet tiles.
8. Electrical Works & Rewiring: EMA licensed electrician, full house rewiring, DB box upgrade, lighting points, power sockets.



💬 COMMUNICATION GUIDELINES:
- Greet clients warmly and professionally.
- Always respond in the EXACT language used by the user (English, বাংলা / Bengali, 中文 / Chinese, Melayu / Malay, हिन्दी / Hindi, اردو / Urdu, العربية / Arabic).
- State prices transparently in Singapore Dollars (SGD) as estimated direct contractor ranges when asked.
- Provide practical Singapore renovation advice (e.g. HDB permit requirements, 3-year waterproofing rule, BTO timeline).
- Encourage the customer to book a free on-site consultation or WhatsApp our senior builder directly at +65 8936 1834.
- Keep responses concise, readable, and well-structured with bullet points where appropriate.`;


const FALLBACK_RESPONSES: Record<string, { welcome: string; services: string; pricing: string; contact: string }> = {
  bn: {
    welcome: "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
    services: "আমরা সিঙ্গাপুরে সরাসরি কন্ট্রাক্টর হিসেবে কাজ করি। কোনো মিডলম্যান বা আইডি চার্জ নেই। আমাদের প্রধান সেবাসমূহ: ১) টয়লেট রেনোভেশন ও ওয়াটারপ্রুফিং ২) সম্পূর্ণ বাড়ি/ফ্ল্যাট রেনোভেশন ৩) ফ্লোর ও ওয়াল টাইলিং ৪) ফলস সিলিং ও পার্টেশন ৫) নিপ্পন পেইন্ট দিয়ে রঙ ও প্লাস্টারিং ৬) দরজা ও জানালা পরিবর্তন ৭) এসপিসি ভিনাইল ফ্লোরিং ৮) অনুমোদিত ইলেকট্রিক্যাল কাজ। আপনি কোন কাজটি করাতে চাচ্ছেন?",
    pricing: "সরাসরি কন্ট্রাক্টর হওয়ায় আমরা হোলসেল রেটে কাজ করি (আইডি ফার্মের চেয়ে ২০-৩৫% সাশ্রয়ী)। সাইট ভিজিট এবং কোটেশন সম্পূর্ণ ফ্রি। বিস্তারিত খরচের জন্য আমাদের সাথে হোয়াটসঅ্যাপে +65 8936 1834 নম্বরে যোগাযোগ করুন।",
    contact: "আমাদের সিনিয়র প্রজেক্ট সুপারের সাথে সরাসরি কথা বলতে বা ফ্রি সাইট পরিদর্শনের তারিখ বুক করতে হোয়াটসঅ্যাপে মেসেজ দিন: +65 8936 1834 বা কল করুন। আমাদের অফিস: 280 Woodlands Industrial Park E5, Singapore."
  },
  en: {
    welcome: "Welcome to Renovation Contractor SG! We are Singapore's direct renovation contractor. How can we assist with your home or commercial project today?",
    services: "We handle direct in-house renovations without middleman designer markups (saving you 20%-35%): 1) Toilet & Bathroom Renovation with 3-Layer Waterproofing 2) Whole House Turnkey Renovation (HDB / Condo / Landed) 3) Floor & Wall Homogeneous Tiling 4) False Ceiling & Cove Light Partitions 5) Nippon / Dulux House Painting 6) BCA-Approved Doors & Windows 7) Waterproof SPC Vinyl Flooring 8) Licensed EMA Electrical Rewiring. Which service do you need?",
    pricing: "As direct builders, our prices are transparent and itemized per foot run with zero hidden markups. We offer free on-site inspections and 2-hour quote turnaround. WhatsApp +65 8936 1834 for an instant estimate.",
    contact: "You can reach our senior project manager directly on WhatsApp at +65 8936 1834 or visit our showroom at 280 Woodlands Industrial Park E5, Singapore 757322. Would you like to schedule a free site measurement?"
  },
  zh: {
    welcome: "欢迎来到 Renovation Contractor SG！我们是新加坡直属装修总承包商。请问今天我们在哪些装修工程上可以为您提供帮助？",
    services: "我们拥有自有工匠团队，免除室内设计中介溢价，为您节省20%至35%费用：1) 卫生间翻新与三层防水 2) 全屋整装翻新（HDB组屋/公寓/有地住宅）3) 地砖与墙砖铺贴 4) 假天花板与隔墙 5) 品牌油漆与批灰粉刷 6) 门窗更换 7) SPC防水锁扣地板 8) 持证电工全屋布线。请问您需要了解哪项服务？",
    pricing: "直接承包商价格透明，无任何隐藏收费。我们提供免费上门勘测测量与2小时出具详细报价单。欢迎通过 WhatsApp +65 8936 1834 咨询！",
    contact: "欢迎通过 WhatsApp +65 8936 1834 联系我们的资深施工主管，或预约参观我们的材料展厅：280 Woodlands Industrial Park E5, Singapore。"
  },
  ms: {
    welcome: "Selamat datang ke Renovation Contractor SG! Kami adalah kontraktor renovasi terus di Singapura. Bagaimana kami boleh membantu projek rumah atau pejabat anda hari ini?",
    services: "Kami menyediakan tukang mahir in-house tanpa komisen pereka tengah (jimat 20%-35%): 1) Renovasi Tandas & Kalis Air 2) Renovasi Keseluruhan Rumah 3) Pemasangan Jubin Lantai & Dinding 4) Siling Palsu & Dinding Pemisah 5) Mengecat Rumah Nippon/Dulux 6) Pintu & Tingkap Diluluskan BCA 7) Lantai Vinil SPC 8) Pendawaian Elektrik Berlesen EMA.",
    pricing: "Harga kontraktor langsung sangat berpatutan dengan pecahan kos yang jelas tanpa caj tersembunyi. Pemeriksaan tapak dan sebut harga adalah percuma. Hubungi WhatsApp +65 8936 1834.",
    contact: "Hubungi pengurus projek kami terus di WhatsApp +65 8936 1834 atau kunjungi bilik pameran kami di 280 Woodlands Industrial Park E5, Singapura."
  },
  hi: {
    welcome: "Renovation Contractor SG में आपका स्वागत है! हम सिंगापुर के डायरेक्ट रिनोवेशन कॉन्ट्रैक्टर हैं। आज हम आपके नवीनीकरण कार्य में क्या सहायता कर सकते हैं?",
    services: "हमारी इन-हाउस कारीगरों की टीम बिना किसी बिचौलिए शुल्क के काम करती है (20%-35% की बचत): 1) टॉयलेट रिनोवेशन व वॉटरप्रूफिंग 2) संपूर्ण मकान रिनोवेशन (HDB/कंडो) 3) टाइलिंग कार्य 4) फॉल्स सीलिंग 5) हाउस पेंटिंग 6) दरवाजे व खिड़कियां 7) विनाइल फ्लोरिंग 8) इलेक्ट्रिकल वायरिंग।",
    pricing: "डायरेक्ट कॉन्ट्रैक्टर रेट्स पूरी तरह पारदर्शी हैं। फ्री ऑन-साइट इंस्पेक्शन और कोटेशन के लिए WhatsApp +65 8936 1834 पर संपर्क करें।",
    contact: "हमारे प्रोजेक्ट सुपरवाइजर से सीधे WhatsApp +65 8936 1834 पर संपर्क करें या वुडलैंड्स शोरूम में पधारें।"
  },
  ur: {
    welcome: "Renovation Contractor SG میں خوش آمدید! ہم سنگاپور کے ڈائریکٹ رینوویشن کنٹریکٹر ہیں۔ آج ہم آپ کے گھر یا دفتر کی تزئین و آرائش میں کیا مدد کر سکتے ہیں؟",
    services: "ہم بغیر کسی مڈل مین چارجز کے براہ راست کام کرتے ہیں (20% تا 35% بچت): 1) ٹوائلٹ رینوویشن و واٹر پروفنگ 2) مکمل گھر کی تزئین و آرائش 3) ٹائلز کا کام 4) فالس سیلنگ 5) پینٹ و پلاسٹر 6) دروازے اور کھڑکیاں 7) ونائل فلورنگ 8) الیکٹریکل وائرنگ।",
    pricing: "ہمارے ریٹس مارکیٹ سے مناسب اور شفاف ہیں۔ مفت سائٹ معائنے کے لیے واٹس ایپ +65 8936 1834 پر رابطہ کریں۔",
    contact: "سائٹ وزٹ یا معلومات کے لیے واٹس ایپ +65 8936 1834 پر رابطہ فرمائیں۔"
  },
  ar: {
    welcome: "مرحباً بكم في Renovation Contractor SG! مقاول التجديد المباشر في سنغافورة. كيف يمكننا مساعدتك في تجديد منزلك أو مكتبك اليوم؟",
    services: "نقدم خدمات التجديد المباشرة بدون وساطة وبتوفير 20%-35%: 1) تجديد الحمامات والعزل المائي 2) تجديد شامل للمنازل 3) تركيب البلاط 4) الأسقف المعلقة 5) دهانات نيبون وديلوكس 6) الأبواب والنوافذ المعتمدة 7) أرضيات الفينيل SPC 8) الأعمال الكهربائية المعتمدة.",
    pricing: "أسعار مقاول مباشرة وشفافة مع فحص مجاني للموقع وعرض أسعار فوري خلال ساعتين. تواصل عبر واتساب +65 8936 1834.",
    contact: "للتواصل المباشر مع مدير المشروع عبر واتساب: +65 8936 1834 أو تفضل بزيارة صالة العرض في وودلاندز، سنغافورة."
  }
};

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

// Generate smart fallback response based on user message and language
function getSmartFallbackReply(userMessage: string, lang: string): string {
  const detected = detectLanguage(lang, userMessage);
  const fb = FALLBACK_RESPONSES[detected] || FALLBACK_RESPONSES.en;
  const lower = userMessage.toLowerCase();

  // Price / Quote queries
  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("quote") ||
    lower.includes("dam") ||
    lower.includes("khoroch") ||
    lower.includes("খরচ") ||
    lower.includes("দাম") ||
    lower.includes("কত") ||
    lower.includes("budget") ||
    lower.includes("কত টাকা") ||
    lower.includes("多少钱") ||
    lower.includes("价格") ||
    lower.includes("harga") ||
    lower.includes("कीमत") ||
    lower.includes("قیمت") ||
    lower.includes("سعر")
  ) {
    return `${fb.pricing}\n\n${fb.contact}`;
  }

  // Contact / WhatsApp / Office queries
  if (
    lower.includes("contact") ||
    lower.includes("whatsapp") ||
    lower.includes("phone") ||
    lower.includes("call") ||
    lower.includes("number") ||
    lower.includes("jogajog") ||
    lower.includes("যোগাযোগ") ||
    lower.includes("নম্বর") ||
    lower.includes("ফোন") ||
    lower.includes("address") ||
    lower.includes("thikana") ||
    lower.includes("ঠিকানা") ||
    lower.includes("电话") ||
    lower.includes("nombor") ||
    lower.includes("नंबर") ||
    lower.includes("رقم")
  ) {
    return fb.contact;
  }

  // Specific service queries
  if (
    lower.includes("toilet") ||
    lower.includes("bathroom") ||
    lower.includes("tile") ||
    lower.includes("tiling") ||
    lower.includes("ceiling") ||
    lower.includes("paint") ||
    lower.includes("door") ||
    lower.includes("window") ||
    lower.includes("floor") ||
    lower.includes("vinyl") ||
    lower.includes("electric") ||
    lower.includes("carpentry") ||
    lower.includes("cabinet") ||
    lower.includes("টয়লেট") ||
    lower.includes("টাইলস") ||
    lower.includes("সিলিং") ||
    lower.includes("রং") ||
    lower.includes("দরজা") ||
    lower.includes("জানালা") ||
    lower.includes("ফ্লোর") ||
    lower.includes("ইলেকট্রিক") ||
    lower.includes("কাঠ")
  ) {
    return `${fb.services}\n\n${fb.contact}`;
  }

  // Default welcome/helpful response
  return `${fb.welcome}\n\n${fb.services}`;
}

// GET: Return public chat assistant configuration
export async function GET() {
  try {
    const settings = await getSettings();
    const ai = settings?.ai || {};
    const contact = settings?.contact || {};

    const configuredKey =
      ai.geminiApiKey || process.env.GEMINI_API_KEY || "";

    return NextResponse.json({
      success: true,
      botName: ai.botName || "Renovation Contractor SG",
      botSubtitle: ai.botSubtitle || "AI assistant · replies instantly",
      whatsapp: ai.whatsapp || contact.whatsapp || siteConfig.contact.whatsapp,
      welcomeMessageEn: ai.welcomeMessageEn || "Hi! How can we help you today?",
      welcomeMessageBn:
        ai.welcomeMessageBn ||
        "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
      model: ai.model || "gemini-2.5-flash",
      isAiConfigured: Boolean(configuredKey && configuredKey.trim().length > 5),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      botName: "Renovation Contractor SG",
      botSubtitle: "AI assistant · replies instantly",
      whatsapp: siteConfig.contact.whatsapp,
      welcomeMessageEn: "Hi! How can we help you today?",
      welcomeMessageBn:
        "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
      model: "gemini-2.5-flash",
      isAiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  }
}

// POST: Process chat message with Google Gemini API & smart fallback
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, language, testKey, testModel } = body;

    // Check if this is a connection test from Admin Dashboard
    const isTest = Boolean(testKey !== undefined);

    const settings = await getSettings();
    const ai = settings?.ai || {};

    // API Key resolution: explicit test key -> saved dashboard key -> env var
    const apiKey = (
      testKey !== undefined
        ? testKey
        : ai.geminiApiKey || process.env.GEMINI_API_KEY || ""
    ).trim();

    const selectedModel = (
      testModel || ai.model || "gemini-2.5-flash"
    ).trim();

    const systemPrompt = ai.systemPrompt || DEFAULT_SYSTEM_PROMPT;

    // Last user message
    const lastUserMessage = Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1].content
      : (isTest ? "Hello! Please confirm connection in one sentence." : "");

    const detectedLang = detectLanguage(language, lastUserMessage);

    // If no Gemini API key is provided and this is not an explicit test, use our built-in smart multilingual fallback
    if (!apiKey) {
      if (isTest) {
        return NextResponse.json(
          {
            success: false,
            error: "No Gemini API Key provided. Please paste your Gemini API Key.",
          },
          { status: 400 }
        );
      }

      const fallbackReply = getSmartFallbackReply(lastUserMessage, detectedLang);
      return NextResponse.json({
        success: true,
        reply: fallbackReply,
        source: "fallback_engine",
        notice:
          "Gemini API key is not configured in the Admin Dashboard (/admin). Using high-accuracy local knowledge base.",
      });
    }

    // Call Google Gemini REST API
    const modelsToTry = [
      selectedModel,
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    let lastError = "";
    let geminiReply = "";
    let usedModel = selectedModel;

    // Convert messages to Gemini format: user vs model
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

    // Try Gemini API with fallbacks
    for (const modelCandidate of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelCandidate}:generateContent?key=${apiKey}`;

        const payload = {
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 600,
          },
        };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          const text =
            data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (text) {
            geminiReply = text.trim();
            usedModel = modelCandidate;
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError =
            errData?.error?.message ||
            `HTTP ${response.status}: ${response.statusText}`;
        }
      } catch (err: any) {
        lastError = err?.message || String(err);
      }
    }

    if (geminiReply) {
      return NextResponse.json({
        success: true,
        reply: geminiReply,
        source: "gemini",
        model: usedModel,
      });
    }

    // If Gemini API call failed (e.g. invalid key or quota)
    if (isTest) {
      return NextResponse.json(
        {
          success: false,
          error: lastError || "Failed to connect to Google Gemini API. Please check your API key.",
        },
        { status: 400 }
      );
    }

    // Graceful fallback for visitors so the chatbot never shows a broken error
    const fallbackReply = getSmartFallbackReply(lastUserMessage, detectedLang);
    return NextResponse.json({
      success: true,
      reply: fallbackReply,
      source: "fallback_engine",
      apiError: lastError,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        success: true,
        reply:
          "Thank you for reaching out to Renovation Contractor SG! We are currently assisting multiple clients. Please message our senior supervisor directly on WhatsApp at +65 8936 1834 for an instant quotation.",
        source: "emergency_fallback",
        error: error.message,
      },
      { status: 200 }
    );
  }
}
