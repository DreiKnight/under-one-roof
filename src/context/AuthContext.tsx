import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/services/supabaseClient";

// ----------------------------------------------------------------------------
// AUTH CONTEXT — dual-mode
//
// DEMO mode: entirely mock. enterDemo() sets mode:"demo" and uses a Guest user
//   stored in localStorage. No network calls. Read-only.
//
// LIVE mode: backed by Supabase Auth. signUp/signIn/signOut call real Supabase
//   endpoints. Session is synced via onAuthStateChange. The uor:session record
//   is kept in sync so isLive()/isDemo()/userPrefix() all keep working.
//
// Page components see the same AuthContextValue shape in both modes.
// Real secrets must NEVER live in client code — the anon key here is public by
// design (it enforces Row Level Security, not access control).
// ----------------------------------------------------------------------------

export interface DemoUser {
  name: string;
  email: string;
  onboarded: boolean;
}

interface AuthContextValue {
  user: DemoUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  completeOnboarding: () => void;
  signOut: () => Promise<void>;
  enterDemo: () => void;
}

const STORAGE_KEY = "uor.demo.user";
const SESSION_KEY = "uor:session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── localStorage helpers ────────────────────────────────────────────────────

function readStored(): DemoUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

function writeSession(session: { mode: "live" | "demo"; userId?: string } | null) {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch { /* ignore */ }
}

function titleCase(s: string): string {
  return s
    .replace(/[._-]+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: restore whatever session exists (demo or live).
  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Live auth isn't configured in this environment (no Supabase env vars) —
      // skip straight to whatever demo/mock session is stored, without making
      // any network calls.
      if (!isSupabaseConfigured) {
        setUser(readStored());
        setLoading(false);
        return;
      }

      // Check for an existing Supabase session first.
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;

      if (data.session?.user) {
        const su = data.session.user;
        const name = su.user_metadata?.name as string | undefined;
        setUser({
          name: name || titleCase(su.email?.split("@")[0] || "Friend"),
          email: su.email ?? "",
          onboarded: true,
        });
        writeSession({ mode: "live", userId: su.id });
      } else {
        // Fall back to any stored demo/mock session.
        setUser(readStored());
      }
      setLoading(false);
    }

    init();

    if (!isSupabaseConfigured) {
      return () => {
        cancelled = true;
      };
    }

    // Keep live sessions in sync (tab switches, token refresh, sign-out elsewhere).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (session?.user) {
        const su = session.user;
        const name = su.user_metadata?.name as string | undefined;
        setUser({
          name: name || titleCase(su.email?.split("@")[0] || "Friend"),
          email: su.email ?? "",
          onboarded: true,
        });
        writeSession({ mode: "live", userId: su.id });
      } else {
        // If Supabase session ends, clear live state but leave demo state alone.
        const stored = readStored();
        setUser(stored);
        if (!stored) writeSession(null);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  // ── Demo-only persist (unchanged) ────────────────────────────────────────

  function persist(next: DemoUser | null) {
    setUser(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }

  // ── Context value ────────────────────────────────────────────────────────

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,

      signIn: async (email: string, password: string) => {
        if (!isSupabaseConfigured) {
          throw new Error(
            "Live sign-in isn't set up for this environment yet — try the demo instead."
          );
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        // onAuthStateChange will update user + uor:session automatically.
      },

      signUp: async (name: string, email: string, password: string) => {
        if (!isSupabaseConfigured) {
          throw new Error(
            "Live accounts aren't set up for this environment yet — try the demo instead."
          );
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name: name.trim() || "Friend" } },
        });
        if (error) throw new Error(error.message);
        // onAuthStateChange fires once the session is created.
      },

      completeOnboarding: () => {
        if (user) persist({ ...user, onboarded: true });
      },

      signOut: async () => {
        if (isSupabaseConfigured) {
          await supabase.auth.signOut();
        }
        persist(null);
        writeSession(null);
      },

      // ── Demo path — completely unchanged ──────────────────────────────────
      enterDemo: () => {
        writeSession({ mode: "demo" });
        persist({ name: "Guest", email: "demo@underoneroof.app", onboarded: true });
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
