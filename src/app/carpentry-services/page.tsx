import { LiveImage } from "@/components/LiveImage";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getLiveSiteData } from "@/lib/db";
import {
  Sparkles,
  MessageCircle,
  Phone,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Carpentry & Cabinetry Singapore | In-House Workshop - Renovation Contractor SG",
  description:
    "Direct carpentry contractor in Singapore. Custom kitchen cabinets, full-height wardrobes, TV consoles & bathroom vanities with solid marine plywood & Blum hardware.",
};

const carpentrySpecialties = [
  {
    title: "Designer Kitchen Cabinetry & Islands",
    tag: "Kitchens",
    desc: "Seamless quartz or sintered stone countertops, anti-scratch laminate fronts, and Blum soft-closing slide drawers tailored to Singapore cookspaces.",
    specs: "E0 marine plywood carcass · Heavy-duty pot drawers · Integrated LED strips",
  },
  {
    title: "Full-Height Built-In Wardrobes",
    tag: "Bedrooms",
    desc: "Floor-to-ceiling sliding or casement door wardrobes featuring interior organizers, sensor lighting, tie racks, and full-length mirrors.",
    specs: "Damp-proof carcass · Soft-close sliding tracks · Anti-warping aluminum profile",
  },
  {
    title: "Suspended TV Consoles & Fluted Feature Walls",
    tag: "Living Rooms",
    desc: "Floating TV feature walls with acoustic fluted timber panels and concealed cabling wire runs for a clean, minimalist contemporary look.",
    specs: "Concealed conduit chases · Heavy anchor wall mount · Ambient cove backlight",
  },
  {
    title: "Moisture-Proof Bathroom Vanities",
    tag: "Bathrooms",
    desc: "Custom suspended vanity counters and mirror storage boxes constructed with high-density waterproof plywood resistant to high humidity.",
    specs: "Waterproof marine core · Quartz top with undermount basin · Anti-fog mirrors",
  },
];

export default async function CarpentryPage() {
  const siteData = await getLiveSiteData();
  const overrides = siteData?.site_images || {};
  const pageData = siteData?.service_pages?.carpentry;

  const heroImage =
    overrides["carpentry_hero"] ||
    overrides["/images/carpentry/5.jpeg"] ||
    pageData?.hero?.defaultImage ||
    "/images/carpentry/5.jpeg";

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
          slotId="carpentry_hero"
          alt="Custom Carpentry Services Singapore"
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
              <Sparkles className="w-4 h-4 text-[#A3E635]" />
              <span>{pageData?.hero?.subtitle || "Direct In-House Joinery Workshop · Singapore"}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {pageData?.hero?.title || "Custom Carpentry & Cabinetry, Built to Millimeter Precision."}
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm max-w-2xl">
              {pageData?.hero?.desc ||
                "Bring your dream spaces to life with custom fabricated furniture. Renovation Contractor SG crafts kitchen cabinets, full-height built-in wardrobes, suspended TV consoles, and bathroom vanities using solid marine plywood and genuine Blum hardware."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20carpentry%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp for Carpentry Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book On-Site Measurement</span>
              </Link>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#A3E635]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIALTIES TILES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Joinery Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Direct-to-Consumer Custom Millwork
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carpentrySpecialties.map((item, idx) => (
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

      {/* 3. WORKSHOP STANDARDS (ZIG-ZAG SHOWCASE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Quality Assurance
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Our Joinery Workshop Standards
            </h2>
            <p className="text-base text-slate-600">
              How we build carpentry that lasts 20+ years without sagging shelves or peeling laminates.
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
              Carpentry FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Custom Woodwork
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
            Ready to Build Your Custom Cabinets?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            Send us your carpentry drawings or schedule a free site measurement to discuss layouts and laminates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20carpentry%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Workshop Directly</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Site Measurement</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
