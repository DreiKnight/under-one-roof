# GitHub Workflow — Under One Roof

## Should This Project Go on GitHub?

Yes.

Use a **private GitHub repository** at first.

This project will eventually involve sensitive concepts such as bills, leases, contracts, personal documents, and home information. Keep the repo private until the product is mature and you intentionally decide what should be public.

## What Is GitHub?

GitHub is a place to store and manage code using Git.

Think of it like:

- Cloud backup for your code
- Version history for every change
- A collaboration hub
- A project notebook
- A place to track bugs and features
- A launchpad for deployment to Netlify/Vercel

## What Is Git?

Git is version control.

It saves snapshots of your project over time.

Each snapshot is called a commit.

If something breaks, you can look back at what changed.

## Basic Concepts

### Repository / Repo

The project folder stored in GitHub.

Example:

`under-one-roof`

### Commit

A saved snapshot of changes.

Example commit message:

`Add bills dashboard cards`

### Branch

A safe separate line of work.

Example:

`feature/maintenance-calendar`

Branches let you try ideas without breaking the main app.

### Pull Request

A request to merge changes from one branch into another.

Even if you work alone, pull requests help you review changes before adding them to the main branch.

### Main Branch

The stable version of your app.

Do not experiment directly on main once the app grows.

## Recommended Branch Strategy

Keep `main` stable.

Create feature branches:

- `feature/auth`
- `feature/dashboard`
- `feature/bills`
- `feature/contracts`
- `feature/documents`
- `feature/maintenance`
- `feature/assistant`

Merge into `main` when working.

## Recommended First Repo Setup

1. Create private GitHub repo named `under-one-roof`.
2. Clone it locally or initialize Git in the project folder.
3. Add `.gitignore`.
4. Add `README.md`.
5. Add `CLAUDE.md`.
6. Add first commit.
7. Push to GitHub.
8. Connect repo to Vercel or Netlify when ready.

## Important Security Rules

Never commit:

- `.env`
- API keys
- Database passwords
- Real user documents
- Real leases
- Real bills
- Real personal information

Use `.env.example` to show which environment variables are needed without exposing real values.

## Useful Commands

Initialize Git:

```bash
git init
```

Check status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Initial project setup"
```

Connect to GitHub repo:

```bash
git remote add origin https://github.com/YOUR-USERNAME/under-one-roof.git
```

Push first version:

```bash
git branch -M main
git push -u origin main
```

Create a new branch:

```bash
git checkout -b feature/dashboard
```

Push branch:

```bash
git push -u origin feature/dashboard
```

## Simple Solo Developer Workflow

1. Start from main.
2. Create a feature branch.
3. Ask Claude Code to build one feature.
4. Test locally.
5. Commit changes.
6. Push branch.
7. Create pull request.
8. Review changes.
9. Merge to main.
10. Deploy.

## Why This Matters

Without GitHub, your project becomes fragile.

With GitHub:

- You can recover from mistakes.
- You can see how the project changed.
- You can work with Claude Code more safely.
- You can collaborate with developers later.
- You can deploy more professionally.
- You can show progress to future partners or investors.
