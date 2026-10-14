"use client";

import { siteConfig } from "@/config/site";
import { ShieldCheck, FileCheck, Building2, HardHat, Award } from "lucide-react";

export function CredentialsBar() {
  const {
    legalName,
    uen,
    bcaLicense,
    hdbLicense,
    yearsInBusiness,
    insurance,
  } = siteConfig;

  // Check if any credential exists to render
  const hasCredentials =
    Boolean(legalName) ||
    Boolean(uen) ||
    Boolean(bcaLicense) ||
    Boolean(hdbLicense) ||
    Boolean(yearsInBusiness) ||
    Boolean(insurance.workInjuryCompensation) ||
    Boolean(insurance.publicLiability);

  if (!hasCredentials) return null;

  return (
    <section
      aria-label="Official Business Credentials"
      className="bg-[#F8FAFC] text-slate-800 border-y border-slate-200/90 shadow-sm py-4 sm:py-5 relative overflow-hidden"
    >
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Section Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#166534] shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Singapore Licensed &amp; Insured Entity</span>
          </div>

          {/* Credentials Pills Grid */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            {legalName && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-semibold text-slate-900">{legalName}</span>
              </div>
            )}

            {uen && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <FileCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                <span className="text-slate-500">UEN:</span>
                <span className="font-bold text-slate-900 tracking-wide">{uen}</span>
              </div>
            )}

            {hdbLicense && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <HardHat className="w-3.5 h-3.5 text-[#16a34a]" />
                <span className="font-medium text-slate-800">{hdbLicense}</span>
              </div>
            )}

            {bcaLicense && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C6BA6]" />
                <span className="font-medium text-slate-800">{bcaLicense}</span>
              </div>
            )}

            {yearsInBusiness && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-medium text-slate-800">{yearsInBusiness} Years in Singapore</span>
              </div>
            )}

            {insurance.workInjuryCompensation && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-slate-800">WIC Insured</span>
              </div>
            )}

            {insurance.publicLiability && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium text-slate-800">Public Liability Covered</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
