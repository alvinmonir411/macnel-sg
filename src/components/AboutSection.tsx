import Link from "next/link";
import teamData from "../../data/team.json";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  HardHat,
  Building2,
} from "lucide-react";

export function AboutSection() {
  const { companyStory, members } = teamData;
  const { legalName, uen, bcaLicense, hdbLicense } = siteConfig;

  // Clean placeholder prefixes for professional frontend presentation
  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

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

        {/* Team Leadership / Founder Profile */}
        <div className={members.length === 1 ? "max-w-3xl mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
          {members.map((member) => (
            <div
              key={member.id}
              className={`group rounded-3xl bg-white border border-slate-200/90 overflow-hidden hover:border-[#16a34a]/50 hover:shadow-2xl transition-all duration-300 shadow-sm ${
                members.length === 1 ? "flex flex-col sm:flex-row items-stretch" : "flex flex-col justify-between"
              }`}
            >
              <div className={members.length === 1 ? "relative aspect-[4/3] sm:aspect-auto sm:w-2/5 shrink-0 bg-slate-900 overflow-hidden min-h-[260px]" : "relative aspect-[4/3] w-full bg-slate-900 overflow-hidden"}>
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

              <div className={`p-6 sm:p-8 flex flex-col justify-center ${members.length === 1 ? "sm:w-3/5" : ""}`}>
                <span className="text-xs font-bold text-[#166534] block mb-1">
                  {clean(member.role)}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}
