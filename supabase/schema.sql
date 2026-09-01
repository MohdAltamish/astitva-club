-- ASTITVA Supabase Schema Migration
-- Run this in your Supabase SQL Editor to create and seed the tables

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
  type TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming' or 'past'
  rsvp_url TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. GALLERY ITEMS
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Community', -- 'Community', 'Events', 'Creative', 'Memories'
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

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all data
CREATE POLICY "Public can view team members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view gallery items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Allow full access for anon/service keys (or authenticated admin)
CREATE POLICY "Allow all modifications on team_members" ON team_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all modifications on events" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all modifications on gallery_items" ON gallery_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all modifications on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════
-- SEED INITIAL DATA
-- ═══════════════════════════════════════════════════════

-- Seed Team Members
INSERT INTO team_members (id, name, role, initials, category, order_index) VALUES
  ('mohd-altamish', 'Mohd Altamish', 'Owner / President & Technical Head', 'MA', 'Core', 1),
  ('amrit-kumar-sharma', 'Amrit Kumar Sharma', 'Vice President / Secretary', 'AS', 'Core', 2),
  ('ashwani-mishra', 'Ashwani Mishra', 'PR Head', 'AM', 'Core', 3),
  ('anni-rai', 'Anni Rai', 'Social Media Head', 'AR', 'Core', 4),
  ('aman-bhati', 'Aman Bhati', 'Management Head', 'AB', 'Core', 5),
  ('anjali-keshari', 'Anjali Keshari', 'Design & Media', 'AK', 'Core', 6),
  ('ayush-kumar-rai', 'Ayush Kumar Rai', 'Dance & Music', 'AR', 'Core', 7)
ON CONFLICT (id) DO NOTHING;

-- Seed Events
INSERT INTO events (id, title, tagline, type, order_index) VALUES
  ('event-1', 'Welcome Mixer', 'Where strangers shared their first conversation.', 'past', 1),
  ('event-2', 'Orientation Walk', 'Where new journeys began.', 'past', 2),
  ('event-3', 'Open Mic Night', 'Stories that speak. Voices that stay.', 'past', 3)
ON CONFLICT (id) DO NOTHING;

-- Seed Gallery Items
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

-- Seed Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('join_url', '"https://docs.google.com/forms/d/e/1FAIpQLSdFKq5HLmee3JT7Hyia5k06ofGpjTAJz4uxclDHPxIYKM-1hQ/viewform"'::jsonb),
  ('whatsapp_url', '"https://chat.whatsapp.com/CsfmyiQDve3LJZtzc6swTP?mode=gi_t"'::jsonb),
  ('instagram_url', '"https://www.instagram.com/astitva_club/"'::jsonb),
  ('email', '"astitvaclub26@gmail.com"'::jsonb),
  ('hero_tagline', '"We Enter as Strangers, We Rise as One."'::jsonb),
  ('hero_subhead', '"A new place. New faces. New dreams. Astitva is where GLBITM''s freshers stop being strangers and start becoming a class, a community, a story worth telling."'::jsonb)
ON CONFLICT (key) DO NOTHING;
