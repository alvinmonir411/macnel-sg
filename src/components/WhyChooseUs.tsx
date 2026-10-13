import { ShieldCheck, Users, Banknote, Clock, Award, Hammer } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: <Users className="w-6 h-6 text-brand-accent" />,
      title: "Direct In-House Craftsmen",
      desc: "We don't outsource your project to third-party sub-contractors. You deal directly with the specialists executing the job, ensuring direct communication and accountability.",
    },
    {
      icon: <Banknote className="w-6 h-6 text-brand-accent" />,
      title: "Transparent & Honest Pricing",
      desc: "Detailed itemized quotes with zero hidden markups or surprise variations. What we quote is what you pay, with honest advice on material costs.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
      title: "Workmanship & Waterproofing Warranty",
      desc: "All waterproofing works undergo stringent ponding leak inspections, and our carpentry, tiling, and piping come backed with full workmanship warranties.",
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-accent" />,
      title: "On-Time Handover Guarantee",
      desc: "We adhere strictly to scheduled timelines. Dedicated project supervisors monitor daily progress to ensure on-time delivery without cutting corners.",
    },
    {
      icon: <Award className="w-6 h-6 text-brand-accent" />,
      title: "HDB & Condo Guidelines Compliant",
      desc: "We handle all required renovation permit submissions, adhere to noise regulations, and comply with BCA standards for residential and commercial units.",
    },
    {
      icon: <Hammer className="w-6 h-6 text-brand-accent" />,
      title: "One-Stop Solution (18+ Trades)",
      desc: "From hacking, electrical rewiring, and false ceilings to tiling, plumbing, and bespoke carpentry—every single trade is handled harmoniously by one team.",
    },
  ];

  return (
    <section
      id="why-us"
      style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
      className="py-20 lg:py-28 bg-[#16263F] text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2C6BA6]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#8CCB6B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#A3E635] mb-3">
            Why Homeowners Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Reliable, Licensed &amp; Trusted in Singapore
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Renovation shouldn&apos;t be stressful. We combine experienced craftsmen,
            transparent project management, and premium quality materials for long-lasting results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              style={{ backgroundColor: "rgba(30, 51, 82, 0.95)" }}
              className="rounded-2xl p-6 sm:p-8 border border-slate-600/70 shadow-xl hover:border-[#8CCB6B]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8CCB6B]/20 border border-[#8CCB6B]/40 flex items-center justify-center mb-5 text-[#A3E635]">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2.5">{item.title}</h3>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
