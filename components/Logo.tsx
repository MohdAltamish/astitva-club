/**
 * Logo — text-based Playfair Display wordmark.
 * Fallback until Anjali Keshari provides final SVG/PNG logo assets.
 * See design.md §4 for logo usage rules.
 */

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl md:text-5xl",
} as const;

export default function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <span
      className={`font-display font-bold tracking-wide gold-gradient-text ${sizeClasses[size]} ${className}`}
    >
      ASTITVA
    </span>
  );
}
