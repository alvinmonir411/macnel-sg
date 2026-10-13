import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  Check,
  ShieldCheck,
  Droplets,
  MessageCircle,
  Phone,
  Building2,
  Home,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Toilet Renovation in Singapore | MACNEL Construction Pte. Ltd",
  description:
    "Hacking, waterproofing, tiling, plumbing and sanitary installation for condominiums and landed homes across Singapore, managed by one in-house team.",
};

const toiletSubServices = [
  "Full toilet and bathroom renovation",
  "Hacking and replacement of wall and floor tiles",
  "Waterproofing membrane works & ponding tests",
  "Floor and wall tiling with anti-slip finishes",
  "Tile repair and mold-resistant regrouting",
  "Toilet bowl supply and installation",
  "Wash basin and custom vanity installation",
  "Concealed plumbing and flushing system works",
  "Floor trap and drainage gradient alignment",
  "Tempered glass shower screen installation",
  "Electrical works for warm lighting and exhaust fans",
  "Sanitary fittings and bathroom accessories installation",
  "Partial toilet renovation and targeted leak repairs",
];

const toiletPhotos = [
  "/images/tiling/2.jpeg",
  "/images/tiling/3.jpeg",
  "/images/tiling/4.jpeg",
  "/images/tiling/5.jpeg",
  "/images/tiling/6.jpeg",
  "/images/tiling/7.jpeg",
  "/images/tiling/8.jpeg",
  "/images/tiling/9.jpeg",
  "/images/tiling/11.jpeg",
  "/images/tiling/12.jpeg",
  "/images/tiling/13.jpeg",
  "/images/tiling/33.jpeg",
];

export default function ToiletRenovationPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white py-20 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('/images/tiling/3.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16263F] via-[#16263F]/90 to-[#16263F]/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/50 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-5">
                <Droplets className="w-3.5 h-3.5 text-[#A3E635]" />
                <span>Specialized Bathroom Renovation · Singapore</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                No need to coordinate multiple contractors.
              </h1>

              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed mb-8 max-w-xl drop-shadow-sm">
                An old, leaking, or worn-out toilet can affect the comfort and condition of
                your entire home. We manage the whole journey: hacking, waterproofing,
                tiling, plumbing, and sanitary fittings—all under one roof.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Get Free Toilet Quote</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#A3E635]" />
                  <span>Call {siteConfig.contact.phonePrimary}</span>
                </a>
              </div>
            </div>

            {/* Right highlight image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-600">
              <img
                src="/images/tiling/12.jpeg"
                alt="Toilet renovation showcase"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#16263F]/95 backdrop-blur-md rounded-xl p-4 border border-slate-600/80 shadow-lg">
                <span className="text-xs font-black text-[#A3E635] block uppercase tracking-wider">
                  Hacking to Handover
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  6 stages executed with precision &amp; watertight testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Stages Breakdown */}
      <section
        style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
        className="py-20 bg-[#16263F] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#A3E635] block mb-2">
              Our Toilet Renovation Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Six Stages, Done Properly
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Waterproofing is the single most critical stage. Improper waterproofing causes
              seepage, mold, and damage to the unit below. Here is how we ensure zero defects:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.toiletProcessSteps.map((step) => (
              <div
                key={step.step}
                style={{ backgroundColor: "rgba(30, 51, 82, 0.95)" }}
                className="rounded-2xl p-6 sm:p-7 border border-slate-600/70 shadow-lg hover:border-[#8CCB6B]/60 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-extrabold text-[#A3E635]">{step.step}</span>
                  <ShieldCheck className="w-5 h-5 text-white/60" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we can do for your toilet (Icon Grid) */}
      <section className="py-20 bg-[#F2F6F9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
              Full Renovation Or Just The Part That Needs Fixing
            </h2>
            <p className="text-base text-slate-600">
              Custom scope suited to your budget and property condition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {toiletSubServices.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl bg-white p-4 border border-slate-200/80 shadow-sm hover:border-[#2C6BA6]/50 transition-colors"
              >
                <Check className="w-5 h-5 text-[#2C6BA6] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Condominiums and Landed Homes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Property Types
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Condominiums &amp; Landed Homes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border-t-4 border-[#2C6BA6] bg-[#F8FAFC] p-8 border border-slate-200 shadow-sm">
              <Building2 className="w-8 h-8 text-[#2C6BA6] mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Condominiums</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We carry out renovation works in accordance with the condominium management&apos;s
                applicable renovation requirements, approved working hours, lift padding, and site
                regulations. We provide all necessary contractor insurance and risk assessments
                for smooth management approval.
              </p>
            </div>

            <div className="rounded-2xl border-t-4 border-[#4E9A3C] bg-[#F8FAFC] p-8 border border-slate-200 shadow-sm">
              <Home className="w-8 h-8 text-[#4E9A3C] mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Landed Homes</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We provide toilet and bathroom renovation services for bungalows, semi-detached houses,
                terrace houses, and multi-storey landed properties. Whether renovating a master ensuite
                or coordinating multiple bathrooms concurrently, our craftsmen deliver top-tier luxury finishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toilet Projects Gallery Grid */}
      <section className="py-20 bg-[#F2F6F9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-2">
              Toilet &amp; Bathroom Projects Showcase
            </h2>
            <p className="text-sm text-slate-600">
              Recent completed projects across Singapore condominiums and landed residences.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {toiletPhotos.map((url, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200 shadow-sm"
              >
                <img
                  src={url}
                  alt={`Toilet renovation project ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1.5 rounded-full">
                    View Project
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-[#16263F] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-3">Need a Bathroom Renovation Quote?</h2>
          <p className="text-white/70 text-sm mb-6">
            Free site visit, non-obligatory quotation, and direct contractor prices.
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
