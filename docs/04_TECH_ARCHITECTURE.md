# Technical Architecture — Under One Roof

## Recommended Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query or similar data fetching library later

### Backend / Database

Recommended beginner-friendly options:

1. Supabase
   - PostgreSQL database
   - Auth
   - Storage for documents
   - Row Level Security
   - Edge functions

2. Firebase
   - Auth
   - Firestore
   - Cloud Storage
   - Cloud Functions

Either works. Supabase may be stronger if you want relational data like users, homes, bills, contracts, documents, reminders, and repairs.

### Hosting

- Vercel or Netlify

### AI Layer

Do not call AI APIs directly from the browser.

Use a backend/serverless function:

Browser → API route/serverless function → AI provider → database/storage as needed

This protects API keys.

## Why Not One Big HTML File?

A single HTML file can work for a prototype, but this product will grow quickly.

This app needs:

- Auth
- Multiple screens
- Reusable components
- Database models
- File uploads
- User-specific data
- AI routes
- Error handling
- Security rules
- Future mobile app path

Use a structured app, not one massive `index.html`.

Important distinction:

A Single Page Application can still have many screens/routes. It uses one HTML shell, but the code is organized into components, pages, services, and modules.

## Suggested Folder Structure

```txt
under-one-roof/
  public/
    favicon.svg
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
      LandingPage.tsx
      LoginPage.tsx
      SignupPage.tsx
      OnboardingPage.tsx
      DashboardPage.tsx
      BillsPage.tsx
      ContractsPage.tsx
      DocumentsPage.tsx
      MaintenancePage.tsx
      AssistantPage.tsx
      SettingsPage.tsx
    lib/
      supabase.ts
      auth.ts
      dates.ts
      currency.ts
      validations.ts
    services/
      billsService.ts
      contractsService.ts
      documentsService.ts
      maintenanceService.ts
      assistantService.ts
    types/
      user.ts
      home.ts
      bill.ts
      contract.ts
      document.ts
      maintenance.ts
      repair.ts
    hooks/
      useAuth.ts
      useHome.ts
      useBills.ts
      useContracts.ts
    styles/
      globals.css
  supabase/
    migrations/
    functions/
  docs/
    PRD.md
    ROADMAP.md
    SECURITY.md
  .env.example
  .gitignore
  CLAUDE.md
  README.md
  package.json
  tsconfig.json
  vite.config.ts
```

## Suggested Routes

```txt
/                         Landing page
/login                    Log in
/signup                   Sign up
/onboarding               Home setup wizard
/app                      Dashboard
/app/bills                Bills list
/app/bills/new            Add bill
/app/contracts            Contracts list
/app/contracts/new        Add contract
/app/documents            Documents vault
/app/maintenance          Maintenance calendar
/app/repairs              Repair tracker
/app/assistant            AI assistant
/app/settings             Settings
```

## Component Principles

- Keep pages thin.
- Put reusable UI in components.
- Put database logic in services.
- Put shared types in `types/`.
- Keep AI prompts in backend/serverless functions when possible.
- Never store API keys in frontend code.

## Data Flow

1. User logs in.
2. App fetches user’s homes.
3. User selects active home.
4. Dashboard fetches bills, contracts, maintenance tasks, documents, and insights for that home.
5. AI assistant uses structured data and document summaries to answer questions.

## Future Mobile Strategy

Do not build native apps immediately.

First:

- Build responsive web app.
- Make it work well on mobile browsers.
- Consider PWA support.

Later:

- React Native app
- Expo app
- Or wrap existing web app if appropriate

## Important Technical Guardrails

- Use TypeScript.
- Use environment variables.
- Keep repo private at first.
- Add `.env` to `.gitignore`.
- Do not upload real leases, bills, or personal documents to demo/test environments.
- Add tests later for critical business logic such as renewal calculations and reminder dates.
