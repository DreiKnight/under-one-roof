import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Live (Supabase-backed) auth is OPTIONAL for this app — per README/.env.example,
// the MVP is designed to run entirely on mock data with no backend configured.
// Previously this module `throw`-ed at import time when the env vars were
// missing, which crashed the entire app to a blank white screen (including the
// "Try the demo" flow, which never touches Supabase at all) any time
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY weren't set — e.g. a fresh
// `npm install && npm run dev` with no `.env.local`, or a production build
// where the host's env vars weren't wired up. Instead, we degrade gracefully:
// `isSupabaseConfigured` is false, and every call site in AuthContext skips
// Supabase entirely and falls back to demo/local session handling.
export const isSupabaseConfigured = Boolean(url && key);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Under One Roof] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Live sign-in/sign-up is disabled for this session — demo mode still works " +
      "fully. See .env.example."
  );
}

// A client is always created so this module never throws on import (and so
// call sites don't need to null-check `supabase`), but it only ever talks to
// placeholder values when not configured — and AuthContext guards every call
// behind `isSupabaseConfigured` so no network request against the placeholder
// URL is ever actually made.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  key || "public-anon-key-placeholder"
);
