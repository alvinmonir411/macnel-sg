import type { Metadata } from "next";
import projectsData from "../../../data/projects.json";
import { siteConfig } from "@/config/site";
import { ProjectImage } from "@/components/ProjectImage";
import Link from "next/link";
import {
  Calendar,
  Banknote,
  Maximize2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
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

export default function ProjectsPage() {
  return (
    <main className="bg-[#0B132B] text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#8CCB6B] mb-3">
            Real Workmanship Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Completed Renovation Projects
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Every home is built with direct on-site craftsmanship. Browse our recent
            transformations across HDB flats, condominiums, and landed homes in Singapore.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {projectsData.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between shadow-2xl hover:border-[#8CCB6B]/40 transition-all"
            >
              <div>
                {/* Images side by side or toggle */}
                <div className="grid grid-cols-2 gap-0.5 bg-slate-900 aspect-[16/10] overflow-hidden">
                  <div className="relative h-full w-full">
                    <ProjectImage
                      src={proj.beforeImage}
                      alt={`${proj.title} Before`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded text-slate-300">
                      Before
                    </span>
                  </div>
                  <div className="relative h-full w-full">
                    <ProjectImage
                      src={proj.afterImage}
                      alt={`${proj.title} After`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#8CCB6B] text-slate-900 text-[10px] font-black px-2 py-0.5 rounded">
                      After
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#8CCB6B] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {proj.location.replace("TODO_REPLACE: ", "")}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-medium">
                      {proj.propertyType.replace("TODO_REPLACE: ", "")}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                    {proj.title.replace("TODO_REPLACE: ", "")}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-normal">
                    {proj.summary.replace("TODO_REPLACE: ", "")}
                  </p>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-xs text-slate-300 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{proj.sizeSqft.replace("TODO_REPLACE: ", "")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{proj.durationDays.replace("TODO_REPLACE: ", "")}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 font-bold text-white pt-1">
                      <Banknote className="w-3.5 h-3.5 text-[#8CCB6B]" />
                      <span>Cost: {proj.costRange.replace("TODO_REPLACE: ", "")}</span>
                    </div>
                  </div>

                  {/* Scope */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Executed Scope:
                    </span>
                    {proj.scopeOfWork.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0 mt-0.5" />
                        <span>{item.replace("TODO_REPLACE: ", "")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0">
                <Link
                  href="/book"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-lg transition-all"
                >
                  <span>Book Free Site Inspection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Box */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <ShieldCheck className="w-12 h-12 text-[#8CCB6B] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Want Similar Craftsmanship for Your Home?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            We inspect your site, check floor plan layouts, and provide an itemized quote with
            scheduled milestone guarantees. Zero obligation.
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
