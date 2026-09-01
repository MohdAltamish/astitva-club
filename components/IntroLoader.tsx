"use client";

/**
 * IntroLoader — Awwwards-style full-screen video intro that plays on page load.
 * The video plays muted + autoplay (required by browsers), then the overlay
 * transitions away with a cinematic scale/fade/blur to reveal the page content.
 * Includes a skip button and respects prefers-reduced-motion.
 *
 * Per design.md §7: "black screen → golden light" — the intro reel opens this way.
 */

import { useState, useEffect, useRef, useCallback } from "react";

export default function IntroLoader() {
  const [phase, setPhase] = useState<"playing" | "exiting" | "done">("playing");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setPhase("done");
    }
  }, []);

  // Check if user has already seen the intro this session
  useEffect(() => {
    if (sessionStorage.getItem("astitva-intro-seen") === "1") {
      setPhase("done");
    }
  }, []);

  const handleExit = useCallback(() => {
    if (phase !== "playing") return;
    setPhase("exiting");
    sessionStorage.setItem("astitva-intro-seen", "1");

    // Allow the exit animation to play, then remove from DOM
    setTimeout(() => {
      setPhase("done");
    }, 1200);
  }, [phase]);

  const handleVideoEnd = useCallback(() => {
    handleExit();
  }, [handleExit]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  }, []);

  // Lock body scroll while intro is playing
  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black-950
        transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
        ${phase === "exiting"
          ? "opacity-0 scale-105 blur-sm pointer-events-none"
          : "opacity-100 scale-100"
        }`}
      role="dialog"
      aria-label="ASTITVA intro"
    >
      {/* Video container */}
      <div
        className={`relative w-full h-full flex items-center justify-center
          transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${phase === "exiting" ? "scale-110" : "scale-100"}`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {/* Subtle vignette overlay for cinematic feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom bar: progress + skip */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
        {/* Progress bar */}
        <div className="flex-1 mr-6">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-mid rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={handleExit}
          className="text-white/60 hover:text-gold-mid text-xs md:text-sm uppercase tracking-[0.2em]
            font-kicker transition-colors duration-200 cursor-pointer
            flex items-center gap-2 shrink-0"
        >
          Skip
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* ASTITVA wordmark at top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <span className="font-display text-lg md:text-xl tracking-widest gold-gradient-text opacity-60">
          ASTITVA
        </span>
      </div>
    </div>
  );
}
