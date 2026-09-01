"use client";

import { useState, useEffect } from "react";
import KickerLabel from "@/components/KickerLabel";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from "@/lib/data-service";
import { GalleryItem } from "@/data/gallery";

const categories = ["All", "Community", "Events", "Creative", "Memories"] as const;

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Community" | "Events" | "Creative" | "Memories">("Community");
  const [caption, setCaption] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"square" | "landscape" | "portrait">("square");

  const loadGallery = async () => {
    setLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Community");
    setCaption("");
    setAspectRatio("square");
    setIsModalOpen(true);
    setMessage(null);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setCaption(item.caption || "");
    setAspectRatio(item.aspectRatio || "square");
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const itemId = editingId || `gallery-${Date.now()}`;
    const result = await saveGalleryItem({
      id: itemId,
      title,
      category,
      caption: caption || undefined,
      aspectRatio,
    });

    setSaving(false);

    if (result.success) {
      setMessage({ type: "success", text: "Gallery moment saved successfully!" });
      if (editingId) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === editingId
              ? { ...i, title, category, caption: caption || undefined, aspectRatio }
              : i
          )
        );
      } else {
        setItems((prev) => [
          ...prev,
          { id: itemId, title, category, caption: caption || undefined, aspectRatio },
        ]);
      }
      setTimeout(() => setIsModalOpen(false), 800);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save gallery item." });
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${itemTitle}"?`)) return;

    const result = await deleteGalleryItem(id);
    if (result.success) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      alert(result.error || "Failed to delete item.");
    }
  };

  const filteredItems =
    selectedFilter === "All"
      ? items
      : items.filter((i) => i.category === selectedFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <KickerLabel>MOMENTS &amp; ARCHIVES</KickerLabel>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
            Gallery Moments
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Curate photo moments and memories showcased in the public Gallery section.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="px-5 py-3 rounded-xl text-sm font-semibold tracking-wide gold-gradient-bg text-black-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>+</span>
          <span>Add Moment</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-kicker uppercase tracking-widest transition-all cursor-pointer ${
              selectedFilter === cat
                ? "bg-gold-mid text-black-950 font-bold"
                : "bg-black-900 border border-gold-deep/20 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-kicker text-sm tracking-widest uppercase">
          Loading gallery...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-black-900 border border-gold-deep/20 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-mid/50 transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-black-950 relative flex items-center justify-center border-b border-gold-deep/15 p-4">
                <span className="text-2xl opacity-60">🖼️</span>
                <span className="absolute top-3 left-3 text-[10px] font-kicker uppercase tracking-widest text-gold-mid bg-black-900/90 px-2.5 py-0.5 rounded-full border border-gold-deep/20">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gold-deep/10 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black-950 border border-gold-deep/30 text-gold-light hover:border-gold-mid hover:text-white transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
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
                <KickerLabel>{editingId ? "EDIT MOMENT" : "NEW MOMENT"}</KickerLabel>
                <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-1">
                  {editingId ? "Update Gallery Moment" : "Add Gallery Moment"}
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
                  Moment Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The First Meetup / Design Circle"
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as "Community" | "Events" | "Creative" | "Memories")}
                    className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                  >
                    <option value="Community">Community</option>
                    <option value="Events">Events</option>
                    <option value="Creative">Creative</option>
                    <option value="Memories">Memories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as "square" | "landscape" | "portrait")}
                    className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                  >
                    <option value="square">Square (1:1)</option>
                    <option value="landscape">Landscape (16:9)</option>
                    <option value="portrait">Portrait (3:4)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                  Caption / One-Liner (Optional)
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Where strangers shared their first conversation."
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
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
                  {saving ? "Saving..." : "Save Moment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
