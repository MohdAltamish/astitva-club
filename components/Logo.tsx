import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { img: 34, text: "text-lg", gap: "gap-2.5" },
  md: { img: 42, text: "text-2xl", gap: "gap-3" },
  lg: { img: 56, text: "text-3xl md:text-4xl", gap: "gap-3.5" },
  xl: { img: 80, text: "text-4xl md:text-5xl", gap: "gap-4" },
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
      <div className="relative shrink-0 rounded-full p-[1.5px] bg-gradient-to-tr from-gold-deep via-gold-mid to-gold-light shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] group-hover:scale-105 transition-all duration-300">
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
          {size !== "sm" && (
            <span className="text-[9px] font-kicker uppercase tracking-[0.25em] text-gold-mid/80 -mt-0.5">
              Freshers Club
            </span>
          )}
        </div>
      )}
    </div>
  );
}
