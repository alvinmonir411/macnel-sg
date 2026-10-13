import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, ArrowLeft, Lightbulb, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "False Ceiling Contractor Singapore & Partition Contractor - MACNEL",
  description:
    "Top rated false ceiling contractor Singapore and partition contractor. Cove lighting, false ceiling for living room, drywall partition for living room, and bespoke designer ceilings.",
  keywords: siteConfig.serviceKeywords.falseAndPartition,
};

export default function FalseCeilingPage() {
  const points = [
    "Leading false ceiling contractor singapore for HDB BTOs, resale flats, condominiums, and offices",
    "Reliable partition contractor singapore for drywall partitions, acoustic walls, and room dividers",
    "Modern false ceiling for living room with LED cove lighting channels and minimal L-box drop ceilings",
    "Custom partition for living room creating functional study corners, prayer areas, and dining nooks",
    "Expert false ceiling designer near me for hidden curtain pelmets and air-con trunking concealment",
    "Professional false ceiling services near me with fire-rated, moisture-resistant plasterboard",
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
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
              <Lightbulb className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>Ceiling &amp; Partition Contractor · Singapore</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              False Ceiling Contractor Singapore &amp; Partition Wall Services
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed mb-8 drop-shadow-sm">
              Looking for a reputable false ceiling contractor or partition contractor in Singapore? MACNEL
              designs and installs seamless false ceilings for living rooms, LED cove light troughs, and
              durable room partitions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20quotation%20for%20false%20ceiling%20and%20partition%20works.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Free Ceiling &amp; Partition Quote</span>
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

      {/* Main Details */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Clean Architectural Lines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-5">
              Experienced False Ceiling Designer &amp; Partition Contractor
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
              Whether you are planning false ceiling services near you to hide exposed electrical pipes, or
              need a partition for your living room to create a quiet home office, our in-house specialists
              guarantee high-load metal stud framing, seamless joint taping, and smooth plaster finishes.
            </p>

            <div className="space-y-3 pt-2">
              {points.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#8CCB6B]/20 flex items-center justify-center text-[#4E9A3C] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt="False ceiling contractor singapore and partition for living room"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Targeted Keywords */}
        <div className="p-6 rounded-2xl bg-[#F2F6F9] border border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            Ceiling &amp; Partition Search Keywords:
          </span>
          <div className="flex flex-wrap gap-2">
            {siteConfig.serviceKeywords.falseAndPartition.map((kw) => (
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
