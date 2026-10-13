import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tiling Works Singapore | Floor & Wall Tiles | MACNEL Construction",
  description:
    "Expert floor and wall tile installation, marble, homogeneous, ceramic tiles, and epoxy regrouting across Singapore.",
};

export default function TilingPage() {
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
              Floor &amp; Wall Specialists
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Tiling Works &amp; Installations
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6">
              Enhance your interiors with elegant floor tiles and stylish wall designs.
              Our tiling experts provide accurate installation, durable finishes,
              and creative patterns from kitchens to bathrooms.
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20tiling%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get Free Tiling Quote</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-4">
              Precision Tiling Craftsmanship
            </h2>
            <div className="space-y-3">
              {[
                "Laser-guided alignment for consistent, even grout lines",
                "Subfloor screeding and proper gradient formation for bathroom drainage",
                "Large format homogeneous tiles, porcelain, marble, and mosaic",
                "Epoxy grouting for zero stain penetration and anti-bacterial protection",
                "Tile hacking, removal, and disposal to NEA-approved sites",
                "Hollow tile injection repairs and cracked tile replacement",
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
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
              alt="Floor and wall tiling works"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
