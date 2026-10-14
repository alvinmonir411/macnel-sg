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
      className="bg-[#121F33] text-white border-y border-slate-700/80 py-4 sm:py-5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Section Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8CCB6B] shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#8CCB6B]" />
            <span>Singapore Licensed &amp; Insured Entity</span>
          </div>

          {/* Credentials Pills Grid */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            {legalName && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-white">{legalName}</span>
              </div>
            )}

            {uen && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <FileCheck className="w-3.5 h-3.5 text-[#8CCB6B]" />
                <span className="text-slate-400">UEN:</span>
                <span className="font-bold text-white tracking-wide">{uen}</span>
              </div>
            )}

            {hdbLicense && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <HardHat className="w-3.5 h-3.5 text-[#8CCB6B]" />
                <span>{hdbLicense}</span>
              </div>
            )}

            {bcaLicense && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>{bcaLicense}</span>
              </div>
            )}

            {yearsInBusiness && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{yearsInBusiness} Years in Singapore</span>
              </div>
            )}

            {insurance.workInjuryCompensation && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>WIC Insured</span>
              </div>
            )}

            {insurance.publicLiability && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public Liability Covered</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
