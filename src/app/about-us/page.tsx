import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Users, Award, Hammer, MessageCircle, MapPin, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | MACNEL Construction Pte. Ltd",
  description:
    "Learn about MACNEL Construction Pte. Ltd — Singapore's trusted direct renovation contractor. In-house craftsmen handling 18+ trades with zero middleman markups.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="relative overflow-hidden bg-[#16263F] text-white py-20 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('/images/carpentry/2.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16263F] via-[#16263F]/90 to-[#16263F]/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/10 px-4 py-1.5 text-xs font-semibold text-[#8CCB6B] mb-5">
            <span>Direct Renovation Contractor · Singapore</span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            About MACNEL Construction
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
            Providing professional construction, renovation, and maintenance services
            tailored to Singapore homeowners and commercial enterprises. Handled entirely
            by one dedicated in-house team.
          </p>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Connect with our Project Managers</span>
          </a>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Our Heritage &amp; Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight mb-6">
              Building Trust Through Craftsmanship &amp; Transparent Communication
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-5">
              Renovation projects in Singapore too often suffer from endless sub-contractor
              layers, communication breakdowns, and surprise variation order charges.
              At <strong>MACNEL Construction Pte. Ltd.</strong>, we set out to change that model.
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              By retaining our own in-house teams for hacking, waterproofing, tiling,
              carpentry, electrical rewiring, and plumbing, we guarantee tight quality
              control, dependable project schedules, and clear accountability from day one.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "100% Direct Contractor — No middlemen sales commissions",
                "Full compliance with Singapore HDB, BCA, and condo MCST guidelines",
                "Strict waterproofing protocols with mandatory ponding leak inspections",
                "Itemized quotes upfront with honest material recommendations",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-[#4E9A3C] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="/images/tiling/13.jpeg"
              alt="MACNEL Construction team on site"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16263F]/90 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase font-bold text-[#8CCB6B] tracking-wider">
                Island-Wide Singapore Coverage
              </span>
              <p className="text-xl font-bold mt-1">
                From BTO &amp; Resale HDBs to High-End Condos &amp; Landed Bungalows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-[#F2F6F9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
              The Standards We Live By
            </h2>
            <p className="text-base text-slate-600">
              Four non-negotiable principles guiding every single nail, pipe, and tile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#2C6BA6]" />,
                title: "Quality First",
                desc: "We never cut corners on raw materials, membrane waterproofing chemicals, or electrical cable gauges.",
              },
              {
                icon: <Users className="w-6 h-6 text-[#2C6BA6]" />,
                title: "One In-House Team",
                desc: "Eighteen specialized trades managed cohesively without passing the blame to outside vendors.",
              },
              {
                icon: <Award className="w-6 h-6 text-[#2C6BA6]" />,
                title: "Honest Transparency",
                desc: "Every cost itemized clearly before work begins. No unexpected surprise bills upon project handover.",
              },
              {
                icon: <Hammer className="w-6 h-6 text-[#2C6BA6]" />,
                title: "Clean Handover",
                desc: "Careful site hoarding, daily dust minimisation, and thorough cleaning prior to client inspection.",
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2C6BA6]/10 flex items-center justify-center mb-5">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Registration Banner */}
      <section className="py-16 bg-[#16263F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8CCB6B] bg-[#8CCB6B]/15 px-3 py-1.5 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span>Singapore Registered Business</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            {siteConfig.name}
          </h3>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-8">
            101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511
            <br />
            Operating: Monday – Saturday, 9:00 AM – 6:00 PM
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Request A Free Site Consultation</span>
          </a>
        </div>
      </section>
    </div>
  );
}
