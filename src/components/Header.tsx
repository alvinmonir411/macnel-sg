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
  Home,
  DoorOpen,
  Layers,
  Wrench,
  Sun,
  Wind,
  Gem,
  ShieldCheck,
  Search,
  MapPin,
  Clock,
} from "lucide-react";
import { ServiceSearchModal } from "@/components/ServiceSearchModal";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function Header({ customContact, customCredentials }: { customContact?: any; customCredentials?: any } = {}) {
  const { contact: contextContact, credentials: contextCredentials } = useSiteSettings();
  const contact = { ...siteConfig.contact, ...(customContact || {}), ...(contextContact || {}) };
  const uen = contextCredentials?.uen || customCredentials?.uen || siteConfig.uen;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll detection for enhanced glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keyboard shortcut for search (⌘K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Core Renovation Trades (Only the authentic services Renovation Contractor SG sells)
  const coreServicesCol1 = [
    {
      title: "House Renovation",
      href: "/house-renovation",
      desc: "Turnkey home makeover & direct contractor",
      badge: "Full Turnkey",
      icon: <Home className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Floor & Wall Tiling",
      href: "/tiling-works",
      desc: "Tile floor installers & bathroom tilers",
      badge: "Wet Trade",
      icon: <Grid3X3 className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Door & Window Services",
      href: "/door-window-services",
      desc: "Front door replacement & window repair",
      badge: "BCA Approved",
      icon: <DoorOpen className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Toilet Renovation",
      href: "/toilet-renovation-in-singapore",
      desc: "Hacking, waterproofing, tiling & plumbing",
      badge: "Signature",
      icon: <Droplets className="w-4 h-4 text-brand-accent" />,
    },
  ];

  const coreServicesCol2 = [
    {
      title: "False Ceiling & Partition",
      href: "/false-ceiling",
      desc: "Ceiling designer, cove light & partition walls",
      badge: "Saint-Gobain",
      icon: <Lightbulb className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Painting Services",
      href: "/house-painting-plastering",
      desc: "Nippon paint interior & exterior painting",
      badge: "Nippon Paint",
      icon: <Paintbrush className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Plastering Services",
      href: "/house-painting-plastering",
      desc: "Skim coating, wall smoothing & crack repair",
      badge: "Skim Coat",
      icon: <Hammer className="w-4 h-4 text-brand-accent" />,
    },
    {
      title: "Flooring & Carpet Services",
      href: "/flooring-carpet-services",
      desc: "Hardwood refinishing, SPC vinyl & carpet",
      badge: "Bona System",
      icon: <Layers className="w-4 h-4 text-brand-accent" />,
    },
  ];

  const allServicesList = [...coreServicesCol1, ...coreServicesCol2];

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
    allServicesList.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Compact Main Navbar */}
      <div
        className={`w-full transition-all duration-300 border-b border-white/10 ${
          scrolled
            ? "bg-[#091322]/95 backdrop-blur-2xl shadow-xl shadow-black/40 py-2 sm:py-2.5"
            : "bg-[#0A1424]/90 backdrop-blur-xl shadow-md py-2 sm:py-2.5"
        } px-3 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-5">
          {/* Brand Logo - Compact & Crisp */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group py-0.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-[#8CCB6B]/40 ring-1 ring-white/10 flex items-center justify-center bg-[#0B1A2E] shadow-[0_0_12px_rgba(140,203,107,0.25)] group-hover:border-[#8CCB6B] transition-all shrink-0">
              <img src="/macnel-icon.svg" alt="Renovation Contractor SG" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col shrink-0">
              <span className="font-extrabold text-[13.5px] sm:text-[15.5px] tracking-tight text-white whitespace-nowrap drop-shadow-sm">
                Renovation Contractor SG
              </span>
              <p className="text-[7.5px] sm:text-[8.5px] text-slate-300 tracking-[0.1em] uppercase font-bold whitespace-nowrap flex items-center gap-1.5">
                <span className="text-[#8CCB6B]">Renovation Specialists</span>
                <span className="w-1 h-1 rounded-full bg-[#8CCB6B] animate-pulse" />
                <span>UEN: {uen}</span>
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs xl:text-[13px] font-semibold">
            <Link
              href="/"
              className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap ${
                pathname === "/"
                  ? "bg-white/[0.14] text-white shadow-sm ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>Home</span>
            </Link>

            {/* ALL 18 SERVICES MEGA DROPDOWN */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              onMouseLeave={() => setDesktopDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all text-xs font-semibold focus:outline-none whitespace-nowrap cursor-pointer ${
                  isServicesActive
                    ? "bg-white/[0.14] text-white shadow-sm ring-1 ring-white/20"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    desktopDropdownOpen ? "rotate-180 text-[#8CCB6B]" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel (All 18 Services) */}
              {desktopDropdownOpen && (
                <div className="absolute top-full -left-20 xl:left-1/2 xl:-translate-x-1/2 w-[720px] pt-3 z-50">
                  <div
                    style={{ backgroundColor: "#0B1528" }}
                    className="rounded-2xl bg-[#0B1528]/95 border border-white/10 p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-1 pb-3 flex items-center justify-between border-b border-slate-700/80 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-[#A3E635]">
                          Our Core Renovation Trades
                        </span>
                        <span className="text-[10px] bg-[#8CCB6B]/20 text-[#A3E635] border border-[#8CCB6B]/40 px-2 py-0.5 rounded-full font-bold">
                          Direct In-House Teams
                        </span>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setDesktopDropdownOpen(false)}
                        className="text-xs font-bold text-white hover:text-[#A3E635] flex items-center gap-1 transition-colors"
                      >
                        <span>Full Directory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {/* Column 1: Core Renovation Trades (4 Services) */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center justify-between">
                          <span>Renovation &amp; Surfaces</span>
                        </div>
                        <div className="space-y-1">
                          {coreServicesCol1.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setDesktopDropdownOpen(false)}
                              className={`flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                                pathname === item.href
                                  ? "bg-white/20 text-white"
                                  : "hover:bg-white/10 text-slate-100 hover:text-white"
                              }`}
                            >
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-white block truncate">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="bg-[#A3E635] text-[#16263F] text-[8px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-300 block truncate">
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Walls, Ceilings & Finishes (4 Services) */}
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center justify-between">
                          <span>Walls, Ceilings &amp; Flooring</span>
                        </div>
                        <div className="space-y-1">
                          {coreServicesCol2.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setDesktopDropdownOpen(false)}
                              className="flex items-start gap-2.5 p-2 rounded-xl transition-all hover:bg-white/10 text-slate-100 hover:text-white"
                            >
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-white block truncate">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="bg-[#A3E635] text-[#16263F] text-[8px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-300 block truncate">
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-700/80 px-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
                        <span>All core services executed directly without third-party markups.</span>
                      </div>
                      <Link
                        href="/book"
                        onClick={() => setDesktopDropdownOpen(false)}
                        className="px-3 py-1.5 rounded-lg brand-gradient text-white text-xs font-bold hover:scale-105 transition-transform"
                      >
                        Book Free Inspection &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold whitespace-nowrap ${
                pathname === "/projects" || pathname === "/project-gallery"
                  ? "bg-white/[0.14] text-white shadow-sm ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>Projects</span>
            </Link>

            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold whitespace-nowrap ${
                pathname === "/about" || pathname === "/about-us"
                  ? "bg-white/[0.14] text-white shadow-sm ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>About Us</span>
            </Link>

            <Link
              href="/contact-us"
              className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold whitespace-nowrap ${
                pathname === "/contact-us"
                  ? "bg-white/[0.14] text-white shadow-sm ring-1 ring-white/20"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Action CTAs: Search + Free Quote (WhatsApp) + Book Free Site Inspection */}
          {/* Action CTA: Book Free Site Inspection Only */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
            <a
              href={`tel:${contact.phoneTel || contact.phonePrimary}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-slate-200 hover:text-white transition-all whitespace-nowrap"
              title={`Call hotline: ${contact.phonePrimary}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#8CCB6B]" />
              <span>Call: {contact.phonePrimary}</span>
            </a>

            <Link
              href="/book"
              className="flex items-center gap-1.5 text-xs font-extrabold px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#8CCB6B] via-[#85C963] to-[#6EB648] hover:from-[#9DE07A] hover:to-[#7DC757] text-[#0A1424] shadow-[0_2px_14px_rgba(140,203,107,0.35)] hover:shadow-[0_4px_22px_rgba(140,203,107,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="text-xs font-extrabold">Book Free Site Inspection</span>
            </Link>
          </div>

          {/* Mobile Actions: WhatsApp & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile WhatsApp Quick Action */}
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(
                siteConfig.name
              )}%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-[#25D366] text-slate-950 hover:bg-[#20ba59] transition-all shadow"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            style={{ backgroundColor: "#0C172B" }}
            className="lg:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-[#0C172B]/95 border border-white/15 px-4 pt-4 pb-6 space-y-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
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
                <div className="pl-3 pr-2 py-2 space-y-2 bg-black/40 rounded-xl my-1 border border-slate-700 max-h-96 overflow-y-auto">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-xs font-black text-[#A3E635] hover:underline"
                  >
                    &rarr; View All Services Directory
                  </Link>

                  <div className="space-y-1">
                    {allServicesList.map((s) => (
                      <Link
                        key={s.title}
                        href={s.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:text-white hover:bg-white/10 rounded-lg"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
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
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#8CCB6B]"
            >
              Completed Projects
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#8CCB6B]"
            >
              About Us &amp; Standards
            </Link>

            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#8CCB6B]"
            >
              Contact &amp; Showroom
            </Link>

            <div className="pt-4 border-t border-slate-700/80 flex flex-col gap-2.5">
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl brand-gradient text-white font-bold text-sm shadow-md"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Free Site Inspection</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${contact.phoneTel || contact.phonePrimary}`}
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 text-[#8CCB6B]" />
                  <span>Call Us</span>
                </a>

                <a
                  href={`https://wa.me/${contact.whatsapp}?text=Hello%20${encodeURIComponent(
                    siteConfig.name
                  )}%2C%20I%20would%20like%20a%20free%20quotation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#25D366] text-slate-950 font-bold text-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Interactive Service Search Modal */}
      <ServiceSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
