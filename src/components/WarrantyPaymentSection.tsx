import warrantyData from "../../data/warrantyTerms.json";
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  FileCheck,
  Check,
} from "lucide-react";

export function WarrantyPaymentSection() {
  const { tradeWarranties, paymentSchedule, contractNotice, sampleQuotation } =
    warrantyData;

  return (
    <section id="warranty-terms" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-2.5">
            Legal &amp; Contractual Protection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Warranty &amp; Milestone Payment Terms
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Every renovation with us is bound by a formal Singapore contract.
            Transparent warranty durations by trade and milestone payments tied directly to verified site progress.
          </p>
        </div>

        {/* Written Contract Notice (Rule B.6) */}
        <div className="mb-14 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-slate-800 shadow-sm">
          <FileCheck className="w-5 h-5 text-[#16a34a] shrink-0" />
          <span className="font-semibold text-slate-900">
            {contractNotice}
          </span>
        </div>

        {/* 2-Column Grid (Rule B.6) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Column 1: Warranty by Trade */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-[#16a34a]" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Workmanship Warranty by Trade
                </h3>
              </div>

              <div className="space-y-4">
                {tradeWarranties.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {w.trade}
                      </span>
                      <span className="text-xs font-bold text-[#166534] bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {w.duration.replace("TODO_REPLACE: ", "")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-3 pt-2 border-t border-slate-200/70">
                      <div>
                        <span className="text-[#166534] font-bold block mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" /> Covered:
                        </span>
                        <p className="text-slate-600 leading-relaxed">{w.covered}</p>
                      </div>
                      <div>
                        <span className="text-slate-700 font-bold block mb-1 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" /> Exclusions:
                        </span>
                        <p className="text-slate-500 leading-relaxed">{w.notCovered}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Milestone Payment Timeline */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-[#16a34a]" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Milestone Progress Payment Schedule
                </h3>
              </div>

              <div className="space-y-3.5">
                {paymentSchedule.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#166534] font-black text-sm sm:text-base flex items-center justify-center shrink-0 border border-emerald-200 shadow-sm">
                      {p.percentage}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">
                        {p.milestone}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* See How We Quote Block (Rule B.7) */}
        <div className="rounded-3xl bg-gradient-to-r from-[#16263F] to-[#121F33] border border-white/15 p-8 sm:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-2">
                Sample Quotation Transparency
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                See How We Quote Before You Book
              </h3>
              <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
                We believe in full transparency. Our quotations are never single lump-sum figures.
                Every quotation includes detailed line-item specifications:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200 mb-6">
                {sampleQuotation.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#8CCB6B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <a
                href={sampleQuotation.downloadUrl}
                download="sample-quotation.pdf"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#8CCB6B] hover:bg-[#A3E635] text-slate-900 font-extrabold text-sm sm:text-base shadow-xl transition-all hover:scale-105"
              >
                <Download className="w-5 h-5 text-slate-900" />
                <span>Download Sample Quotation PDF</span>
              </a>
              <span className="text-xs text-slate-400 mt-2">
                Format: PDF (Sample Itemized Contractor Layout)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
