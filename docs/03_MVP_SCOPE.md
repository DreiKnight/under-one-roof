# MVP Scope — Build Small, Build Real

## MVP Philosophy

The first version should not try to manage every possible home situation.

The first version should prove this:

> People want one trusted place to store, track, and understand everything related to their home.

## Build First

### 1. Account System

- User signup/login
- Private user data

### 2. Home Setup Wizard

Questions:

- Do you rent or own?
- What type of home is this?
- When did you move in?
- What are your main concerns?
  - Bills
  - Maintenance
  - Lease/contracts
  - Documents
  - Repairs
  - Moving

### 3. Dashboard

Show:

- Next bill due
- Next contract renewal
- Next maintenance task
- Suggested action
- Recently added document

### 4. Bills

Manual bill entry at first.

Fields:

- Name
- Provider
- Amount
- Due date
- Frequency
- Auto-pay
- Notes

### 5. Contracts

Manual contract entry plus file upload.

Fields:

- Contract type
- Provider
- Start date
- End date
- Renewal/cancellation dates
- Cost
- Notes
- Upload file

### 6. Maintenance Tasks

Basic recurring tasks with reminders.

Default task suggestions should be different for renters and homeowners.

### 7. Documents

Basic file upload and categorization.

### 8. AI Assistant Lite

Start simple.

AI can answer questions from structured app data.

Later, AI can deeply read PDFs and extract clauses.

## Avoid in MVP

Avoid these traps:

- Too many roles
- Too many settings
- Too much automation before the basic workflow works
- Native app too early
- Marketplace too early
- Complex AI before useful manual tools exist
- Over-designing before users test it

## MVP Screens

1. Landing page
2. Auth screens
3. Onboarding/home setup
4. Dashboard
5. Bills
6. Add/edit bill
7. Contracts
8. Add/edit contract
9. Documents
10. Maintenance
11. Add/edit maintenance task
12. AI Assistant
13. Settings

## MVP Data Objects

- User
- Home
- Bill
- Contract
- Document
- MaintenanceTask
- RepairIssue
- Reminder
- Insight

## MVP Differentiator

The app should not feel like a spreadsheet.

The dashboard and assistant should constantly answer:

- What is due?
- What changed?
- What should I do next?
- What can I save money on?
- What should I not forget?
