"use client";

import { useState, useEffect } from "react";
import KickerLabel from "@/components/KickerLabel";
import InitialsBadge from "@/components/InitialsBadge";
import { getTeamMembers, saveTeamMember, deleteTeamMember } from "@/lib/data-service";
import { TeamMember } from "@/data/team";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [initials, setInitials] = useState("");
  const [category, setCategory] = useState<"Core" | "Department">("Core");
  const [bio, setBio] = useState("");

  const loadMembers = async () => {
    setLoading(true);
    const data = await getTeamMembers();
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setInitials("");
    setCategory("Core");
    setBio("");
    setIsModalOpen(true);
    setMessage(null);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setInitials(member.initials);
    setCategory(member.category || "Core");
    setBio(member.bio || "");
    setIsModalOpen(true);
    setMessage(null);
  };

  // Auto-generate initials when name changes
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      const parts = val.trim().split(" ");
      if (parts.length >= 2) {
        setInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase());
      } else if (parts.length === 1 && parts[0].length > 0) {
        setInitials(parts[0].slice(0, 2).toUpperCase());
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const memberId = editingId || name.toLowerCase().replace(/\s+/g, "-");
    const result = await saveTeamMember({
      id: memberId,
      name,
      role,
      initials: initials || name.slice(0, 2).toUpperCase(),
      category,
      bio: bio || undefined,
    });

    setSaving(false);

    if (result.success) {
      setMessage({ type: "success", text: "Team member saved successfully!" });
      // Optimistic local update
      if (editingId) {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === editingId
              ? { ...m, name, role, initials, category, bio: bio || undefined }
              : m
          )
        );
      } else {
        setMembers((prev) => [
          ...prev,
          { id: memberId, name, role, initials, category, bio: bio || undefined },
        ]);
      }
      setTimeout(() => setIsModalOpen(false), 800);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to save member." });
    }
  };

  const handleDelete = async (id: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName}?`)) return;

    const result = await deleteTeamMember(id);
    if (result.success) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } else {
      alert(result.error || "Failed to delete member.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <KickerLabel>ROSTER MANAGEMENT</KickerLabel>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">
            Core Team Members
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Add, update, or remove leadership and department leads shown on the public team page.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="px-5 py-3 rounded-xl text-sm font-semibold tracking-wide gold-gradient-bg text-black-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>+</span>
          <span>Add Member</span>
        </button>
      </div>

      {/* Team Roster Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 font-kicker text-sm tracking-widest uppercase">
          Loading team roster...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-black-900 border border-gold-deep/20 rounded-2xl p-6 flex flex-col justify-between hover:border-gold-mid/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <InitialsBadge initials={member.initials} size="md" />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-kicker uppercase tracking-widest text-gold-mid block mb-0.5">
                    {member.category || "Core"}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5 leading-snug">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-gray-400 text-xs italic mt-2 line-clamp-2">
                      &ldquo;{member.bio}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-deep/15 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(member)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black-950 border border-gold-deep/30 text-gold-light hover:border-gold-mid hover:text-white transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(member.id, member.name)}
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
                <KickerLabel>{editingId ? "EDIT MEMBER" : "NEW MEMBER"}</KickerLabel>
                <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-1">
                  {editingId ? "Update Team Member" : "Add Team Member"}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Mohd Altamish"
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Owner / President & Technical Head"
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                    Initials (2 letters) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    value={initials}
                    onChange={(e) => setInitials(e.target.value.toUpperCase())}
                    placeholder="e.g. MA"
                    className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as "Core" | "Department")}
                    className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                  >
                    <option value="Core">Core Leadership</option>
                    <option value="Department">Department Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1">
                  One-Line Bio (Optional)
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. Leading technological growth and engineering the ASTITVA experience."
                  className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors"
                />
              </div>

              {/* Live Preview */}
              <div className="p-4 rounded-xl bg-black-950 border border-gold-deep/10">
                <span className="text-[11px] font-kicker uppercase text-gold-mid block mb-2">
                  Live Card Preview
                </span>
                <div className="flex items-center gap-3">
                  <InitialsBadge initials={initials || "MA"} size="sm" />
                  <div>
                    <h4 className="text-white text-sm font-bold">{name || "Name Preview"}</h4>
                    <p className="text-gray-400 text-xs">{role || "Role Preview"}</p>
                  </div>
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
                  {saving ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
