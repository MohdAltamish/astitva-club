/**
 * Team Page — copy verbatim from content.md §4.
 * Sections: Hero, Core Team grid, Join the team CTA.
 */

import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import Button from "@/components/Button";
import { coreTeamMembers } from "@/data/team";
import { JOIN_FORM_URL } from "@/data/links";

export const metadata = {
  title: "Team | ASTITVA GLBITM",
  description:
    "Meet the students behind ASTITVA — GLBITM's fresher community.",
};

export default function TeamPage() {
  return (
    <div className="pt-28 pb-20 md:py-36 bg-black-950 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        {/* ═══════════════════════════════════════════════════════
            HERO — content.md §4 Hero
            ═══════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <KickerLabel>THE PEOPLE BEHIND IT</KickerLabel>
          <SectionHeading
            lineOne="Meet the"
            lineTwo="core team."
            className="mb-4"
          />
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Astitva is built and run by students, for students. Here&apos;s who&apos;s behind it this year.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            CORE TEAM GRID — content.md §4 Core Team
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 md:mb-28">
          {coreTeamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════
            JOIN THE TEAM — content.md §4 Join the team
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
            <KickerLabel>WANT IN?</KickerLabel>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              We&apos;re always looking for people who want to build, not just belong.
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              Creative &amp; Design, Content &amp; Social Media, Events &amp; Experience, Outreach &amp; Community, Technical, PR &amp; Communications — there&apos;s a place for whatever you&apos;re good at.
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
