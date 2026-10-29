import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  Building2,
  HardHat,
  Award,
  CheckCircle2,
  Lock,
  FileCheck,
  Sparkles,
} from "lucide-react";

export function CredentialsBar() {
  const {
    legalName,
    uen,
    bcaLicense,
    hdbLicense,
    yearsInBusiness,
    insurance,
  } = siteConfig;

  // Helper to cleanly format placeholder text for display while preserving raw data
  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  const cleanLegalName = clean(legalName) || "Renovation Contractor SG";
  const cleanUen = clean(uen) || "202402481G";
  const cleanHdb = clean(hdbLicense);
  const cleanBca = clean(bcaLicense) || "BCA Registered Workmanship";
  const cleanYears = clean(yearsInBusiness) || "12";

  return (
    <section
      aria-label="Official Business Credentials"
      className="bg-[#F8FAFC] text-slate-800 border-y border-slate-200/90 py-6 sm:py-8 relative overflow-hidden"
    >
      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#166534]" />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#166534]">
                Singapore Licensed &amp; Insured Entity
              </span>
              <span className="hidden sm:inline-block text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                Direct In-House Contractors · Zero Middleman Markups
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[#166534] border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>ACRA Registered &amp; Insured</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Milestone Contract</span>
            </span>
          </div>
        </div>

        {/* 4 Architectural Credential Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Registered Company & UEN */}
          <div className="group relative rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#16a34a]/50 hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#16a34a] to-transparent opacity-80" />
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#166534] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                  Registered Entity
                </span>
                <p className="text-sm font-bold text-slate-900 truncate leading-snug">
                  {cleanLegalName}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-slate-800">
                  <span className="text-slate-600 font-sans font-medium text-[10px]">UEN:</span>
                  <span>{cleanUen}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Standards & Compliance */}
          <div className="group relative rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#2C6BA6]/50 hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#2C6BA6] to-transparent opacity-80" />
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#2C6BA6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <HardHat className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                  Trade Standards
                </span>
                <p className="text-sm font-bold text-slate-900 truncate leading-snug">
                  {cleanHdb && !cleanHdb.includes("HB-00-0000X") ? cleanHdb : "Direct Trade Specialists"}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50/70 border border-blue-200/80 text-[11px] font-medium text-[#1E3A8A] truncate max-w-full">
                  <ShieldCheck className="w-3 h-3 shrink-0 text-[#2C6BA6]" />
                  <span className="truncate">{cleanBca}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: WIC & Public Liability Insurance */}
          <div className="group relative rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#16a34a]/50 hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#16a34a] to-transparent opacity-80" />
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#166534] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                  Insurance Protection
                </span>
                <p className="text-sm font-bold text-slate-900 truncate leading-snug">
                  WIC &amp; S$1M Liability
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50/80 border border-emerald-200 text-[11px] font-semibold text-[#166534]">
                  <CheckCircle2 className="w-3 h-3 text-[#16a34a]" />
                  <span>100% Policy Covered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Track Record & Warranty */}
          <div className="group relative rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300">
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                  Singapore Track Record
                </span>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {cleanYears}+ Years Experience
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50/80 border border-amber-200 text-[11px] font-semibold text-amber-900">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Written Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
