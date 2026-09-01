"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
  signUpWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
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
  signUpWithEmail: async () => ({ success: false }),
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
      let message = "Failed to sign in";
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-credential") || err.message.includes("auth/wrong-password") || err.message.includes("auth/user-not-found")) {
          message = "Incorrect password or account not found. Click 'Register / Sign Up' below to create this account in Firebase.";
        } else if (err.message.includes("auth/operation-not-allowed")) {
          message = "Email/Password sign-in is not enabled in Firebase Console > Authentication > Sign-in method.";
        } else if (err.message.includes("auth/too-many-requests")) {
          message = "Access temporarily blocked due to many failed attempts. Try again in a few minutes or use Demo Quick Access.";
        } else {
          message = err.message;
        }
      }
      return { success: false, error: message };
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      return { success: false, error: "Firebase is not configured in .env.local yet." };
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
      return { success: true };
    } catch (err: unknown) {
      let message = "Failed to register";
      if (err instanceof Error) {
        if (err.message.includes("auth/email-already-in-use")) {
          message = "An account with this email already exists. Please Sign In.";
        } else if (err.message.includes("auth/weak-password")) {
          message = "Password should be at least 6 characters.";
        } else if (err.message.includes("auth/operation-not-allowed")) {
          message = "Email/Password provider is disabled. Go to Firebase Console > Authentication > Sign-in method > Enable Email/Password.";
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
      await signInWithPopup(auth, googleProvider);
      setIsDemoUser(false);
      sessionStorage.removeItem("astitva-demo-admin");
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : "Google sign-in failed. Ensure Google is enabled in Firebase Console > Authentication > Sign-in method." };
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
        signUpWithEmail,
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
