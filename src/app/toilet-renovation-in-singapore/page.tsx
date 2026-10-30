import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Droplets,
  MessageCircle,
  Phone,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Toilet & Bathroom Renovation Singapore | 24-Hr Ponding Test - Renovation Contractor SG",
  description:
    "Direct toilet renovation contractor in Singapore. Complete bathroom overhaul, hacking, 3-coat waterproofing, 24-hour ponding test, laser tiling & PUB-certified plumbing.",
};

const materialsShowcase = [
  {
    name: "SikaTop Seal 107",
    category: "Waterproofing",
    badge: "BCA Certified",
    desc: "Two-part polymer modified cementitious waterproof slurry mortar.",
  },
  {
    name: "Mapei Ultracolor Plus",
    category: "Grouting",
    badge: "BioBlock® Anti-Mold",
    desc: "High-performance, anti-efflorescence, water-repellent tile grout.",
  },
  {
    name: "Stainless Steel 304",
    category: "Plumbing",
    badge: "PUB Compliant",
    desc: "Corrosion-proof concealed water supply pipes with 20-year lifespan.",
  },
  {
    name: "R10 Porcelain Tiles",
    category: "Flooring",
    badge: "Safety Rated",
    desc: "High density, zero water absorption (<0.5%) anti-slip bathroom tiles.",
  },
  {
    name: "E0 Solid Plywood",
    category: "Vanity Cabinets",
    badge: "Low Formaldehyde",
    desc: "Moisture-resistant marine core plywood finished with premium laminates.",
  },
  {
    name: "10mm Tempered Glass",
    category: "Screens",
    badge: "Grade A Safety",
    desc: "Heavy-duty shower enclosures with anti-shatter explosion film option.",
  },
];

export default async function ToiletRenovationPage() {
  const siteData = await getLiveSiteData();
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.toilet_renovation;

  const heroImage =
    overrides["toilet_reno_hero"] ||
    overrides["/images/tiling/13.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/tiling/7.jpeg";

  const stages = (pageData?.stages || []).map((stage: any) => ({
    ...stage,
    image: overrides[stage.slotId] || overrides[stage.image] || stage.image,
  }));

  const faqs = pageData?.faqs || [];

  return (
    <div className="bg-white">
      {/* 1. ULTRA HIGH-IMPACT HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="toilet_reno_hero"
          alt="Luxury Bathroom Renovation Singapore"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-1000 scale-105"
          style={{ opacity: 0.82 }}
        />

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.75) 45%, rgba(22, 38, 63, 0.22) 75%, rgba(22, 38, 63, 0.50) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[1.25fr_.85fr] gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/50 bg-[#8CCB6B]/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm backdrop-blur-sm">
                <Droplets className="w-4 h-4 text-[#A3E635]" />
                <span>{pageData?.hero?.subtitle || "3-Coat Waterproofing Membrane · 24-Hour Ponding Test Guarantee"}</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08]">
                {pageData?.hero?.title || "Toilet & Bathroom Renovation Specialist Singapore"}
              </h1>

              <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-sm">
                {pageData?.hero?.desc ||
                  "Complete overhaul and transformation for HDB and condominium bathrooms. Hacking, screeding, anti-slip tiling, concealed plumbing, and sanitary fixture installation."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>WhatsApp for Bathroom Quote</span>
                </a>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Free On-Site Measurement</span>
                </Link>

                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#A3E635]" />
                  <span>Call {siteConfig.contact.phonePrimary}</span>
                </a>
              </div>

              {/* Micro Badges */}
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 pt-4 text-xs sm:text-sm font-semibold text-slate-100 border-t border-white/20 w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                  <span>24-Hour Water Ponding Test</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                  <span>12-Month Leak Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                  <span>PUB &amp; HDB Permit Handled</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphic Architectural Spec Card */}
            <div
              style={{ backgroundColor: "rgba(22, 38, 63, 0.85)" }}
              className="rounded-3xl border border-white/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A3E635]">
                    Engineering Compliance
                  </span>
                  <h3 className="text-xl font-black text-white">Full Turnkey Bathroom Specs</h3>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#8CCB6B]/20 text-[#A3E635] border border-[#8CCB6B]/40">
                  HDB Approved
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#8CCB6B]/20 text-[#A3E635] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white">SikaTop Seal 107 Waterproofing</h4>
                    <p className="text-slate-300 text-xs mt-0.5">
                      2-Coat fiber mesh reinforced elastomeric membrane up to 1,800mm shower zone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#8CCB6B]/20 text-[#A3E635] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white">24-Hour Ponding Test Protocol</h4>
                    <p className="text-slate-300 text-xs mt-0.5">
                      Continuous water flood verification inspected and signed off before tiling commences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#8CCB6B]/20 text-[#A3E635] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white">PUB Licensed Water Plumber</h4>
                    <p className="text-slate-300 text-xs mt-0.5">
                      Concealed stainless steel Grade 304 water lines and certified drainage slopes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Standard Duration: <strong>7 - 10 Days</strong></span>
                <span className="text-[#A3E635] font-bold">12-Month Structural Leak Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL PROCESS TIMELINE (6 STEPS) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Step-By-Step Execution
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              How We Renovate Your Bathroom
            </h2>
            <p className="text-base text-slate-600">
              Every phase is executed by full-time tradesmen with rigorous quality checks at every step.
            </p>
          </div>

          <div className="space-y-16">
            {stages.map((stage: any, idx: number) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={stage.step}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-xl ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[16/11] ${isEven ? "lg:col-start-2" : ""}`}>
                    <LiveImage
                      src={stage.image}
                      slotId={stage.slotId}
                      alt={stage.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-black text-[#A3E635] border border-white/20">
                      STAGE {stage.step}
                    </div>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-[#2C6BA6]/25 block mb-2">
                      {stage.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#4E9A3C] mb-4">
                      {stage.tagline}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                      {stage.desc}
                    </p>

                    {stage.highlights && (
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        {stage.highlights.map((h: string, hIdx: number) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CERTIFIED MATERIALS SPECIFICATION GRID */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Certified Materials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Only Proven Architectural Brands
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialsShowcase.map((mat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase">{mat.category}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#EAF5E5] text-[#4E9A3C]">
                      {mat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{mat.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {mat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="py-20 bg-[#F2F6F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Bathroom FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Toilet Renovation
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq: any, i: number) => (
              <details
                key={i}
                className="group rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-[#2C6BA6] transition-colors">
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 group-open:rotate-180 group-open:text-[#2C6BA6] transition-transform duration-200" />
                </summary>
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FOOTER */}
      <section className="py-20 bg-[#16263F] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready for a Fresh, Leak-Free Bathroom?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            WhatsApp us your floorplan or book a free on-site bathroom assessment with our direct renovation team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Bathroom Specialist</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book On-Site Inspection</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
