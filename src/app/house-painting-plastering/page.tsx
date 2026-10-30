export const dynamic = "force-dynamic";
import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Paintbrush,
  MessageCircle,
  Phone,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Painting & Plastering Services Singapore | Nippon Paint - Renovation Contractor SG",
  description:
    "Direct painting and wall plastering contractor in Singapore. Whole house Nippon odour-less painting, wall skim coating, water damage ceiling repair & exterior weatherproofing.",
};

const paintingScopes = [
  {
    title: "Nippon Odourless All-In-1 Interior Coating",
    tag: "Families & Kids",
    desc: "Ultra-low VOC paint with near-zero odor, allowing your family to safely sleep in the house on the very same day of painting.",
    specs: "Zero formaldehyde · Anti-bacterial · Smooth eggshell finish",
  },
  {
    title: "Whole-House Wall Skim Coating & Plaster Smoothing",
    tag: "Flawless Walls",
    desc: "Erases uneven drywall joints, old peeling paint scars, and hollow plaster cracks, delivering flat, silky-smooth surfaces before painting.",
    specs: "Saint-Gobain skim coat · Machine power sanding · Level 5 wall finish",
  },
  {
    title: "Water-Damaged Ceiling Repair & Stain Sealer",
    tag: "Ceiling Restoration",
    desc: "Removes unsightly yellow watermarks from previous upstairs pipe leaks using oil-based stain-blocking primer that prevents stains from bleeding through.",
    specs: "Oil-based stain blocker · Anti-fungal topcoat · Moisture barrier",
  },
  {
    title: "Exterior Weatherbond & Balcony Facades",
    tag: "Landed & Balconies",
    desc: "High-durability acrylic exterior emulsion engineered to resist Singapore's tropical torrential rain, harsh UV sun exposure, and algae growth.",
    specs: "10-Year weather resistance · Dirt pickup resistance · UV stable",
  },
];

export default async function PaintingPage() {
  const siteData = await getLiveSiteData();
  const contact = { ...siteConfig.contact, ...(siteData?.contact || {}) };
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.painting_plastering;

  const heroImage =
    overrides["painting_hero"] ||
    overrides["/images/painting/hero.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/painting/hero.jpeg";

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
          slotId="painting_hero"
          alt="House Painting Services SG and Plastering"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-1000 scale-105"
          style={{ opacity: 0.85 }}
        />

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.75) 45%, rgba(22, 38, 63, 0.22) 75%, rgba(22, 38, 63, 0.50) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/50 bg-[#8CCB6B]/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm mb-6 backdrop-blur-sm">
              <Paintbrush className="w-4 h-4 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "Professional Painting & Wall Preparation · Singapore"}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {pageData?.hero?.title || "Professional Painting, Skim Coating & Surface Restoration"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              {pageData?.hero?.desc ||
                "Give your home a pristine, vibrant finish that stands the test of time. Renovation Contractor SG provides full interior and exterior painting services using 100% genuine Nippon Paint and professional multi-layer skim coating."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20painting%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Painting Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Site Inspection</span>
              </Link>

              <a
                href={`tel:${(contact.phoneTel || contact.phonePrimary.replace(/[^0-9+]/g, ""))}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {contact.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Painting Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Interior &amp; Exterior Finishes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paintingScopes.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:border-[#8CCB6B] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EAF5E5] text-[#4E9A3C] mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                  {item.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 3-STAGE WORKMANSHIP PROCESS (ZIG-ZAG) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Our 3-Stage Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Meticulous Wall Prep &amp; Even Application
            </h2>
            <p className="text-base text-slate-600">
              80% of a flawless paint job lies in the preparation. Here is how our certified painters achieve flat, roller-mark-free results.
            </p>
          </div>

          <div className="space-y-16">
            {processes.map((proc: any, idx: number) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={proc.step}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-xl ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[16/11] ${
                      isEven ? "lg:col-start-2" : ""
                    }`}
                  >
                    <LiveImage
                      src={proc.image}
                      slotId={proc.slotId}
                      alt={proc.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-black text-[#A3E635] border border-white/20">
                      STEP {proc.step}
                    </div>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-[#2C6BA6]/25 block mb-2">
                      {proc.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
                      {proc.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {proc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="py-20 bg-[#F2F6F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Painting FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Painting Services
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
            Ready to Refresh Your Home Walls?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            WhatsApp us your flat type and estate location for an instant upfront package quotation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20painting%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Painting Team</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Site Inspection</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
