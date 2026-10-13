import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Carpentry Services Singapore | MACNEL Construction",
  description:
    "Bespoke kitchen cabinets, built-in wardrobes, TV consoles, and feature walls custom fabricated in Singapore.",
};

export default function CarpentryPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#16263F] text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: "url('/images/carpentry/2.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16263F] via-[#16263F]/90 to-[#16263F]/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-[#8CCB6B] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-2">
              Custom Woodwork &amp; Cabinetry
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Carpentry Services
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              Bring your ideas to life with custom furniture and woodwork.
              Our carpentry team crafts kitchen cabinets, wardrobes, vanity counters,
              and bespoke designs with millimeter precision and premium laminates.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20carpentry%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get Free Carpentry Quote</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
              Custom Fabricated For Your Home
            </h2>
            <div className="space-y-3">
              {[
                "Modular kitchen cabinets with quartz, sintered stone, or granite tops",
                "Full-height built-in bedroom wardrobes with internal drawers & LED strips",
                "Feature walls, fluted wall panels, and suspended TV consoles",
                "Custom shoe cabinets with ventilation grilles and settee seating",
                "Bathroom vanity cabinets with moisture-resistant plywood",
                "Blum soft-closing tracks, hydraulic hinges, and anti-slam mechanisms",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-[#4E9A3C] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/images/carpentry/4.jpeg"
              alt="Custom kitchen cabinetry carpentry"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
