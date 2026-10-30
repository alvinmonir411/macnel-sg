import { getLiveSiteData } from "@/lib/db";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
} from "lucide-react";


export const metadata: Metadata = {
  title: "Completed Renovation Projects & Portfolio Singapore",
  description:
    "Explore real Singapore renovation projects by Renovation Contractor SG. Complete with before/after comparisons, square footage, timelines, and transparent cost ranges.",
  openGraph: {
    title: "Completed Renovation Projects | Renovation Contractor SG",
    description:
      "Explore real Singapore renovation projects with before/after comparisons, timelines, and transparent cost ranges.",
    url: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const siteData = await getLiveSiteData();
  const projects = siteData.projects || [];
  return (
    <main className="bg-[#F8FAFC] text-slate-900 min-h-screen py-16 sm:py-24 relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-[#166534] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Verified Workmanship Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4 leading-tight">
            Completed Renovation Projects
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Every home is built with direct on-site craftsmanship. Browse our recent
            transformations across HDB flats, condominiums, and landed homes in Singapore.
            Click any project to inspect the full brief and itemized scope.
          </p>
        </div>

        {/* Compact, Interactive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((proj: any) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

        {/* Quality Guarantee Box */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#166534] border border-emerald-100 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-[#16a34a]" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
            Want Similar Direct Contractor Quality for Your Home?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            We inspect your site, check floor plan layouts, and provide an itemized quote with
            scheduled milestone guarantees. Zero ID markups, 100% direct accountability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-transform"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base shadow-sm transition-all"
            >
              <span>Instant WhatsApp Quote</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
