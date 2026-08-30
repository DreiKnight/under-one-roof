# services/

Data-access layer. **Pages and components should read data from here, never
directly from `src/data/`.**

Right now each function returns mock data from `src/data/`. This is the single
seam where real persistence gets wired in later (Phase 2 in `docs/11_ROADMAP.md`):
when Supabase is connected, only the bodies of these functions change — every
page that calls them keeps working unchanged.

Guardrails that live here in the future:
- All reads/writes scoped to the authenticated user (row-level security).
- No secrets in this layer — anything sensitive (service-role key, AI key)
  stays in a server / edge function, never in the browser bundle.
