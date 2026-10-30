"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  Calendar,
  MessageCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  History,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import {
  searchableServices,
  popularSearchQueries,
  SearchableService,
} from "@/data/searchIndex";

interface ServiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function ServiceSearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: ServiceSearchModalProps) {
  const { contact: liveContact } = useSiteSettings();
  const targetWhatsapp = liveContact?.whatsapp || siteConfig.contact.whatsapp;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      try {
        const stored = localStorage.getItem("rc_recent_searches");
        if (stored) {
          setRecentSearches(JSON.parse(stored).slice(0, 5));
        }
      } catch (e) {
        // Ignore localStorage error
      }
    }
  }, [isOpen, initialQuery]);

  // Save recent search
  const saveSearchTerm = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed || trimmed.length < 2) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("rc_recent_searches", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("rc_recent_searches");
    } catch (e) {}
  };

  // Categories list
  const categories = useMemo(() => {
    return [
      "All",
      "Tiling",
      "Doors & Windows",
      "Ceiling & Partition",
      "Painting & Plaster",
      "House Renovation",
      "Flooring & Carpet",
      "Toilet & Plumbing",
    ];
  }, []);

  // Filter & Search computation
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return searchableServices
      .map((service) => {
        // Category filter
        if (selectedCategory !== "All" && service.category !== selectedCategory) {
          return null;
        }

        if (!q) {
          return { service, matchedKeyword: null, score: 1 };
        }

        // Search in title
        const titleMatch = service.title.toLowerCase().includes(q);
        // Search in tagline & highlights
        const textMatch =
          service.tagline.toLowerCase().includes(q) ||
          service.highlights.some((h) => h.toLowerCase().includes(q));

        // Search in keywords list
        const matchedKeyword = service.keywords.find((k) =>
          k.toLowerCase().includes(q)
        );

        if (titleMatch || textMatch || matchedKeyword) {
          let score = 0;
          if (titleMatch) score += 10;
          if (matchedKeyword) score += 8;
          if (textMatch) score += 3;
          return { service, matchedKeyword: matchedKeyword || null, score };
        }

        return null;
      })
      .filter((item): item is { service: SearchableService; matchedKeyword: string | null; score: number } => item !== null)
      .sort((a, b) => b.score - a.score);
  }, [query, selectedCategory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        if (filteredResults[activeIndex]) {
          e.preventDefault();
          saveSearchTerm(query || filteredResults[activeIndex].service.title);
          router.push(filteredResults[activeIndex].service.route);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, activeIndex, query, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-8 sm:pt-16 md:pt-20 px-3 sm:px-4">
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Search Modal Box */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
        {/* Top Header / Search Input */}
        <div className="relative border-b border-slate-200 bg-[#F8FAFC] p-3 sm:p-4">
          <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-2xl px-4 py-3 shadow-inner focus-within:ring-2 focus-within:ring-[#2C6BA6] focus-within:border-transparent transition-all">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search renovation services, trades, keywords (e.g. bathroom tilers, false ceiling, door replacement)..."
              className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveIndex(0);
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-200 transition-all shrink-0 hidden sm:inline-block"
            >
              ESC
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(0);
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#16263F] text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Results Area */}
        <div
          ref={resultsContainerRef}
          className="overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 flex-1 space-y-3"
        >
          {/* If No Query: Show Popular Searches & Quick Suggestions */}
          {!query && (
            <div className="space-y-5 pb-3">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => {
                          setQuery(term);
                          setActiveIndex(0);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-all"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#2C6BA6]" /> Popular Renovation Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearchQueries.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setQuery(term);
                        setActiveIndex(0);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                  <Layers className="w-3.5 h-3.5 text-slate-400" /> Core Trade Catalog ({searchableServices.length} Services)
                </span>
              </div>
            </div>
          )}

          {/* Results List */}
          {filteredResults.length > 0 ? (
            filteredResults.map(({ service, matchedKeyword }, index) => {
              const isSelected = index === activeIndex;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`pt-3 pb-3 transition-all rounded-2xl p-3 sm:p-4 ${
                    isSelected
                      ? "bg-slate-50 border border-slate-200 shadow-sm"
                      : "hover:bg-slate-50/70"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {service.category}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#8CCB6B]/20 text-[#2E7D32] border border-[#8CCB6B]/40 px-2 py-0.5 rounded">
                            {service.badge}
                          </span>
                          <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {service.turnaround}
                          </span>
                        </div>

                        <Link
                          href={service.route}
                          onClick={() => {
                            saveSearchTerm(query || service.title);
                            onClose();
                          }}
                          className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#2C6BA6] transition-colors line-clamp-1 group flex items-center gap-1.5"
                        >
                          <span>{service.title}</span>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#2C6BA6]" />
                        </Link>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-0.5">
                          {service.tagline}
                        </p>

                        {/* Matched Keyword Highlight */}
                        {matchedKeyword && (
                          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                            <span className="font-bold">Match:</span>
                            <span>"{matchedKeyword}"</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Quick Action CTAs */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <span className="text-xs font-bold text-[#2C6BA6] hidden sm:block">
                        {service.pricingHint}
                      </span>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Link
                          href={`/book?service=${service.bookServiceId}`}
                          onClick={() => {
                            saveSearchTerm(query || service.title);
                            onClose();
                          }}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl brand-gradient text-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Inspection</span>
                        </Link>

                        <a
                          href={`https://wa.me/${targetWhatsapp}?text=Hello%20${encodeURIComponent(
                            siteConfig.name
                          )}%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(service.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all border border-[#25D366]/30"
                          title="WhatsApp Inquire"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </a>

                        <Link
                          href={service.route}
                          onClick={() => {
                            saveSearchTerm(query || service.title);
                            onClose();
                          }}
                          className="inline-flex items-center justify-center text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-all"
                        >
                          <span>Details</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No services found for "{query}"
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
                Looking for a custom trade or specific site requirement? Message our project
                engineer directly on WhatsApp for an immediate assessment.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                    inputRef.current?.focus();
                  }}
                  className="text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Clear search filter
                </button>
                <a
                  href={`https://wa.me/${targetWhatsapp}?text=Hello%20${encodeURIComponent(
                    siteConfig.name
                  )}%2C%20I%20am%20looking%20for%20${encodeURIComponent(query)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-[#25D366] text-white shadow hover:scale-[1.02] transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Ask Engineer on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 bg-[#F8FAFC] px-4 py-3 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700">↓</kbd>
              <span className="hidden sm:inline">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700">↵</kbd>
              <span className="hidden sm:inline">Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-700">esc</kbd>
              <span className="hidden sm:inline">Close</span>
            </span>
          </div>
          <span className="font-semibold text-slate-700">
            {filteredResults.length} {filteredResults.length === 1 ? "trade match" : "trades available"}
          </span>
        </div>
      </div>
    </div>
  );
}
