import { journeyStages } from "@/data/about";

export default function JourneyStepper() {
  return (
    <div className="relative">
      {/* Desktop horizontal flow */}
      <div className="hidden lg:grid grid-cols-7 gap-4 relative">
        {/* Connecting line */}
        <div
          className="absolute top-7 left-[7%] right-[7%] h-[2px] bg-gradient-to-r from-gold-deep/20 via-gold-mid/60 to-gold-deep/20 -z-0"
          aria-hidden="true"
        />

        {journeyStages.map((stage) => (
          <div key={stage.step} className="flex flex-col items-center text-center relative z-10 group">
            {/* Step badge */}
            <div className="w-14 h-14 rounded-full bg-black-900 border-2 border-gold-mid flex items-center justify-center font-display font-bold text-gold-light shadow-[0_0_16px_rgba(212,175,55,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all duration-300">
              0{stage.step}
            </div>

            {/* Stage title */}
            <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-gold-light transition-colors">
              {stage.stage}
            </h3>

            {/* Stage description */}
            <p className="mt-2 text-xs text-gray-400 leading-relaxed max-w-[150px]">
              {stage.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile & Tablet vertical timeline */}
      <div className="lg:hidden relative pl-8 sm:pl-10 space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[19px] sm:before:left-[23px] before:w-[2px] before:bg-gradient-to-b before:from-gold-mid before:via-gold-deep/40 before:to-gold-deep/20">
        {journeyStages.map((stage) => (
          <div key={stage.step} className="relative group">
            {/* Step circle */}
            <div className="absolute -left-8 sm:-left-10 top-0.5 w-10 h-10 rounded-full bg-black-900 border-2 border-gold-mid flex items-center justify-center font-display text-sm font-bold text-gold-light shadow-[0_0_12px_rgba(212,175,55,0.2)]">
              0{stage.step}
            </div>

            <div className="bg-black-800/80 border border-gold-deep/20 rounded-2xl p-5 ml-4 group-hover:border-gold-mid/40 transition-all duration-300">
              <h3 className="font-display text-lg font-bold text-white group-hover:text-gold-light transition-colors">
                {stage.stage}
              </h3>
              <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
