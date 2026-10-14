import { siteConfig } from "@/config/site";
import { Check, MessageCircle, ShieldCheck, Droplets, Sparkles } from "lucide-react";

export function ToiletSpotlight() {
  const { toiletProcessSteps } = siteConfig;

  return (
    <section id="toilet-renovation" className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200/70">
      {/* Subtle Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] items-start">
          {/* Left: Detailed Overview */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">
              Featured Speciality · Singapore
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 mb-5">
              Hacking, waterproofing, tiling &amp; plumbing — properly managed by one team.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              An old, leaking, or worn-out toilet can affect the comfort and condition of your entire home.
              We renovate toilets and bathrooms for condominiums, HDB flats, and landed homes across Singapore,
              so you do not need to coordinate with multiple contractors.
            </p>

            {/* Checklist Badges */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {[
                "Hacking & Removal",
                "Membrane Waterproofing",
                "Wall & Floor Tiling",
                "Grouting & Finishing",
                "Concealed Plumbing Works",
                "Sanitary Fittings & Handover",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-brand-primary-soft px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-900 border border-brand-primary-soft"
                >
                  <Check className="w-4 h-4 text-brand-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-accent" />
                <span>Our 6-Stage Renovation Protocol</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toiletProcessSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-extrabold text-brand-primary bg-brand-primary-soft px-2 py-0.5 rounded">
                        {step.step}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Highlight Card */}
          <div className="lg:sticky lg:top-28 rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/tiling/11.jpeg"
                alt="Bathroom renovation in progress"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-brand-accent" />
                <span>100% Leak-Proof Guarantee</span>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                Guaranteed Craftsmanship
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1 mb-2">
                Waterproofing Done Right, First Time
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Water seepage is every homeowner&apos;s nightmare. We perform a mandatory 48-hour water
                ponding test prior to any tile installation to ensure complete watertight integrity.
              </p>

              <div className="space-y-3 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-accent-dark" />
                  <span>Approved waterproofing chemical membranes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-accent-dark" />
                  <span>Direct technician communication, no salesman markup</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                  siteConfig.name
                )}%2C%20I%20would%20like%20a%20quotation%20for%20toilet%20renovation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl brand-gradient text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get a Quote on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
