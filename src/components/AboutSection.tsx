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
  Sparkles,
  Camera,
} from "lucide-react";

export function AboutSection() {
  const { companyStory, members, workingProcess } = teamData;
  const { legalName, uen, bcaLicense, hdbLicense } = siteConfig;

  // Clean placeholder prefixes for professional frontend presentation
  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  const onSiteShowcase = [
    {
      title: "HDB Concrete Hacking",
      trade: "Structural Prep",
      image: "/images/house-reno/1.jpeg",
    },
    {
      title: "Laser Level Tiling",
      trade: "Master Masonry",
      image: "/images/tiling/13.jpeg",
    },
    {
      title: "Custom Full-Height Wardrobe",
      trade: "In-House Carpentry",
      image: "/images/carpentry/2.jpeg",
    },
    {
      title: "Ceiling & Rockwool Insulation",
      trade: "Acoustic System",
      image: "/images/partition-ceiling/12.jpeg",
    },
    {
      title: "Bespoke Arched French Door",
      trade: "Door & Glasswork",
      image: "/images/door-window/1.jpeg",
    },
    {
      title: "Completed Luxury Bathroom",
      trade: "Turnkey Handover",
      image: "/images/tiling/7.jpeg",
    },
  ];

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
              {clean(companyStory)}
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
          <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#166534] mb-4">
              <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
              <span>Singapore Builder Credentials</span>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <span className="text-slate-600 block text-[11px] font-bold uppercase">Registered Entity</span>
                  <span className="font-bold text-slate-900 text-sm">{clean(legalName)}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#166534] flex items-center justify-center shrink-0 mt-0.5">
                  <HardHat className="w-4 h-4 text-[#16a34a]" />
                </div>
                <div>
                  <span className="text-slate-600 block text-[11px] font-bold uppercase">ACRA UEN &amp; Directory</span>
                  <span className="font-bold text-slate-900 text-sm">UEN: {clean(uen)} · {clean(hdbLicense)}</span>
                </div>
              </div>
              {bcaLicense && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2C6BA6] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-[#2C6BA6]" />
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[11px] font-bold uppercase">BCA Registry</span>
                    <span className="font-bold text-slate-900 text-sm">{clean(bcaLicense)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {members.map((member, idx) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-[#16a34a]/50 hover:shadow-2xl transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Photo with subtle overlay */}
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                  <ProjectImage
                    src={member.photo}
                    alt={clean(member.name)}
                    fallbackText="Add team photo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Verified Trade Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#0A1424]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B]" />
                    <span>{clean(member.credentials)}</span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold text-[#166534] block mb-1">
                    {clean(member.role)}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {clean(member.name)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mb-3">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{clean(member.experience)}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {clean(member.bio)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Daily Works On Singapore Sites - Photo Strip */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#166534] block mb-1">
                Authentic Craftsmanship
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#16a34a]" />
                <span>Direct Photos From Our Singapore Job Sites</span>
              </h3>
            </div>
            <Link
              href="/project-gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] hover:text-[#15803d] transition-colors"
            >
              <span>View full job site gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {onSiteShowcase.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[4/5] shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8CCB6B] block">
                    {item.trade}
                  </span>
                  <p className="text-xs font-bold leading-tight truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6-Stage Working Process Highlight */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm">
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
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm hover:border-[#16a34a]/40 hover:bg-white transition-all"
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
