export const dynamic = "force-dynamic";
import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Hammer,
  MessageCircle,
  Phone,
  CalendarCheck,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Wall Plastering & Skim Coating Singapore | Smooth Level 5 Walls - Renovation Contractor SG",
  description:
    "Direct wall plastering and skim coating contractor in Singapore. Level 5 smooth wall finish, hollow plaster repair, hairline crack patching & dust-free machine sanding for HDB flats and condos.",
};

const plasteringScopes = [
  {
    title: "Whole-House Level 5 Wall Skim Coating",
    tag: "Flawless Smooth Finish",
    desc: "Transforms rough, wavy, or orange-peeled walls into glass-smooth surfaces using premium polymer-modified Saint-Gobain skim coat.",
    specs: "Saint-Gobain multi-layer coat · Dust-free machine sanding · Level 5 smoothness",
  },
  {
    title: "Hollow & Blistered Plaster Restoration",
    tag: "Structural Repair",
    desc: "Identifies drummy, hollow wall sections by sound-testing, cleanly hacks defective plaster down to solid masonry, and applies heavy-duty bonding cement.",
    specs: "Full acoustic tap test · Anti-hollow bonding primer · Reinforced cement mortar",
  },
  {
    title: "Anti-Crack Fiberglass Joint Reinforcement",
    tag: "Crack Prevention",
    desc: "Chases out settling hairline cracks, embeds high-tensile fiberglass mesh, and applies flexible joint compound to permanently stop cracks from reappearing.",
    specs: "V-groove crack chasing · Alkali-resistant joint mesh · Flexible polymer filler",
  },
  {
    title: "Drywall Partition & False Ceiling Joint Leveling",
    tag: "Seamless Boards",
    desc: "Feathers board joints with 3-stage tapered paper taping and joint compound, creating completely invisible seams across ceilings and drywall partitions.",
    specs: "3-coat tapered joint feathering · Micro-joint tape · Seamless shadowline detail",
  },
];

export default async function PlasteringPage() {
  const siteData = await getLiveSiteData();
  const contact = { ...siteConfig.contact, ...(siteData?.contact || {}) };
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.plastering_services;

  const heroImage =
    overrides["plastering_hero"] ||
    overrides["/images/plastering/hero.jpeg"] ||
    overrides["service_plastering"] ||
    overrides["/images/services/plastering-services.jpg"] ||
    pageData?.hero?.defaultImage ||
    "/images/services/plastering-services.jpg";

  const processes = (pageData?.processes || []).map((proc: any) => ({
    ...proc,
    image: overrides[proc.slotId] || overrides[proc.image] || proc.image,
  }));

  const faqs = pageData?.faqs || [];

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="plastering_hero"
          alt="Professional Wall Plastering and Skim Coating Services Singapore"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-1000 scale-105"
          style={{ opacity: 0.85 }}
        />

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.78) 45%, rgba(22, 38, 63, 0.35) 75%, rgba(22, 38, 63, 0.55) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/50 bg-[#8CCB6B]/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm mb-6 backdrop-blur-sm">
              <Hammer className="w-4 h-4 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "Master Plastering & Surface Smoothing · Singapore"}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {pageData?.hero?.title || "Professional Wall Plastering, Skim Coating & Surface Smoothing"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              {pageData?.hero?.desc ||
                "Transform rough, wavy, or cracked walls into flawlessly flat, baby-smooth surfaces. Renovation Contractor SG delivers master skim coating, hollow plaster restoration, and anti-crack drywall taping across Singapore."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20wall%20plastering%20and%20skim%20coating%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Plastering Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Site Inspection</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLASTERING SERVICES SCOPE GRID */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Direct Masonry Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16263F] tracking-tight">
              Our Professional Wall Plastering Solutions
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              From historic resale flat remediation to new BTO Level 5 skim smoothing, our direct in-house craftsmen ensure every wall is laser-flat and defect-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plasteringScopes.map((scope, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#8CCB6B]/15 text-[#3b7c25] border border-[#8CCB6B]/30 mb-4">
                    {scope.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#16263F] mb-3">
                    {scope.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {scope.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5 text-[#16263F]">
                    <ShieldCheck className="w-4 h-4 text-[#8CCB6B]" />
                    {scope.specs}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP WORK PROCESS */}
      {processes.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
                Systematic Application
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16263F] tracking-tight">
                Our 3-Stage Skim Coating &amp; Plastering Process
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Rigorous preparation, moisture curing, and HEPA vacuum power sanding ensure 100% adherence and zero post-handover cracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processes.map((proc: any, i: number) => (
                <div
                  key={i}
                  className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm flex flex-col group hover:border-[#8CCB6B]/60 transition-all"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                    <LiveImage
                      src={proc.image}
                      slotId={proc.slotId}
                      alt={proc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-[#16263F]/90 backdrop-blur-md text-white font-black text-sm flex items-center justify-center border border-white/20">
                      {proc.step}
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#16263F] mb-2.5">
                        {proc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. TECHNICAL COMPARISON TABLE */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Engineering Specs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16263F] tracking-tight">
              Plastering vs. Skim Coating Comparison
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Understanding which solution your property requires avoids unnecessary hacking and saves thousands of dollars.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-[#16263F] text-white text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-4 px-6">Method</th>
                  <th className="py-4 px-6">Thickness</th>
                  <th className="py-4 px-6">Best For</th>
                  <th className="py-4 px-6">Surface Result</th>
                  <th className="py-4 px-6">Typical Downtime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">Fine Skim Coating (2-3 Coats)</td>
                  <td className="py-4 px-6">1mm – 3mm</td>
                  <td className="py-4 px-6">New BTOs, resale walls with minor surface waviness</td>
                  <td className="py-4 px-6 text-[#16a34a] font-bold">Level 5 Glass Smooth</td>
                  <td className="py-4 px-6">2 – 3 Days</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">Cement Plastering (Render)</td>
                  <td className="py-4 px-6">10mm – 20mm</td>
                  <td className="py-4 px-6">Hacked concrete walls, newly laid brickwork/blocks</td>
                  <td className="py-4 px-6">Structural Plum &amp; Flat</td>
                  <td className="py-4 px-6">4 – 7 Days (Curing)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">Crack Chasing &amp; Mesh Patching</td>
                  <td className="py-4 px-6">V-Groove (5-10mm)</td>
                  <td className="py-4 px-6">Structural settling cracks, door frame stress points</td>
                  <td className="py-4 px-6 text-[#16a34a] font-bold">Reinforced Anti-Crack</td>
                  <td className="py-4 px-6">1 – 2 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
                Knowledge Base
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16263F] tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq: any, i: number) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
                  <h3 className="text-base font-bold text-[#16263F] mb-2">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CALL TO ACTION STRIP */}
      <section className="py-16 bg-[#16263F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            Ready for Flawlessly Smooth Walls in Your Singapore Home?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-normal">
            Speak directly with our on-site plastering supervisor for a transparent, itemized quote and moisture level measurement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20to%20consult%20on%20wall%20plastering.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#20ba59] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct Contractor</span>
            </a>

            <a
              href={`tel:${contact.phoneTel || contact.phonePrimary}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-[#8CCB6B]" />
              <span>Call {contact.phonePrimary}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

