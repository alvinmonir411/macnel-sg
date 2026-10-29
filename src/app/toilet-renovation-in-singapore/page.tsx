"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import {
  Droplets,
  MessageCircle,
  Phone,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  Building2,
  Home,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";

const toiletProcessStages = [
  {
    step: "01",
    title: "Controlled Hacking & Site Demolition",
    image: "/images/doc-updates/image62.jpg",
    tagline: "Dust-sealed protection & HDB approved debris disposal",
    desc: "We apply heavy-duty protective floor corrugated boards across all access hallways and lifts. Certified hacking teams safely remove existing wall and floor tiles, mortar screed, old copper pipes, and worn-out sanitary fixtures without damaging the underlying structural floor slab.",
    highlights: [
      "Heavy-duty corridor and lift protection padding",
      "Full disposal to NEA-licensed recycling depots",
      "Official HDB / MCST renovation permit submission",
    ],
  },
  {
    step: "02",
    title: "3-Coat Waterproofing & 24-Hr Ponding Test",
    image: "/images/doc-updates/image79.jpg",
    tagline: "The most critical stage — zero leaks guaranteed",
    desc: "We apply two thick coats of elastomeric polymer-modified cementitious waterproofing membrane (SikaTop / K11) with fiberglass mesh reinforcement along all floor-to-wall corner joints (minimum 300mm upturn, 1800mm shower area). A strict 24-hour water ponding test is conducted and signed off before tiling starts.",
    highlights: [
      "1,800mm shower splash zone waterproofing height",
      "24-Hour continuous water ponding test with photographic proof",
      "12-Month written leak-proof structural warranty",
    ],
  },
  {
    step: "03",
    title: "Laser-Aligned Floor & Wall Tiling",
    image: "/images/doc-updates/image47.jpg",
    tagline: "100% level gradient towards floor traps for instant drainage",
    desc: "Our master tilers screed the floor with exact 1:80 fall gradient to ensure zero stagnant puddles around your drain trap. We lay large format 600x600 or 600x1200 homogeneous porcelain tiles using premium polymer tile adhesive, checked with precision digital laser levels.",
    highlights: [
      "Anti-slip R10 rated bathroom floor tiles",
      "Mapei Ultracolor Plus anti-mold, stain-resistant epoxy grouting",
      "Seamless 45° mitred tile edge finishing on feature curbs",
    ],
  },
  {
    step: "04",
    title: "Concealed Stainless Steel / PPR Plumbing",
    image: "/images/doc-updates/image90.jpg",
    tagline: "PUB licensed water service plumbing & leak prevention",
    desc: "All incoming hot and cold water pipes are routed with high-grade stainless steel or heat-fused PPR pipes concealed inside brick walls. Drainage lines, floor waste gullies, and inspection traps are repositioned with certified PUB licensed plumbers.",
    highlights: [
      "Stainless steel Grade 304 pressure-tested lines",
      "Concealed mixer valves and instant/storage heater rough-ins",
      "PUB regulatory submission and water test compliance",
    ],
  },
  {
    step: "05",
    title: "Sanitary Fixture & Glass Screen Installation",
    image: "/images/tiling/12.jpeg",
    tagline: "Designer aesthetics with millimeter mounting accuracy",
    desc: "We install your choice of wall-hung or floor-mounted WC, vanity cabinetry with quartz countertop, under-mount basins, rain shower sets, and 10mm tempered glass shower screens with stainless steel hardware.",
    highlights: [
      "10mm clear tempered safety glass shower partition",
      "Custom anti-warp solid plywood vanity cabinet installation",
      "Silent soft-close hinges and concealed water traps",
    ],
  },
  {
    step: "06",
    title: "Chemical Deep Wash & Client Handover",
    image: "/images/tiling/38.jpeg",
    tagline: "Spotless, move-in ready handover with site inspection",
    desc: "After grout curing, our post-renovation cleaners perform chemical acid wash to remove all cement hazes and protective films. You conduct the joint site handover inspection with our project manager to ensure every silicon bead, drainage flow, and light fixture is 100% flawless.",
    highlights: [
      "Professional chemical tile wash & silicon sealant inspection",
      "Comprehensive handover defect checklist inspection",
      "Official warranty certificate handed to homeowner",
    ],
  },
];

const materialsShowcase = [
  {
    name: "SikaTop Seal 107",
    category: "Waterproofing",
    badge: "BCA Certified",
    desc: "Two-part polymer modified cementitious waterproof slurry mortar.",
  },
  {
    name: "Mapei Ultracolor Plus",
    category: "Grouting",
    badge: "BioBlock® Anti-Mold",
    desc: "High-performance, anti-efflorescence, water-repellent tile grout.",
  },
  {
    name: "Stainless Steel 304",
    category: "Plumbing",
    badge: "PUB Compliant",
    desc: "Corrosion-proof concealed water supply pipes with 20-year lifespan.",
  },
  {
    name: "R10 Porcelain Tiles",
    category: "Flooring",
    badge: "Safety Rated",
    desc: "High density, zero water absorption (<0.5%) anti-slip bathroom tiles.",
  },
  {
    name: "E0 Solid Plywood",
    category: "Vanity Cabinets",
    badge: "Low Formaldehyde",
    desc: "Moisture-resistant marine core plywood finished with premium laminates.",
  },
  {
    name: "10mm Tempered Glass",
    category: "Screens",
    badge: "Grade A Safety",
    desc: "Heavy-duty shower enclosures with anti-shatter explosion film option.",
  },
];

const faqs = [
  {
    q: "Can we stay in the house while our toilet is being renovated?",
    a: "Yes. For HDB flats and condominiums with two bathrooms, we renovate one bathroom first, keeping the second fully functional for your family's daily use. Once the first toilet is completed and inspected, we proceed with the second.",
  },
  {
    q: "How long does a complete toilet renovation take in Singapore?",
    a: "A full hacking-to-handover toilet overhaul typically takes 7 to 10 working days per bathroom. This includes 1 day for hacking, 2 days for plumbing rough-in, 2 days for 3-coat waterproofing and the mandatory 24-hour ponding test, 3 days for wall & floor tiling, and 2 days for sanitary ware and shower screen installation.",
  },
  {
    q: "Do you handle the HDB or MCST condo renovation permits?",
    a: "Yes, 100%. We handle all official permit paperwork, submission of contractor All-Risk insurance policies, lift protection padding, and statutory hacking notifications to neighbors and the Town Council or condo management.",
  },
  {
    q: "What warranty do you provide against water leakage?",
    a: "We provide an official 12-Month Workmanship & Watertightness Warranty covering the waterproofing membrane and plumbing joints. If any moisture anomaly is detected, our emergency response team attends within 24 hours at zero cost.",
  },
];

export default function ToiletRenovationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* 1. ULTRA HIGH-IMPACT HERO BANNER */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[85vh] lg:min-h-screen flex items-center py-20 lg:py-28">
        {/* Crisp Local Image with High Color Vibrancy */}
        <img
          src="/images/tiling/13.jpeg"
          alt="Luxury Bathroom Renovation Singapore"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-1000 scale-105"
          style={{ opacity: 0.82 }}
        />

        {/* Directional Gradient: Rich Dark Readability on Left, Crisp Image on Right */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(22, 38, 63, 0.94) 0%, rgba(22, 38, 63, 0.75) 45%, rgba(22, 38, 63, 0.22) 75%, rgba(22, 38, 63, 0.50) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[1.25fr_.85fr] gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#8CCB6B]/50 bg-[#8CCB6B]/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-white shadow-sm backdrop-blur-sm">
                <Droplets className="w-4 h-4 text-[#A3E635]" />
                <span>Signature Service · Direct In-House Contractors</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold tracking-tight text-white leading-[1.08]">
                Toilet &amp; Bathroom Renovation, <br />
                <span className="brand-gradient-text">Hacking to Handover.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl drop-shadow-sm">
                An old, leaking toilet ruins the comfort of your whole home.
                Skip middleman markup brokers — Renovation Contractor SG coordinates hacking,
                3-coat waterproofing, laser tiling, and plumbing under one direct in-house team.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>WhatsApp for Bathroom Quote</span>
                </a>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Free On-Site Measurement</span>
                </Link>

                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#A3E635]" />
                  <span>Call {siteConfig.contact.phonePrimary}</span>
                </a>
              </div>

              {/* Micro Badges */}
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 pt-4 text-xs sm:text-sm font-semibold text-slate-100 border-t border-white/20 w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                  <span>24-Hour Water Ponding Test</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                  <span>12-Month Leak Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                  <span>PUB &amp; HDB Permit Handled</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphic Architectural Spec Card */}
            <div
              style={{ backgroundColor: "rgba(22, 38, 63, 0.85)" }}
              className="rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-white/20 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#A3E635]">
                  Turnkey Package Highlights
                </span>
                <span className="text-xs bg-[#8CCB6B]/25 text-[#A3E635] px-2.5 py-0.5 rounded-full font-bold">
                  Condo &amp; HDB
                </span>
              </div>

              <h2 className="text-2xl font-black text-white mb-3">
                Zero Subcontractors. 100% In-House Tradesmen.
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-medium">
                We assign a dedicated site engineer to manage hacking permits, waterproofing
                ponding testing, tile fall alignment, and final defect inspection.
              </p>

              <div className="space-y-3 pb-6 border-b border-white/15 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
                  <span>3-Coat SikaTop polymer waterproofing membrane</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
                  <span>Full floor screed with precise slope to drainage traps</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
                  <span>Heavy-duty concealed stainless steel Grade 304 plumbing</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
                  <span>10mm tempered frameless glass shower enclosure</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-xl font-black text-white">7–10</span>
                  <span className="text-[10px] text-slate-300 font-semibold">Working Days</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-xl font-black text-[#A3E635]">12 Mo</span>
                  <span className="text-[10px] text-slate-300 font-semibold">Leak Warranty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-xl font-black text-white">$0</span>
                  <span className="text-[10px] text-slate-300 font-semibold">On-site Quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL STEP-BY-STEP PROCESS WALKTHROUGH (NOT JUST GRID CARDS) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              Six Stages Executed Properly
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Bathrooms are the highest-risk renovation area in any Singapore home.
              Here is our exact step-by-step methodology to ensure lifelong durability with zero moisture leaks.
            </p>
          </div>

          {/* Alternating Architectural Showcase */}
          <div className="space-y-16">
            {toiletProcessStages.map((stage, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={stage.step}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Photo Showcase */}
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[16/11] ${isEven ? "lg:col-start-2" : ""}`}>
                    <img
                      src={getCloudinaryUrl(stage.image)}
                      alt={stage.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#16263F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white flex items-center gap-2 border border-white/20">
                      <span className="text-xs font-black text-[#A3E635]">STAGE {stage.step}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <span className="text-xs font-semibold">Strict Inspection</span>
                    </div>
                  </div>

                  {/* Narrative Details */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl sm:text-4xl font-black text-[#2C6BA6]/25">
                        {stage.step}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4E9A3C] bg-[#4E9A3C]/10 px-3 py-1 rounded-full">
                        {stage.tagline}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
                      {stage.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                      {stage.desc}
                    </p>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      {stage.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-[#4E9A3C] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL MATERIALS & CERTIFICATION BOARD */}
      <section className="py-20 bg-[#16263F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#A3E635] block mb-2">
              Tested Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Premium European &amp; Singapore-Approved Materials
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              We never compromise on cheap uncertified adhesives or generic grouts.
              Every batch used on your property is backed by manufacturer warranties.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialsShowcase.map((mat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#8CCB6B]/60 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {mat.category}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#8CCB6B]/20 text-[#A3E635] border border-[#8CCB6B]/40 px-2 py-0.5 rounded-full">
                    {mat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{mat.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIRECT CONTRACTOR VS INTERIOR DESIGN MIDDLEMAN COMPARISON MATRIX */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Transparent Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
              Direct Contractor vs Interior Design (ID) Agency
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Why thousands of Singapore homeowners work directly with Renovation Contractor SG:
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
            <div className="grid grid-cols-3 bg-[#16263F] text-white p-4 sm:p-5 font-bold text-xs sm:text-sm">
              <div>Aspect</div>
              <div className="text-[#A3E635]">Renovation Contractor SG (Direct)</div>
              <div className="text-slate-300">Third-Party ID Firm</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              <div className="grid grid-cols-3 p-4 sm:p-5 bg-white items-center">
                <span className="font-bold text-slate-900">Pricing &amp; Markups</span>
                <span className="text-[#4E9A3C] font-bold">Direct trade factory pricing</span>
                <span className="text-slate-500">25% – 35% sub-contract markup</span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 bg-[#F8FAFC] items-center">
                <span className="font-bold text-slate-900">Communication</span>
                <span className="text-[#4E9A3C] font-bold">Direct WhatsApp with site manager</span>
                <span className="text-slate-500">Relayed via salesperson</span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 bg-white items-center">
                <span className="font-bold text-slate-900">Workmanship Supervision</span>
                <span className="text-[#4E9A3C] font-bold">In-house master tradesmen</span>
                <span className="text-slate-500">Subbed to anonymous workers</span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 bg-[#F8FAFC] items-center">
                <span className="font-bold text-slate-900">Turnaround Speed</span>
                <span className="text-[#4E9A3C] font-bold">Fast 7–10 days per toilet</span>
                <span className="text-slate-500">Often 3–5 weeks with scheduling delays</span>
              </div>
              <div className="grid grid-cols-3 p-4 sm:p-5 bg-white items-center">
                <span className="font-bold text-slate-900">Warranty Support</span>
                <span className="text-[#4E9A3C] font-bold">12-Month direct contractor warranty</span>
                <span className="text-slate-500">Finger-pointing between ID &amp; sub-con</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CONTRACTOR FAQ ACCORDION */}
      <section className="py-20 bg-[#F2F6F9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions About Toilet Renovation
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-[#2C6BA6] transition-colors"
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#2C6BA6]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="py-20 bg-[#16263F] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: "url('/images/tiling/13.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16263F] via-[#16263F]/90 to-[#16263F]/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#A3E635] block mb-3">
            Get Your Exact Itemized Quotation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Ready to Renovate Your Bathroom with Zero Leaks?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
            WhatsApp us your floor plan or schedule our site engineer for a 100% free on-site measurement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20Renovation%20Contractor%20SG%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Instant Quote on WhatsApp</span>
            </a>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 transition-all"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book Free Site Visit</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
