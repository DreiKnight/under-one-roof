# Product Requirements Document — Under One Roof MVP

## MVP Objective

Build a responsive web application that allows users to create a home profile, track bills, store contracts/documents, set maintenance reminders, and ask an AI assistant questions about their home information.

The MVP should prove that users value having one organized place for home-related responsibilities.

## Success Criteria

The MVP is successful if users can:

1. Create an account.
2. Create a home profile as renter or owner.
3. Add bills/contracts manually.
4. Upload or attach documents.
5. Create reminders for renewals and maintenance.
6. View upcoming tasks on a dashboard.
7. Ask basic AI-assisted questions about saved home data.
8. Receive useful tips about renewals, negotiations, or maintenance.

## Primary User Types

### Renter

Needs:

- Rent due dates
- Lease renewal reminders
- Security deposit checklist
- Utility tracking
- Renter’s insurance reminders
- Move-in/move-out documentation
- Maintenance request notes

### Homeowner

Needs:

- Mortgage and property cost tracking
- Homeowner’s insurance reminders
- Home maintenance schedule
- Warranty tracking
- Contractor history
- Repair cost tracking
- Emergency information

## Core MVP Features

### 1. Authentication

Users need accounts so their home data is private and persistent.

Requirements:

- Sign up
- Log in
- Log out
- Password reset
- User-specific data access

### 2. Home Profile

Each user should create at least one home.

Fields:

- Home name
- Address or approximate location
- Rent or own
- Home type: apartment, house, condo, townhome, room, other
- Move-in date
- Household notes
- Emergency contacts
- Water shutoff location
- Breaker panel location
- Gas shutoff location if applicable

### 3. Dashboard

The dashboard should answer: What needs my attention right now?

Dashboard modules:

- Upcoming bills
- Upcoming renewals
- Upcoming maintenance
- Recent documents
- Suggested actions
- Home health score placeholder

### 4. Bills Tracker

Users can track recurring bills.

Fields:

- Bill name
- Provider
- Amount
- Due date
- Frequency
- Auto-pay status
- Category
- Notes
- Related document
- Contract end date if applicable

Categories:

- Rent
- Mortgage
- Electric
- Gas
- Water
- Internet
- Phone
- HOA
- Insurance
- Trash
- Security
- Lawn care
- Pest control
- Other

### 5. Contract Vault

Users can save important contracts and track important dates.

Contract types:

- Lease
- Internet
- Insurance
- Home warranty
- Service plan
- Security system
- HOA agreement
- Solar agreement
- Pest control
- Lawn care
- Cleaning service
- Storage unit
- Other

Fields:

- Contract name
- Provider/party
- Start date
- End date
- Renewal date
- Cancellation deadline
- Monthly cost
- Auto-renewal yes/no/unknown
- Notes
- Uploaded document
- AI extracted summary

### 6. Document Vault

Users can upload and categorize documents.

Document categories:

- Lease
- Mortgage
- Insurance
- Warranty
- Receipt
- Invoice
- Manual
- Inspection
- Permit
- HOA
- Photos
- Other

Fields:

- File name
- Category
- Related home
- Related bill/contract/maintenance item
- Uploaded date
- Notes
- Extracted text if available

### 7. Maintenance Calendar

Users can create maintenance reminders.

Default tasks should be suggested based on renter/owner status.

Renter defaults:

- Replace air filter if responsible
- Check smoke detector
- Renew renter’s insurance
- Lease renewal review
- Move-out photo checklist

Homeowner defaults:

- HVAC filter
- HVAC tune-up
- Gutter cleaning
- Smoke detector test
- Dryer vent cleaning
- Water heater flush
- Pest prevention
- Seasonal home prep

Fields:

- Task name
- Category
- Due date
- Frequency
- Responsible person
- Notes
- Related provider
- Related document
- Status

### 8. Repair Tracker

Users can log issues and repair events.

Fields:

- Issue title
- Description
- Status
- Priority
- Date noticed
- Photos
- Contractor/vendor
- Estimate
- Final cost
- Warranty info
- Notes

### 9. AI Assistant

The AI assistant should answer based on saved data first.

Example questions:

- When does my lease end?
- What bills are due this month?
- What contracts are renewing soon?
- Can I negotiate this bill?
- What maintenance is overdue?
- What does this contract appear to say about renewal?

Important guardrail:

The AI should not provide legal, financial, or insurance advice as a final authority. It can summarize, explain, and recommend next steps.

### 10. Tips & Insights

The app should provide helpful tips.

Examples:

- Your internet bill increased. Consider asking for a loyalty discount.
- Your lease renewal is approaching. Review rent increase terms.
- Your renter’s insurance is expiring. Compare coverage before renewing.
- Your HVAC maintenance is overdue. Schedule service before peak season.

## Non-MVP Features

Do not build these in the first version:

- Full contractor marketplace
- Native iOS/Android apps
- Bank account integration
- Smart home device integration
- Automatic email inbox scanning
- Payment processing
- Property manager portal
- Landlord portal
- Real estate agent portal
- Insurance quote marketplace

These are future expansions.
