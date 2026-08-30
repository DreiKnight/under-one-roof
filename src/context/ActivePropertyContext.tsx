import { createContext, useContext, useState, type ReactNode } from "react";
import type { HomeProfile } from "@/types";
import { getAllProperties } from "@/services/homeService";

interface ActivePropertyContextValue {
  activeProperty: HomeProfile;
  setActiveProperty: (p: HomeProfile) => void;
}

const ActivePropertyContext = createContext<ActivePropertyContextValue | undefined>(undefined);

export function ActivePropertyProvider({ children }: { children: ReactNode }) {
  const properties = getAllProperties();
  const [activeProperty, setActiveProperty] = useState<HomeProfile>(properties[0]);
  return (
    <ActivePropertyContext.Provider value={{ activeProperty, setActiveProperty }}>
      {children}
    </ActivePropertyContext.Provider>
  );
}

export function useActiveProperty(): ActivePropertyContextValue {
  const ctx = useContext(ActivePropertyContext);
  if (!ctx) throw new Error("useActiveProperty must be used inside ActivePropertyProvider");
  return ctx;
}
