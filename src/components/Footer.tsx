import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, Hammer, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#16263F] text-white pt-16 pb-24 lg:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C6BA6] to-[#4E9A3C] p-0.5 shadow flex items-center justify-center">
                <div className="w-full h-full bg-[#16263F] rounded-[9px] flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-[#8CCB6B]" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                MACNEL SG
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
              Professional direct construction and renovation services across Singapore.
              From minor hacking and electrical rewiring to complete luxury bathroom
              transformations and full-home renovations.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8CCB6B] bg-[#8CCB6B]/10 px-3 py-1.5 rounded-lg border border-[#8CCB6B]/25">
              <ShieldCheck className="w-4 h-4" />
              <span>Registered in Singapore</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link
                  href="/toilet-renovation-in-singapore"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  Toilet Renovation (Hacking to Handover)
                </Link>
              </li>
              <li>
                <Link
                  href="/house-renovation"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  House Renovation (Turnkey Home Renovation)
                </Link>
              </li>
              <li>
                <Link
                  href="/tiling-works"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  Tiling Services &amp; Tile Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/house-painting-plastering"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  Painting Services SG &amp; Plastering
                </Link>
              </li>
              <li>
                <Link
                  href="/false-ceiling"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  False Ceiling &amp; Partition Contractor
                </Link>
              </li>
              <li>
                <Link
                  href="/door-window-services"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  Door &amp; Window Replacement &amp; Repair
                </Link>
              </li>
              <li>
                <Link
                  href="/flooring-carpet-services"
                  className="hover:text-[#A3E635] transition-colors"
                >
                  Flooring &amp; Carpet Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Pages */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-[#8CCB6B] transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8CCB6B] transition-colors">
                  All 18 Services
                </Link>
              </li>
              <li>
                <Link
                  href="/project-gallery"
                  className="hover:text-[#8CCB6B] transition-colors"
                >
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#8CCB6B] transition-colors">
                  About Us &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#8CCB6B] transition-colors">
                  Contact Us &amp; Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-extrabold tracking-wider uppercase text-white mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8CCB6B] shrink-0 mt-0.5" />
                <span>101 Kitchener Road, #02-13 Jalan Besar Plaza, Singapore 208511</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.phonePrimary} / {siteConfig.contact.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#8CCB6B] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords tags cloud */}
        <div className="py-6 border-b border-white/10">
          <p className="text-[11px] uppercase tracking-wider text-white/50 mb-3 font-semibold">
            Popular Renovation Services in Singapore:
          </p>
          <div className="flex flex-wrap gap-2">
            {siteConfig.seoKeywords.map((keyword, i) => (
              <span
                key={i}
                className="text-[11px] text-white/60 bg-white/5 px-2.5 py-1 rounded hover:bg-white/10 transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>
            &copy; 2026 {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Free On-Site Consultation</span>
            <span>No Obligation Quotation</span>
            <span>Direct Contractor Rate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
