"use client";

/**
 * Gallery Page — copy verbatim from content.md §6.
 * Sections: Hero, Category Filter, Photo Grid with Lightbox.
 */

import { useState } from "react";
import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { galleryItems, GalleryItem } from "@/data/gallery";
import { JOIN_FORM_URL } from "@/data/links";

const categories = ["All", "Community", "Events", "Creative", "Memories"] as const;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 md:py-36 bg-black-950 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* ═══════════════════════════════════════════════════════
            HERO — content.md §6 Hero
            ═══════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto">
          <KickerLabel>MOMENTS THAT SHAPED US</KickerLabel>
          <SectionHeading
            lineOne="Every face,"
            lineTwo="every memory."
            className="mb-6"
          />
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            The moments that made this a community, not just a group.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CATEGORY FILTER
            ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-kicker uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold-mid text-black-950 font-bold shadow-[0_0_16px_rgba(212,175,55,0.3)]"
                  : "bg-black-800 border border-gold-deep/20 text-gray-400 hover:text-gold-mid hover:border-gold-mid/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            GALLERY GRID
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-black-800 border border-gold-deep/20 rounded-2xl overflow-hidden
                transition-all duration-300 hover:border-gold-mid hover:shadow-[0_0_24px_rgba(212,175,55,0.1)] flex flex-col"
            >
              {/* Photo placeholder area */}
              <div className="aspect-[4/3] bg-black-900 border-b border-gold-deep/10 relative flex items-center justify-center overflow-hidden p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="w-12 h-12 rounded-full bg-gold-mid/10 border border-gold-mid/30 flex items-center justify-center text-gold-mid group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="absolute bottom-3 left-3 text-[10px] font-kicker uppercase tracking-widest text-gold-mid bg-black-950/80 px-2.5 py-1 rounded-full border border-gold-deep/20">
                  {item.category}
                </span>
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-gold-light transition-colors mb-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-gold-deep/10 text-[11px] font-kicker uppercase tracking-wider text-gold-mid/70 group-hover:text-gold-mid flex items-center gap-1">
                  <span>View moment</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            LIGHTBOX MODAL
            ═══════════════════════════════════════════════════════ */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="bg-black-800 border border-gold-mid/40 rounded-3xl p-8 max-w-lg w-full relative shadow-[0_0_40px_rgba(212,175,55,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="aspect-[4/3] bg-black-900 rounded-2xl border border-gold-deep/20 flex flex-col items-center justify-center text-center p-8 mb-6">
                <div className="w-16 h-16 rounded-full bg-gold-mid/10 border border-gold-mid/30 flex items-center justify-center text-gold-mid mb-3">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-kicker text-gold-mid tracking-widest uppercase">
                  ASTITVA GALLERY &middot; {activeItem.category}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            CTA BANNER
            ═══════════════════════════════════════════════════════ */}
        <section className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Create the next chapter with us.
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Join ASTITVA and be a part of the stories and memories we make together.
            </p>
            <Button href={JOIN_FORM_URL} variant="primary">
              Join Astitva
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
