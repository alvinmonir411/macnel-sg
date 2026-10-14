import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import projectsData from "../../../../data/projects.json";
import { siteConfig } from "@/config/site";
import { ProjectDetailClient } from "./ProjectDetailClient";
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

export default async function ProjectDetailPage({ params }: PageProps) {
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
    <main className="bg-[#0A1124] text-white min-h-screen py-10 sm:py-16">
      {/* Background Lighting Accents */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2C6BA6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#8CCB6B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-8 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
          <Link href="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
          <Link href="/project-gallery" className="hover:text-white transition-colors">
            Gallery
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
          <span className="text-[#8CCB6B] font-medium truncate max-w-xs">
            {clean(project.title)}
          </span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/project-gallery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#8CCB6B]" />
            <span>Back to All Projects &amp; Gallery</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#8CCB6B]/20 border border-[#8CCB6B]/40 text-[#8CCB6B] text-xs font-black uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold">
              {clean(project.propertyType)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 ml-1">
              <MapPin className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>{clean(project.location)}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {clean(project.title)}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed font-normal">
            {clean(project.summary)}
          </p>
        </div>

        {/* Interactive Before & After + Gallery Showcase (Client Component) */}
        <ProjectDetailClient
          project={project}
          cleanTitle={clean(project.title)}
        />

        {/* Project Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>Floor Area</span>
            </span>
            <p className="text-base sm:text-xl font-black text-white">
              {clean(project.sizeSqft)}
            </p>
          </div>

          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>Completion Time</span>
            </span>
            <p className="text-base sm:text-xl font-black text-white">
              {clean(project.durationDays)}
            </p>
          </div>

          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>Indicative Cost</span>
            </span>
            <p className="text-base sm:text-xl font-black text-[#8CCB6B]">
              {clean(project.costRange)}
            </p>
          </div>

          <div className="p-3">
            <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>Contractor Model</span>
            </span>
            <p className="text-base sm:text-xl font-black text-white">
              Direct In-House
            </p>
          </div>
        </div>

        {/* Two-Column Details Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left Column: Full Brief & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8CCB6B]" />
                <span>Project Brief &amp; Transformation Scope</span>
              </h2>
              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{clean(project.description)}</p>
              </div>
            </div>

            {/* Technical Highlights */}
            {project.keyHighlights && project.keyHighlights.length > 0 && (
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Quality Standards &amp; Workmanship Highlights</span>
                </h3>
                <div className="space-y-3">
                  {project.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#8CCB6B]/20 text-[#8CCB6B] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200">
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
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-2">
                Itemized Scope of Works
              </span>
              <h3 className="text-xl font-bold text-white mb-4">
                What Was Delivered
              </h3>
              <div className="space-y-3">
                {project.scopeOfWork.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/20 border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8CCB6B] shrink-0 mt-0.5" />
                    <span>{clean(item)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Booking Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#16263F] to-[#0A1424] border border-[#8CCB6B]/40 p-6 sm:p-8 shadow-2xl">
              <span className="text-xs font-black uppercase tracking-wider text-[#8CCB6B] block mb-1">
                Direct Builder Consultation
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
        <div className="border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-1">
                Explore More Transformations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Other Completed Singapore Projects
              </h2>
            </div>
            <Link
              href="/project-gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8CCB6B] hover:text-white transition-colors"
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
                className="group rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#8CCB6B]/50 hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 relative">
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
                    <span className="text-xs font-bold text-[#8CCB6B] block mb-1">
                      {clean(rel.location)} · {clean(rel.propertyType)}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#8CCB6B] transition-colors leading-snug line-clamp-1">
                      {clean(rel.title)}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {clean(rel.summary)}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-[#8CCB6B]">
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
