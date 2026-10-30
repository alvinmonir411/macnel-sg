import warrantyDataFallback from "../../data/warrantyTerms.json";
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

export function WarrantyPaymentSection({ customWarranty }: { customWarranty?: any } = {}) {
  const activeData = customWarranty || warrantyDataFallback;
  const { tradeWarranties, paymentSchedule, contractNotice, sampleQuotation } = activeData;

  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  return (
    <section id="warranty-terms" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services */}
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

        {/* Written Contract Notice */}
        <div className="mb-14 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-slate-800 shadow-sm">
          <FileCheck className="w-5 h-5 text-[#16a34a] shrink-0" />
          <span className="font-semibold text-slate-900">
            {clean(contractNotice)}
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Column 1: Trade Warranties Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16a34a]" />
              <span>Written Workmanship Warranties</span>
            </h3>

            {tradeWarranties?.map((w: any, idx: number) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm hover:border-[#16a34a]/40 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="text-base font-bold text-slate-900">
                    {clean(w.trade)}
                  </h4>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#166534] border border-emerald-200 text-xs font-black shrink-0">
                    {clean(w.duration)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                    <span><strong>Covered:</strong> {clean(w.covered)}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-500">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Not Covered:</strong> {clean(w.notCovered)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Milestone Payment Schedule */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#16a34a]" />
              <span>Transparent Progressive Payment Schedule</span>
            </h3>

            <div className="space-y-4">
              {paymentSchedule?.map((stage: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-sm hover:border-[#16a34a]/40 transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 border border-slate-700">
                    {stage.percentage}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {clean(stage.milestone)}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {clean(stage.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
