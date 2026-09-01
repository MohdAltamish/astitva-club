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

// Default authorized administrator emails
const DEFAULT_ADMIN_EMAILS = [
  "astitvaclub26@gmail.com",
];

// Load authorized admin emails from environment variable
const envAdmins = process.env.NEXT_PUBLIC_ADMIN_EMAILS
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
  : [];

const AUTHORIZED_ADMIN_EMAILS = Array.from(
  new Set([...DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase()), ...envAdmins])
);

export const isAuthorizedAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  if (AUTHORIZED_ADMIN_EMAILS.length === 0) return true;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase());
};

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
      if (currentUser && currentUser.email) {
        if (isAuthorizedAdmin(currentUser.email)) {
          setUser(currentUser);
        } else {
          if (auth) signOut(auth);
          setUser(null);
        }
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      return { success: false, error: "Firebase is not configured in .env.local yet." };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!isAuthorizedAdmin(cleanEmail)) {
      return {
        success: false,
        error: "Access Denied: You are not authorized as an administrator.",
      };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      if (!isAuthorizedAdmin(cred.user.email)) {
        if (auth) await signOut(auth);
        return {
          success: false,
          error: "Access Denied: You are not authorized as an administrator.",
        };
      }
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
      return { success: true };
    } catch (err: unknown) {
      let message = "Failed to sign in";
      if (err instanceof Error) {
        if (
          err.message.includes("auth/invalid-credential") ||
          err.message.includes("auth/wrong-password") ||
          err.message.includes("auth/user-not-found")
        ) {
          message =
            "Incorrect credentials. Please verify your email and password.";
        } else if (err.message.includes("auth/operation-not-allowed")) {
          message =
            "Email/Password sign-in is not enabled in Firebase Console.";
        } else if (err.message.includes("auth/too-many-requests")) {
          message = "Access temporarily blocked due to many failed attempts. Try again later.";
        } else {
          message = err.message;
        }
      }
      return { success: false, error: message };
    }
  };

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      return { success: false, error: "Firebase Google Auth is not configured in .env.local yet." };
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!isAuthorizedAdmin(result.user.email)) {
        if (auth) await signOut(auth);
        return {
          success: false,
          error: "Access Denied: Your account is not authorized as an administrator.",
        };
      }
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Google sign-in failed. Please try again.",
      };
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
