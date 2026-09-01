/**
 * Team Page — Exclusively Core Team Members per official roster (team.md).
 * Features:
 * - Header & Vision
 * - Sleek Responsive Core Team Grid (7 members)
 * - Join the team recruitment banner
 */

import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import Button from "@/components/Button";
import { getTeamMembers } from "@/lib/data-service";
import { JOIN_FORM_URL } from "@/data/links";

export const metadata = {
  title: "Team | ASTITVA GLBITM",
  description:
    "Meet the core team behind ASTITVA — GLBITM's fresher community.",
};

export const revalidate = 0; // Dynamic data

export default async function TeamPage() {
  const allMembers = await getTeamMembers();
  // Filter exclusively to core team members
  const coreMembers = allMembers.filter(
    (m) => m.category === "Core" || !m.category
  );

  return (
    <div className="pt-28 pb-20 md:py-36 bg-black-950 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-20 md:space-y-28">
        {/* ═══════════════════════════════════════════════════════
            1. HERO HEADER
            ═══════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <KickerLabel>THE PEOPLE BEHIND IT</KickerLabel>
            <SectionHeading lineOne="Meet the" lineTwo="core team." />
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed lg:text-right">
            Astitva is built and run by students, for students. Here&apos;s who&apos;s leading the community for Batch 2026.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            2. CORE TEAM GRID — 7 Respective Members Only
            ═══════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[11px] font-kicker uppercase tracking-widest text-gold-mid">
              CORE LEADERSHIP ROSTER &middot; {coreMembers.length} MEMBERS
            </span>
            <div className="flex-1 h-[1px] bg-gold-deep/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {coreMembers.map((member) => (
              <TeamCard key={member.id || member.name} member={member} />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            3. JOIN THE TEAM BANNER
            ═══════════════════════════════════════════════════════ */}
        <section className="bg-black-900 border border-gold-deep/20 rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
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
