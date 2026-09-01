"use client";

import { useState, useEffect } from "react";
import KickerLabel from "@/components/KickerLabel";
import { getEvents, saveEvent, deleteEvent } from "@/lib/data-service";
import { AstitvaEvent } from "@/data/events";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AstitvaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form fields
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<"upcoming" | "past">("upcoming");

  const loadEvents = async () => {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setTitle("");
    setTagline("");
    setDate("");
    setType("upcoming");
    setIsModalOpen(true);
    setMessage(null);
  };

  const openEditModal = (event: AstitvaEvent) => {
    setEditingId(event.id);
    setTitle(event.title);
    setTagline(event.tagline);
    setDate(event.date || "");
    setType(event.type);
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const eventId = editingId || `event-${Date.now()}`;
    const result = await saveEvent({
      id: eventId,
      title,
      tagline,
      date: date || undefined,
      type,
    });

    setSaving(false);

    if (result.success) {
      setMessage({ type: "success", text: "Event saved successfully!" });
      if (editingId) {
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === editingId
              ? { ...ev, title, tagline, date: date || undefined, type }
              : ev
          )
        );
      } else {
        setEvents((prev) => [
          ...prev,
          { id: eventId, title, tagline, date: date || undefined, type },
        ]);
      }
      setTimeout(() => setIsModalOpen(false), 800);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save event." });
    }
  };

  const handleDelete = async (id: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete event "${eventTitle}"?`)) return;

    const result = await deleteEvent(id);
    if (result.success) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } else {
      alert(result.error || "Failed to delete event.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <KickerLabel>EVENTS &amp; EXPERIENCES</KickerLabel>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
            Events Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Publish upcoming mixers, campus workshops, and past moment recaps for the Events page.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="px-5 py-3 rounded-xl text-sm font-semibold tracking-wide gold-gradient-bg text-black-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>+</span>
          <span>Create Event</span>
        </button>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-kicker text-sm tracking-widest uppercase">
          Loading events...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 flex flex-col justify-between hover:border-gold-mid/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-kicker uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      event.type === "upcoming"
                        ? "bg-gold-mid/10 text-gold-mid border-gold-mid/30"
                        : "bg-gray-800/80 text-gray-400 border-gray-700"
                    }`}
                  >
                    {event.type === "upcoming" ? "✦ Upcoming" : "Past Moment"}
                  </span>
                  {event.date && (
                    <span className="text-xs text-gray-400 font-mono">{event.date}</span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {event.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-deep/15 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(event)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black-950 border border-gold-deep/30 text-gold-light hover:border-gold-mid hover:text-white transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(event.id, event.title)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-black-900 border border-gold-mid/40 rounded-3xl p-6 md:p-8 max-w-lg w-full relative shadow-[0_0_40px_rgba(212,175,55,0.15)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold-deep/15">
              <div>
                <KickerLabel>{editingId ? "EDIT EVENT" : "NEW EVENT"}</KickerLabel>
                <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-1">
                  {editingId ? "Update Event" : "Create New Event"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-2"
              >
                ✕
              </button>
            </div>

            {message && (
              <div
                className={`mb-5 p-3 rounded-xl text-xs ${
                  message.type === "success"
                    ? "bg-green-500/10 border border-green-500/30 text-green-300"
                    : "bg-red-500/10 border border-red-500/30 text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Welcome Mixer / Orientation Walk"
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                  Tagline (One-line description) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Where strangers shared their first conversation."
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                    Event Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "upcoming" | "past")}
                    className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                  >
                    <option value="upcoming">Upcoming Event</option>
                    <option value="past">Past Moment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                    Date / Time (Optional)
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Sept 2026 / TBD"
                    className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide gold-gradient-bg text-black-950 hover:shadow-[0_0_16px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
