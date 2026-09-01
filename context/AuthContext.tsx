"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// Authorized administrator emails
const DEFAULT_ADMIN_EMAILS = [
  "astitvaclub26@gmail.com",
];

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
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithEmail: async () => ({ success: false }),
  signInWithGoogle: async () => ({ success: false }),
  signOutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const currentAuth = auth;
    const unsubscribe = onAuthStateChanged(currentAuth, (currentUser) => {
      if (currentUser && currentUser.email) {
        if (isAuthorizedAdmin(currentUser.email)) {
          setUser(currentUser);
        } else {
          signOut(currentAuth);
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
    if (!auth) {
      return { success: false, error: "Authentication service unavailable. Please check your configuration." };
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
        await signOut(auth);
        return {
          success: false,
          error: "Access Denied: You are not authorized as an administrator.",
        };
      }
      return { success: true };
    } catch (err: unknown) {
      let message = "Failed to sign in";
      if (err instanceof Error) {
        if (
          err.message.includes("auth/invalid-credential") ||
          err.message.includes("auth/wrong-password") ||
          err.message.includes("auth/user-not-found")
        ) {
          message = "Incorrect credentials. Please verify your email and password.";
        } else if (err.message.includes("auth/operation-not-allowed")) {
          message = "Email/Password sign-in is not enabled in Firebase Console.";
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
    if (!auth || !googleProvider) {
      return { success: false, error: "Google authentication unavailable. Please check your configuration." };
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!isAuthorizedAdmin(result.user.email)) {
        await signOut(auth);
        return {
          success: false,
          error: "Access Denied: Your account is not authorized as an administrator.",
        };
      }
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

  const signOutUser = async () => {
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
        signInWithEmail,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
