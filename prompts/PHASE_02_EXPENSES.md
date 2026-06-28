# Phase 02: Expenses

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Build the core expense management workflow for tracking small business expenses.

By the end of this phase, a user should be able to record and maintain a real month of business expenses locally, with vendors, categories, payment methods, search, filters, and default tax categories available without receipt attachment or reporting features.

---

# Required Reference Docs

- `FLOW.md`
- `markdown/PRODUCT_VISION.md`
- `markdown/PRODUCT_UX_VISION.md`
- `markdown/ARCHITECTURE.md`
- `markdown/DATA_MODEL.md`
- `markdown/TAX_CATEGORIES.md`
- `markdown/SECURITY_AND_PRIVACY.md`
- `markdown/PHASE_LOG.md`

---

# In Scope

- Create, edit, and soft-delete expenses.
- Search and filter expenses.
- Manage vendors, including inactive/archive behavior.
- Manage categories, including inactive/archive behavior.
- Manage payment methods, including inactive/archive behavior.
- Seed default tax categories from `markdown/TAX_CATEGORIES.md`.
- Validate expense, vendor, category, and payment method input in frontend and Rust backend.
- Display `receipt_count` as part of the expense model, but keep receipt attachment behavior out of scope.

---

# Out Of Scope

- Receipt file attachment.
- Receipt viewing, receipt deletion, and managed receipt file operations.
- Full reporting/export system.
- Bank imports.
- OCR.
- Cloud sync.
- User accounts, authentication, telemetry, analytics, or network-backed features.

---

# Implementation Instructions

- Use the data model as the source of truth for expense-related entities.
- Add a new SQLite migration for expenses, vendors, categories, payment methods, and any supporting indexes.
- Keep migrations idempotent through the existing migration runner.
- Use `deleted_at` for expense deletion. Expenses should not use an `active` flag.
- Use `active` for normal vendor, category, and payment method archive behavior. Keep `deleted_at` available for rare soft-delete cases, matching `DATA_MODEL.md`.
- Seed category defaults in a way that is repeatable and does not overwrite user edits.
- Make category defaults editable by users after they are seeded.
- Preserve historical expenses when a related vendor, category, or payment method is made inactive.
- Keep APIs typed across the Tauri boundary.
- Keep the existing UI -> Tauri command -> service -> repository -> SQLite layering.
- Prefer fast local queries and simple, predictable data flow.
- Avoid implementing receipts, reports, exports, backup/restore, sync, or dashboard analytics in this phase.

---

# UX Requirements

- Expense creation should be quick and keyboard-friendly.
- The primary expense entry path should support adding an expense without navigating through a dense spreadsheet-style screen.
- A user should be able to create a vendor, category, or payment method while staying in the expense workflow when practical.
- Search should cover expense descriptions, business purpose, notes, vendor names, category names, and payment method names.
- Filters should at minimum support date range, category, vendor, payment method, and deductible status.
- Avoid dense spreadsheet-first layouts.
- Make search feel global and fast where possible.
- Keep the interface calm even when many expenses exist.
- Provide clear empty, loading, validation, and error states without exposing raw technical errors in normal UI copy.

---

# Data/Security Requirements

- Validate all user-provided fields before persistence.
- Validate at minimum:
  - expense date is present and parseable
  - amount is positive and stored precisely enough for currency use
  - vendor, category, and payment method references exist and are not soft-deleted
  - required names are not blank
  - text fields are trimmed and length-limited
- Avoid logging amounts, vendors, notes, or tax identifiers.
- Preserve UUID and timestamp fields for future sync compatibility.
- Update `updated_at` on edits and archive/delete operations.
- Exclude soft-deleted expenses from normal list, search, and filter results.
- Exclude inactive or soft-deleted vendors, categories, and payment methods from default pickers while preserving historical display.
- Keep all persistence local. Do not add network calls or third-party services.

---

# Acceptance Criteria

- A user can track real expenses for a month.
- Expense data survives app restart.
- Vendor, category, and payment method selection work.
- Search and filters return expected results.
- Default tax categories are available.
- Users can add, edit, and archive vendors, categories, and payment methods.
- Soft-deleted expenses disappear from normal views without removing related historical data.
- Inactive vendors, categories, and payment methods remain visible on existing expenses but are hidden from default selection lists.
- Invalid expense input is rejected in both the frontend and backend.

---

# Test/Check Requirements

- Test expense creation, editing, soft deletion, and search.
- Test validation failures.
- Test category, vendor, and payment method behavior.
- Test seeded default categories are present and seeding is idempotent.
- Test inactive vendor/category/payment method records are hidden from default pickers but still resolve for historical expenses.
- Test search/filter combinations for common fields.
- Run TypeScript and Rust checks.
- Run production build unless blocked by the environment.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_02_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- Expense data integrity.
- Validation coverage.
- Search/filter behavior.
- Category seeding and customization.
- Vendor and payment method archive behavior.
- Soft-delete behavior for expenses.
- UX friction in the expense workflow.
- Privacy posture, especially absence of sensitive logging, telemetry, analytics, and network behavior.
