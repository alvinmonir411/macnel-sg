import { ShieldCheck, Users, Banknote, Clock, Award, Hammer } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhyChooseUs() {
  const { claims, name } = siteConfig;

  const reasons = [
    {
      icon: <Users className="w-6 h-6 text-brand-accent" />,
      title: "Direct In-House Craftsmen",
      desc: "We don't outsource your project to third-party sub-contractors. You deal directly with the specialists executing the job, ensuring direct communication and accountability.",
    },
    {
      icon: <Banknote className="w-6 h-6 text-brand-accent" />,
      title: "Itemized Written Quotations",
      desc: "Detailed transparent quotes with zero hidden markups or surprise variations. What we quote is what you pay, with honest advice on material costs.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
      title: "Workmanship & Waterproofing Warranty",
      desc: "All waterproofing works undergo stringent ponding leak inspections, and our carpentry, tiling, and piping come backed with full written warranties.",
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-accent" />,
      title: "Guaranteed Milestone Timelines",
      desc: "We adhere strictly to scheduled timelines. Dedicated project supervisors monitor daily progress to ensure on-time delivery without cutting corners.",
    },
    {
      icon: <Award className="w-6 h-6 text-brand-accent" />,
      title: "HDB & Condo Guidelines Compliant",
      desc: "We handle all required renovation permit submissions, adhere to noise regulations, and comply with BCA standards for residential and commercial units.",
    },
    {
      icon: <Hammer className="w-6 h-6 text-brand-accent" />,
      title: claims.showTradeCount ? "One-Stop Solution (18+ Trades)" : "One-Stop Direct Construction",
      desc: "From hacking, electrical rewiring, and false ceilings to tiling, plumbing, and bespoke carpentry—every core trade is handled harmoniously by one team.",
    },
  ];

  return (
    <section
      id="why-us"
      className="py-20 lg:py-28 bg-[#F8FAFC] text-slate-900 relative overflow-hidden border-b border-slate-200/70"
    >
      {/* Subtle Architectural Dot Grid - Matching Core Services (NO LINE GRID) */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#166534] mb-3">
            Why Homeowners Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Reliable, Licensed &amp; Trusted in Singapore
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Renovation shouldn&apos;t be stressful. We combine experienced craftsmen,
            transparent project management, and premium quality materials for long-lasting results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#16a34a]/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5 text-[#166534]">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
