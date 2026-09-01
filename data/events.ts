/**
 * Events data — typed JSON.
 * Per agents.md §3: content data lives in /data as typed JSON,
 * never hardcoded directly inside JSX.
 *
 * These are placeholder entries following the moments-card pattern
 * from content.md §5 / design.md §6. Replace bracketed examples
 * with real event names/dates as they happen — don't publish
 * placeholder events as if they occurred (content.md §5 note).
 */

export interface AstitvaEvent {
  id: string;
  title: string;
  tagline: string;
  date?: string;
  type: "upcoming" | "past";
}

export const events: AstitvaEvent[] = [
  // Placeholder events — these match the example pattern from content.md §5
  // but are clearly marked as examples. Do NOT ship these as real events.
];

/**
 * Placeholder moments for the home page preview.
 * These use the exact example copy from content.md §5 as reference
 * for the moments-card format. They are NOT published as real events.
 */
export const homeMomentsPreviews: Array<{
  title: string;
  tagline: string;
}> = [
  { title: "Welcome Mixer", tagline: "Where strangers shared their first conversation." },
  { title: "Orientation Walk", tagline: "Where new journeys began." },
  { title: "Open Mic Night", tagline: "Stories that speak. Voices that stay." },
];
