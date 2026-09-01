/**
 * SectionHeading — two-line heading pattern from design.md §6 / §1.1.
 * Line one: bold, white or gold gradient.
 * Line two: same size, gray-400, regular weight.
 */

interface SectionHeadingProps {
  lineOne: string;
  lineTwo: string;
  /** Apply gold metallic gradient to line one instead of white */
  goldGradient?: boolean;
  className?: string;
}

export default function SectionHeading({
  lineOne,
  lineTwo,
  goldGradient = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 ${className}`}
    >
      <span
        className={`block font-bold ${
          goldGradient ? "gold-gradient-text" : "text-white"
        }`}
      >
        {lineOne}
      </span>
      <span className="block font-normal text-gray-400">{lineTwo}</span>
    </h2>
  );
}
