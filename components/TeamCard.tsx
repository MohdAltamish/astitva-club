/**
 * TeamCard — Ultra-sleek portrait card for Core Team members.
 * Features corner brackets, floating initials badge with radial glow,
 * gold kicker typography, and smooth micro-animations.
 */

import { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
}

export default function TeamCard({ member, className = "" }: TeamCardProps) {
  return (
    <div
      className={`group relative bg-black-900/90 border border-gold-deep/20 rounded-3xl overflow-hidden
        transition-all duration-500
        hover:border-gold-mid hover:shadow-[0_0_30px_rgba(212,175,55,0.18)] hover:-translate-y-1.5
        flex flex-col justify-between ${className}`}
    >
      {/* Corner bracket accents */}
      <span className="absolute top-3 left-3 text-gold-mid/40 font-mono text-xs pointer-events-none group-hover:text-gold-mid transition-colors duration-300">
        ⌜
      </span>
      <span className="absolute top-3 right-3 text-gold-mid/40 font-mono text-xs pointer-events-none group-hover:text-gold-mid transition-colors duration-300">
        ⌝
      </span>

      {/* Portrait / Visual Area */}
      <div className="aspect-[4/3.8] bg-black-950 relative flex items-center justify-center p-6 overflow-hidden border-b border-gold-deep/15">
        {/* Background ambient radial glow */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Big Initials Avatar with Glassmorphism */}
        <div className="w-24 h-24 rounded-2xl bg-black-900/90 border-2 border-gold-mid/40 group-hover:border-gold-mid flex items-center justify-center font-display text-3xl font-bold gold-gradient-text shadow-[0_0_24px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-all duration-300 relative z-10">
          {member.initials}
        </div>

        {/* Core Tag */}
        <span className="absolute bottom-3 left-3 text-[10px] font-kicker uppercase tracking-widest text-gold-mid bg-black-950/80 px-2.5 py-1 rounded-full border border-gold-deep/20">
          CORE TEAM
        </span>
      </div>

      {/* Member Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-kicker uppercase tracking-widest text-gold-mid/80 block mb-1">
            {member.category === "Core" ? "CORE LEADERSHIP" : "TEAM LEAD"}
          </span>
          <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-light transition-colors duration-300 mb-1.5">
            {member.name}
          </h3>
          <p className="text-gold-mid font-kicker text-xs uppercase tracking-wider leading-snug">
            {member.role}
          </p>
          {member.bio && (
            <p className="text-gray-400 text-xs italic mt-3 leading-relaxed border-t border-gold-deep/10 pt-2 line-clamp-2">
              &ldquo;{member.bio}&rdquo;
            </p>
          )}
        </div>

        {/* Bottom Card Footer */}
        <div className="mt-4 pt-3 border-t border-gold-deep/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
          <span>ASTITVA &middot; 2026</span>
          <span className="text-gold-mid group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </div>
  );
}
