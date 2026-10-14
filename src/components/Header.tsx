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
} from "lucide-react";
import { ServiceSearchModal } from "@/components/ServiceSearchModal";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  // Core Renovation Trades (Only the authentic services MACNEL sells)
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
    <header
      className="sticky top-0 z-50 bg-[#0A1424]/90 backdrop-blur-xl border-b border-white/[0.08] text-white shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all"
    >
      {/* Luminous Top Hairline Accent */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8CCB6B]/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 xl:gap-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group py-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] border border-[#8CCB6B]/40 ring-1 ring-white/10 flex items-center justify-center text-white shadow-[0_0_15px_rgba(140,203,107,0.2)] group-hover:border-[#8CCB6B] transition-all shrink-0">
              <Hammer className="w-4 h-4 text-[#8CCB6B] group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg lg:text-[1.2rem] tracking-tight text-white whitespace-nowrap drop-shadow-sm">
                  Renovation Contractor
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#8CCB6B] to-[#A3E635] text-[#0A1424] px-1.5 py-0.5 rounded shadow-[0_2px_8px_rgba(140,203,107,0.35)] shrink-0">
                  SG
                </span>
              </div>
              <p className="text-[9.5px] text-slate-300 tracking-[0.18em] uppercase font-bold whitespace-nowrap mt-0.5 flex items-center gap-1.5">
                <span>Direct Builder</span>
                <span className="w-1 h-1 rounded-full bg-[#8CCB6B]" />
                <span>Licensed SG</span>
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links - Capsule Floating Bar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-semibold bg-white/[0.04] border border-white/[0.08] rounded-full p-1.5 backdrop-blur-md shadow-inner">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs xl:text-sm font-medium whitespace-nowrap ${
                pathname === "/"
                  ? "bg-white/[0.12] text-white font-bold shadow-sm ring-1 ring-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-xs xl:text-sm font-medium focus:outline-none whitespace-nowrap cursor-pointer ${
                  isServicesActive
                    ? "bg-white/[0.12] text-white font-bold shadow-sm ring-1 ring-white/20"
                    : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
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
                <div className="absolute top-full -left-48 w-[760px] pt-3 z-50">
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
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs xl:text-sm font-medium whitespace-nowrap ${
                pathname === "/projects" || pathname === "/project-gallery"
                  ? "bg-white/[0.12] text-white font-bold shadow-sm ring-1 ring-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>Projects</span>
            </Link>

            <Link
              href="/pricing"
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs xl:text-sm font-medium whitespace-nowrap ${
                pathname === "/pricing"
                  ? "bg-white/[0.12] text-white font-bold shadow-sm ring-1 ring-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>Pricing</span>
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs xl:text-sm font-medium whitespace-nowrap ${
                pathname === "/about" || pathname === "/about-us"
                  ? "bg-white/[0.12] text-white font-bold shadow-sm ring-1 ring-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>About Us</span>
            </Link>

            <Link
              href="/contact-us"
              className={`px-3.5 py-1.5 rounded-full transition-all text-xs xl:text-sm font-medium whitespace-nowrap ${
                pathname === "/contact-us"
                  ? "bg-white/[0.12] text-white font-bold shadow-sm ring-1 ring-white/20"
                  : "text-slate-200 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Action CTAs: Search + Free Quote (WhatsApp) + Book Free Site Inspection */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Search Trigger Button (Desktop) */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-slate-200 hover:text-white transition-all text-xs font-medium backdrop-blur-sm shadow-inner group shrink-0 cursor-pointer"
              title="Search renovation trades (⌘K / /)"
            >
              <Search className="w-3.5 h-3.5 text-[#8CCB6B] group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-slate-300">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/40 border border-white/15 text-[10px] font-mono text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Free Quote -> Direct WhatsApp with Live Online Indicator */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                siteConfig.name
              )}%2C%20I%20would%20like%20a%20free%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-all shadow-sm shrink-0 whitespace-nowrap"
              title="Chat directly on WhatsApp"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-400" />
              <span className="text-white font-bold">WhatsApp</span>
            </a>

            {/* Book Free Site Inspection (Rule C.4) - Ultra-Premium Luminous CTA */}
            <Link
              href="/book"
              className="flex items-center gap-2 text-xs font-extrabold px-4 py-2 rounded-xl bg-gradient-to-r from-[#8CCB6B] to-[#73B950] hover:from-[#9DE07A] hover:to-[#82C85F] text-[#0A1424] shadow-[0_2px_14px_rgba(140,203,107,0.35)] hover:shadow-[0_4px_22px_rgba(140,203,107,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 whitespace-nowrap"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Free Site Inspection</span>
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all"
              aria-label="Search services"
              title="Search services"
            >
              <Search className="w-4 h-4 text-[#A3E635]" />
            </button>

            <Link
              href="/book"
              className="sm:hidden px-3 py-1.5 rounded-lg brand-gradient text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                siteConfig.name
              )}%2C%20I%20would%20like%20a%20free%20quotation.`}
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
          {/* Quick Search in Mobile Drawer */}
          <div className="pb-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold text-left hover:bg-white/15 transition-all shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#A3E635]" />
                <span>Search all services &amp; keywords...</span>
              </span>
              <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-white/20 font-mono text-[#A3E635]">
                SEARCH
              </span>
            </button>
          </div>

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
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-bold rounded-lg text-white hover:text-[#8CCB6B]"
          >
            Pricing Guide
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

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20${encodeURIComponent(
                siteConfig.name
              )}%2C%20I%20would%20like%20a%20free%20quotation.`}
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

      {/* Global Interactive Service Search Modal */}
      <ServiceSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
