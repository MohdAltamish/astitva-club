/**
 * Home Page — features:
 * - Hero section
 * - About section details ("More than a club" + Vision)
 * - Our Ideology (3 Pillars: Discover, Connect, Evolve)
 * - Team Section (Dynamic Core Team grid)
 * - Contact Block (Instagram, WhatsApp, Email, Campus)
 * - Final CTA banner
 */

import Link from "next/link";
import KickerLabel from "@/components/KickerLabel";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import StarField from "@/components/StarField";
import TeamCard from "@/components/TeamCard";
import { getTeamMembers, getSiteSettings } from "@/lib/data-service";
import { visionContent } from "@/data/about";
import { JOIN_FORM_URL } from "@/data/links";

export const revalidate = 0;

const ideologyPillars = [
  {
    title: "Discover",
    description: "Your interests, strengths, and potential beyond academics.",
    icon: "✦",
  },
  {
    title: "Connect",
    description: "New people, real friendships, a sense of belonging.",
    icon: "◈",
  },
  {
    title: "Evolve",
    description:
      "Step outside your comfort zone and become a better version of yourself.",
    icon: "✧",
  },
] as const;

export default async function HomePage() {
  const [teamMembers, settings] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
  ]);

  const joinUrl = settings.join_url || JOIN_FORM_URL;
  const whatsappUrl = settings.whatsapp_url || "https://chat.whatsapp.com/CsfmyiQDve3LJZtzc6swTP?mode=gi_t";
  const instagramUrl = settings.instagram_url || "https://www.instagram.com/astitva_club/";
  const contactEmail = settings.email || "astitvaclub26@gmail.com";
  const heroTagline = settings.hero_tagline || "We Enter as Strangers, We Rise as One.";
  const heroSubhead = settings.hero_subhead || "A new place. New faces. New dreams. Astitva is where GLBITM's freshers stop being strangers and start becoming a class, a community, a story worth telling.";

  const contactChannels = [
    {
      title: "Instagram",
      handle: "@astitva_club",
      description: "Follow for announcements, event teasers, and stories.",
      href: instagramUrl,
      buttonText: "Follow on Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
    },
    {
      title: "WhatsApp Community",
      handle: "Official Fresher Group",
      description: "Direct community chat, instant updates, and meetups.",
      href: whatsappUrl,
      buttonText: "Join WhatsApp",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      title: "Email",
      handle: contactEmail,
      description: "For queries, collaborations, and formal communication.",
      href: `mailto:${contactEmail}`,
      buttonText: "Send an Email",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO — content.md §2 Hero
          ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black-950">
        {/* Star field background — design.md §7 */}
        <StarField />

        {/* Subtle radial glow — design.md §7 gold spark / light motif */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,169,77,0.3) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center py-32 md:py-40">
          {/* Kicker */}
          <KickerLabel className="mb-6">
            DISCOVER &middot; CONNECT &middot; EVOLVE
          </KickerLabel>

          {/* H1 */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gold-gradient-text mb-4 tracking-tight">
            ASTITVA
          </h1>

          {/* Tagline — script treatment (Playfair Display Italic per design.md §3) */}
          <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-gold-light mb-8 tracking-wide">
            {heroTagline}
          </p>

          {/* Subhead */}
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed mb-10">
            {heroSubhead}
          </p>

          {/* Dual CTAs — design.md §6 hero pattern */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={joinUrl} variant="primary">
              Join Astitva
            </Button>
            <Button href="#about" variant="secondary">
              Our Story
            </Button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gold-mid/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. ABOUT SECTION DETAILS — content.md §2 & §3
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="bg-black-800 py-20 md:py-28 border-t border-gold-deep/15 scroll-mt-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-16">
          <div>
            <KickerLabel>WHO WE ARE</KickerLabel>
            <SectionHeading lineOne="More than" lineTwo="a fresher club." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8 items-start">
              <div className="space-y-6 text-gray-400 text-base md:text-lg leading-relaxed">
                <p>
                  Astitva (अस्तित्व) means existence, identity, individuality. We
                  exist because every fresher walks into GLBITM with a different
                  story — and somewhere between orientation week and finding your
                  first real friend, that story deserves a place to unfold.
                </p>
                <p>
                  This isn&apos;t a WhatsApp group you mute after week two. It&apos;s
                  a space where you don&apos;t just show up — you discover, you
                  connect, and you evolve, one experience at a time.
                </p>
              </div>

              {/* Vision Highlight Card */}
              <div className="bg-black-900/90 border border-gold-deep/20 rounded-2xl p-8 relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,169,77,0.5) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs font-kicker text-gold-mid tracking-widest uppercase block mb-3">
                  OUR VISION
                </span>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed italic">
                  &ldquo;{visionContent.body}&rdquo;
                </p>
              </div>
            </div>

            {/* Highlighted Pull-quote */}
            <blockquote className="mt-12 border-l-4 border-gold-mid pl-6 py-3 max-w-3xl">
              <p className="font-display text-xl md:text-2xl text-gold-light italic leading-relaxed">
                Astitva isn&apos;t about changing who you are. It&apos;s about
                discovering who you can become.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. OUR IDEOLOGY — content.md §2 (Discover, Connect, Evolve)
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-black-950 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <KickerLabel>OUR IDEOLOGY</KickerLabel>
          <SectionHeading lineOne="Discover. Connect." lineTwo="Evolve together." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
            {ideologyPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group bg-black-800 border border-gold-deep/20 rounded-2xl p-8
                  transition-all duration-300
                  hover:border-gold-mid hover:shadow-[0_0_24px_rgba(212,175,55,0.08)]"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-mid/10 border border-gold-mid/30 flex items-center justify-center text-gold-mid text-lg mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-2xl font-bold gold-gradient-text mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/about"
              className="text-gold-mid hover:text-gold-light transition-colors duration-200 text-sm md:text-base tracking-wide inline-flex items-center gap-2 font-kicker uppercase"
            >
              <span>Read our full story &amp; journey</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. TEAM SECTION — content.md §4 Core Team (Dynamic)
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-black-800 py-20 md:py-28 border-t border-gold-deep/10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <KickerLabel>THE PEOPLE BEHIND IT</KickerLabel>
            <SectionHeading
              lineOne="Meet the"
              lineTwo="core team."
              className="mb-4"
            />
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Astitva is built and run by students, for students. Here&apos;s who&apos;s behind it this year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member) => (
              <TeamCard key={member.id || member.name} member={member} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/team"
              className="text-gold-mid hover:text-gold-light transition-colors duration-200 text-sm md:text-base tracking-wide inline-flex items-center gap-2 font-kicker uppercase"
            >
              <span>View full team page &amp; details</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. CONTACT BLOCK — Direct channels to reach out
          ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-black-950 py-20 md:py-28 border-t border-gold-deep/15 scroll-mt-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <KickerLabel>GET IN TOUCH</KickerLabel>
            <SectionHeading
              lineOne="Connect with us"
              lineTwo="anytime."
            />
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Have questions, ideas, or just want to introduce yourself? We&apos;re here and excited to connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactChannels.map((item) => (
              <div
                key={item.title}
                className="bg-black-800 border border-gold-deep/20 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-gold-mid hover:shadow-[0_0_24px_rgba(212,175,55,0.1)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-mid/10 border border-gold-mid/30 flex items-center justify-center text-gold-mid mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gold-light text-sm font-medium mb-3">
                    {item.handle}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs md:text-sm font-semibold tracking-wide border border-gold-mid text-gold-mid hover:bg-gold-mid hover:text-black-950 transition-all duration-300"
                >
                  <span>{item.buttonText}</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>

          {/* Campus Location Note */}
          <div className="mt-10 p-6 bg-black-800/60 border border-gold-deep/15 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="text-gold-mid text-xl">📍</span>
              <div>
                <h4 className="text-white font-display text-sm font-bold">GLBITM Greater Noida</h4>
                <p className="text-gray-400 text-xs">Knowledge Park II, Greater Noida, Uttar Pradesh</p>
              </div>
            </div>
            <span className="text-xs font-kicker text-gold-mid uppercase tracking-widest bg-gold-mid/10 px-3 py-1.5 rounded-full border border-gold-mid/20">
              Batch 2026 &middot; Fresher Community
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. FINAL CTA BANNER — content.md §2 Final CTA banner
          ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-black-800 py-20 md:py-28 overflow-hidden border-t border-gold-deep/15">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,169,77,0.4) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Your story starts with one step through the door.
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
            You&apos;re not late — you&apos;re right on time. Come find your
            people.
          </p>
          <Button href={joinUrl} variant="primary">
            Join Astitva
          </Button>
        </div>
      </section>
    </>
  );
}
