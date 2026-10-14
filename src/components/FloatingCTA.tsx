"use client";

import { siteConfig } from "@/config/site";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <aside
      aria-label="Contact quick actions"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 print:hidden"
    >
      {/* Call Button */}
      <a
        href={`tel:${siteConfig.contact.phoneTel}`}
        aria-label={`Call ${siteConfig.name}`}
        title={`Call ${siteConfig.name}`}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#2C6BA6] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/40"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
          siteConfig.name
        )}%2C%20I%20would%20like%20a%20free%20quotation.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
        title="Chat on WhatsApp"
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white/40 group"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </aside>
  );
}
