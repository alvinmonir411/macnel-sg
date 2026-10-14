"use client";

import { siteConfig } from "@/config/site";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingCTA() {
  const { contact, name } = siteConfig;

  return (
    <>
      {/* 📱 Sticky Mobile Bottom Bar (Hidden on Desktop) - Rule C.1 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0E172B]/95 backdrop-blur-lg border-t border-white/15 px-3 py-2.5 print:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          {/* Call Button */}
          <a
            href={`tel:${contact.phoneTel}`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-sm border border-white/20 transition-all"
            aria-label={`Call ${name}`}
          >
            <Phone className="w-4 h-4 text-[#8CCB6B]" />
            <span>Call</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(
              name
            )}%2C%20I%20would%20like%20a%20free%20quotation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-slate-950 font-black text-sm shadow-lg transition-all"
            aria-label={`Chat on WhatsApp with ${name}`}
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 💻 Desktop Floating WhatsApp Button (Hidden on Mobile) - Rule C.1 */}
      <aside
        aria-label="Desktop WhatsApp contact action"
        className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-3 print:hidden"
      >
        <a
          href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(
            name
          )}%2C%20I%20would%20like%20a%20free%20quotation.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${name} on WhatsApp`}
          title="Chat on WhatsApp"
          className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/40 group"
        >
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
          <MessageCircle className="w-7 h-7 fill-current relative z-10" />
        </a>
      </aside>
    </>
  );
}
