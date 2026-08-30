# Under One Roof — Project Documentation Pack

**Product:** Under One Roof  
**Type:** AI-powered web application, later mobile app  
**Purpose:** Help renters and homeowners manage everything related to their home: bills, contracts, documents, maintenance, repairs, renewals, negotiation opportunities, and emergency information.

## Core Promise

> Everything your home needs, under one roof.

Under One Roof is not just a reminder app. It is a home operating system: a calm, organized, AI-powered assistant that gives each home a memory.

## Documents Included

1. `01_PRODUCT_BRIEF.md` — The vision, positioning, target users, and core product concept.
2. `02_PRD.md` — Product Requirements Document for the MVP.
3. `03_MVP_SCOPE.md` — What to build first, what to avoid, and what comes later.
4. `04_TECH_ARCHITECTURE.md` — Recommended stack and app structure.
5. `05_DATA_MODEL.md` — Suggested database tables and entities.
6. `06_USER_STORIES.md` — User stories for renters, homeowners, and future roles.
7. `07_CLAUDE_CODE_INSTRUCTIONS.md` — How to instruct Claude Code.
8. `CLAUDE.md` — Copy/paste-ready Claude Code memory file for the project root.
9. `08_GITHUB_WORKFLOW.md` — How GitHub fits and how to work safely.
10. `09_DESIGN_SYSTEM.md` — Early design principles and UI direction.
11. `10_SECURITY_PRIVACY.md` — Privacy, sensitive data, and guardrails.
12. `11_ROADMAP.md` — Suggested build roadmap.
13. `.env.example` — Example environment variable structure.

## Recommended First Build

Build a responsive web app with multiple routes/screens, not one massive HTML file.

Suggested MVP screens:

- Landing page
- Sign up / log in
- Home dashboard
- Home profile setup
- Bills tracker
- Contract vault
- Maintenance calendar
- Document vault
- AI assistant
- Settings

## Suggested Tech Stack

- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS
- Backend/database: Supabase or Firebase
- Auth: Supabase Auth or Firebase Auth
- AI: API layer/serverless functions, not direct browser calls
- Hosting: Vercel or Netlify
- Version control: Git + private GitHub repository

## First Goal

Create a clean MVP that proves one thing:

> Users can upload or enter home-related information, and the app turns it into useful reminders, insights, and searchable knowledge.
