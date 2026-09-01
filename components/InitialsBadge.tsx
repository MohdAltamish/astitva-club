/**
 * InitialsBadge — gold-gradient circle with 2-letter initials.
 * Used as a photo fallback for team cards per design.md §6.
 * Keeps the team page presentable before real headshots exist.
 */

interface InitialsBadgeProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-16 h-16 text-xl",
  lg: "w-24 h-24 text-3xl",
} as const;

export default function InitialsBadge({
  initials,
  size = "md",
  className = "",
}: InitialsBadgeProps) {
  return (
    <div
      className={`gold-gradient-bg rounded-full flex items-center justify-center
        font-display font-bold text-black-950 select-none
        ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}
