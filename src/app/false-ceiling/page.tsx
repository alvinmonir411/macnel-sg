export const dynamic = "force-dynamic";
import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Lightbulb,
  MessageCircle,
  Phone,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "False Ceiling & Partition Wall Contractor Singapore | Saint-Gobain - Renovation Contractor SG",
  description:
    "Direct false ceiling and drywall partition contractor in Singapore. LED cove lighting pelmets, Saint-Gobain gypsum boards, acoustic Rockwool drywall partitions & moisture-resistant bathroom ceilings.",
};

const ceilingSolutions = [
  {
    title: "LED Cove Light Troughs & Curtain Pelmets",
    tag: "Living Rooms & Bedrooms",
    desc: "Soft ambient indirect cove lighting that illuminates ceilings without glare, combined with recessed pelmets to neatly hide curtain tracks and motorized blind motors.",
    specs: "Saint-Gobain plasterboard · Integrated aluminum LED extrusion channels",
  },
  {
    title: "Full Flat Ceilings & Beam Concealment",
    tag: "Flats & Condominiums",
    desc: "Neatly conceals exposed air-con drainage pipes, electrical PVC trunking, and structural concrete beams, creating a clean, seamless, modern flat ceiling surface.",
    specs: "Galvanized steel furring channels · Flush magnetic access panels",
  },
  {
    title: "Acoustic Drywall Partitions & Room Dividers",
    tag: "Home Offices & Bedrooms",
    desc: "Create new bedrooms or acoustic study spaces in living rooms. Reinforced with Rockwool sound-insulation batts to block household noise transmission.",
    specs: "Sound transmission class (STC 45+) · High-density drywall boards",
  },
  {
    title: "Moisture-Resistant Bathroom Ceilings",
    tag: "Bathrooms & Kitchens",
    desc: "Specially formulated water-resistant plasterboard that prevents moisture absorption, mold spore buildup, and ceiling paint flaking in high-steam shower zones.",
    specs: "Green-core moisture board · Anti-fungus Nippon paint seal",
  },
];

export default async function FalseCeilingPage() {
  const siteData = await getLiveSiteData();
  const contact = { ...siteConfig.contact, ...(siteData?.contact || {}) };
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.false_ceiling;

  const heroImage =
    overrides["ceiling_hero"] ||
    overrides["/images/partition-ceiling/12.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/partition-ceiling/12.jpeg";

  const standards = (pageData?.standards || []).map((std: any) => ({
    ...std,
    image: overrides[std.slotId] || overrides[std.image] || std.image,
  }));

  const faqs = pageData?.faqs || [];

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage
          src={heroImage}
          slotId="ceiling_hero"
          alt="False Ceiling Contractor Singapore"
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
              <Lightbulb className="w-4 h-4 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "Architectural Ceiling & Drywall Specialist · Singapore"}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {pageData?.hero?.title || "Architectural False Ceilings, Cove Lighting & Partitions"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              {pageData?.hero?.desc ||
                "Conceal wiring, beam drops, and pipes with precision-levelled false ceilings. Renovation Contractor SG installs Saint-Gobain Gyproc plasterboard, LED cove lighting pelmets, curtain boxes, and acoustic partition walls."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20ceiling%20and%20partition%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Ceiling Specialist</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book On-Site Inspection</span>
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

      {/* 2. SOLUTIONS GRID */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Ceiling & Partition Types
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Engineered Plasterboard Solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ceilingSolutions.map((item, idx) => (
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

      {/* 3. WORKMANSHIP STANDARDS (ZIG-ZAG) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Structural Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Anti-Sag Framework &amp; Invisible Joints
            </h2>
            <p className="text-base text-slate-600">
              Why our false ceilings never develop wavy surfaces, joint cracks, or sag under light loads.
            </p>
          </div>

          <div className="space-y-16">
            {standards.map((std: any, idx: number) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={std.step}
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
                      src={std.image}
                      slotId={std.slotId}
                      alt={std.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-black text-[#A3E635] border border-white/20">
                      STANDARD {std.step}
                    </div>
                  </div>

                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-[#2C6BA6]/25 block mb-2">
                      {std.step}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
                      {std.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {std.desc}
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
              Ceiling FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About False Ceilings
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
            Ready to Plan Your Ceiling &amp; Lighting Layout?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            WhatsApp us your floorplan or book a free site survey for exact quotation and ceiling height checks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20ceiling%20and%20partition%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Ceiling Team</span>
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
