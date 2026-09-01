/**
 * Events Page — copy verbatim from content.md §5.
 * Sections: Hero, Upcoming Events (empty state), Past Events (moments cards).
 */

import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import MomentsCard from "@/components/MomentsCard";
import { homeMomentsPreviews } from "@/data/events";
import { JOIN_FORM_URL } from "@/data/links";

export const metadata = {
  title: "Events | ASTITVA GLBITM",
  description:
    "Discover upcoming and past events by ASTITVA — GLBITM's fresher community.",
};

const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/CsfmyiQDve3LJZtzc6swTP?mode=gi_t";

export default function EventsPage() {
  return (
    <div className="pt-28 pb-20 md:py-36 bg-black-950 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-24 md:space-y-32">
        {/* ═══════════════════════════════════════════════════════
            HERO — content.md §5 Hero
            ═══════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto">
          <KickerLabel>WHAT&apos;S HAPPENING</KickerLabel>
          <SectionHeading
            lineOne="Moments"
            lineTwo="already in motion."
            className="mb-6"
          />
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            From mixers and workshops to creative sessions and campus walks —
            every event is designed to help you connect, participate, and evolve.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            UPCOMING EVENTS — content.md §5 Upcoming Events (empty state)
            ═══════════════════════════════════════════════════════ */}
        <section className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,169,77,0.4) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <KickerLabel>UPCOMING EXPERIENCES</KickerLabel>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              First events coming soon.
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              We&apos;re planning the first Astitva experiences of the year.
              Follow <a href="https://www.instagram.com/astitva_club/" target="_blank" rel="noopener noreferrer" className="text-gold-mid hover:underline">@astitva_club</a> on
              Instagram or join the WhatsApp community so you don&apos;t miss the
              announcement.
            </p>
            <Button
              href={WHATSAPP_COMMUNITY_URL}
              variant="primary"
            >
              Join the WhatsApp Community
            </Button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            PAST EVENTS / MOMENTS PREVIEW — content.md §5 Past Events
            ═══════════════════════════════════════════════════════ */}
        <div>
          <div className="mb-10 text-center md:text-left">
            <KickerLabel>COMMUNITY EXPERIENCES</KickerLabel>
            <SectionHeading
              lineOne="Moments that"
              lineTwo="bring us together."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {homeMomentsPreviews.map((moment) => (
              <MomentsCard
                key={moment.title}
                title={moment.title}
                tagline={moment.tagline}
              />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CTA BANNER
            ═══════════════════════════════════════════════════════ */}
        <section className="bg-black-800 border border-gold-deep/20 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Want to help organize our next event?
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Be a part of the core team behind ASTITVA events, design, and media.
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
