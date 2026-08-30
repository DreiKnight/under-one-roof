# Claude Code Instructions — How to Build This Project

Use this document when starting Claude Code.

## Goal

We are building **Under One Roof**, a responsive web application that helps renters and homeowners manage their home life in one place.

It should track:

- Bills
- Contracts
- Lease/mortgage-related dates
- Maintenance schedules
- Repair issues
- Documents
- Warranties
- Renewal dates
- Negotiation opportunities
- Emergency home information

The long-term vision is an AI-powered home operating system.

## Build Approach

Do not build this as one giant HTML file.

Build a modern, maintainable web app with:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Supabase or Firebase backend

For the first build, use mock data if backend is not configured yet. The UI and app structure should be ready to connect to real data later.

## First Development Milestone

Build the frontend shell and MVP screens:

1. Landing page
2. Auth placeholder pages
3. Onboarding wizard
4. Dashboard
5. Bills page
6. Contracts page
7. Documents page
8. Maintenance page
9. Repair tracker page
10. AI Assistant placeholder page
11. Settings page

## Design Direction

The app should feel:

- Calm
- Trustworthy
- Simple
- Warm
- Organized
- Slightly premium

Avoid clutter. Avoid looking like a tax app or spreadsheet.

Think: Apple simplicity + Notion organization + personal home assistant.

## Important User Experience Principle

The dashboard should answer:

> What needs my attention right now?

Every screen should help the user reduce stress, not add more work.

## Code Quality Rules

- Use TypeScript.
- Use reusable components.
- Keep pages organized.
- Avoid putting all logic in one file.
- Use clear naming.
- Add comments only where useful.
- Build mobile-first.
- Do not hardcode secrets.
- Do not call AI APIs directly from the browser.

## Suggested Folder Structure

Use this structure unless there is a strong reason not to:

```txt
src/
  app/
  components/
  pages/
  lib/
  services/
  types/
  hooks/
  styles/
```

## Initial Feature Details

### Home Dashboard

Show cards for:

- Upcoming bills
- Upcoming contract renewals
- Upcoming maintenance
- Recent documents
- Suggested action
- Home health score placeholder

### Bills

Allow user to view and add bills:

- Name
- Provider
- Amount
- Due date
- Frequency
- Auto-pay
- Category

### Contracts

Allow user to view and add contracts:

- Name
- Type
- Provider
- Start date
- End date
- Renewal date
- Cancellation deadline
- Monthly cost
- Auto-renewal status
- Notes

### Documents

Allow user to upload and categorize documents. If real upload storage is not set up yet, create the UI and store mock entries.

### Maintenance

Show maintenance tasks with due dates and statuses.

Default examples:

- Replace HVAC filter
- Test smoke detectors
- Clean dryer vent
- Review lease renewal
- Renew renter’s insurance

### AI Assistant

Start as a placeholder chat UI.

It should explain that future versions will answer questions from bills, contracts, documents, and maintenance history.

Do not implement real AI calls until backend/serverless function is ready.

## MVP Constraints

Do not build:

- Contractor marketplace
- Payment processing
- Native mobile app
- Full property management portal
- Legal advice engine
- Bank integrations

## Legal/Safety Wording

For contracts and leases, the app should say:

> This is an AI-generated summary and not legal advice. Review the original document or consult a qualified professional before making decisions.

## End Goal of First Claude Code Session

At the end of the first coding session, the project should:

- Run locally
- Have clean navigation
- Have responsive UI
- Have mock data
- Have the core MVP pages
- Be ready to push to GitHub
- Be ready to deploy to Netlify or Vercel
