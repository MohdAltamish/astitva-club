"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black-950 flex flex-col items-center justify-center text-center p-6">
        <div className="w-12 h-12 rounded-full border-2 border-gold-mid border-t-transparent animate-spin mb-4" />
        <p className="text-gray-400 font-kicker tracking-widest text-xs uppercase">
          Verifying Admin Credentials...
        </p>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}
