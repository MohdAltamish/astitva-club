"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import KickerLabel from "@/components/KickerLabel";
import { getTeamMembers, getEvents, getGalleryItems, getSiteSettings, SiteSettings } from "@/lib/data-service";
import { isSupabaseConfigured } from "@/lib/supabase";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function AdminOverviewPage() {
  const [teamCount, setTeamCount] = useState<number>(0);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [galleryCount, setGalleryCount] = useState<number>(0);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [team, events, gallery, sets] = await Promise.all([
          getTeamMembers(),
          getEvents(),
          getGalleryItems(),
          getSiteSettings(),
        ]);
        setTeamCount(team.length);
        setEventsCount(events.length);
        setGalleryCount(gallery.length);
        setSettings(sets);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <KickerLabel>OVERVIEW</KickerLabel>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
          Welcome to the ASTITVA Portal
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage and publish updates to team members, events, gallery, and site copy in real time.
        </p>
      </div>

      {/* Database Setup Notice if not configured */}
      {(!isSupabaseConfigured || !isFirebaseConfigured) && (
        <div className="bg-black-900 border border-gold-mid/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-lg">⚠️</span>
                <h3 className="font-display font-bold text-white text-base">
                  Backend Connection Status
                </h3>
              </div>
              <p className="text-gray-300 text-xs mt-1.5 max-w-2xl leading-relaxed">
                {!isSupabaseConfigured
                  ? "Supabase database credentials are not yet configured in .env.local. The dashboard is currently displaying fallback content. Once you add your Supabase URL and Anon Key, live sync will be activated."
                  : "Firebase credentials are ready. Ensure Supabase schema is migrated."}
              </p>
            </div>
            <Link
              href="/admin/settings"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gold-mid/10 text-gold-mid border border-gold-mid/40 hover:bg-gold-mid hover:text-black-950 transition-all shrink-0"
            >
              View Configuration &amp; Keys →
            </Link>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 relative overflow-hidden">
          <span className="text-xs font-kicker text-gold-mid uppercase tracking-widest block mb-2">
            Team Roster
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl md:text-4xl font-bold text-white">
              {loading ? "..." : teamCount}
            </span>
            <span className="text-2xl">👥</span>
          </div>
          <Link
            href="/admin/team"
            className="text-xs text-gold-mid hover:text-gold-light mt-4 inline-block tracking-wide"
          >
            Manage Team Members →
          </Link>
        </div>

        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 relative overflow-hidden">
          <span className="text-xs font-kicker text-gold-mid uppercase tracking-widest block mb-2">
            Total Events
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl md:text-4xl font-bold text-white">
              {loading ? "..." : eventsCount}
            </span>
            <span className="text-2xl">📅</span>
          </div>
          <Link
            href="/admin/events"
            className="text-xs text-gold-mid hover:text-gold-light mt-4 inline-block tracking-wide"
          >
            Manage Events &amp; RSVPs →
          </Link>
        </div>

        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 relative overflow-hidden">
          <span className="text-xs font-kicker text-gold-mid uppercase tracking-widest block mb-2">
            Gallery Moments
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl md:text-4xl font-bold text-white">
              {loading ? "..." : galleryCount}
            </span>
            <span className="text-2xl">🖼️</span>
          </div>
          <Link
            href="/admin/gallery"
            className="text-xs text-gold-mid hover:text-gold-light mt-4 inline-block tracking-wide"
          >
            Manage Gallery →
          </Link>
        </div>

        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 relative overflow-hidden">
          <span className="text-xs font-kicker text-gold-mid uppercase tracking-widest block mb-2">
            Form Destination
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-sm font-semibold text-gold-light truncate max-w-[160px]">
              Google Form Active
            </span>
            <span className="text-2xl">📝</span>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs text-gold-mid hover:text-gold-light mt-4 inline-block tracking-wide"
          >
            Edit Settings &amp; URLs →
          </Link>
        </div>
      </div>

      {/* Quick Links & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions Card */}
        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/team?action=new"
              className="p-4 rounded-xl bg-black-950 border border-gold-deep/15 hover:border-gold-mid/40 transition-all flex items-center gap-3 text-sm text-gray-200"
            >
              <span className="w-8 h-8 rounded-lg bg-gold-mid/10 text-gold-mid flex items-center justify-center font-bold">
                +
              </span>
              <span>Add Team Member</span>
            </Link>

            <Link
              href="/admin/events?action=new"
              className="p-4 rounded-xl bg-black-950 border border-gold-deep/15 hover:border-gold-mid/40 transition-all flex items-center gap-3 text-sm text-gray-200"
            >
              <span className="w-8 h-8 rounded-lg bg-gold-mid/10 text-gold-mid flex items-center justify-center font-bold">
                +
              </span>
              <span>Create Event</span>
            </Link>

            <Link
              href="/admin/gallery?action=new"
              className="p-4 rounded-xl bg-black-950 border border-gold-deep/15 hover:border-gold-mid/40 transition-all flex items-center gap-3 text-sm text-gray-200"
            >
              <span className="w-8 h-8 rounded-lg bg-gold-mid/10 text-gold-mid flex items-center justify-center font-bold">
                +
              </span>
              <span>Add Gallery Moment</span>
            </Link>

            <Link
              href="/admin/settings"
              className="p-4 rounded-xl bg-black-950 border border-gold-deep/15 hover:border-gold-mid/40 transition-all flex items-center gap-3 text-sm text-gray-200"
            >
              <span className="w-8 h-8 rounded-lg bg-gold-mid/10 text-gold-mid flex items-center justify-center font-bold">
                ⚙
              </span>
              <span>Edit Site Settings</span>
            </Link>
          </div>
        </div>

        {/* Live Site Settings Preview */}
        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-white">
              Active Configuration
            </h2>
            <Link
              href="/admin/settings"
              className="text-xs font-kicker uppercase text-gold-mid hover:underline"
            >
              Edit
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-black-950 border border-gold-deep/10">
              <span className="text-gray-400 block mb-0.5 font-kicker uppercase">
                Join Form URL
              </span>
              <span className="text-gold-light truncate block font-mono">
                {settings?.join_url || "Loading..."}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black-950 border border-gold-deep/10">
              <span className="text-gray-400 block mb-0.5 font-kicker uppercase">
                Contact Email
              </span>
              <span className="text-white truncate block font-mono">
                {settings?.email || "Loading..."}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black-950 border border-gold-deep/10">
              <span className="text-gray-400 block mb-0.5 font-kicker uppercase">
                WhatsApp Community
              </span>
              <span className="text-gray-300 truncate block font-mono">
                {settings?.whatsapp_url || "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
