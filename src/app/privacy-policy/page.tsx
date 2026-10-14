import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy (Singapore PDPA) | Renovation Contractor SG",
  description:
    "Privacy Policy for Renovation Contractor SG in compliance with Singapore Personal Data Protection Act 2012 (PDPA).",
};

export default function PrivacyPolicyPage() {
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
            Legal Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: 14 October 2026 · Singapore Personal Data Protection Act 2012 (PDPA)
          </p>
        </div>

        {/* Lawyer Review Notice (Rule D) */}
        <div className="mb-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 p-4 sm:p-5 text-amber-200 text-xs sm:text-sm">
          <strong>Notice:</strong> TODO_REPLACE: review with lawyer. This generic policy template is provided for initial compliance with Singapore PDPA standards and should be reviewed by legal counsel.
        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-10 space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Overview</h2>
            <p>
              This Privacy Policy explains how <strong>{legalName}</strong> (trading as <strong>{name}</strong>, UEN: <strong>{uen}</strong>) (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, and discloses personal data in accordance with the Personal Data Protection Act 2012 of Singapore (&ldquo;PDPA&rdquo;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Personal Data We Collect</h2>
            <p className="mb-2">
              When you submit a quote request, book an inspection, or contact us via WhatsApp, phone, or email, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Full Name</li>
              <li>Contact Number (Mobile / WhatsApp)</li>
              <li>Email Address</li>
              <li>Property address, unit number, and property type (HDB, Condo, Landed)</li>
              <li>Architectural floor plans and renovation requirements you provide</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Purpose of Data Collection</h2>
            <p className="mb-2">We collect and process your personal data strictly for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Preparing accurate, itemized renovation quotations and floor plan assessments</li>
              <li>Scheduling and conducting on-site measurements and inspections</li>
              <li>Communicating project progress, updates, and photos via WhatsApp or phone</li>
              <li>Submitting statutory renovation permits to HDB, BCA, or condominium management</li>
              <li>Executing contract administration, billing, and warranty servicing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Protection &amp; Retention</h2>
            <p>
              We implement reasonable security arrangements to prevent unauthorized access, collection, use, or disclosure of your personal data. We do not sell or trade your data to third-party telemarketers. Personal data is retained only for as long as necessary to fulfill business and legal warranty obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Protection Officer (DPO) Contact</h2>
            <p>
              For inquiries regarding your personal data, withdrawal of consent, or access requests, please contact our Data Protection Officer at:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-black/25 border border-white/10 text-xs sm:text-sm">
              <p><strong>Entity:</strong> {legalName}</p>
              <p><strong>Attention:</strong> Data Protection Officer</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Address:</strong> {contact.address.replace("TODO_REPLACE: ", "")}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
