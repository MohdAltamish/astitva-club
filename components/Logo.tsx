import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { img: 46, text: "text-xl", kicker: "text-[10px]", gap: "gap-3" },
  md: { img: 58, text: "text-2xl md:text-3xl", kicker: "text-[11px]", gap: "gap-3.5" },
  lg: { img: 76, text: "text-3xl md:text-4xl", kicker: "text-xs", gap: "gap-4" },
  xl: { img: 104, text: "text-4xl md:text-5xl", kicker: "text-sm", gap: "gap-5" },
} as const;

export default function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={`inline-flex items-center ${config.gap} group ${className}`}>
      {/* Official Gold Circular Emblem */}
      <div className="relative shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-gold-deep via-gold-mid to-gold-light shadow-[0_0_18px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_28px_rgba(212,175,55,0.55)] group-hover:scale-105 transition-all duration-300">
        <Image
          src="/logo.png"
          alt="ASTITVA Official Emblem"
          width={config.img}
          height={config.img}
          className="rounded-full object-cover bg-black-950"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-display font-bold tracking-wider gold-gradient-text leading-tight ${config.text}`}
          >
            ASTITVA
          </span>
          <span className={`font-kicker uppercase tracking-[0.25em] text-gold-mid/85 -mt-0.5 ${config.kicker}`}>
            Freshers Club
          </span>
        </div>
      )}
    </div>
  );
}
