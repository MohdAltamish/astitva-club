/**
 * About Page — copy verbatim from content.md §3.
 * Sections: Hero, Vision, Mission, Core Values, The ASTITVA Framework, The Journey, CTA.
 */

import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import JourneyStepper from "@/components/JourneyStepper";
import {
  visionContent,
  missionContent,
  coreValues,
  astitvaPrinciples,
} from "@/data/about";
import { JOIN_FORM_URL } from "@/data/links";

export const metadata = {
  title: "About | ASTITVA GLBITM",
  description:
    "Discover the story, vision, mission, and core values of ASTITVA — GLBITM's fresher community.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 md:py-36 bg-black-950 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-24 md:space-y-36">
        {/* ═══════════════════════════════════════════════════════
            HERO — content.md §3 Hero
            ═══════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto">
          <KickerLabel>OUR STORY</KickerLabel>
          <SectionHeading
            lineOne="We enter as strangers,"
            lineTwo="we rise as one."
            className="mb-6"
          />
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Astitva (अस्तित्व) is built on the simple belief that your first year of
            college shouldn&apos;t just be an academic routine — it should be where
            you find your voice, your people, and your path.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION — Vision & Mission
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Vision */}
          <div className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between">
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,169,77,0.5) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div>
              <KickerLabel>{visionContent.kicker}</KickerLabel>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                {visionContent.heading}
              </h2>
              <blockquote className="text-gray-300 text-base md:text-lg leading-relaxed italic border-l-2 border-gold-mid/50 pl-4 py-1">
                &ldquo;{visionContent.body}&rdquo;
              </blockquote>
            </div>
            <div className="mt-8 pt-6 border-t border-gold-deep/10 flex items-center gap-2 text-gold-mid text-xs font-kicker uppercase tracking-widest">
              <span>✦</span> Foundation of friendships, experiences &amp; identity
            </div>
          </div>

          {/* Mission */}
          <div className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-12">
            <KickerLabel>{missionContent.kicker}</KickerLabel>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
              {missionContent.heading}
            </h2>
            <ul className="space-y-3">
              {missionContent.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                  <span className="text-gold-mid mt-1 shrink-0 text-xs">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION — Core Values — content.md §3 Core Values
            ═══════════════════════════════════════════════════════ */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <KickerLabel>WHAT WE STAND FOR</KickerLabel>
            <SectionHeading
              lineOne="Seven things"
              lineTwo="we won't compromise on."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={val.name}
                className={`bg-black-800 border border-gold-deep/20 rounded-2xl p-6 md:p-8
                  transition-all duration-300 hover:border-gold-mid hover:shadow-[0_0_24px_rgba(212,175,55,0.08)]
                  ${idx === 6 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <span className="text-xs font-kicker text-gold-mid uppercase tracking-widest block mb-2">
                  0{idx + 1} &middot; Value
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                  {val.name}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION — The ASTITVA Framework — content.md §3
            ═══════════════════════════════════════════════════════ */}
        <div className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <KickerLabel>OUR PRINCIPLES</KickerLabel>
            <SectionHeading
              lineOne="The ASTITVA"
              lineTwo="Framework."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {astitvaPrinciples.map((item) => (
              <div
                key={item.word}
                className="bg-black-900/80 border border-gold-deep/15 rounded-2xl p-6 group hover:border-gold-mid/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-mid/10 border border-gold-mid/30 flex items-center justify-center font-display text-2xl font-bold text-gold-light mb-4 group-hover:scale-110 transition-transform">
                  {item.letter}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {item.word}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION — The Journey — content.md §3 The Journey
            ═══════════════════════════════════════════════════════ */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <KickerLabel>THE ASTITVA JOURNEY</KickerLabel>
            <SectionHeading
              lineOne="From stranger"
              lineTwo="to one."
            />
          </div>

          <JourneyStepper />
        </div>

        {/* ═══════════════════════════════════════════════════════
            FINAL CTA BANNER
            ═══════════════════════════════════════════════════════ */}
        <section className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,169,77,0.4) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Ready to begin your journey?
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Join ASTITVA and take your first step from stranger to one of us.
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
