"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  isDemoUser: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginAsDemoAdmin: () => void;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  isDemoUser: false,
  signInWithEmail: async () => ({ success: false }),
  signInWithGoogle: async () => ({ success: false }),
  loginAsDemoAdmin: () => {},
  signOutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if demo admin is stored in sessionStorage
    const savedDemo = sessionStorage.getItem("astitva-demo-admin") === "1";
    if (savedDemo) {
      setIsDemoUser(true);
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      return { success: false, error: "Firebase is not configured in .env.local yet." };
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to sign in" };
    }
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      return { success: false, error: "Firebase Google Auth is not configured in .env.local yet." };
    }

    try {
      await signInWithPopup(auth, googleProvider);
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : "Google sign-in failed" };
    }
  };

  const loginAsDemoAdmin = () => {
    setIsDemoUser(true);
    sessionStorage.setItem("astitva-demo-admin", "1");
  };

  const signOutUser = async () => {
    if (isDemoUser) {
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
    }
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isFirebaseConfigured,
        isDemoUser,
        signInWithEmail,
        signInWithGoogle,
        loginAsDemoAdmin,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
