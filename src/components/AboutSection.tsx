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
  CheckCircle2,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

export function AboutSection() {
  const { companyStory, members } = teamData;
  const { legalName, uen, bcaLicense, hdbLicense } = siteConfig;
  const founder = members[0] || {
    name: "Managing Director & Founder",
    role: "Managing Director & Lead Project Supervisor",
    experience: "12+ Years Singapore Renovation Specialist",
    credentials: "BCA Certified CoreTrade Specialist",
    bio: "Direct on-site supervision, plumbing & sanitary installations, structural works, and quality control from hacking to final handover.",
    photo: "/images/team/owner.jpg",
  };

  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow & Headline */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black uppercase tracking-[0.2em] text-[#166534] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
            Direct Craftsman. <br className="hidden sm:block" />
            <span className="text-[#166534]">Personal Accountability On Every Site.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Skip middleman design firms and speak directly with the direct contractor who leads your project on-site from day one.
          </p>
        </div>

        {/* Editorial Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Founder Editorial Portrait Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden group hover:border-[#16a34a]/40 transition-all duration-300">
            {/* Visual Photo Area */}
            <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full bg-slate-950 overflow-hidden">
              <ProjectImage
                src={founder.photo}
                alt={clean(founder.name)}
                fallbackText="Founder on-site photo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Verified Trade Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B]" />
                <span>On-Site Supervisor</span>
              </div>

              {/* Lower Overlay Credentials */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-[#8CCB6B] block uppercase tracking-wider">
                  {clean(founder.role)}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {clean(founder.name)}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{clean(founder.credentials) || "BCA Certified CoreTrade Specialist"}</span>
                </div>
              </div>
            </div>

            {/* Founder Personal Note & Quick Contact */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-gradient-to-b from-white to-slate-50/70">
              <blockquote className="text-xs sm:text-sm text-slate-700 italic leading-relaxed border-l-2 border-[#16a34a] pl-3.5 mb-6">
                &ldquo;When you trust us with your home, you don&rsquo;t deal with an interior design salesperson. You deal directly with me and our in-house master tilers, carpenters, and electricians.&rdquo;
              </blockquote>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                    siteConfig.name
                  )}%2C%20I%20would%20like%20to%20consult%20directly%20with%20your%20supervisor.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat with Founder</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8CCB6B]" />
                  <span>Direct Hotline</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Story, Philosophy & Credentials (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Story Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#166534] block">
                Our Workmanship Philosophy
              </span>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {clean(companyStory)}
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100/80">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#166534] flex items-center justify-center text-xs font-black mb-2">
                    01
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">100% In-House</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Tilers &amp; carpenters on our direct payroll.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/80">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#2C6BA6] flex items-center justify-center text-xs font-black mb-2">
                    02
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">Zero Middleman</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Save 20% to 35% on interior design markups.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100/80">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black mb-2">
                    03
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">Written Warranty</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    12-month structural &amp; leak coverage.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Registration & UEN Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#091222] border border-slate-800 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8CCB6B]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#8CCB6B]">
                    ACRA Registered Entity
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white">
                  {clean(legalName)}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span>UEN: {clean(uen)}</span>
                  <span>·</span>
                  <span className="text-[#8CCB6B]">Singapore Registered</span>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all shrink-0 hover:scale-105"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8CCB6B]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
