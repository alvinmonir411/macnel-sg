import { siteConfig } from "@/config/site";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function CoreServices() {
  const { coreServices } = siteConfig;

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-12 items-end mb-14">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">
              What we do best
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Our Core Services
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every project deserves the highest level of care and craftsmanship.
            From initial site measurement to final handover, our in-house craftsmen
            deliver durable and pristine results across Singapore.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service, index) => {
            const isFeatured = index === 0 || index === 5;
            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl bg-brand-dark shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isFeatured ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                {/* Image Container with Zoom */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-95" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {service.badge && (
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
                        {service.badge}
                      </span>
                    )}
                    {service.tag && (
                      <span className="rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-brand-dark">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 flex flex-col justify-end">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-brand-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-3 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/15">
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
                        Singapore Standard Certified
                      </span>
                      <Link
                        href={`/${service.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-brand-accent transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
