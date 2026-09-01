/**
 * KickerLabel — small-caps, wide letter-spacing, gold-mid text.
 * Sits above every section heading per design.md §6 / §1.1.
 * Uses Cormorant SC font (design.md §3).
 */

interface KickerLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function KickerLabel({ children, className = "" }: KickerLabelProps) {
  return (
    <p
      className={`font-kicker text-gold-mid text-xs md:text-sm uppercase tracking-[0.3em] mb-4 ${className}`}
    >
      {children}
    </p>
  );
}
