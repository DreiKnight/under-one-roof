# CLAUDE.md — Under One Roof

## Project Context

Under One Roof is an AI-powered home management web app for renters and homeowners — a single place to track bills, contracts, lease/mortgage dates, utility costs, maintenance, repairs, documents, warranties, renewals, and emergency info.

Long-term vision: "A digital brain for every home."
Tagline direction: "Everything your home needs, under one roof."

## Current Status

This is past the initial MVP scaffold — real auth and data architecture are live.

- Stack: Vite / React / TypeScript
- Hosting: Netlify (manual deploy via drag-and-drop of the `dist` folder)
- Auth: Supabase (real authentication, not mocked)
- Architecture: fully wired demo-vs-live pattern using a session-based `isDemo()` / `isLive()` check, so the app can run against mock data OR real Supabase data depending on session state
- Five core services are routed through a shared `createCollection` abstraction (keep this pattern for any new service/data type)
- Deploy config: `public/_redirects` set to `/* /index.html 200` (required for client-side routing on Netlify)

## Open Items

- Add/Edit UI on the Bills page still needs to be built
- Google Play Store submission in progress — requires Capacitor wrapping
- Priority: get this into the Apple App Store

## Product Principles

1. Calm over clutter.
2. Useful over flashy.
3. Organized, not overwhelming.
4. Mobile-first.
5. User trust is sacred.
6. Do not expose private home data.
7. Do not hardcode secrets.
8. Do not call AI APIs directly from frontend code.
9. Build reusable components.
10. Keep the app scalable.
11. New data/services follow the existing `createCollection` pattern and respect `isDemo()`/`isLive()`.

## MVP Screens

- Landing, Login, Signup, Onboarding
- Dashboard
- Bills / Add-Edit Bill
- Contracts / Add-Edit Contract
- Documents
- Maintenance
- Repair tracker
- AI Assistant
- Settings

## Routes

```txt
/                         Landing
/login                    Login
/signup                   Signup
/onboarding               Home setup
/app                      Dashboard
/app/bills                Bills
/app/contracts            Contracts
/app/documents            Documents
/app/maintenance          Maintenance
/app/repairs              Repairs
/app/assistant            AI Assistant
/app/settings             Settings
```

## Folder Structure

```txt
src/
  app/
    App.tsx
    routes.tsx
  components/
    ui/
    layout/
    dashboard/
    bills/
    contracts/
    documents/
    maintenance/
    assistant/
  pages/
  lib/
  services/
  types/
  hooks/
  styles/
```

## Core Data Types

User, Home, Bill, Contract, Document, MaintenanceTask, RepairIssue, Contact, Reminder, Insight

### Bill fields
name, provider, category, amount, dueDate, frequency, autoPay, status, notes

### Contract fields
name, type, provider, startDate, endDate, renewalDate, cancellationDeadline, monthlyCost, autoRenews, negotiationPossible, notes

### Maintenance fields
name, category, dueDate, frequency, responsibleParty, status, estimatedCost, notes

### Repair fields
title, description, category, priority, status, dateNoticed, contractorName, estimatedCost, finalCost, notes

## Dashboard Requirements

The dashboard should answer: "What needs my attention right now?"

Show: upcoming bill, upcoming contract renewal, upcoming maintenance task, recent document, suggested action, home health score placeholder.

## Design Direction

Apple simplicity + Notion organization + warm home assistant tone, premium but approachable. Clear cards, soft spacing, simple icons, obvious calls to action. Avoid dense tables unless necessary.

## AI Assistant Guardrails

The AI assistant can summarize and explain user-provided information, but should not claim to provide legal, financial, insurance, or professional advice. Use wording like:

"This is an AI-generated summary and not legal advice. Review the original document or consult a qualified professional before making decisions."

## Working Conventions

- Workflow: Claude (chat) for planning, Claude Code for file edits.
- Test locally (`npm run dev`) before every deploy.
- Deploy by building (`npm run build`) and dragging the `dist` folder into Netlify.
