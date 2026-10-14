import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Renovation Contractor SG",
  description:
    "Terms of service, milestone payments, variations, and warranty obligations for Renovation Contractor SG.",
};

export default function TermsPage() {
  const { name, legalName, uen, contact } = siteConfig;

  return (
    <main className="bg-[#0B132B] text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8CCB6B] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8CCB6B] block mb-2">
            Contractual Standards
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: 14 October 2026 · Governing Law: Republic of Singapore
          </p>
        </div>

        {/* Lawyer Review Notice (Rule D) */}
        <div className="mb-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 p-4 sm:p-5 text-amber-200 text-xs sm:text-sm">
          <strong>Notice:</strong> TODO_REPLACE: review with lawyer. The terms below reflect standard Singapore building and renovation contractor practices and should be formally reviewed by legal counsel.
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-10 space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Binding Contract</h2>
            <p>
              These Terms of Service govern the engagement between <strong>{legalName}</strong> (trading as <strong>{name}</strong>, UEN: <strong>{uen}</strong>) and the homeowner or client. Before any on-site work commences, an itemized contract stating scope, materials, milestone percentages, and completion dates must be executed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Quotations &amp; Site Inspection</h2>
            <p>
              Estimates provided online or over phone/WhatsApp are indicative. Binding quotations are issued only after on-site physical measurement, review of approved architectural drawings, and inspection of existing structural conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Milestone Payments</h2>
            <p>
              Payments must be remitted strictly in accordance with the milestone completion schedule outlined in your signed contract. Progress claims correspond to verified physical site milestones (Deposit, Hacking, Wet Works/Tiling, Fixture Installation, and Final Handover).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Variation Orders (VO)</h2>
            <p>
              Any changes, additions, or omissions to the original scope requested by the client shall be documented in an itemized Variation Order with pricing approved in writing before execution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Renovation Permits &amp; Regulations</h2>
            <p>
              All works comply with Housing &amp; Development Board (HDB) and Building &amp; Construction Authority (BCA) guidelines, as well as condominium management bylaws. We facilitate permit submissions upon client authorization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of Singapore. Any disputes shall be submitted to the Singapore Mediation Centre (SMC) or the Small Claims Tribunals / Courts of Singapore.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
