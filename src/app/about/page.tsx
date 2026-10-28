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
  title: "About Us & Licensed Builders Singapore | Renovation Contractor SG",
  description:
    "Learn about Renovation Contractor SG (UEN: 202402481G), our direct in-house craftsmen, Singapore BCA & HDB compliance, insurance coverage, and transparent working process.",
  openGraph: {
    title: "About Us | Renovation Contractor SG",
    description:
      "Direct Singapore renovation contractor with dedicated in-house builders, verified credentials, and zero ID markups.",
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
    <main className="bg-[#0B132B] text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#8CCB6B] mb-3">
            Direct Singapore Builder
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Honest Craftsmanship, Dedicated On-Site Supervision.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {companyStory.replace(/^TODO_REPLACE:\s*/i, "")}
          </p>
        </div>

        {/* Official Credentials Grid */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 mb-20 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#8CCB6B]" />
            <span>Singapore Registration &amp; Insurance Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-200">
            <div className="p-4 rounded-xl bg-black/20 border border-white/10">
              <span className="text-xs text-slate-400 block mb-1">Company Legal Name</span>
              <span className="font-bold text-white text-base">{legalName.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/20 border border-white/10">
              <span className="text-xs text-slate-400 block mb-1">ACRA UEN Number</span>
              <span className="font-bold text-white text-base font-mono">{uen.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/20 border border-white/10">
              <span className="text-xs text-slate-400 block mb-1">HDB Renovation Directory</span>
              <span className="font-bold text-white text-base">{hdbLicense.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            {bcaLicense && (
              <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">BCA Contractor Registry</span>
                <span className="font-bold text-white text-base">{bcaLicense.replace(/^TODO_REPLACE:\s*/i, "")}</span>
              </div>
            )}
            <div className="p-4 rounded-xl bg-black/20 border border-white/10">
              <span className="text-xs text-slate-400 block mb-1">Work Injury Compensation (WIC)</span>
              <span className="font-bold text-white text-base">{insurance.workInjuryCompensation.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/20 border border-white/10">
              <span className="text-xs text-slate-400 block mb-1">Public Liability Insurance</span>
              <span className="font-bold text-white text-base">{insurance.publicLiability.replace(/^TODO_REPLACE:\s*/i, "")}</span>
            </div>
          </div>
        </div>

        {/* Team Leadership */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-2">
              Leadership &amp; Craft Masters
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Project Directors &amp; In-House Specialists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {members.map((m) => {
              const isFounder = m.id === "member-1";
              return (
                <div
                  key={m.id}
                  className={`group rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 ${
                    isFounder
                      ? "bg-gradient-to-b from-[#14233c] to-[#0d1726] border-2 border-[#8CCB6B]/60 shadow-[0_0_30px_rgba(140,203,107,0.2)] hover:border-[#8CCB6B]"
                      : "bg-white/5 border border-white/10 hover:border-[#8CCB6B]/40"
                  }`}
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                      <ProjectImage
                        src={m.photo}
                        alt={m.name.replace(/^TODO_REPLACE:\s*/i, "")}
                        fallbackText="Add team photo"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 bg-[#0A1424]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B]" />
                        <span>{m.credentials.replace(/^TODO_REPLACE:\s*/i, "")}</span>
                      </div>
                      {isFounder && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#8CCB6B] to-[#A3E635] text-[#0A1424] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-lg">
                          Founder &amp; Owner
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-[#8CCB6B] block mb-1">
                        {m.role.replace(/^TODO_REPLACE:\s*/i, "")}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {m.name.replace(/^TODO_REPLACE:\s*/i, "")}
                      </h3>
                      <p className="text-xs text-amber-300 font-semibold mb-3 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>{m.experience.replace(/^TODO_REPLACE:\s*/i, "")}</span>
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
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
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-2">
              Our 6-Step Working Process
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Transparent From First Measurement to Handover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workingProcess.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-black/20 border border-white/10"
              >
                <span className="w-9 h-9 rounded-xl bg-[#8CCB6B]/20 text-[#8CCB6B] font-black text-sm flex items-center justify-center mb-3">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Book a Free Site Visit with Our Project Director
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6 font-normal">
            Speak directly with the builders executing your works. Detailed floor plan review and
            itemized quote.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-transform"
          >
            <span>Book Free Site Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
