"use client";

import { useState, useEffect } from "react";
import KickerLabel from "@/components/KickerLabel";
import { getSiteSettings, updateSiteSetting, SiteSettings } from "@/lib/data-service";
import { isSupabaseConfigured } from "@/lib/supabase";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    join_url: "",
    whatsapp_url: "",
    instagram_url: "",
    email: "",
    hero_tagline: "",
    hero_subhead: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ [key: string]: { type: "success" | "error"; text: string } }>({});

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getSiteSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (key: keyof SiteSettings) => {
    setSavingKey(key);
    const result = await updateSiteSetting(key, settings[key]);
    setSavingKey(null);

    if (result.success) {
      setFeedback((prev) => ({
        ...prev,
        [key]: { type: "success", text: "Saved & updated!" },
      }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [key]: { type: "error", text: result.error || "Failed to update." },
      }));
    }

    setTimeout(() => {
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 2500);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <KickerLabel>SYSTEM &amp; CONTENT</KickerLabel>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
          Site Settings &amp; URLs
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Edit global links, Google Form URLs, contact handles, and hero text directly without redeploying.
        </p>
      </div>

      {/* Settings Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-kicker text-sm tracking-widest uppercase">
          Loading site configuration...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Links & Destinations */}
          <div className="bg-black-900 border border-gold-deep/20 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Links &amp; Destinations
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                Controls all redirect destinations and social icons across the site.
              </p>
            </div>

            {/* Join URL */}
            <div className="space-y-2">
              <label className="block text-xs font-kicker uppercase tracking-widest text-gold-mid">
                Join Astitva Google Form URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={settings.join_url}
                  onChange={(e) => setSettings({ ...settings, join_url: e.target.value })}
                  placeholder="https://docs.google.com/forms/d/e/..."
                  className="flex-1 bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-mid transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleSave("join_url")}
                  disabled={savingKey === "join_url"}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {savingKey === "join_url" ? "..." : "Save"}
                </button>
              </div>
              {feedback["join_url"] && (
                <p className={`text-xs ${feedback["join_url"].type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback["join_url"].text}
                </p>
              )}
            </div>

            {/* WhatsApp Community URL */}
            <div className="space-y-2">
              <label className="block text-xs font-kicker uppercase tracking-widest text-gold-mid">
                WhatsApp Community Invite Link
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={settings.whatsapp_url}
                  onChange={(e) => setSettings({ ...settings, whatsapp_url: e.target.value })}
                  placeholder="https://chat.whatsapp.com/..."
                  className="flex-1 bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-mid transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleSave("whatsapp_url")}
                  disabled={savingKey === "whatsapp_url"}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {savingKey === "whatsapp_url" ? "..." : "Save"}
                </button>
              </div>
              {feedback["whatsapp_url"] && (
                <p className={`text-xs ${feedback["whatsapp_url"].type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback["whatsapp_url"].text}
                </p>
              )}
            </div>

            {/* Instagram URL */}
            <div className="space-y-2">
              <label className="block text-xs font-kicker uppercase tracking-widest text-gold-mid">
                Instagram Page URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={settings.instagram_url}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                  placeholder="https://www.instagram.com/astitva_club/"
                  className="flex-1 bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-mid transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleSave("instagram_url")}
                  disabled={savingKey === "instagram_url"}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {savingKey === "instagram_url" ? "..." : "Save"}
                </button>
              </div>
              {feedback["instagram_url"] && (
                <p className={`text-xs ${feedback["instagram_url"].type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback["instagram_url"].text}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-kicker uppercase tracking-widest text-gold-mid">
                Club Contact Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="astitvaclub26@gmail.com"
                  className="flex-1 bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-mid transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleSave("email")}
                  disabled={savingKey === "email"}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {savingKey === "email" ? "..." : "Save"}
                </button>
              </div>
              {feedback["email"] && (
                <p className={`text-xs ${feedback["email"].type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback["email"].text}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Hero Copy & Taglines */}
          <div className="bg-black-900 border border-gold-deep/20 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Hero Copy &amp; Tagline
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">
                Edit the script tagline and subheader displayed on the main home hero.
              </p>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <label className="block text-xs font-kicker uppercase tracking-widest text-gold-mid">
                Script Tagline
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.hero_tagline}
                  onChange={(e) => setSettings({ ...settings, hero_tagline: e.target.value })}
                  placeholder="We Enter as Strangers, We Rise as One."
                  className="flex-1 bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleSave("hero_tagline")}
                  disabled={savingKey === "hero_tagline"}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {savingKey === "hero_tagline" ? "..." : "Save"}
                </button>
              </div>
              {feedback["hero_tagline"] && (
                <p className={`text-xs ${feedback["hero_tagline"].type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback["hero_tagline"].text}
                </p>
              )}
            </div>

            {/* Subhead */}
            <div className="space-y-2">
              <label className="block text-xs font-kicker uppercase tracking-widest text-gold-mid">
                Hero Subhead Paragraph
              </label>
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={settings.hero_subhead}
                  onChange={(e) => setSettings({ ...settings, hero_subhead: e.target.value })}
                  placeholder="A new place. New faces. New dreams..."
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-mid transition-colors leading-relaxed"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSave("hero_subhead")}
                    disabled={savingKey === "hero_subhead"}
                    className="px-5 py-2 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {savingKey === "hero_subhead" ? "Saving..." : "Save Subhead"}
                  </button>
                </div>
              </div>
              {feedback["hero_subhead"] && (
                <p className={`text-xs ${feedback["hero_subhead"].type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {feedback["hero_subhead"].text}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backend Setup / Credentials Guide */}
      <div className="bg-black-900 border border-gold-deep/20 rounded-3xl p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-white mb-2">
          Environment &amp; Supabase Integration Guide
        </h2>
        <p className="text-gray-400 text-xs leading-relaxed mb-6">
          To persist edits to your live PostgreSQL database, copy the schema migration and add your credentials to <code className="bg-black-950 text-gold-light px-1 py-0.5 rounded">.env.local</code>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Supabase Schema instructions */}
          <div className="bg-black-950 rounded-2xl p-5 border border-gold-deep/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-kicker uppercase text-gold-mid tracking-wider">
                1. Database Schema
              </span>
              <span className="text-[11px] text-gray-500">supabase/schema.sql</span>
            </div>
            <p className="text-gray-400 text-xs mb-3">
              Open your Supabase project &gt; SQL Editor &gt; run the script in <code className="text-gold-light">supabase/schema.sql</code>. It creates all 4 tables with public view policies.
            </p>
            <div className="p-3 bg-black-900 rounded-xl border border-gold-deep/10 text-gray-400 font-mono text-[11px]">
              Status: {isSupabaseConfigured ? "✅ Connected to Supabase" : "⏳ Ready for migration"}
            </div>
          </div>

          {/* Firebase instructions */}
          <div className="bg-black-950 rounded-2xl p-5 border border-gold-deep/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-kicker uppercase text-gold-mid tracking-wider">
                2. Firebase Authentication
              </span>
              <span className="text-[11px] text-gray-500">Firebase Console</span>
            </div>
            <p className="text-gray-400 text-xs mb-3">
              In Firebase Console &gt; Authentication &gt; Sign-in method, enable <strong>Email/Password</strong> and <strong>Google</strong>. Add your domain/localhost to Authorized Domains.
            </p>
            <div className="p-3 bg-black-900 rounded-xl border border-gold-deep/10 text-gray-400 font-mono text-[11px]">
              Status: {isFirebaseConfigured ? "✅ Firebase Auth Configured" : "⏳ Demo Access Mode"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
