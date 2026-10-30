"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import {
  MessageCircle,
  CalendarCheck,
  Search,
  ArrowRight,
  Star,
  ShieldCheck,
  Check,
  Sparkles,
  Home as HomeIcon,
  Grid3X3,
  DoorOpen,
  Layers,
  Paintbrush,
  Droplets,
  Hammer,
} from "lucide-react";
import { ServiceSearchModal } from "@/components/ServiceSearchModal";

const CORE_TRADES = [
  { name: "House Renovation", href: "/house-renovation", icon: HomeIcon },
  { name: "Tiling Works", href: "/tiling-works", icon: Grid3X3 },
  { name: "Doors & Windows", href: "/door-window-services", icon: DoorOpen },
  { name: "False Ceiling", href: "/false-ceiling", icon: Layers },
  { name: "Painting & Plastering", href: "/house-painting-plastering", icon: Paintbrush },
  { name: "Flooring & Carpet", href: "/flooring-carpet-services", icon: Layers },
  { name: "Toilet Renovation", href: "/toilet-renovation-in-singapore", icon: Droplets },
  { name: "Custom Carpentry", href: "/carpentry-services", icon: Hammer },
];

export function Hero() {
  const { contact: liveContact } = useSiteSettings();
  const targetWhatsapp = liveContact?.whatsapp || siteConfig.contact.whatsapp;
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);
  const [heroDesktop, setHeroDesktop] = useState(() => getCloudinaryUrl("/hero-modern-desktop.webp"));
  const [heroMobile, setHeroMobile] = useState(() => getCloudinaryUrl("/hero-modern-mobile.webp"));
  const [heroVideo, setHeroVideo] = useState(() => getCloudinaryUrl("/hero-video.mp4"));

  useEffect(() => {
    const handleUpdate = () => {
      setHeroDesktop(getCloudinaryUrl("/hero-modern-desktop.webp"));
      setHeroMobile(getCloudinaryUrl("/hero-modern-mobile.webp"));
      setHeroVideo(getCloudinaryUrl("/hero-video.mp4"));
    };
    window.addEventListener("live-image-updated", handleUpdate);
    return () => window.removeEventListener("live-image-updated", handleUpdate);
  }, []);

  // Defer desktop ambient video until idle thread
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 1024;
    const isDataSaver = (navigator as any)?.connection?.saveData === true;
    if (isMobile || isDataSaver) return;

    const activateVideo = () => setShouldMountVideo(true);

    if (document.readyState === "complete") {
      setTimeout(activateVideo, 200);
    } else {
      const handleLoad = () => setTimeout(activateVideo, 200);
      window.addEventListener("load", handleLoad, { once: true });
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);


  return (
    <section className="relative overflow-hidden bg-[#0A1124] text-white min-h-[calc(100dvh-5rem)] lg:h-[calc(100dvh-5rem)] flex flex-col justify-between">
      {/* 🖼️ High-End Modern Singapore Renovation Background Showcase */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          media="(max-width: 768px)"
          srcSet={heroMobile}
          type="image/webp"
        />
        <source
          media="(min-width: 769px)"
          srcSet={heroDesktop}
          type="image/webp"
        />
        <img
          src={heroDesktop}
          alt="Singapore Home & Commercial Renovation Specialists"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ${videoLoaded ? "opacity-0" : "opacity-80 sm:opacity-90"
            }`}
        />
      </picture>


      {/* 🎬 Deferred Ambient Desktop Video */}
      {shouldMountVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setVideoLoaded(true)}
          className={`hidden lg:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ${videoLoaded ? "opacity-80" : "opacity-0"
            }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

      )}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 17, 36, 0.70) 0%, rgba(10, 17, 36, 0.35) 25%, rgba(10, 17, 36, 0.60) 65%, #0A1124 100%)",
        }}
      />

      {/* Ambient Top Emerald Radial Glow */}
      <div className="absolute top-0 inset-x-0 h-80 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(140,203,107,0.18),transparent)] z-[2]" />

      {/* Main Content Area - Perfectly vertically centered within viewport */}
      <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-6 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl flex flex-col items-start gap-3 sm:gap-4 lg:gap-4 xl:gap-5">
          {/* Top Verified Contractor Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#0A1628]/80 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-emerald-300 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8CCB6B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8CCB6B]" />
            </span>
            <span className="font-bold text-white">Renovation Specialists</span>
            <span className="text-white/30">|</span>
            <span className="text-slate-200 font-medium">HDB &amp; BCA Compliant</span>
          </div>

          {/* Editorial Headline: Crisp, Confident, Balanced */}
          <h1 className="font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl xl:text-[3.8rem] leading-[1.12]">
            Complete Home &amp; <br />
            <span>Commercial Renovation</span>
            <span className="text-[#8CCB6B]">.</span>
          </h1>

          {/* Genuine Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-100 font-normal leading-relaxed max-w-2xl drop-shadow">
            Skip interior design sales markups and work directly with certified
            in-house tilers, carpenters, and ceiling specialists. Honest pricing,
            transparent quotes, and dedicated site supervision across Singapore.
          </p>

          {/* 💎 3 Sleek Glass Trust Chips (Inline, Space-Efficient) */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white shadow-sm">
              <Check className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
              <span>Zero ID Markup</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
              <span>Written Warranty</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
              <span>Milestone Contract</span>
            </span>
          </div>

          {/* Primary Action Buttons: Clean 2-CTA Stack on Mobile */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto">
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${targetWhatsapp}?text=Hello%20${encodeURIComponent(
                siteConfig.name
              )}%2C%20I%20would%20like%20a%20free%20renovation%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm sm:text-base shadow-[0_4px_25px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
              <span>WhatsApp for Free Quote</span>
            </a>

            {/* Book Site Visit CTA */}
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm sm:text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <CalendarCheck className="w-4 h-4 shrink-0 text-[#8CCB6B]" />
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4 ml-0.5 opacity-70" />
            </Link>
          </div>

          {/* Verified Credentials & Social Proof Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-slate-200">
            <div className="inline-flex items-center gap-1.5 bg-black/40 border border-white/15 px-2.5 py-1 rounded-lg backdrop-blur-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-extrabold text-white text-[11px] sm:text-xs">4.9 / 5.0</span>
              <span className="text-slate-300 text-[10px] sm:text-[11px]">(180+ Reviews)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-black/40 border border-white/15 px-2.5 py-1 rounded-lg backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8CCB6B] shrink-0" />
              <span className="text-[10px] sm:text-[11px]">12+ Years Track Record</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🛠️ Bottom Architectural 8 Core Trades Dock - Always visible above the fold without scrolling */}
      <div className="relative z-[3] border-t border-white/15 bg-black/60 backdrop-blur-md shrink-0 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CCB6B] animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold whitespace-nowrap">
                Our 8 Core Trades:
              </span>
            </div>

            {/* 8 Services Cards Grid: Fits completely on desktop without scrollbar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 flex-1">
              {CORE_TRADES.map((trade) => {
                const Icon = trade.icon;
                return (
                  <Link
                    key={trade.href}
                    href={trade.href}
                    className="group flex items-center justify-center gap-1.5 px-2 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 hover:border-[#8CCB6B]/60 transition-all text-center shadow-sm"
                  >
                    <Icon className="w-3 h-3 text-[#8CCB6B] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200 group-hover:text-white truncate">
                      {trade.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Global Interactive Service Search Modal */}
      <ServiceSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </section>
  );
}
