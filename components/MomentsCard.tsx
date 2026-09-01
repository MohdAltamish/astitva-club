/**
 * MomentsCard — events/gallery card per design.md §6.
 * Short title + one evocative one-line tagline (not a paragraph).
 * Optional metadata row (date).
 * black-800 surface, gold border that brightens on hover.
 */

interface MomentsCardProps {
  title: string;
  tagline: string;
  date?: string;
  className?: string;
}

export default function MomentsCard({
  title,
  tagline,
  date,
  className = "",
}: MomentsCardProps) {
  return (
    <div
      className={`group bg-black-800 border border-gold-deep/30 rounded-2xl p-6 md:p-8
        transition-all duration-300
        hover:border-gold-mid hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]
        ${className}`}
    >
      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 group-hover:gold-gradient-text transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 italic text-sm md:text-base">{tagline}</p>
      {date && (
        <p className="text-gold-deep text-xs mt-4 uppercase tracking-wider">
          {date}
        </p>
      )}
    </div>
  );
}
