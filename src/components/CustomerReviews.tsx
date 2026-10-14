"use client";

import { useState, useEffect } from "react";
import reviewsData from "../../data/reviews.json";
import { Star, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CustomerReviews() {
  const { isRealData, googleReviewsUrl, reviews } = reviewsData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // JSON-LD Review Schema (Rule B.2: Added ONLY when real data is present)
  const reviewSchema = isRealData
    ? {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        name: siteConfig.name,
        review: reviews.map((r) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: r.customerName.replace("TODO_REPLACE: ", ""),
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
          },
          reviewBody: r.reviewText.replace("TODO_REPLACE: ", ""),
          datePublished: r.date.replace("TODO_REPLACE: ", ""),
        })),
      }
    : null;

  return (
    <section id="reviews" className="py-20 lg:py-24 bg-[#F8FAFC] text-slate-900 relative border-b border-slate-200/70 overflow-hidden">
      {/* Subtle Architectural Dot Pattern - Matching Core Services Style */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-55" />

      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#166534] mb-2">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              Real Singapore Homeowner Reviews
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-normal">
              Direct homeowner feedback from completed HDB flats, condominiums, and landed homes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {googleReviewsUrl && (
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#166534] hover:text-[#15803d] transition-colors mr-2"
              >
                <span>View Google Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous reviews"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next reviews"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-[#166534] text-slate-700 hover:text-[#166534] shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport & Sliding Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="px-3 shrink-0"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="h-full rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-[#16a34a]/50 hover:shadow-xl transition-all shadow-sm relative group">
                  <div className="absolute top-6 right-6 text-slate-100 group-hover:text-emerald-50 transition-colors pointer-events-none">
                    <Quote className="w-10 h-10 fill-current opacity-40" />
                  </div>

                  <div className="relative z-10">
                    {/* Rating Stars & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {rev.date.replace("TODO_REPLACE: ", "")}
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                      &ldquo;{rev.reviewText.replace("TODO_REPLACE: ", "")}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {rev.customerName.replace("TODO_REPLACE: ", "")}
                      </h4>
                      <p className="text-xs text-[#166534] font-semibold mt-0.5">
                        {rev.propertyTypeArea.replace("TODO_REPLACE: ", "")}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#166534]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
