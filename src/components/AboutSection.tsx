"use client";

import Link from "next/link";
import teamData from "../../data/team.json";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  HardHat,
  Building2,
} from "lucide-react";

export function AboutSection() {
  const { companyStory, members, workingProcess } = teamData;
  const { legalName, uen, bcaLicense, hdbLicense, yearsInBusiness } = siteConfig;

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/70 relative overflow-hidden">
      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-2.5">
              Direct In-House Builders
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight mb-5">
              Meet The People Building Your Home
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
              {companyStory.replace("TODO_REPLACE: ", "")}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#166534] hover:text-[#15803d] transition-colors"
            >
              <span>Read our full company story &amp; standards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Credentials Summary Box */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#166534] mb-4">
              <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
              <span>Singapore Builder Credentials</span>
            </div>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs">Registered Entity</span>
                  <span className="font-bold text-slate-900">{legalName}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <HardHat className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs">ACRA UEN &amp; Directory</span>
                  <span className="font-bold text-slate-900">UEN: {uen} · {hdbLicense}</span>
                </div>
              </div>
              {bcaLicense && (
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#2C6BA6] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">BCA Registry</span>
                    <span className="font-bold text-slate-900">{bcaLicense}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-[#16a34a]/50 hover:shadow-xl transition-all shadow-sm"
            >
              <div>
                {/* Photo or Neutral Placeholder */}
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <ProjectImage
                    src={member.photo}
                    alt={member.name.replace("TODO_REPLACE: ", "")}
                    fallbackText="Add team photo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold text-[#166534] block mb-1">
                    {member.role.replace("TODO_REPLACE: ", "")}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {member.name.replace("TODO_REPLACE: ", "")}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-3">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{member.experience.replace("TODO_REPLACE: ", "")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {member.bio.replace("TODO_REPLACE: ", "")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 6-Stage Working Process Highlight */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#166534] block mb-2">
              Step-by-Step Transparency
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How We Work With You
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workingProcess.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#166534] border border-emerald-200 font-black text-sm flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
