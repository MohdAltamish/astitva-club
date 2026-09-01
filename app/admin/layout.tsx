"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { isSupabaseConfigured } from "@/lib/supabase";

const adminNav = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Team Members", href: "/admin/team", icon: "👥" },
  { label: "Events", href: "/admin/events", icon: "📅" },
  { label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
  { label: "Backend & DB", href: "/admin/database", icon: "⚡" },
  { label: "Site Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isDemoUser, isConfigured, signOutUser } = useAuth();

  // If on login page, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-black-950">{children}</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black-950 text-white flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-black-900 border-r border-gold-deep/20 flex flex-col justify-between shrink-0">
          <div>
            {/* Logo / Brand */}
            <div className="p-6 border-b border-gold-deep/15 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gold-mid/10 border border-gold-mid/40 flex items-center justify-center text-gold-mid font-display font-bold">
                  A
                </span>
                <div>
                  <h1 className="font-display font-bold text-white text-sm tracking-wider">
                    ASTITVA
                  </h1>
                  <span className="text-[10px] font-kicker text-gold-mid uppercase tracking-widest block">
                    Admin Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-1.5">
              {adminNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gold-mid text-black-950 font-semibold shadow-[0_0_16px_rgba(212,175,55,0.25)]"
                        : "text-gray-400 hover:text-gold-light hover:bg-black-800"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom user & system status */}
          <div className="p-4 border-t border-gold-deep/15 space-y-4">
            {/* Status indicators */}
            <div className="bg-black-950/80 rounded-xl p-3 border border-gold-deep/10 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Database</span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                    isSupabaseConfigured ? "text-green-400" : "text-amber-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSupabaseConfigured ? "bg-green-400" : "bg-amber-400"
                    }`}
                  />
                  {isSupabaseConfigured ? "Supabase Live" : "Local / Demo"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Auth</span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                    isConfigured ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isConfigured ? "bg-green-400" : "bg-blue-400"
                    }`}
                  />
                  {isConfigured ? "Firebase" : isDemoUser ? "Demo Admin" : "Guest"}
                </span>
              </div>
            </div>

            {/* User info & logout */}
            <div className="flex items-center justify-between pt-2">
              <div className="overflow-hidden pr-2">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.displayName || (isDemoUser ? "Administrator" : "Admin")}
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  {user?.email || "admin@astitva.club"}
                </p>
              </div>
              <button
                type="button"
                onClick={signOutUser}
                className="text-gray-400 hover:text-red-400 p-2 text-xs transition-colors"
                title="Log out"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>

            {/* Link back to public site */}
            <Link
              href="/"
              target="_blank"
              className="text-center block text-xs text-gold-mid hover:text-gold-light tracking-wide pt-1"
            >
              View Public Website ↗
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto max-w-7xl">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
