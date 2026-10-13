import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MessageCircle, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Construction & Renovation Services in Singapore",
  description:
    "18 services from MACNEL Construction: painting & plastering, tiling, false ceiling, electrical rewiring, carpentry, toilet renovation, plumbing, flooring, decking and more.",
};

const fullServicesList = [
  {
    title: "Partition Works",
    image: "/images/partition-ceiling/1.jpeg",
    desc: "Our partition solutions are designed to create functional, flexible, and stylish spaces for both homes and offices. Whether you need to divide a large hall into smaller rooms, add privacy to your workspace, or create customized layouts, we provide durable and modern drywall and acoustic partition systems.",
  },
  {
    title: "House Renovation",
    image: "/images/house-reno/1.jpeg",
    desc: "Give your property a complete makeover with our comprehensive renovation services. From flooring upgrades and wall finishes to electrical rewiring and plumbing improvements, we handle every aspect from concept planning to final handover.",
  },
  {
    title: "Plumbing Works",
    image: "/images/tiling/12.jpeg",
    desc: "Our plumbing services cover everything from water supply systems and concealed drainage lines to leak repairs and pipe installations. With rapid response and licensed plumbers, we ensure durability and zero leakages.",
  },
  {
    title: "Solar Panel Installation",
    image: "/images/door-window/WhatsApp_Image_2026-10-05_at_5.52.24_PM.jpeg",
    desc: "Reduce electricity bills and embrace sustainability with our eco-friendly solar panel solutions tailored for landed residential and commercial properties in Singapore.",
  },
  {
    title: "Vinyl & SPC Flooring",
    image: "/images/carpentry/1.jpeg",
    desc: "Scratch-resistant, 100% waterproof luxury vinyl tiles with seamless click-lock installation. Perfect for living rooms, bedrooms, and high-traffic commercial spaces.",
  },
  {
    title: "Timber & WPC Decking",
    image: "/images/carpentry/3.jpeg",
    desc: "Enhance your outdoor living areas with premium timber and wood-plastic composite (WPC) decking for balconies, patios, planters, and swimming pool surrounds.",
  },
  {
    title: "Handyman Services",
    image: "/images/door-window/6.jpeg",
    desc: "Quick fixes and small maintenance tasks: furniture assembly, wall mounting, door lock repairs, curtain track fixing, and general home upkeep.",
  },
  {
    title: "Door & Window Installation",
    image: "/images/door-window/1.jpeg",
    desc: "Timber doors, sliding glass doors, aluminium casement windows, and bi-fold toilet doors designed to improve home security and thermal insulation.",
  },
  {
    title: "Air-Conditioning Service & Installation",
    image: "/images/partition-ceiling/11.jpeg",
    desc: "Chemical washing, routine servicing, refrigerant gas top-up, and brand new multi-split system installation for residential and commercial units.",
  },
  {
    title: "Marble Polishing",
    image: "/images/tiling/3.jpeg",
    desc: "Restore the luxurious shine of your marble floors and vanity countertops. We remove stains, scratches, and dullness using diamond-grinding techniques.",
  },
  {
    title: "Gardening & Landscape Maintenance",
    image: "/images/door-window/8.jpeg",
    desc: "Lawn trimming, plant fertilizing, automated irrigation system installation, and landscape beautification for landed homes and commercial grounds.",
  },
  {
    title: "Metal Works & Fabrication",
    image: "/images/door-window/3.jpeg",
    desc: "Custom mild steel main entrance gates, window grilles, glass balcony railings, and structural steel framing built with high precision.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-[#16263F] text-white min-h-[75vh] lg:min-h-[85vh] flex items-center py-20 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('/images/tiling/44.jpeg')",
            opacity: 0.70,
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(22, 38, 63, 0.95) 0%, rgba(22, 38, 63, 0.82) 42%, rgba(22, 38, 63, 0.35) 75%, rgba(22, 38, 63, 0.60) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/10 px-4 py-1.5 text-xs font-semibold text-[#8CCB6B] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#8CCB6B] animate-pulse" />
              <span>18 Services · One Team</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Our All Services
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
              Eighteen construction, renovation, and maintenance services for homes and
              businesses across Singapore, handled seamlessly by our in-house team.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Free Quotation on WhatsApp</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phoneTel}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#8CCB6B]" />
                <span>Call {siteConfig.contact.phonePrimary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core 6 Services Bento Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C6BA6] block mb-2">
              Primary Trades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Core Renovation Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.coreServices.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl bg-[#16263F] shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16263F] via-[#16263F]/70 to-transparent opacity-95" />

                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {service.badge && (
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-extrabold text-white mb-2 group-hover:text-[#8CCB6B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-3 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/15">
                      <Link
                        href={`/${service.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8CCB6B] hover:underline"
                      >
                        <span>View details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20MACNEL%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(
                          service.title
                        )}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/80 hover:text-white"
                      >
                        Get Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Twelve More Trades Section (Matching Reference Site) */}
      <section className="py-20 bg-[#F2F6F9] border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
              Twelve More Trades, One Dependable Team
            </h2>
            <p className="text-base text-slate-600">
              No need to coordinate with multiple third-party sub-contractors.
            </p>
          </div>

          <div className="space-y-16">
            {fullServicesList.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.title}
                  className={`flex flex-col gap-8 sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : "sm:flex-row"
                  }`}
                >
                  <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden h-64 shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C6BA6] mb-1 block">
                      Trade {(index + 7).toString().padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                      {service.desc}
                    </p>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(
                        service.title
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2C6BA6] hover:text-[#4E9A3C] transition-colors"
                    >
                      <span>Inquire about {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#16263F] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Ready to start your renovation?</h2>
          <p className="text-white/75 text-sm sm:text-base mb-8">
            Contact us today for a free on-site consultation and transparent quotation.
          </p>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat on WhatsApp for Free Quote</span>
          </a>
        </div>
      </section>
    </div>
  );
}
