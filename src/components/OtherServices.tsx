import { siteConfig } from "@/config/site";
import {
  Columns3,
  Home,
  Wrench,
  Sun,
  Layers,
  Trees,
  Shield,
  Hammer,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Columns3: <Columns3 className="w-5 h-5 text-brand-primary" />,
  Home: <Home className="w-5 h-5 text-brand-primary" />,
  Wrench: <Wrench className="w-5 h-5 text-brand-primary" />,
  Sun: <Sun className="w-5 h-5 text-brand-primary" />,
  Layers: <Layers className="w-5 h-5 text-brand-primary" />,
  TreePine: <Trees className="w-5 h-5 text-brand-primary" />,
  Shield: <Shield className="w-5 h-5 text-brand-primary" />,
  Hammer: <Hammer className="w-5 h-5 text-brand-primary" />,
};

export function OtherServices() {
  const { otherServices } = siteConfig;

  return (
    <section id="other-services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Banner */}
        <div className="mb-12">
          <div className="border-t border-slate-200 pt-6 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-brand-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              From partitions and plumbing to solar, decking and metal works, the same team that renovates your home can handle the rest.
            </span>
          </div>
          <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Other Specialized Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherServices.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-slate-50 border border-slate-200/70 p-6 flex flex-col justify-between hover:border-brand-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  {iconMap[service.icon] || <Hammer className="w-5 h-5 text-brand-primary" />}
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(
                      service.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(
                    service.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Request quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
