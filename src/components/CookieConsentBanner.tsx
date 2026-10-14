"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Show banner after brief delay
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", choice);
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="rounded-2xl bg-[#16263F]/95 backdrop-blur-xl border border-white/20 p-5 shadow-2xl text-white">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8CCB6B]/20 text-[#8CCB6B] flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-white text-sm mb-1">
              We Value Your Privacy
            </p>
            <p className="font-normal mb-3">
              We use minimal cookies for site performance and inquiry functionality in accordance with the Singapore PDPA.{" "}
              <Link href="/privacy-policy" className="text-[#8CCB6B] underline hover:text-white">
                Learn more in our Privacy Policy
              </Link>.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChoice("accepted")}
                className="px-4 py-2 rounded-lg bg-[#8CCB6B] hover:bg-[#A3E635] text-slate-950 font-bold text-xs transition-all cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => handleChoice("declined")}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Essential Only
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
