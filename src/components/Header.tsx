"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Hammer,
  ChevronDown,
  Droplets,
  Paintbrush,
  Grid3X3,
  Lightbulb,
  Zap,
  Sparkles,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const servicesDropdownItems = [
    {
      title: "Toilet Renovation",
      href: "/toilet-renovation-in-singapore",
      desc: "Hacking, waterproofing, tiling & plumbing",
      badge: "Signature",
      icon: <Droplets className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "House Painting & Plastering",
      href: "/house-painting-plastering",
      desc: "Smooth surfaces & durable premium coatings",
      icon: <Paintbrush className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Floor & Wall Tiling",
      href: "/tiling-works",
      desc: "Laser-aligned tiles with waterproof grouting",
      icon: <Grid3X3 className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "False Ceiling & Lighting",
      href: "/false-ceiling",
      desc: "Cove lights, L-box & minimalist ceilings",
      icon: <Lightbulb className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Electrical Works / Rewiring",
      href: "/electrical-works-rewiring",
      desc: "EMA certified rewiring, DB box & power points",
      icon: <Zap className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Custom Carpentry Services",
      href: "/carpentry-services",
      desc: "Kitchen cabinets, wardrobes & feature walls",
      icon: <Sparkles className="w-4 h-4 text-brand-accent" />,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isServicesActive =
    pathname === "/services" ||
    servicesDropdownItems.some((item) => pathname === item.href);

  return (
    <header
      style={{ backgroundColor: "var(--dark-bg, #16263F)" }}
      className="sticky top-0 z-50 bg-[#16263F] border-b border-slate-700/80 text-white shadow-xl shadow-black/25 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl brand-gradient p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#16263F] rounded-[10px] flex items-center justify-center">
                <Hammer className="w-5 h-5 text-[#A3E635]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-white drop-shadow-sm">
                  MACNEL
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#8CCB6B]/25 text-[#A3E635] border border-[#8CCB6B]/50 px-1.5 py-0.5 rounded shadow-sm">
                  SG
                </span>
              </div>
              <p className="text-[11px] text-slate-300 tracking-wider uppercase font-semibold">
                Construction &amp; Renovation
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <Link
              href="/"
              className={`py-2 transition-colors relative ${
                pathname === "/"
                  ? "text-[#A3E635] font-bold"
                  : "text-slate-100 hover:text-[#A3E635]"
              }`}
            >
              <span>Home</span>
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3E635] rounded-full" />
              )}
            </Link>

            {/* SERVICES DROPDOWN ITEM */}
            <div
              ref={dropdownRef}
              className="relative py-2"
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              onMouseLeave={() => setDesktopDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                className={`flex items-center gap-1.5 transition-colors focus:outline-none ${
                  isServicesActive
                    ? "text-[#A3E635] font-bold"
                    : "text-slate-100 hover:text-[#A3E635]"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    desktopDropdownOpen ? "rotate-180 text-[#A3E635]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu Panel */}
              {desktopDropdownOpen && (
                <div className="absolute top-full -left-20 w-[420px] pt-3 z-50">
                  <div
                    style={{ backgroundColor: "#16263F" }}
                    className="rounded-2xl bg-[#16263F] border border-slate-700/90 p-3 shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-slate-700/80 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                        Our Specialized Trades
                      </span>
                      <Link
                        href="/services"
                        onClick={() => setDesktopDropdownOpen(false)}
                        className="text-[11px] font-bold text-[#A3E635] hover:underline"
                      >
                        All 18 Services &rarr;
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {servicesDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDesktopDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            pathname === item.href
                              ? "bg-white/20 text-white"
                              : "hover:bg-white/10 text-slate-100 hover:text-white"
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white block truncate">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="bg-[#A3E635] text-[#16263F] text-[9px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-300 block truncate">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-700/80 px-2">
                      <Link
                        href="/services"
                        onClick={() => setDesktopDropdownOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 hover:text-[#A3E635] transition-colors"
                      >
                        <span>Need partition, plumbing or other trades?</span>
                        <div className="flex items-center gap-1 font-bold text-[#A3E635]">
                          <span>View Directory</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/toilet-renovation-in-singapore"
              className={`py-2 transition-colors relative flex items-center gap-1.5 ${
                pathname === "/toilet-renovation-in-singapore"
                  ? "text-[#A3E635] font-bold"
                  : "text-slate-100 hover:text-[#A3E635]"
              }`}
            >
              <span>Toilet Renovation</span>
              <span className="bg-[#A3E635] text-[#16263F] text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                Featured
              </span>
            </Link>

            <Link
              href="/project-gallery"
              className={`py-2 transition-colors relative ${
                pathname === "/project-gallery"
                  ? "text-[#A3E635] font-bold"
                  : "text-slate-100 hover:text-[#A3E635]"
              }`}
            >
              <span>Project Gallery</span>
            </Link>

            <Link
              href="/about-us"
              className={`py-2 transition-colors relative ${
                pathname === "/about-us"
                  ? "text-[#A3E635] font-bold"
                  : "text-slate-100 hover:text-[#A3E635]"
              }`}
            >
              <span>About Us</span>
            </Link>

            <Link
              href="/contact-us"
              className={`py-2 transition-colors relative ${
                pathname === "/contact-us"
                  ? "text-[#A3E635] font-bold"
                  : "text-slate-100 hover:text-[#A3E635]"
              }`}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Action CTAs: Free Quote (WhatsApp) + Book Now */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Free Quote -> Direct WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-[#25D366] bg-[#25D366]/20 text-[#4ADE80] hover:bg-[#25D366]/30 transition-all shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
              <span className="text-white font-bold">Free Quote</span>
            </a>

            {/* Book Now -> Advanced Booking System */}
            <Link
              href="/book"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl brand-gradient text-white shadow-lg hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="sm:hidden px-3 py-1.5 rounded-lg brand-gradient text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#25D366] text-white"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{ backgroundColor: "#16263F" }}
          className="lg:hidden border-t border-slate-700/80 bg-[#16263F] px-4 pt-4 pb-6 space-y-2 shadow-2xl"
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#A3E635]"
          >
            Home
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#A3E635]"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180 text-[#A3E635]" : ""
                }`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-2 space-y-1.5 bg-black/40 rounded-xl my-1 border border-slate-700">
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2.5 py-1.5 text-xs font-bold text-[#A3E635] hover:underline"
                >
                  &rarr; All 18 Construction Trades
                </Link>
                {servicesDropdownItems.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-sm font-semibold text-slate-100 hover:text-white"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/toilet-renovation-in-singapore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#A3E635]"
          >
            Toilet Renovation (Featured)
          </Link>

          <Link
            href="/project-gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#A3E635]"
          >
            Project Gallery
          </Link>

          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#A3E635]"
          >
            About Us
          </Link>

          <Link
            href="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#A3E635]"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-slate-700/80 flex flex-col gap-2.5">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl brand-gradient text-white font-bold text-sm shadow-md"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp for Free Quote</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
