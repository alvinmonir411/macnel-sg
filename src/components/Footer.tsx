import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Hammer,
  ShieldCheck,
  Building2,
  FileCheck,
  Globe,
  MessageCircle,
} from "lucide-react";

export function Footer({ customContact, customCredentials }: { customContact?: any; customCredentials?: any } = {}) {
  const contact = { ...siteConfig.contact, ...(customContact || {}) };
  const uen = customCredentials?.uen || siteConfig.uen;
  const legalName = customCredentials?.legalName || siteConfig.legalName;
  const hdbLicense = customCredentials?.hdbLicense !== undefined ? customCredentials.hdbLicense : siteConfig.hdbLicense;
  const bcaLicense = customCredentials?.bcaLicense || siteConfig.bcaLicense;
  const {
    name,
    tagline,
    socials,
    coreServices,
  } = siteConfig;

  return (
    <footer className="bg-[#0E172B] text-white pt-16 pb-24 lg:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Legal Entity */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#8CCB6B]/40 flex items-center justify-center bg-[#0B1A2E] shadow group-hover:scale-105 transition-transform shrink-0">
                <img src="/macnel-icon.svg" alt={name} className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    {legalName || name}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 tracking-wider uppercase font-semibold">
                  Singapore Renovation Specialists
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
              {tagline}
            </p>

            {/* Official Registration Badges */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{legalName}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
                <span>UEN: {uen}</span>
              </div>
              {hdbLicense && (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
                  <span className="truncate">{hdbLicense}</span>
                </div>
              )}
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white mb-4">
              Core Trades
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              {coreServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="hover:text-[#8CCB6B] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white mb-4">
              Company &amp; Standards
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">
              <li>
                <Link href="/" className="hover:text-[#8CCB6B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8CCB6B] transition-colors">
                  About Us &amp; Team
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#8CCB6B] transition-colors"
                >
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#8CCB6B] transition-colors"
                >
                  Contact &amp; Showroom
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-[#8CCB6B] transition-colors font-semibold text-[#8CCB6B]">
                  Book Free Site Inspection &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div>
            <h3 className="text-sm font-extrabold tracking-wider uppercase text-white mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8CCB6B] shrink-0 mt-0.5" />
                <span className="leading-snug">{contact.address.replace("TODO_REPLACE: ", "")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="hover:text-white transition-colors font-semibold"
                >
                  Call: {contact.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(name)}%2C%20I%20would%20like%20a%20free%20quotation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-semibold"
                >
                  WhatsApp: +65 {contact.whatsapp.slice(2)}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8CCB6B] shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#8CCB6B] shrink-0 mt-0.5" />
                <span>{contact.operatingHours}</span>
              </div>
            </div>

            {/* Social Icons: Only rendered if verified live URLs are provided */}
            {((socials.googleBusiness && !socials.googleBusiness.includes("TODO_REPLACE") && !socials.googleBusiness.includes("your-business")) ||
              (socials.facebook && !socials.facebook.includes("TODO_REPLACE") && !socials.facebook.includes("your-business")) ||
              (socials.instagram && !socials.instagram.includes("TODO_REPLACE") && !socials.instagram.includes("your-business"))) && (
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                {socials.googleBusiness && !socials.googleBusiness.includes("TODO_REPLACE") && !socials.googleBusiness.includes("your-business") && (
                  <a
                    href={socials.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
                    title="Google Business Profile"
                  >
                    Google
                  </a>
                )}
                {socials.facebook && !socials.facebook.includes("TODO_REPLACE") && !socials.facebook.includes("your-business") && (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
                    title="Facebook"
                  >
                    Facebook
                  </a>
                )}
                {socials.instagram && !socials.instagram.includes("TODO_REPLACE") && !socials.instagram.includes("your-business") && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-slate-300 hover:text-white transition-all"
                    title="Instagram"
                  >
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal Links (Rule A.4 & Section D) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; 2026 {legalName || name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors underline"
            >
              Privacy Policy (PDPA)
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
