"use client";

import reviewsData from "../../data/reviews.json";
import { Star, ExternalLink, AlertTriangle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CustomerReviews() {
  const { isRealData, googleReviewsUrl, reviews } = reviewsData;

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
    <section id="reviews" className="py-20 lg:py-24 bg-[#0E172B] text-white relative">
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dev-only Banner (Rule B.2) */}
        {!isRealData && (
          <div className="mb-8 rounded-xl bg-amber-500/15 border border-amber-500/40 p-4 text-amber-200 flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>Sample data notice:</strong> The reviews below are sample placeholders. Replace with real verified Google reviews in{" "}
                <code className="bg-black/30 px-1.5 py-0.5 rounded font-mono text-amber-300">
                  /data/reviews.json
                </code>{" "}
                and set <code className="bg-black/30 px-1.5 py-0.5 rounded font-mono text-amber-300">&quot;isRealData&quot;: true</code>.
              </span>
            </div>
            {googleReviewsUrl && (
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white shrink-0 font-semibold"
              >
                Google Page &rarr;
              </a>
            )}
          </div>
        )}

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#8CCB6B] mb-2">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Real Singapore Homeowner Reviews
            </h2>
          </div>

          {/* Link to Google Reviews if URL configured */}
          {googleReviewsUrl ? (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8CCB6B] hover:text-[#A3E635] transition-colors"
            >
              <span>View all reviews on Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#8CCB6B]" />
              <span>Written contract and handover satisfaction guarantee</span>
            </div>
          )}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#8CCB6B]/40 transition-all shadow-xl"
            >
              <div>
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
                <p className="text-sm text-slate-200 leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.reviewText.replace("TODO_REPLACE: ", "")}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {rev.customerName.replace("TODO_REPLACE: ", "")}
                  </h4>
                  <p className="text-xs text-[#8CCB6B] font-medium mt-0.5">
                    {rev.propertyTypeArea.replace("TODO_REPLACE: ", "")}
                  </p>
                </div>

                {/* Google badge or link */}
                {googleReviewsUrl && (
                  <a
                    href={rev.googleReviewLink || googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white p-1"
                    title="View on Google"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
