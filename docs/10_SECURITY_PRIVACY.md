# Security & Privacy Notes — Under One Roof

## Why Security Matters

This product may store sensitive information, including:

- Addresses
- Lease documents
- Mortgage information
- Insurance policies
- Utility bills
- Contractor invoices
- Home inventory
- Emergency information
- Personal notes

Trust is the product.

## MVP Security Rules

1. Require user authentication.
2. Users can only access their own data.
3. Use backend security rules or row-level security.
4. Store files securely.
5. Do not expose storage URLs publicly unless protected.
6. Do not store API keys in frontend code.
7. Do not commit `.env` files to GitHub.
8. Use HTTPS hosting.
9. Keep repository private while building.
10. Use fake sample data in demos.

## AI Privacy Rules

If using AI APIs:

- Be transparent about what data may be sent to AI.
- Send only the minimum necessary data.
- Avoid sending full sensitive documents unless the user intentionally requests analysis.
- Consider redaction for account numbers or personal details.
- Store AI summaries separately from original documents.
- Allow users to delete documents and generated summaries.

## Legal/Professional Guardrails

The app can summarize and organize information.

It should not claim to be:

- A lawyer
- A financial advisor
- An insurance agent
- A licensed contractor
- A tax professional

Suggested disclaimer:

> Under One Roof uses AI to help summarize and organize your home information. It is not legal, financial, insurance, tax, or professional repair advice. Always review original documents and consult qualified professionals before making decisions.

## Data Deletion

Users should eventually be able to:

- Delete bills
- Delete contracts
- Delete documents
- Delete homes
- Delete account

## Demo Data Rule

Never use real leases, bills, IDs, insurance policies, or personal addresses in public demos.
