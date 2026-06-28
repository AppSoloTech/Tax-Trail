# Phase 05: Reports And Exports

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Build tax-preparation reports and accountant-friendly exports.

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

- Monthly spending report.
- Category report.
- Tax year summary.
- Receipt coverage report.
- CSV export.
- Excel-compatible export.
- Export destination selection.

---

# Out Of Scope

- Tax filing.
- Legal or tax advice.
- Accountant portal.
- Cloud sharing.
- Direct integration with tax software.

---

# Implementation Instructions

- Generate exports through Rust/backend code.
- Keep report calculations consistent with dashboard summaries where applicable.
- Use clear filenames that include report type and date range.
- Keep reports useful for accountants without overcomplicating the app.

---

# UX Requirements

- Reports should feel visual and readable before showing dense tables.
- Export flows should be explicit about where files are saved.
- Avoid presenting calculations as tax advice.

---

# Data/Security Requirements

- Do not log exported financial contents.
- Let the user choose export destinations.
- Keep exports local.
- Avoid transmitting data over the network.

---

# Acceptance Criteria

- A user can generate tax-year and category summaries.
- A user can export CSV and Excel-compatible files.
- Exported files contain expected expense fields.
- Receipt coverage can be reviewed for tax preparation.

---

# Test/Check Requirements

- Test report calculations.
- Test export file generation.
- Test empty and populated export cases.
- Run TypeScript and Rust checks.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_05_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- Report accuracy.
- Export file structure.
- Accountant usefulness.
- Privacy and logging concerns.
- Edge cases around empty datasets and date ranges.
