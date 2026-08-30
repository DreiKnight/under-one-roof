# Under One Roof

**Everything your home needs, under one roof.**
_Your home finally has a memory._

An AI-powered home management web app for renters and homeowners. Under One Roof keeps bills, contracts, leases, documents, maintenance schedules, repair history, warranties, and emergency info in one calm, secure place.

This repository is the **MVP front end**. It runs entirely on **mock data** — there is no backend, no authentication provider, and no real storage yet. That is intentional (see [Security model](#security-model)).

---

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (default http://localhost:5173).

Other scripts:

```bash
npm run build     # type-check + production build to /dist
npm run preview   # preview the production build locally
```

Requires Node 18+.

---

## What's inside

The app is a structured, maintainable React app — **not** a single HTML file.

```
under-one-roof/
├─ index.html              # entry HTML, fonts, favicon
├─ public/roof.svg         # favicon (roofline mark)
├─ CLAUDE.md               # Claude Code memory file (project root)
├─ docs/                   # product + technical docs (PRD, data model, etc.)
├─ src/
│  ├─ main.tsx             # React root: BrowserRouter + AuthProvider
│  ├─ App.tsx              # all routes + onboarding guard
│  ├─ index.css            # Tailwind layers + base styles
│  ├─ types/               # shared TypeScript models
│  ├─ lib/                 # formatting + small helpers
│  ├─ data/                # MOCK data (bills, contracts, docs, etc.)
│  ├─ services/            # data-access layer — the swap-in seam for Phase 2
│  ├─ context/             # AuthContext (mock session — swap-in seam)
│  ├─ components/
│  │  ├─ RoofMark.tsx      # logo / signature roofline motif
│  │  ├─ ui/               # Button, Card, Badge, StatCard, Disclaimer…
│  │  └─ layout/           # AppLayout (protected shell), Sidebar, AuthShell
│  └─ pages/               # Landing, Login, Signup, Onboarding, Dashboard,
│                          # Bills, Contracts, Documents, Maintenance,
│                          # Repairs, Assistant, Settings, NotFound
├─ tailwind.config.js      # design tokens (palette, fonts, shadows)
└─ .env.example            # documented env vars (none required for the demo)
```

> **Architecture note:** pages never read from `src/data/` directly — they go
> through `src/services/`. Today those services return mock data; in Phase 2,
> only the service bodies change to hit Supabase, and every page keeps working.

### Routes

| Path             | Screen                                  |
|------------------|-----------------------------------------|
| `/`              | Landing (marketing)                     |
| `/login`         | Sign in (demo)                          |
| `/signup`        | Create account (demo)                   |
| `/onboarding`    | 4-step setup — standalone, auth-guarded |
| `/app`           | Dashboard                               |
| `/app/bills`     | Bills & due dates                       |
| `/app/contracts` | Contracts & leases (plain-language)     |
| `/app/documents` | Documents + AI-permission toggles       |
| `/app/maintenance`| Maintenance schedule                   |
| `/app/repairs`   | Repair history & warranties             |
| `/app/assistant` | AI Assistant (transparent placeholder)  |
| `/app/settings`  | Profile, home, privacy & security       |

The `/app/*` area is gated by a mock session. Onboarding lives at the top level because it renders its own full-screen layout.

---

## Design

A deliberately non-generic, "home & hearth" direction: an evergreen + warm-paper + honey palette, **Fraunces** for display and **Hanken Grotesk** for UI, and a recurring **roofline** motif with a honey "the light is on" dot. Tokens live in `tailwind.config.js`; fonts load in `index.html`.

---

## Security model

This is the most important part of the project, and the reason the app ships with mock data only.

**Today (MVP): nothing real is stored.**
- All data in `src/data/` is fictional sample content.
- "Auth" is a mock session in `localStorage` (`src/context/AuthContext.tsx`). It is a development convenience, **not** security.
- A persistent demo banner reminds anyone using the app that it is sample data.
- No secrets, API keys, or service-role keys exist anywhere in this front end — and none should ever be added to it. Anything in a frontend bundle is public.

**Before storing any real user data**, these four prerequisites must be in place:

1. **Authentication** — a real identity provider (e.g. Supabase Auth or Firebase Auth).
2. **Authorization** — per-user access rules (e.g. Postgres Row Level Security) so a user can only ever read/write their own rows.
3. **Private storage** — documents in a private bucket served via short-lived signed URLs, never public links.
4. **Database security** — server-enforced policies, encryption at rest, audited access; secrets kept server-side only.

`AuthContext.tsx` is written as a clean **swap-in seam**: replacing the mock implementation with a real provider should not require touching the route components.

### AI features are permission-based and transparent
- Document AI analysis is **opt-in per document** (see the toggles on the Documents screen). Nothing is analyzed without explicit permission.
- The Assistant shows which documents it can see and connects to no live model in the MVP.
- Contract and lease summaries are plain-language helpers and always carry a disclaimer that **they are not legal advice**.

### When wiring up a backend
- Keep service-role / admin keys server-side only. The browser may receive a public anon key **and nothing more**.
- Use `VITE_`-prefixed env vars only for values that are safe to be public; everything sensitive belongs in server/edge functions. See `.env.example`.
- Deploy to Vercel or Netlify; keep the repository private; set env vars in the host's dashboard, never in committed files.

---

## Tech

React 18 · Vite 5 · TypeScript 5 · Tailwind CSS 3 · React Router 6 · lucide-react

---

_MVP scaffold. Mock data only. Not legal, financial, or insurance advice._
