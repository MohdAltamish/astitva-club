"use client";

import { useState, useRef } from "react";
import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import { TeamMember, departments } from "@/data/team";

interface Props {
  initialMembers?: TeamMember[];
  title?: string;
  subtitle?: string;
}

export default function InteractiveTeamSection({
  initialMembers,
  title = "Meet the",
  subtitle = "people behind Astitva.",
}: Props) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>("all");
  const [activeMemberIndex, setActiveMemberIndex] = useState<number>(0);
  const membersScrollRef = useRef<HTMLDivElement>(null);
  const deptScrollRef = useRef<HTMLDivElement>(null);

  const members = initialMembers && initialMembers.length > 0 ? initialMembers : [];

  // Filter members based on selected department
  const filteredMembers =
    selectedDeptId === "all"
      ? members
      : selectedDeptId === "tech"
      ? members.filter((m) => m.department === "Technology" || m.role.toLowerCase().includes("tech") || m.role.toLowerCase().includes("president"))
      : selectedDeptId === "creative"
      ? members.filter((m) => m.department === "Creative" || m.role.toLowerCase().includes("media") || m.role.toLowerCase().includes("design"))
      : selectedDeptId === "management"
      ? members.filter((m) => m.department === "Management" || m.role.toLowerCase().includes("management") || m.role.toLowerCase().includes("pr"))
      : selectedDeptId === "cultural"
      ? members.filter((m) => m.department === "Cultural" || m.role.toLowerCase().includes("dance") || m.role.toLowerCase().includes("music"))
      : members;

  const currentDept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  const scrollMembers = (direction: "left" | "right") => {
    if (membersScrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      membersScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollDepts = (direction: "left" | "right") => {
    if (deptScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      deptScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* ═══════════════════════════════════════════════════════
          SECTION HEADER
          ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <KickerLabel>THE PEOPLE</KickerLabel>
          <SectionHeading lineOne={title} lineTwo={subtitle} />
        </div>
        <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed lg:text-right">
          One fresher community. Different skills, shared energy. The team building the ASTITVA experience for Batch 2026.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════
          1. DEPARTMENT / TEAMS CAROUSEL
          ═══════════════════════════════════════════════════════ */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-kicker uppercase tracking-widest text-gold-mid">
              SELECT DEPARTMENT
            </span>
            <div className="w-12 h-[1px] bg-gold-deep/30" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollDepts("left")}
              className="w-9 h-9 rounded-full bg-black-900 border border-gold-deep/30 text-gray-400 hover:text-gold-mid hover:border-gold-mid flex items-center justify-center transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollDepts("right")}
              className="w-9 h-9 rounded-full bg-black-900 border border-gold-deep/30 text-gray-400 hover:text-gold-mid hover:border-gold-mid flex items-center justify-center transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Horizontal Department Cards */}
        <div
          ref={deptScrollRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {departments.map((dept, idx) => {
            const isSelected = selectedDeptId === dept.id;
            return (
              <div
                key={dept.id}
                onClick={() => {
                  setSelectedDeptId(dept.id);
                  setActiveMemberIndex(0);
                }}
                className={`relative shrink-0 w-[260px] sm:w-[290px] h-[340px] rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden border snap-start ${
                  isSelected
                    ? `bg-black-900 ${dept.borderColor} shadow-[0_0_30px_${dept.glowColor}] scale-[1.02]`
                    : "bg-black-900/70 border-gold-deep/20 hover:border-gold-mid/40 hover:bg-black-900 hover:scale-[1.01]"
                }`}
              >
                {/* Background ambient gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${dept.accentColor} pointer-events-none opacity-40 transition-opacity`}
                />

                {/* Top Bar: Code & Tag + Arrow */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-kicker uppercase tracking-widest text-gold-mid">
                        {dept.code}
                      </span>
                      <span className="text-gray-600">—</span>
                    </div>
                    <span className="text-[11px] font-kicker uppercase tracking-wider text-gray-400">
                      {dept.tag}
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                      isSelected
                        ? "bg-gold-mid text-black-950 font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                        : "border border-gold-deep/30 text-gold-light group-hover:border-gold-mid"
                    }`}
                  >
                    ↗
                  </div>
                </div>

                {/* Center Vector Artwork Motif */}
                <div className="relative z-10 my-auto flex items-center justify-center py-4">
                  {dept.iconType === "compass" && (
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-gold-mid/20 animate-pulse" />
                      <div className="w-16 h-16 rounded-full border border-gold-mid/40 flex items-center justify-center">
                        <span className="text-3xl text-gold-mid animate-spin" style={{ animationDuration: "20s" }}>
                          ✦
                        </span>
                      </div>
                      <span className="absolute top-0 text-[8px] font-mono text-gold-mid/60 tracking-widest">
                        NORTH
                      </span>
                      <span className="absolute bottom-0 text-[8px] font-mono text-gold-mid/60 tracking-widest">
                        LEAD
                      </span>
                    </div>
                  )}

                  {dept.iconType === "terminal" && (
                    <div className="relative w-36 h-20 bg-black-950/80 rounded-xl border border-cyan-500/30 p-2.5 font-mono text-[9px] text-cyan-300 space-y-1 shadow-inner">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-cyan-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                        <span className="text-[8px] text-gray-500">ASTITVA.SYS</span>
                      </div>
                      <p className="text-cyan-400/90">&gt; init_astitva()</p>
                      <p className="text-gray-400">&gt; status: online ⚡</p>
                    </div>
                  )}

                  {dept.iconType === "camera" && (
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="w-20 h-16 rounded-2xl bg-black-950/80 border border-purple-500/40 flex items-center justify-center relative">
                        <div className="w-10 h-10 rounded-full border-2 border-purple-400/60 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-purple-500/30" />
                        </div>
                        <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-purple-400" />
                      </div>
                    </div>
                  )}

                  {dept.iconType === "network" && (
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="w-16 h-16 rotate-45 border border-amber-500/40 flex items-center justify-center bg-black-950/60">
                        <span className="text-2xl text-amber-400 -rotate-45">🛡️</span>
                      </div>
                    </div>
                  )}

                  {dept.iconType === "music" && (
                    <div className="flex items-center gap-1.5 h-16">
                      {[30, 60, 90, 45, 75, 100, 50, 80, 40].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-rose-400/70 rounded-full animate-pulse"
                          style={{
                            height: `${h}%`,
                            animationDelay: `${i * 120}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Name & Members count */}
                <div className="relative z-10 border-t border-gold-deep/15 pt-3">
                  <h3 className="font-display text-xl font-bold text-white tracking-wide mb-1">
                    {dept.name}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase">
                    <span>
                      {idx === 0
                        ? `${members.length} MEMBERS`
                        : `${filteredMembers.length} MEMBERS`}
                    </span>
                    <span className="text-gold-mid">2026</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          2. SELECTED TEAM MEMBER SHOWCASE
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-8 pt-6 border-t border-gold-deep/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-kicker uppercase tracking-widest text-gold-mid">
                SELECTED DEPARTMENT
              </span>
              <span className="text-gray-600">—</span>
              <span className="text-[10px] font-kicker uppercase tracking-widest text-gray-400">
                {currentDept.tag}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {currentDept.name}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-display text-2xl md:text-3xl font-bold text-gold-mid">
                {filteredMembers.length < 10 ? `0${filteredMembers.length}` : filteredMembers.length}
              </span>
              <span className="text-[10px] font-kicker uppercase text-gray-500 block tracking-widest">
                ACTIVE MEMBERS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollMembers("left")}
                className="w-10 h-10 rounded-full bg-black-900 border border-gold-deep/30 text-gray-300 hover:text-gold-mid hover:border-gold-mid flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous member"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollMembers("right")}
                className="w-10 h-10 rounded-full bg-black-900 border border-gold-deep/30 text-gray-300 hover:text-gold-mid hover:border-gold-mid flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next member"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Member Cards Slider */}
        <div
          ref={membersScrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredMembers.map((member, idx) => (
            <div
              key={member.id || member.name}
              className="group relative shrink-0 w-[270px] sm:w-[300px] bg-black-900/90 border border-gold-deep/20 rounded-3xl overflow-hidden hover:border-gold-mid hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 snap-start flex flex-col justify-between"
            >
              {/* Corner brackets aesthetic styling */}
              <span className="absolute top-3 left-3 text-gold-mid/40 font-mono text-xs pointer-events-none group-hover:text-gold-mid transition-colors">
                ⌜
              </span>
              <span className="absolute top-3 right-3 text-gold-mid/40 font-mono text-xs pointer-events-none group-hover:text-gold-mid transition-colors">
                ⌝
              </span>

              {/* Portrait / Visual Area */}
              <div className="aspect-[4/4.2] bg-black-950 relative flex items-center justify-center p-6 overflow-hidden border-b border-gold-deep/15">
                {/* Background ambient light */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
                  }}
                />

                {/* Big Initials Avatar with Glassmorphism */}
                <div className="w-24 h-24 rounded-2xl bg-black-900/80 border-2 border-gold-mid/40 group-hover:border-gold-mid flex items-center justify-center font-display text-3xl font-bold gold-gradient-text shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-all duration-300 relative z-10">
                  {member.initials}
                </div>

                {/* Department pill at top left */}
                <span className="absolute bottom-3 left-3 text-[10px] font-kicker uppercase tracking-widest text-gold-mid bg-black-950/80 px-2.5 py-1 rounded-full border border-gold-deep/20">
                  {member.department || "LEADERSHIP"}
                </span>
              </div>

              {/* Member Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-kicker uppercase tracking-widest text-gold-mid/80 block mb-1">
                    {member.category === "Core" ? "CORE LEADERSHIP" : "DEPARTMENT LEAD"}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-light transition-colors mb-1.5">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium tracking-wide uppercase font-mono leading-snug">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-gray-400 text-xs italic mt-3 leading-relaxed line-clamp-2 border-t border-gold-deep/10 pt-2">
                      &ldquo;{member.bio}&rdquo;
                    </p>
                  )}
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-3 border-t border-gold-deep/10 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>ASTITVA &middot; GLBITM</span>
                  <span className="text-gold-mid group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Bar */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {filteredMembers.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (membersScrollRef.current) {
                  membersScrollRef.current.scrollTo({
                    left: i * 300,
                    behavior: "smooth",
                  });
                }
              }}
              className="h-1.5 rounded-full transition-all duration-300 bg-gold-deep/30 hover:bg-gold-mid w-6 hover:w-10"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
