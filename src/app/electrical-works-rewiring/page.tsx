import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electrical Works & Rewiring Singapore | EMA Standard | MACNEL Construction",
  description:
    "Certified electrical services, full house rewiring, DB box upgrade, lighting points, power sockets, and EV charger wiring in Singapore.",
};

export default function ElectricalPage() {
  return (
    <div className="bg-white">
      <section className="relative bg-[#16263F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-[#8CCB6B] hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8CCB6B] block mb-2">
              EMA Standard &amp; Safety Compliance
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Electrical Works &amp; Rewiring
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              Ensure safety and efficiency with our licensed electrical services.
              From full house rewiring and distribution board (DB box) upgrades
              to additional power points, smart switches, and decorative chandeliers.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20an%20electrical%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get Free Electrical Quote</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
              Comprehensive Electrical Capabilities
            </h2>
            <div className="space-y-3">
              {[
                "Whole unit electrical rewiring with concealed or neat surface casing",
                "Distribution Board (DB box) replacement with RCD circuit breaker protection",
                "Installation of additional 13A single & double 3-pin power sockets",
                "Water heater, cooker hob, induction and oven point wiring",
                "Data cabling (Cat6/Cat7), TV point relocation, and smart switch automation",
                "Emergency troubleshooting, power tripping detection, and safety load testing",
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
              src="/images/partition-ceiling/12.jpeg"
              alt="Electrical works and rewiring"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
