import { supabase, isSupabaseConfigured } from "./supabase";
import { coreTeamMembers, TeamMember } from "@/data/team";
import { homeMomentsPreviews, AstitvaEvent } from "@/data/events";
import { galleryItems, GalleryItem } from "@/data/gallery";
import { JOIN_FORM_URL } from "@/data/links";

// ═════════════════════════════════════════════════════════
// 1. TEAM MEMBERS SERVICE
// ═════════════════════════════════════════════════════════

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured || !supabase) {
    return coreTeamMembers;
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return coreTeamMembers;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      initials: item.initials,
      category: item.category as "Core" | "Department",
      bio: item.bio || undefined,
    }));
  } catch {
    return coreTeamMembers;
  }
}

export async function saveTeamMember(member: TeamMember & { order_index?: number }) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured. Connect your database to persist changes." };
  }

  try {
    const { error } = await supabase.from("team_members").upsert({
      id: member.id || member.name.toLowerCase().replace(/\s+/g, "-"),
      name: member.name,
      role: member.role,
      initials: member.initials,
      category: member.category || "Core",
      bio: member.bio || null,
      order_index: member.order_index ?? 99,
    });

    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to save team member" };
  }
}

export async function deleteTeamMember(id: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured." };
  }

  try {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete team member" };
  }
}

// ═════════════════════════════════════════════════════════
// 2. EVENTS SERVICE
// ═════════════════════════════════════════════════════════

export async function getEvents(): Promise<AstitvaEvent[]> {
  const defaultEvents: AstitvaEvent[] = homeMomentsPreviews.map((m, idx) => ({
    id: `event-${idx + 1}`,
    title: m.title,
    tagline: m.tagline,
    type: "past",
  }));

  if (!isSupabaseConfigured || !supabase) {
    return defaultEvents;
  }

  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultEvents;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      tagline: item.tagline,
      date: item.date || undefined,
      type: item.type as "upcoming" | "past",
    }));
  } catch {
    return defaultEvents;
  }
}

export async function saveEvent(event: AstitvaEvent & { order_index?: number; location?: string; description?: string }) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured." };
  }

  try {
    const { error } = await supabase.from("events").upsert({
      id: event.id || `event-${Date.now()}`,
      title: event.title,
      tagline: event.tagline,
      date: event.date || null,
      type: event.type || "upcoming",
      order_index: event.order_index ?? 99,
      location: event.location || null,
      description: event.description || null,
    });

    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to save event" };
  }
}

export async function deleteEvent(id: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured." };
  }

  try {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete event" };
  }
}

// ═════════════════════════════════════════════════════════
// 3. GALLERY SERVICE
// ═════════════════════════════════════════════════════════

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return galleryItems;
  }

  try {
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return galleryItems;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category as "Community" | "Events" | "Creative" | "Memories",
      caption: item.caption || undefined,
      aspectRatio: item.aspect_ratio || "square",
    }));
  } catch {
    return galleryItems;
  }
}

export async function saveGalleryItem(item: GalleryItem & { order_index?: number; image_url?: string }) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured." };
  }

  try {
    const { error } = await supabase.from("gallery_items").upsert({
      id: item.id || `gallery-${Date.now()}`,
      title: item.title,
      category: item.category || "Community",
      caption: item.caption || null,
      aspect_ratio: item.aspectRatio || "square",
      image_url: item.image_url || null,
      order_index: item.order_index ?? 99,
    });

    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to save gallery item" };
  }
}

export async function deleteGalleryItem(id: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured." };
  }

  try {
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete gallery item" };
  }
}

// ═════════════════════════════════════════════════════════
// 4. SITE SETTINGS SERVICE
// ═════════════════════════════════════════════════════════

export interface SiteSettings {
  join_url: string;
  whatsapp_url: string;
  instagram_url: string;
  email: string;
  hero_tagline: string;
  hero_subhead: string;
}

export const defaultSettings: SiteSettings = {
  join_url: JOIN_FORM_URL,
  whatsapp_url: "https://chat.whatsapp.com/CsfmyiQDve3LJZtzc6swTP?mode=gi_t",
  instagram_url: "https://www.instagram.com/astitva_club/",
  email: "astitvaclub26@gmail.com",
  hero_tagline: "We Enter as Strangers, We Rise as One.",
  hero_subhead:
    "A new place. New faces. New dreams. Astitva is where GLBITM's freshers stop being strangers and start becoming a class, a community, a story worth telling.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultSettings;
  }

  try {
    const { data, error } = await supabase.from("site_settings").select("key, value");

    if (error || !data || data.length === 0) {
      return defaultSettings;
    }

    const settingsMap: Record<string, string> = {};
    data.forEach((row) => {
      settingsMap[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value).replace(/^"|"$/g, "");
    });

    return {
      join_url: settingsMap["join_url"] || defaultSettings.join_url,
      whatsapp_url: settingsMap["whatsapp_url"] || defaultSettings.whatsapp_url,
      instagram_url: settingsMap["instagram_url"] || defaultSettings.instagram_url,
      email: settingsMap["email"] || defaultSettings.email,
      hero_tagline: settingsMap["hero_tagline"] || defaultSettings.hero_tagline,
      hero_subhead: settingsMap["hero_subhead"] || defaultSettings.hero_subhead,
    };
  } catch {
    return defaultSettings;
  }
}

export async function updateSiteSetting(key: keyof SiteSettings, value: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: "Supabase not configured." };
  }

  try {
    const { error } = await supabase.from("site_settings").upsert({
      key,
      value: JSON.stringify(value),
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to update setting" };
  }
}
