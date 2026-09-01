"use client";

/**
 * Navbar — transparent over hero, solidifies on scroll with black-950 + backdrop blur.
 * Logo left, nav links centered, gold "Join" pill button right.
 * Per design.md §6 nav bar spec and content.md §1 nav labels.
 */

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { JOIN_FORM_URL } from "@/data/links";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Do not render public navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-black-950/90 backdrop-blur-md shadow-[0_1px_0_rgba(212,175,55,0.1)]"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — left */}
          <Link href="/" aria-label="ASTITVA Home">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-gold-mid transition-colors duration-200 tracking-wide uppercase font-kicker"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Join CTA — right (desktop) */}
          <div className="hidden md:block">
            <Button href={JOIN_FORM_URL} variant="primary" className="text-sm px-5 py-2">
              Join
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-gold-mid transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold-mid transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold-mid transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-black-950/98 backdrop-blur-xl transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-8 pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl text-gray-400 hover:text-gold-mid transition-colors duration-200 tracking-widest uppercase font-kicker"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            href={JOIN_FORM_URL}
            variant="primary"
            className="mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Join Astitva
          </Button>
        </div>
      </div>
    </nav>
  );
}
