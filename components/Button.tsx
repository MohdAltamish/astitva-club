/**
 * Button — primary (gold fill) and secondary/ghost (gold outline) variants.
 * Per design.md §6: primary for "Join Astitva" CTAs, secondary for paired hero CTAs.
 */

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-7 py-3 rounded-full text-sm md:text-base font-semibold tracking-wide transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "gold-gradient-bg text-black-950 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "border-2 border-gold-mid text-gold-mid bg-transparent hover:bg-gold-mid/10 hover:shadow-[0_0_16px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 active:translate-y-0",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    return (
      <Link
        href={href}
        className={classes}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
