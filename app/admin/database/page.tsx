"use client";

import { useState, useEffect } from "react";
import KickerLabel from "@/components/KickerLabel";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getTeamMembers, getEvents, getGalleryItems, getSiteSettings } from "@/lib/data-service";

const SCHEMA_SQL = `-- ASTITVA Supabase Schema Migration
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Core',
  bio TEXT,
  photo_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. EVENTS
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  date TEXT,
  location TEXT,
  type TEXT NOT NULL DEFAULT 'upcoming',
  rsvp_url TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. GALLERY ITEMS
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Community',
  caption TEXT,
  image_url TEXT,
  aspect_ratio TEXT DEFAULT 'square',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SITE SETTINGS & CONTENT
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public can view team members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view gallery items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

CREATE POLICY "Allow all modifications on team_members" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all modifications on events" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all modifications on gallery_items" ON gallery_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all modifications on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- SEED DATA
INSERT INTO team_members (id, name, role, initials, category, order_index) VALUES
  ('mohd-altamish', 'Mohd Altamish', 'Owner / President & Technical Head', 'MA', 'Core', 1),
  ('amrit-kumar-sharma', 'Amrit Kumar Sharma', 'Vice President / Secretary', 'AS', 'Core', 2),
  ('ashwani-mishra', 'Ashwani Mishra', 'PR Head', 'AM', 'Core', 3),
  ('anni-rai', 'Anni Rai', 'Social Media Head', 'AR', 'Core', 4),
  ('aman-bhati', 'Aman Bhati', 'Management Head', 'AB', 'Core', 5),
  ('anjali-keshari', 'Anjali Keshari', 'Design & Media', 'AK', 'Core', 6),
  ('ayush-kumar-rai', 'Ayush Kumar Rai', 'Dance & Music', 'AR', 'Core', 7)
ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, title, tagline, type, order_index) VALUES
  ('event-1', 'Welcome Mixer', 'Where strangers shared their first conversation.', 'past', 1),
  ('event-2', 'Orientation Walk', 'Where new journeys began.', 'past', 2),
  ('event-3', 'Open Mic Night', 'Stories that speak. Voices that stay.', 'past', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO gallery_items (id, title, category, caption, aspect_ratio, order_index) VALUES
  ('gallery-1', 'The First Meetup', 'Community', 'Where strangers shared their first conversation.', 'landscape', 1),
  ('gallery-2', 'Orientation Walk', 'Events', 'Where new journeys began across the campus.', 'square', 2),
  ('gallery-3', 'Creative Jam', 'Creative', 'Ideas, sketches, and voices coming to life.', 'portrait', 3),
  ('gallery-4', 'Open Mic Night', 'Events', 'Stories that speak. Voices that stay.', 'landscape', 4),
  ('gallery-5', 'Late Night Planning', 'Community', 'Building ASTITVA from the ground up.', 'square', 5),
  ('gallery-6', 'Campus Moments', 'Memories', 'Finding your place in a sea of new faces.', 'portrait', 6),
  ('gallery-7', 'Design Circle', 'Creative', 'Visualizing the spirit of freshers.', 'square', 7),
  ('gallery-8', 'The Beginning', 'Memories', 'We Enter as Strangers, We Rise as One.', 'landscape', 8)
ON CONFLICT (id) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('join_url', '"https://docs.google.com/forms/d/e/1FAIpQLSdFKq5HLmee3JT7Hyia5k06ofGpjTAJz4uxclDHPxIYKM-1hQ/viewform"'::jsonb),
  ('whatsapp_url', '"https://chat.whatsapp.com/CsfmyiQDve3LJZtzc6swTP?mode=gi_t"'::jsonb),
  ('instagram_url', '"https://www.instagram.com/astitva_club/"'::jsonb),
  ('email', '"astitvaclub26@gmail.com"'::jsonb),
  ('hero_tagline', '"We Enter as Strangers, We Rise as One."'::jsonb),
  ('hero_subhead', '"A new place. New faces. New dreams. Astitva is where GLBITM''s freshers stop being strangers and start becoming a class, a community, a story worth telling."'::jsonb)
ON CONFLICT (key) DO NOTHING;`;

type TableName = "team_members" | "events" | "gallery_items" | "site_settings";

export default function AdminDatabasePage() {
  const [activeTab, setActiveTab] = useState<"inspector" | "schema" | "env">("inspector");
  const [selectedTable, setSelectedTable] = useState<TableName>("team_members");
  const [tableData, setTableData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchTableRecords = async (table: TableName) => {
    setLoading(true);
    setSelectedTable(table);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from(table).select("*");
        if (!error && data) {
          setTableData(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Supabase query fallback:", err);
      }
    }

    // Fallback data
    if (table === "team_members") {
      const data = await getTeamMembers();
      setTableData(data);
    } else if (table === "events") {
      const data = await getEvents();
      setTableData(data);
    } else if (table === "gallery_items") {
      const data = await getGalleryItems();
      setTableData(data);
    } else if (table === "site_settings") {
      const data = await getSiteSettings();
      setTableData([data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTableRecords("team_members");
  }, []);

  const runConnectionTest = async () => {
    setTestStatus("Testing connection...");
    if (!isSupabaseConfigured || !supabase) {
      setTestStatus("❌ Supabase URL or Anon Key missing in .env.local");
      return;
    }

    try {
      const start = Date.now();
      const { error } = await supabase.from("team_members").select("id").limit(1);
      const latency = Date.now() - start;

      if (error) {
        setTestStatus(`❌ Database responded with error: ${error.message}`);
      } else {
        setTestStatus(`✅ Connection successful! Latency: ${latency}ms`);
      }
    } catch (err) {
      setTestStatus(`❌ Connection failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <KickerLabel>DATABASE &amp; SERVICES</KickerLabel>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
            Backend &amp; Database Center
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Inspect live Supabase PostgreSQL tables, test API connections, and manage schemas.
          </p>
        </div>

        <button
          type="button"
          onClick={runConnectionTest}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-black-900 border border-gold-mid/40 text-gold-light hover:bg-gold-mid hover:text-black-950 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>⚡</span>
          <span>Test Database Connection</span>
        </button>
      </div>

      {testStatus && (
        <div className="p-3.5 rounded-xl bg-black-900 border border-gold-deep/30 text-xs text-white">
          {testStatus}
        </div>
      )}

      {/* System Health Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Supabase Status */}
        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-kicker uppercase tracking-widest text-gold-mid">
              Database Provider
            </span>
            <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? "bg-green-400" : "bg-amber-400"}`} />
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            Supabase PostgreSQL
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {isSupabaseConfigured ? "Live connected to Supabase" : "Using local static data fallback"}
          </p>
        </div>

        {/* Firebase Auth Status */}
        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-kicker uppercase tracking-widest text-gold-mid">
              Authentication
            </span>
            <span className={`w-2.5 h-2.5 rounded-full ${isFirebaseConfigured ? "bg-green-400" : "bg-blue-400"}`} />
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            Firebase Auth
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {isFirebaseConfigured ? "Email/Password & Google Active" : "Demo Admin Bypass Active"}
          </p>
        </div>

        {/* Total Tables */}
        <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-kicker uppercase tracking-widest text-gold-mid">
              Schema Tables
            </span>
            <span className="text-lg">🗄️</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white">
            4 Core Tables
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            team_members, events, gallery_items, site_settings
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gold-deep/20 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("inspector")}
          className={`pb-3 px-4 text-xs font-kicker uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "inspector"
              ? "border-b-2 border-gold-mid text-gold-light font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          🗂️ Table Data Inspector
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("schema")}
          className={`pb-3 px-4 text-xs font-kicker uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "schema"
              ? "border-b-2 border-gold-mid text-gold-light font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          📜 SQL Schema &amp; Migration
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("env")}
          className={`pb-3 px-4 text-xs font-kicker uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "env"
              ? "border-b-2 border-gold-mid text-gold-light font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          ⚙️ Environment (.env.local)
        </button>
      </div>

      {/* TAB 1: Table Inspector */}
      {activeTab === "inspector" && (
        <div className="space-y-6">
          {/* Table Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {(["team_members", "events", "gallery_items", "site_settings"] as TableName[]).map((tbl) => (
                <button
                  key={tbl}
                  type="button"
                  onClick={() => fetchTableRecords(tbl)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                    selectedTable === tbl
                      ? "bg-gold-mid text-black-950 font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                      : "bg-black-900 border border-gold-deep/20 text-gray-400 hover:text-white"
                  }`}
                >
                  {tbl}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => fetchTableRecords(selectedTable)}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-gold-light bg-black-900 border border-gold-deep/20 flex items-center gap-1.5"
            >
              <span>🔄</span>
              <span>Refresh Records</span>
            </button>
          </div>

          {/* Table Data View */}
          <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-white text-base">
                Table: <code className="text-gold-light font-mono">{selectedTable}</code> ({tableData.length} records)
              </h3>
              <span className="text-xs text-gray-400">
                {isSupabaseConfigured ? "Source: Supabase PostgreSQL" : "Source: Default in-memory records"}
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-gray-400 text-xs font-kicker uppercase">
                Loading table data...
              </div>
            ) : (
              <div className="overflow-x-auto max-h-96">
                <pre className="p-4 bg-black-950 rounded-xl border border-gold-deep/10 text-xs font-mono text-gray-300 leading-relaxed overflow-x-auto">
                  {JSON.stringify(tableData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SQL Schema & Migration */}
      {activeTab === "schema" && (
        <div className="space-y-6">
          <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  Supabase SQL Migration Script
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Run this in your Supabase SQL editor to create all tables and RLS security policies.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={copySql}
                  className="px-4 py-2 rounded-xl text-xs font-semibold gold-gradient-bg text-black-950 hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all cursor-pointer shrink-0"
                >
                  {copied ? "✓ Copied to Clipboard!" : "Copy SQL Script"}
                </button>
                <a
                  href="https://supabase.com/dashboard/project/_/sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-black-950 border border-gold-deep/30 text-gold-light hover:text-white transition-all shrink-0"
                >
                  Open Supabase SQL Editor ↗
                </a>
              </div>
            </div>

            <pre className="p-4 bg-black-950 rounded-xl border border-gold-deep/15 text-xs font-mono text-gray-300 leading-relaxed max-h-[500px] overflow-y-auto">
              {SCHEMA_SQL}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: Environment Configuration */}
      {activeTab === "env" && (
        <div className="space-y-6">
          <div className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h3 className="font-display font-bold text-white text-lg">
                Environment Variables Reference
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Place these keys inside <code className="bg-black-950 text-gold-light px-1.5 py-0.5 rounded font-mono">website/.env.local</code>.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-black-950 rounded-xl border border-gold-deep/15 space-y-2">
                <span className="font-kicker text-gold-mid uppercase text-xs">Supabase Credentials</span>
                <p className="text-gray-400 text-xs">Obtained from Supabase &gt; Project Settings &gt; API.</p>
                <pre className="text-xs font-mono text-gray-300">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsIn...`}
                </pre>
              </div>

              <div className="p-4 bg-black-950 rounded-xl border border-gold-deep/15 space-y-2">
                <span className="font-kicker text-gold-mid uppercase text-xs">Firebase Auth Credentials</span>
                <p className="text-gray-400 text-xs">Obtained from Firebase Console &gt; Project Settings &gt; Web App SDK configuration.</p>
                <pre className="text-xs font-mono text-gray-300">
{`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=astitva-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=astitva-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=astitva-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:...`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
