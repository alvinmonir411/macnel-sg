import { getLiveSiteData } from "@/lib/db";
import type { Metadata } from "next";
import teamData from "../../../data/team.json";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  HardHat,
  Building2,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";


export const metadata: Metadata = {
  title: "About Us & Licensed Renovation Contractor Singapore | Renovation Contractor SG",
  description:
    "Learn about Renovation Contractor SG (UEN: 202402481G), our direct in-house craftsmen, Singapore BCA compliance, insurance coverage, and transparent working process.",
  openGraph: {
    title: "About Us | Renovation Contractor SG",
    description:
      "Direct Singapore renovation contractor with dedicated in-house craftsmen, verified credentials, and zero ID markups.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const { companyStory, members, workingProcess } = teamData;
  const {
    legalName,
    uen,
    bcaLicense,
    hdbLicense,
    yearsInBusiness,
    insurance,
    contact,
  } = siteConfig;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle Architectural Dot Grid - Matching Home Page */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black uppercase tracking-[0.2em] text-[#166534] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span>Direct Singapore Contractor</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-5 leading-[1.18]">
            Honest Craftsmanship, Dedicated On-Site Supervision.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {companyStory.replace(/^TODO_REPLACE:\s*/i, "")}
          </p>
        </div>

        {/* Official Credentials Grid */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 mb-16 shadow-sm">
          <h2 className="text-2xl font-extrabold text-[#0F172A] mb-6 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#16a34a]" />
            <span>Singapore Registration &amp; Insurance Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Company Legal Name</span>
              <span className="font-extrabold text-[#0F172A] text-base">{legalName.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">ACRA UEN Number</span>
              <span className="font-extrabold text-[#0F172A] text-base font-mono">{uen.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            {hdbLicense && !hdbLicense.includes("HB-00-0000X") && !hdbLicense.includes("TODO_REPLACE") && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">HDB Renovation Directory</span>
                <span className="font-extrabold text-[#0F172A] text-base">{hdbLicense.replace(/^TODO_REPLACE:\s*/i, "")}</span>
              </div>
            )}
            {bcaLicense && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">BCA Contractor Registry</span>
                <span className="font-extrabold text-[#0F172A] text-base">{bcaLicense.replace(/^TODO_REPLACE:\s*/i, "")}</span>
              </div>
            )}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Work Injury Compensation (WIC)</span>
              <span className="font-extrabold text-[#0F172A] text-base">{insurance.workInjuryCompensation.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">Public Liability Insurance</span>
              <span className="font-extrabold text-[#0F172A] text-base">{insurance.publicLiability.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
          </div>
        </div>

        {/* Team Leadership */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#166534] block mb-2">
              Leadership &amp; Craft Masters
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Project Directors &amp; In-House Specialists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((m) => {
              const isFounder = m.id === "member-1";
              return (
                <div
                  key={m.id}
                  className={`group rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${
                    isFounder
                      ? "bg-white border-2 border-emerald-500/80 shadow-[0_4px_24px_rgba(22,163,74,0.12)]"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                      <ProjectImage
                        src={m.photo}
                        alt={m.name.replace(/^TODO_REPLACE:\s*/i, "")}
                        fallbackText="Add team photo"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                        <span>{m.credentials.replace(/^TODO_REPLACE:\s*/i, "")}</span>
                      </div>
                      {isFounder && (
                        <div className="absolute top-3 right-3 bg-[#16a34a] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          Founder &amp; Owner
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-[#166534] block mb-1">
                        {m.role.replace(/^TODO_REPLACE:\s*/i, "")}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#0F172A] mb-1">
                        {m.name.replace(/^TODO_REPLACE:\s*/i, "")}
                      </h3>
                      <p className="text-xs text-amber-700 font-semibold mb-3 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>{m.experience.replace(/^TODO_REPLACE:\s*/i, "")}</span>
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {m.bio.replace(/^TODO_REPLACE:\s*/i, "")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Working Process */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 mb-16 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#166534] block mb-2">
              Our 6-Step Working Process
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Transparent From First Measurement to Handover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workingProcess.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200"
              >
                <span className="w-10 h-10 rounded-xl bg-emerald-100 text-[#166534] font-black text-sm flex items-center justify-center mb-3">
                  {step.step}
                </span>
                <h3 className="text-base font-extrabold text-[#0F172A] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0A1124] to-[#162740] text-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Book a Free Site Visit with Our Project Director
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6 font-normal max-w-xl mx-auto">
            Speak directly with the craftsmen and supervisors executing your works. Detailed floor plan review and
            itemized quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20to%20discuss%20my%20renovation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
