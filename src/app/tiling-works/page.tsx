export const dynamic = "force-dynamic";
import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Grid3X3,
  MessageCircle,
  Phone,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Precision Tiling Services Singapore | Direct Master Tilers - Renovation Contractor SG",
  description:
    "Direct tile contractor in Singapore. Master floor and wall tiling, 100% solid buttering (zero hollow tiles), laser alignment, 45-degree mitred corners & Mapei anti-mold epoxy grouting.",
};

const tilingTypologies = [
  {
    title: "Large Format Homogeneous Tiles (600x1200)",
    tag: "Luxury Living Halls",
    desc: "Seamless, grand aesthetic with minimal grout lines. Ideal for modern HDB and condominium living rooms.",
    specs: "Zero water absorption · Scratch proof · High load bearing",
  },
  {
    title: "Anti-Slip R10 / R11 Bathroom Tiles",
    tag: "Wet Areas & Toilets",
    desc: "Textured surface offering superior traction even when wet, protecting elderly and children from slips.",
    specs: "R10 safety rating · Waterproof screed · Anti-fungal grout",
  },
  {
    title: "Kitchen Feature & Subway Splashbacks",
    tag: "Kitchens & Islands",
    desc: "Herringbone, chevron, and classic beveled subway tiles that resist hot cooking grease and stains.",
    specs: "Stain-resistant glaze · Easy wipe down · Heat proof",
  },
  {
    title: "Natural Marble & Granite Slabs",
    tag: "Balconies & Feature Walls",
    desc: "Authentic veining and diamond-polished finishes for statement feature walls and entrance foyers.",
    specs: "Sealed against etching · Book-matched veining option",
  },
];

export default async function TilingWorksPage() {
  const siteData = await getLiveSiteData();
  const contact = { ...siteConfig.contact, ...(siteData?.contact || {}) };
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.tiling_works;

  const heroImage =
    overrides["tiling_hero"] ||
    overrides["/images/tiling/hero.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/tiling/hero.jpeg";

  const workmanshipStandards = (pageData?.steps || []).map((std: any) => ({
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
          slotId="tiling_hero"
          alt="Master Tile Flooring Installation Singapore"
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
              <Grid3X3 className="w-4 h-4 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "BCA Certified Tilers · 100% Solid Buttering (Zero Hollow Tiles)"}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {pageData?.hero?.title || "Precision Masonry & Master Tiling Services"}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              {pageData?.hero?.desc ||
                "Flawless laser-aligned tile laying for floors, feature walls, balconies, and bathrooms using premium polymer adhesives and anti-mold epoxy grouting."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20tiling%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Tiling Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Floor Inspection</span>
              </Link>

              <a
                href={`tel:${(contact.phoneTel || contact.phonePrimary.replace(/[^0-9+]/g, ""))}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {contact.phonePrimary}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 pt-8 text-xs sm:text-sm font-semibold text-slate-100 border-t border-white/20 mt-8 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Laser Level Alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>45° Mitred Edge Cuts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Anti-Mold Epoxy Grouting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TILE TYPOLOGY SELECTION (EDITORIAL CHIPS) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Materials &amp; Slabs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Tile Typologies &amp; Architectural Formats
            </h2>
            <p className="text-base text-slate-600">
              We install tiles of every texture, scale, and origin — from Italian marble slabs to German anti-slip tiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tilingTypologies.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#2C6BA6]/10 text-[#2C6BA6] px-2.5 py-1 rounded-full mb-3 inline-block">
                    {t.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {t.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                  {t.specs}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORKMANSHIP METHODOLOGY (ZIG-ZAG ARCHITECTURAL SHOWCASE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Trade Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Why Renovation Contractor SG Tiling Outlasts Others
            </h2>
            <p className="text-base text-slate-600">
              Good tiling is not just about placing a tile on wet cement. It is a rigorous engineering process.
            </p>
          </div>

          <div className="space-y-16">
            {workmanshipStandards.map((std: any, idx: number) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={std.step}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-xl ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[16/11] ${isEven ? "lg:col-start-2" : ""}`}>
                    <LiveImage
                      src={std.image}
                      slotId={std.slotId}
                      alt={std.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-black text-[#A3E635] border border-white/20">
                      STEP {std.step}
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
              Contractor FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Floor &amp; Wall Tiling
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
            Ready to Upgrade Your Floor &amp; Wall Tiles?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            WhatsApp us your floorplan or visit Hafary/Soon Bee Huat tile showrooms with our direct contractor discount codes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20tiling%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Master Tiler</span>
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
