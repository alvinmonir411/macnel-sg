"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

export function FAQSection() {
  const { faqs } = siteConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // FAQPage JSON-LD Schema (Rule B.10)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Got Questions?</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Clear, honest answers about permits, milestone payments, warranties, and timelines.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all bg-white shadow-sm hover:border-[#16a34a]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-bold text-slate-900 text-base sm:text-lg focus:outline-none cursor-pointer hover:text-[#166534] transition-colors"
                >
                  <span className="pr-4 leading-snug">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#16a34a] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/60 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
