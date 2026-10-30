import { LiveImage } from "@/components/LiveImage";
import { getLiveSiteData } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import servicesData from "../../../data/services.json";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  CalendarCheck,
  Check,
  Home,
  Grid3X3,
  DoorOpen,
  Lightbulb,
  Paintbrush,
  Hammer,
  Layers,
  Droplets,
} from "lucide-react";


export const metadata: Metadata = {
  title: "Core Renovation Services Singapore | Renovation Contractor SG",
  description:
    "Full-service renovation contractor services in Singapore: House Renovation, Tiling Services, Door & Window Replacement, False Ceiling & Partition, Painting, Plastering, Flooring & Carpets, and Toilet Renovation.",
};

const iconMap: Record<string, any> = {
  Home,
  Grid3X3,
  DoorOpen,
  Lightbulb,
  Paintbrush,
  Hammer,
  Layers,
  Droplets,
};

const mainServices = (servicesData as any[]).map((item) => ({
  ...item,
  icon: iconMap[item.iconName] || Home,
}));

export default async function ServicesPage() {
  const siteData = await getLiveSiteData();
  const mainServices = (siteData.services || (servicesData as any[])).map((item: any) => ({
    ...item,
    icon: iconMap[item.iconName] || Home,
  }));
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-screen flex items-center py-20 lg:py-28">
        <LiveImage src={"/images/services/hero.jpeg"}
          alt="Renovation Services in Singapore"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-105 transition-transform duration-1000"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.78) 45%, rgba(22, 38, 63, 0.25) 75%, rgba(22, 38, 63, 0.55) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Direct In-House Renovation Contractor · Singapore</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              Specialized Renovation Trades <br />
              <span className="text-[#8CCB6B]">Engineered by Direct Craftsmen</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-md">
              We specialize strictly in what we build best. From whole-house renovations and master tiling to soundproof
              windows, false ceilings, painting, plastering, and flooring — executed with zero middleman markups.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20renovation%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Floor Plan For Quote</span>
              </a>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <CalendarCheck className="w-4 h-4 text-[#A3E635]" />
                <span>Book Free Site Inspection</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-300 font-medium">In-House Employed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">Save 25%</p>
                <p className="text-xs text-slate-300 font-medium">No ID Markups</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">BCA / HDB</p>
                <p className="text-xs text-slate-300 font-medium">Approved Permits</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#A3E635]">12 Mos</p>
                <p className="text-xs text-slate-300 font-medium">Warranty Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#0F172A] py-8 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">BCA Registered Contractor</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Building2 className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">HDB &amp; MCST Permitted</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Itemized Milestone Quotes</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-[#A3E635]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">Singapore Direct Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
            Craftsmanship Directory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Our Core Renovation Capabilities
          </h2>
          <p className="text-base text-slate-600 mt-3 font-normal">
            Every trade is staffed with full-time master craftsmen. Click any trade to explore detailed specifications or request an immediate quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((service: any, idx: number) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#8CCB6B]/60 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Image Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <LiveImage src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  <div className="absolute top-3 left-3 bg-[#16263F]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />
                    <span>{service.badge}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-[#16263F] shadow-lg flex items-center justify-center group-hover:bg-[#8CCB6B] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-2 group-hover:text-[#2C6BA6] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
                      {service.desc}
                    </p>

                    <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                      {(service.specs || []).map((spec: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#4E9A3C] shrink-0 mt-0.5" />
                          <span className="leading-tight">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#16263F] hover:text-[#2C6BA6] transition-colors"
                    >
                      <span>Explore Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20${encodeURIComponent(
                        service.title
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8CCB6B]/15 hover:bg-[#8CCB6B] text-[#16263F] hover:text-white text-[11px] font-bold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#16263F] to-[#2C6BA6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Need a Renovation Quote with Direct Contractor Rates?
          </h2>
          <p className="text-base text-slate-200 max-w-2xl mx-auto mb-8 font-normal">
            Send us your floor plan or schedule a free site survey. We will provide an itemized, transparent quotation
            within 24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(siteConfig.name)}%2C%20I%20would%20like%20a%20quotation%20for%20renovation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp: +65 {siteConfig.contact.whatsapp.slice(2)}</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#16263F] font-bold text-sm shadow-xl hover:bg-slate-100 transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#2C6BA6]" />
              <span>Book Site Inspection</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
