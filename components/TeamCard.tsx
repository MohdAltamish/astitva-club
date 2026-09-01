/**
 * TeamCard — card displaying team member's initials badge, name, role, and bio.
 * Follows design.md §6 card spec: black-800 surface, subtle gold border with hover glow.
 */

import InitialsBadge from "./InitialsBadge";
import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export default function TeamCard({ member, className = "" }: TeamCardProps) {
  return (
    <div
      className={`group bg-black-800 border border-gold-deep/20 rounded-2xl p-6 md:p-8
        flex flex-col items-center text-center
        transition-all duration-300
        hover:border-gold-mid hover:shadow-[0_0_24px_rgba(212,175,55,0.12)] hover:-translate-y-1
        ${className}`}
    >
      <div className="mb-5 transition-transform duration-300 group-hover:scale-105">
        <InitialsBadge initials={member.initials} size="lg" />
      </div>

      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1.5 group-hover:gold-gradient-text transition-colors duration-300">
        {member.name}
      </h3>

      <p className="text-gold-mid font-kicker text-xs md:text-sm uppercase tracking-wider mb-3">
        {member.role}
      </p>

      {member.bio && (
        <p className="text-gray-400 text-sm leading-relaxed mt-2">
          {member.bio}
        </p>
      )}
    </div>
  );
}
