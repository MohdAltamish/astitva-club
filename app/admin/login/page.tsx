"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import KickerLabel from "@/components/KickerLabel";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signInWithEmail, signInWithGoogle, loginAsDemoAdmin, isConfigured } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signInWithEmail(email, password);
    setLoading(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Authentication failed. Check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const res = await signInWithGoogle();
    setLoading(false);

    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Google Sign-In failed.");
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoAdmin();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-black-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,169,77,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-md w-full bg-black-900 border border-gold-deep/30 rounded-3xl p-8 md:p-10 relative z-10 shadow-[0_0_50px_rgba(212,175,55,0.08)]">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3">
            <span className="font-display text-2xl md:text-3xl font-bold gold-gradient-text tracking-widest">
              ASTITVA
            </span>
          </Link>
          <KickerLabel>CONTROL CENTER</KickerLabel>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-2">
            Admin Authentication
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Restricted to verified ASTITVA administrators.
          </p>
        </div>

        {/* Status notice if not configured */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <p className="font-semibold mb-1">⚡ Setup / Demo Mode Active</p>
            <p className="text-amber-300/80">
              Firebase credentials not yet detected. You can click <strong>Demo Quick Access</strong> below to access the full admin interface immediately.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 leading-relaxed">
            {error}
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="altamish6589@gmail.com"
              className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs font-kicker uppercase tracking-widest text-gray-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black-950 border border-gold-deep/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-mid transition-colors placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide gold-gradient-bg text-black-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : "Sign in with Email"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold-deep/15" />
          </div>
          <span className="relative bg-black-900 px-3 text-[11px] font-kicker uppercase text-gray-400 tracking-wider">
            Or
          </span>
        </div>

        {/* Secondary options */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-xs md:text-sm font-semibold border border-gold-deep/30 bg-black-950 text-white hover:border-gold-mid hover:bg-gold-mid/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-kicker uppercase tracking-widest text-gold-mid bg-gold-mid/10 border border-gold-mid/30 hover:bg-gold-mid/20 transition-all cursor-pointer"
          >
            ⚡ Demo Quick Access (Instant Bypass)
          </button>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gold-light transition-colors">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
