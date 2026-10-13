import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, Phone, ArrowLeft, ShieldCheck, DoorOpen, Wrench, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Door & Window Replacement & Repair Singapore | MACNEL",
  description:
    "Expert door & window replacement and repair services in Singapore. Front doors, sliding glass doors, casement windows, and bi-fold doors installed by certified craftsmen.",
  keywords: siteConfig.serviceKeywords.doorAndWindow,
};

export default function DoorWindowPage() {
  const highlights = [
    "Window and door replacement near me for HDB, Condos, and Landed homes",
    "Complete replacement front door supply and precision installation",
    "Reliable door and window repair near me with direct technician response",
    "Aluminium sliding and casement window replacement with BCA safety compliance",
    "Soundproof acoustic glass and weather-sealed sliding balcony doors",
    "Toilet bi-fold doors, timber bedroom doors, and heavy-duty sliding track systems",
  ];

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section
        style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
        className="relative overflow-hidden bg-[#16263F] text-white py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-[#A3E635] hover:underline mb-6 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/15 px-4 py-1.5 text-xs font-bold text-white mb-4">
              <DoorOpen className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Door &amp; Window Replacement &amp; Repair · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Door &amp; Window Replacement, Installation &amp; Repair Services
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm">
              Upgrade your home&apos;s security, soundproofing, and energy efficiency. From replacement
              front doors and soundproof double-glazed windows to emergency door and window repair, our
              in-house technicians handle everything with certified precision.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quote%20for%20door%20and%20window%20replacement%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Free Door &amp; Window Quote</span>
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
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Direct Specialist Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-5">
              Window and Door Replacement &amp; Repair Near Me in Singapore
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Whether you need a full replacement front door, modern aluminium sliding patio doors, or
              targeted door and window repair near you, we supply premium hardware, weather-sealed frames,
              and BCA-compliant safety window installations across all Singapore districts.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#8CCB6B]/20 flex items-center justify-center text-[#4E9A3C] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/5]">
              <img
                src="/images/door-window/1.jpeg"
                alt="Door and window replacement in Singapore"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/5] mt-6">
              <img
                src="/images/door-window/3.jpeg"
                alt="Replacement front door installation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Target Keyword Tags Cloud */}
        <div className="p-6 rounded-2xl bg-[#F2F6F9] border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Popular Door &amp; Window Services:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.serviceKeywords.doorAndWindow.map((kw) => (
              <span
                key={kw}
                className="text-xs font-semibold bg-white text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
