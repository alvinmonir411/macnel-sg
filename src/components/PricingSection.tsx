"use client";

import { useState } from "react";
import Link from "next/link";
import pricingData from "../../data/pricing.json";
import { Banknote, AlertCircle, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export function PricingSection() {
  const { disclaimer, categories } = pricingData;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = categories[activeCategoryIndex] || categories[0];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#121F33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#8CCB6B] mb-2.5">
              Transparent Estimation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Indicative Renovation Pricing Guide
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
              Direct contractor rates across standard Singapore residential scopes. No middleman markups.
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all self-start md:self-end shrink-0"
          >
            <span>Full Pricing Guide</span>
            <ArrowRight className="w-4 h-4 text-[#8CCB6B]" />
          </Link>
        </div>

        {/* Disclaimer Alert Box (Rule B.5) */}
        <div className="mb-10 rounded-2xl bg-white/5 border border-white/15 p-4 sm:p-5 flex items-start gap-3.5 text-xs sm:text-sm text-slate-200">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-bold mb-0.5">Important Notice:</strong>
            <p className="text-slate-300 font-normal leading-relaxed">{disclaimer}</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {categories.map((cat, idx) => (
            <button
              type="button"
              key={cat.categoryName}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategoryIndex === idx
                  ? "bg-[#8CCB6B] text-slate-900 shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
              }`}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>

        {/* Price Items Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeCategory.items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:border-[#8CCB6B]/40 transition-all shadow-xl"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {item.scope.replace("TODO_REPLACE: ", "")}
                </h3>
                <div className="text-2xl font-black text-[#8CCB6B] mb-3 tracking-tight">
                  {item.typicalRange.replace("TODO_REPLACE: ", "")}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-4 pb-3 border-b border-white/10">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Timeline: {item.timeline.replace("TODO_REPLACE: ", "")}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    What&apos;s Included:
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
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 hover:bg-[#8CCB6B] hover:text-slate-900 border border-white/15 text-xs font-bold transition-all"
                >
                  <span>Book Free Site Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
