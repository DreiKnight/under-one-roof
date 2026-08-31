import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { HomeProfile } from "@/types";
import { getAllProperties, createProperty } from "@/services/homeService";
import { useAuth } from "@/context/AuthContext";

interface ActivePropertyContextValue {
  properties: HomeProfile[];
  // null only happens in live mode before the user has added their first
  // property — demo mode always ships with sample properties.
  activeProperty: HomeProfile | null;
  setActiveProperty: (p: HomeProfile) => void;
  addProperty: (data: Omit<HomeProfile, "id">) => HomeProfile;
}

const ActivePropertyContext = createContext<ActivePropertyContextValue | undefined>(undefined);

export function ActivePropertyProvider({ children }: { children: ReactNode }) {
  // Auth state (not just its presence) decides demo vs. live per config.ts's
  // isDemo()/isLive(), which read the session written by AuthContext. This
  // provider mounts once at the app root — BEFORE anyone has signed in — so
  // it must re-read getAllProperties() whenever the auth session actually
  // changes (sign-in, sign-out, demo entry), not just once on mount. Without
  // this, a real Supabase login would leave the switcher stuck showing
  // whatever properties were visible before the user was authenticated.
  const { user } = useAuth();
  const [properties, setProperties] = useState<HomeProfile[]>(() => getAllProperties());
  const [activeProperty, setActiveProperty] = useState<HomeProfile | null>(properties[0] ?? null);

  useEffect(() => {
    const fresh = getAllProperties();
    setProperties(fresh);
    setActiveProperty((prev) => fresh.find((p) => p.id === prev?.id) ?? fresh[0] ?? null);
  }, [user]);

  function addProperty(data: Omit<HomeProfile, "id">): HomeProfile {
    const created = createProperty(data);
    setProperties((prev) => [...prev, created]);
    setActiveProperty(created);
    return created;
  }

  return (
    <ActivePropertyContext.Provider
      value={{ properties, activeProperty, setActiveProperty, addProperty }}
    >
      {children}
    </ActivePropertyContext.Provider>
  );
}

export function useActiveProperty(): ActivePropertyContextValue {
  const ctx = useContext(ActivePropertyContext);
  if (!ctx) throw new Error("useActiveProperty must be used inside ActivePropertyProvider");
  return ctx;
}
