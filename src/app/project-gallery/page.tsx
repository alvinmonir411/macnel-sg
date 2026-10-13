"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MessageCircle, ZoomIn } from "lucide-react";

const galleryProjects = [
  {
    id: 1,
    title: "Condo Bathroom Transformation",
    category: "Toilet Renovation",
    image: "/images/tiling/11.jpeg",
    location: "River Valley, Singapore",
  },
  {
    id: 2,
    title: "Master Toilet Luxury Tiling",
    category: "Toilet Renovation",
    image: "/images/tiling/13.jpeg",
    location: "Tampines, Singapore",
  },
  {
    id: 3,
    title: "Living Room False Ceiling & Cove Lights",
    category: "False Ceiling",
    image: "/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg",
    location: "Bukit Timah, Singapore",
  },
  {
    id: 4,
    title: "Full House Interior Painting",
    category: "Painting",
    image: "/images/partition-ceiling/10.jpeg",
    location: "Bishan, Singapore",
  },
  {
    id: 5,
    title: "Kitchen Floor & Wall Tiling Works",
    category: "Tiling",
    image: "/images/tiling/6.jpeg",
    location: "Jurong East, Singapore",
  },
  {
    id: 6,
    title: "Custom Kitchen Cabinetry & Countertop",
    category: "Carpentry",
    image: "/images/carpentry/2.jpeg",
    location: "Punggol, Singapore",
  },
  {
    id: 7,
    title: "Waterproofing Membrane & Retiling",
    category: "Toilet Renovation",
    image: "/images/tiling/38.jpeg",
    location: "Marine Parade, Singapore",
  },
  {
    id: 8,
    title: "Electrical Rewiring & Smart DB Box",
    category: "Electrical",
    image: "/images/partition-ceiling/12.jpeg",
    location: "Woodlands, Singapore",
  },
  {
    id: 9,
    title: "Outdoor WPC Balcony Decking",
    category: "Flooring",
    image: "/images/carpentry/3.jpeg",
    location: "Sentosa Cove, Singapore",
  },
  {
    id: 10,
    title: "Drywall Partition & Acoustic System",
    category: "Partitions",
    image: "/images/partition-ceiling/3.jpeg",
    location: "Raffles Place, Singapore",
  },
  {
    id: 11,
    title: "Luxury SPC Vinyl Flooring Laying",
    category: "Flooring",
    image: "/images/carpentry/5.jpeg",
    location: "Ang Mo Kio, Singapore",
  },
  {
    id: 12,
    title: "Bathroom Vanity & Sanitary Fit-out",
    category: "Toilet Renovation",
    image: "/images/tiling/7.jpeg",
    location: "Serangoon, Singapore",
  },
];

const categories = [
  "All",
  "Toilet Renovation",
  "Painting",
  "Tiling",
  "False Ceiling",
  "Carpentry",
  "Flooring",
];

export default function ProjectGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Page Banner */}
      <section className="relative overflow-hidden bg-[#16263F] text-white py-20 lg:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('/images/partition-ceiling/Floating-Ceiling-Effect_Picfinder.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16263F] via-[#16263F]/90 to-[#16263F]/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8CCB6B]/40 bg-[#8CCB6B]/10 px-4 py-1.5 text-xs font-semibold text-[#8CCB6B] mb-5">
            <span>Portfolio &amp; Handover Works</span>
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Project Gallery
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
            Browse our completed renovation works across Singapore — from turnkey condominium
            makeovers and toilet overhauls to false ceilings, carpentry, and fine tiling.
          </p>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hello%20MACNEL%2C%20I%20saw%20your%20project%20gallery%20and%20would%20like%20a%20quotation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Inquire About A Project Style</span>
          </a>
        </div>
      </section>

      {/* Filter Tabs & Gallery Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#2C6BA6] text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#16263F]/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {project.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2C6BA6] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500">{project.location}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4E9A3C]">
                    Handover Completed
                  </span>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20MACNEL%2C%20I%20like%20your%20project%20"${encodeURIComponent(
                      project.title
                    )}"%20and%20would%20like%20a%20quote.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#2C6BA6] hover:underline"
                  >
                    Get Quote Like This
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
