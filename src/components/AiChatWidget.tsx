"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Check,
  Bot,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  delivered?: boolean;
}

const LANGUAGES = [
  { code: "en", label: "English", userLabel: "English" },
  { code: "bn", label: "বাংলা", userLabel: "বাংলা" },
  { code: "ar", label: "العربية", userLabel: "العربية" },
  { code: "hi", label: "हिन्दी", userLabel: "हिन्दी" },
  { code: "ur", label: "اردو", userLabel: "اردو" },
  { code: "ms", label: "Melayu", userLabel: "Melayu" },
  { code: "zh", label: "中文", userLabel: "中文" },
];

const GREETINGS_BY_LANG: Record<string, string> = {
  en: "Hi! How can we help you today? Whether you need painting, floor/wall tiling, false ceiling, electrical, carpentry, or toilet renovation, I am here to help!",
  bn: "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
  ar: "مرحباً بكم في Renovation Contractor SG! كيف يمكننا مساعدتك اليوم؟ سواء كنت بحاجة إلى طلاء، بلاط، أسقف معلقة، أعمال كهربائية، نجارة أو تجديد حمامات، نحن في خدمتك.",
  hi: "Renovation Contractor SG में आपका स्वागत है! आज हम आपकी क्या सहायता कर सकते हैं? पेंटिंग, टाइलिंग, फॉल्स सीलिंग, इलेक्ट्रिकल, बढ़ईगीरी या टॉयलेट रिनोवेशन, हम हर काम में मदद कर सकते हैं।",
  ur: "Renovation Contractor SG میں خوش آمدید! آج ہم آپ کے کام میں کیا مدد کر سکتے ہیں؟ پینٹنگ، ٹائلنگ، فال سیلنگ، الیکٹریکل، کارپینٹری یا ٹوائلٹ کی بحالی کے لیے ہم حاضر ہیں۔",
  ms: "Selamat datang ke Renovation Contractor SG! Bagaimana kami boleh membantu anda hari ini? Pengecatan, jubin, siling palsu, kerja elektrik, pertukangan kayu, atau renovasi tandas—saya sedia membantu.",
  zh: "欢迎来到 Renovation Contractor SG！请问今天我们能为您提供什么装修帮助？油漆粉刷、瓷砖铺贴、吊顶天花、电气布线、木工定制或卫生间翻新，我都可以为您解答。",
};

function formatCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [activeLang, setActiveLang] = useState<string>("en");
  const [isTyping, setIsTyping] = useState(false);
  const [config, setConfig] = useState({
    botName: "Renovation Contractor SG",
    botSubtitle: "AI assistant · replies instantly",
    whatsapp: siteConfig.contact.whatsapp,
    welcomeMessageEn: "Hi! How can we help you today?",
    welcomeMessageBn:
      "আপনাকে স্বাগতম! Renovation Contractor SG-এর ওয়েবসাইটে আপনি কী খুঁজছেন তা জানাতে পারেন। রঙ করা, টাইলস/টাইলিং, ফলস সিলিং, ইলেকট্রিক্যাল, কাঠের কাজ বা টয়লেট সংস্কার, যেকোনো বিষয়ে আমি সাহায্য করতে পারি।",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "assistant",
      content: "Hi! How can we help you today?",
      time: "12:50 PM",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch bot configuration from server
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/chat");
        if (res.ok) {
          const data = await res.json();
          if (data.botName) {
            setConfig((prev) => ({
              ...prev,
              botName: data.botName,
              botSubtitle: data.botSubtitle || prev.botSubtitle,
              whatsapp: data.whatsapp || prev.whatsapp,
              welcomeMessageEn: data.welcomeMessageEn || prev.welcomeMessageEn,
              welcomeMessageBn: data.welcomeMessageBn || prev.welcomeMessageBn,
            }));
            // Update initial greeting if customized
            if (data.welcomeMessageEn) {
              setMessages((prev) =>
                prev.length === 1 && prev[0].id === "init-1"
                  ? [
                      {
                        ...prev[0],
                        content: data.welcomeMessageEn,
                      },
                    ]
                  : prev
              );
            }
          }
        }
      } catch (err) {
        console.warn("Failed to load chat config:", err);
      }
    }
    loadConfig();
  }, []);

  // Auto-scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  // Handle language switch
  const handleSelectLanguage = (lang: typeof LANGUAGES[number]) => {
    setActiveLang(lang.code);

    const currentTime = formatCurrentTime();

    // 1. User message bubble (e.g. "বাংলা" or "English")
    const userMsg: ChatMessage = {
      id: `lang-user-${Date.now()}`,
      role: "user",
      content: lang.userLabel,
      time: currentTime,
      delivered: true,
    };

    // 2. Bot greeting in that language
    const botGreetingText =
      lang.code === "bn"
        ? config.welcomeMessageBn
        : lang.code === "en"
        ? config.welcomeMessageEn
        : GREETINGS_BY_LANG[lang.code] || GREETINGS_BY_LANG.en;

    const botMsg: ChatMessage = {
      id: `lang-bot-${Date.now() + 1}`,
      role: "assistant",
      content: botGreetingText,
      time: formatCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed || isTyping) return;

    const currentTime = formatCurrentTime();
    const newUserMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
      time: currentTime,
      delivered: true,
    };

    const nextHistory = [...messages, newUserMsg];
    setMessages(nextHistory);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call backend API (handles Gemini key from dashboard or fallback engine)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language: activeLang,
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        "Thank you for contacting Renovation Contractor SG! Please chat with us on WhatsApp at +65 8936 1834 for an instant quotation.";

      const botReplyMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: replyText,
        time: formatCurrentTime(),
      };

      setMessages((prev) => [...prev, botReplyMsg]);
    } catch (error) {
      console.error("Chat send error:", error);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "Thank you for reaching out! Our team is available right now on WhatsApp at +65 8936 1834. Feel free to message us directly for free site measurement & quote.",
        time: formatCurrentTime(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Hello ${config.botName}, I was speaking with your AI chatbot and would like to connect with a renovation specialist.`
  )}`;

  return (
    <>
      {/* 🌟 Floating Chat Launcher Button (Desktop & Mobile) */}
      {!isOpen && (
        <aside
          aria-label="AI Chat Assistant"
          className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 print:hidden animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#205493] via-[#1E40AF] to-[#2563EB] text-white shadow-[0_10px_25px_rgba(37,99,235,0.45)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/30 cursor-pointer"
            aria-label="Open AI Renovation Chatbot"
          >
            {/* Pulsing ring effect */}
            <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping opacity-75 pointer-events-none" />

            {/* Avatar with active green dot */}
            <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
              <Image
                src="/macnel-icon.svg"
                alt="Renovation Contractor SG"
                width={22}
                height={22}
                className="object-contain"
                onError={(e) => {
                  // Fallback to bot icon if image fails
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1.5 ring-white" />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>Chat with AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </p>
              <p className="text-[10px] text-blue-100 font-medium leading-tight">
                Instant SG Quotes
              </p>
            </div>

            <MessageSquare className="w-4 h-4 text-white sm:hidden" />
          </button>
        </aside>
      )}

      {/* 💬 Main Chat Widget Modal Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Renovation Contractor SG AI Assistant Chat Window"
          className="fixed inset-x-2 bottom-2 md:inset-auto md:bottom-6 md:right-6 z-50 w-auto md:w-[395px] max-w-[420px] h-[580px] max-h-[88vh] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.4)] border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 print:hidden font-sans"
        >
          {/* 1. Header Bar (Deep Royal Blue) */}
          <div className="bg-gradient-to-r from-[#205493] via-[#1E4E9E] to-[#2563EB] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-sm relative">
            <div className="flex items-center gap-3 min-w-0">
              {/* White avatar badge with company logo & green online dot */}
              <div className="relative w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                <Image
                  src="/macnel-icon.svg"
                  alt="Renovation Contractor SG"
                  width={28}
                  height={28}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
              </div>

              {/* Bot Title & Status */}
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate leading-tight">
                  {config.botName}
                </h3>
                <p className="text-[11px] text-blue-100/90 font-medium truncate mt-0.5">
                  {config.botSubtitle}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ml-2"
              title="Close Chat"
              aria-label="Close Chat Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Top Language Selector Pills */}
          <div className="px-3 py-2 bg-slate-50/90 border-b border-slate-200 shrink-0">
            <div className="flex items-center justify-center flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => {
                const isSelected = activeLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#2563EB] text-white font-bold shadow-xs scale-105"
                        : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 font-medium"
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8FAFC]">
            {messages.map((msg) => {
              const isBot = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isBot ? "items-start" : "items-end"
                  } animate-in fade-in slide-in-from-bottom-2 duration-150`}
                >
                  {isBot ? (
                    // Bot Message Bubble (Clean White Card)
                    <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white border border-slate-200/90 px-4 py-3 text-slate-800 text-[13px] leading-relaxed shadow-xs whitespace-pre-line">
                      {msg.content}
                    </div>
                  ) : (
                    // User Message Bubble (Solid Blue)
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#2563EB] text-white px-4 py-2.5 text-[13px] leading-relaxed shadow-sm font-medium whitespace-pre-line">
                      {msg.content}
                    </div>
                  )}

                  {/* Timestamp & Delivery Mark */}
                  <div
                    className={`text-[10.5px] text-slate-400 mt-1 flex items-center gap-1 ${
                      isBot ? "pl-1" : "pr-1"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {!isBot && (
                      <span className="flex items-center text-slate-400 font-medium">
                        · Delivered <Check className="w-3 h-3 ml-0.5 inline text-slate-400" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Animation Bubble */}
            {isTyping && (
              <div className="flex flex-col items-start animate-in fade-in">
                <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 px-4 py-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 pl-1">
                  AI is answering...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4. Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Write a message..."
                disabled={isTyping}
                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-slate-800 text-[13.5px] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="absolute right-1.5 w-8 h-8 rounded-full bg-[#7ba4d6] hover:bg-[#2563EB] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                title="Send message"
                aria-label="Send Message"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 translate-x-px" />
                )}
              </button>
            </form>

            {/* 5. Footer Action Link */}
            <div className="mt-2 text-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
              >
                <span>Talk to a person on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
