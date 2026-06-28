# Phase 07: Release Pipeline

Before starting this phase:
1. Read `FLOW.md`.
2. Read this phase prompt completely.
3. Read the required reference docs listed below.

Implementation agent: Codex
Review agent: Claude Code

---

# Goal

Prepare Tax Trail for downloadable desktop releases through GitHub Releases.

---

# Required Reference Docs

- `FLOW.md`
- `markdown/PRODUCT_VISION.md`
- `markdown/ARCHITECTURE.md`
- `markdown/SECURITY_AND_PRIVACY.md`
- `markdown/PHASE_LOG.md`

---

# In Scope

- GitHub Actions release workflow.
- Windows build artifact generation.
- Versioning convention.
- Release notes template.
- Release candidate smoke test checklist.
- Documentation for installer/package expectations.

---

# Out Of Scope

- Cloud deployment.
- Hosted web app.
- Auto-update infrastructure unless explicitly approved.
- Paid code signing unless credentials and process are provided.

---

# Implementation Instructions

- Make the release workflow reproducible.
- Start with Windows artifacts as the primary target.
- Keep macOS and Linux packaging as future or optional unless already feasible.
- Document any manual release steps clearly.

---

# UX Requirements

- A non-technical user should be able to download and install the app from GitHub Releases.
- Release notes should clearly explain user-facing changes and known limitations.

---

# Data/Security Requirements

- Do not include sample financial data in releases.
- Do not expose secrets in workflow files.
- Keep signing credentials out of the repository.

---

# Acceptance Criteria

- A release workflow can produce a Windows executable or installer artifact.
- Release notes template exists.
- Smoke test checklist exists.
- Packaging limitations are documented.

---

# Test/Check Requirements

- Validate workflow syntax where feasible.
- Run local build checks before release workflow work is submitted.
- Confirm generated artifacts are ignored or handled intentionally.

---

# Codex Completion Requirements

- Summarize files changed.
- Report commands/checks run.
- Create `handoffs/PHASE_07_CLAUDE_HANDOFF.md`.
- Update `markdown/PHASE_LOG.md`.

---

# Claude Handoff Requirements

Ask Claude Code to review:

- GitHub Actions correctness.
- Release artifact expectations.
- Secret handling.
- User install path.
- Smoke test coverage.
