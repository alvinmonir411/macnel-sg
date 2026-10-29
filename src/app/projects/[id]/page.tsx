import { getLiveSiteData } from "@/lib/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import projectsData from "../../../../data/projects.json";
import { siteConfig } from "@/config/site";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

import {
  Calendar,
  Banknote,
  Maximize2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}


export async function generateStaticParams() {
  return projectsData.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Renovation Contractor SG",
    };
  }

  const cleanTitle = project.title.replace(/^TODO_REPLACE:\s*/i, "");
  const cleanSummary = project.summary.replace(/^TODO_REPLACE:\s*/i, "");

  return {
    title: `${cleanTitle} | Completed Singapore Renovation`,
    description: cleanSummary,
    openGraph: {
      title: `${cleanTitle} | Renovation Contractor SG`,
      description: cleanSummary,
      images: [project.afterImage],
    },
  };
}

async function ProjectDetailContent({ params }: PageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const clean = (val: string | undefined) =>
    val ? val.replace(/^TODO_REPLACE:\s*/i, "").trim() : "";

  // Related projects
  const relatedProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main className="bg-[#F8FAFC] text-slate-900 min-h-screen py-10 sm:py-16 relative overflow-hidden border-b border-slate-200/70">
        {/* Subtle Architectural Dot Grid - Matching Core Services Style (NO LINE GRID) */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 overflow-x-auto no-scrollbar py-1">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            <Link href="/projects" className="hover:text-slate-900 transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            <Link href="/project-gallery" className="hover:text-slate-900 transition-colors">
              Gallery
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-[#166534] font-bold truncate max-w-xs">
              {clean(project.title)}
            </span>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/project-gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-[#16a34a]" />
              <span>Back to All Projects &amp; Gallery</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#166534] text-xs font-black uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
                {clean(project.propertyType)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 ml-1">
                <MapPin className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>{clean(project.location)}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-3 leading-tight">
              {clean(project.title)}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed font-normal">
              {clean(project.summary)}
            </p>
          </div>

          {/* Interactive Before & After + Gallery Showcase (Client Component) */}
          <ProjectDetailClient
            project={project}
            cleanTitle={clean(project.title)}
          />

          {/* Project Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-10 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
            <div className="p-3 border-r sm:border-r border-slate-100 last:border-r-0">
              <span className="text-xs text-slate-500 font-medium block mb-1 flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Floor Area</span>
              </span>
              <p className="text-base sm:text-xl font-black text-slate-900">
                {clean(project.sizeSqft)}
              </p>
            </div>

            <div className="p-3 border-r sm:border-r border-slate-100 last:border-r-0">
              <span className="text-xs text-slate-500 font-medium block mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Completion Time</span>
              </span>
              <p className="text-base sm:text-xl font-black text-slate-900">
                {clean(project.durationDays)}
              </p>
            </div>

            <div className="p-3 border-r sm:border-r border-slate-100 last:border-r-0">
              <span className="text-xs text-slate-500 font-medium block mb-1 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Indicative Cost</span>
              </span>
              <p className="text-base sm:text-xl font-black text-[#166534]">
                {clean(project.costRange)}
              </p>
            </div>

            <div className="p-3">
              <span className="text-xs text-slate-500 font-medium block mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Contractor Model</span>
              </span>
              <p className="text-base sm:text-xl font-black text-slate-900">
                Direct In-House
              </p>
            </div>
          </div>

          {/* Two-Column Details Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
            {/* Left Column: Full Brief & Highlights */}
            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#16a34a]" />
                  <span>Project Brief &amp; Transformation Scope</span>
                </h2>
                <div className="prose max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                  <p>{clean(project.description)}</p>
                </div>
              </div>

              {/* Technical Highlights */}
              {project.keyHighlights && project.keyHighlights.length > 0 && (
                <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>Quality Standards &amp; Workmanship Highlights</span>
                  </h3>
                  <div className="space-y-3">
                    {project.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#166534] border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-medium">
                          {hl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Executed Scope Checklist + Direct Action */}
            <div className="lg:col-span-5 space-y-6">
              {/* Scope Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534] block mb-2">
                  Itemized Scope of Works
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  What Was Delivered
                </h3>
                <div className="space-y-2.5">
                  {project.scopeOfWork.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{clean(item)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Booking Card */}
              <div className="rounded-3xl bg-[#16263F] text-white p-6 sm:p-8 shadow-xl border border-slate-700">
                <span className="text-xs font-black uppercase tracking-wider text-[#8CCB6B] block mb-1">
                  Direct Contractor Consultation
                </span>
                <h4 className="text-xl font-bold text-white mb-2">
                  Planning a Similar Renovation?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  Book a free site measurement and consult directly with our project supervisor. Receive an itemized quote with zero obligation.
                </p>

                <div className="space-y-3">
                  <Link
                    href="/book"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-transform"
                  >
                    <span>Book Free Site Inspection</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20saw%20your%20project%20${encodeURIComponent(clean(project.title))}%20and%20would%20like%20to%20inquire%20for%20my%20home.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-transform"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Project Director</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Carousel / Grid */}
          <div className="border-t border-slate-200/80 pt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#166534] block mb-1">
                  Explore More Transformations
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                  Other Completed Singapore Projects
                </h2>
              </div>
              <Link
                href="/project-gallery"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#166534] hover:text-[#15803d] transition-colors"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.id}`}
                  className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden hover:border-[#16a34a]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={rel.afterImage}
                        alt={clean(rel.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#0A1424]/90 backdrop-blur-md text-[10px] font-bold text-white px-2.5 py-1 rounded-full border border-white/20">
                        {rel.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-[#166534] block mb-1">
                        {clean(rel.location)} · {clean(rel.propertyType)}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#166534] transition-colors leading-snug line-clamp-1">
                        {clean(rel.title)}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {clean(rel.summary)}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-[#166534]">
                    <span>View Project Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-slate-600 gap-3">
          <div className="w-8 h-8 border-3 border-[#166534] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold">Loading Singapore Project Details...</span>
        </div>
      }
    >
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
