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

- Create, edit, delete, or archive expenses.
- Search and filter expenses.
- Manage vendors.
- Manage categories.
- Manage payment methods.
- Seed default tax categories.
- Validate expense input in frontend and Rust backend.

---

# Out Of Scope

- Receipt file attachment.
- Full reporting/export system.
- Bank imports.
- OCR.
- Cloud sync.

---

# Implementation Instructions

- Use the data model as the source of truth for expense-related entities.
- Keep user-customizable records archivable or inactive where appropriate.
- Make category defaults editable by users.
- Keep APIs typed across the Tauri boundary.
- Prefer fast local queries and simple, predictable data flow.

---

# UX Requirements

- Expense creation should be quick and keyboard-friendly.
- Avoid dense spreadsheet-first layouts.
- Make search feel global and fast where possible.
- Keep the interface calm even when many expenses exist.

---

# Data/Security Requirements

- Validate all user-provided fields before persistence.
- Avoid logging amounts, vendors, notes, or tax identifiers.
- Preserve UUID and timestamp fields for future sync compatibility.

---

# Acceptance Criteria

- A user can track real expenses for a month.
- Expense data survives app restart.
- Vendor, category, and payment method selection work.
- Search and filters return expected results.
- Default tax categories are available.

---

# Test/Check Requirements

- Test expense creation, editing, deletion/archive, and search.
- Test validation failures.
- Test category and vendor behavior.
- Run TypeScript and Rust checks.

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
- UX friction in the expense workflow.
