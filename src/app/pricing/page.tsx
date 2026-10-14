import type { Metadata } from "next";
import pricingData from "../../../data/pricing.json";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import {
  Banknote,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Singapore Renovation Pricing Guide | Renovation Contractor SG",
  description:
    "Transparent direct contractor renovation pricing guide for HDB BTO, resale flats, and condominiums in Singapore. Toilet renovation, hacking, tiling, and turnkey costs.",
  openGraph: {
    title: "Singapore Renovation Pricing Guide | Renovation Contractor SG",
    description:
      "Indicative direct contractor renovation costs for Singapore homes. Itemized breakdowns with zero hidden fees.",
    url: `${siteConfig.url}/pricing`,
  },
};

export default function PricingPage() {
  const { disclaimer, categories } = pricingData;

  return (
    <main className="bg-[#0B132B] text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#8CCB6B] mb-3">
            Transparent Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Singapore Renovation Pricing Guide
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Understand typical direct-to-builder market ranges for your property before committing.
            Every quotation we prepare is 100% itemized by square foot and run.
          </p>
        </div>

        {/* Disclaimer Alert */}
        <div className="mb-14 rounded-3xl bg-white/5 border border-white/15 p-6 sm:p-8 flex items-start gap-4 max-w-4xl mx-auto">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-white mb-1">
              Important Pricing Disclaimer
            </h2>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              {disclaimer}
            </p>
          </div>
        </div>

        {/* Categories Sections */}
        <div className="space-y-16 mb-20">
          {categories.map((cat) => (
            <div
              key={cat.categoryName}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-10 shadow-2xl"
            >
              <div className="mb-8 pb-4 border-b border-white/10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {cat.categoryName}
                </h2>
                <p className="text-sm text-slate-300 font-normal">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-black/25 border border-white/10 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                        {item.scope.replace("TODO_REPLACE: ", "")}
                      </h3>
                      <div className="text-2xl font-black text-[#8CCB6B] mb-2 tracking-tight">
                        {item.typicalRange.replace("TODO_REPLACE: ", "")}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-4 pb-3 border-b border-white/10">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Timeline: {item.timeline.replace("TODO_REPLACE: ", "")}</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          Includes:
                        </span>
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item.included}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-4">
                      <Link
                        href="/book"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-[#8CCB6B] hover:text-slate-900 border border-white/15 text-xs font-bold transition-all"
                      >
                        <span>Book Free Site Inspection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quotation Guarantee */}
        <div className="rounded-3xl bg-gradient-to-r from-[#16263F] to-[#0E172B] border border-white/15 p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <FileCheck className="w-12 h-12 text-[#8CCB6B] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Want an Accurate, Itemized Quote for Your Floor Plan?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal">
            Send us your floor plan or schedule a free on-site measurement. Our project directors
            will provide an itemized breakdown with guaranteed milestone pricing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-transform"
            >
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
