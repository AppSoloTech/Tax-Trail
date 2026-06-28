# Architecture

Version: 0.1

---

# Overview

Tax Trail is a local-first desktop application built using:

- Tauri
- Rust
- React
- TypeScript
- SQLite

Architecture goals:

- Fast startup
- Low memory usage
- Offline operation
- Secure local storage
- Future sync capability

---

# Technology Stack

## Frontend

React
TypeScript
Vite

Responsibilities:

- UI rendering
- User interaction
- Forms
- Reporting views

---

## Backend

Rust

Responsibilities:

- Database access
- File management
- Validation
- Export generation
- Future sync engine

---

## Desktop Shell

Tauri

Responsibilities:

- Native desktop integration
- Secure Rust bridge
- File system access
- Packaging

---

## Database

SQLite

Responsibilities:

- Expense storage
- Category storage
- Vendor storage
- Metadata

---

# Application Layers

UI Layer
↓
Tauri Commands
↓
Service Layer
↓
Repository Layer
↓
SQLite

---

# File Storage

## Database

SQLite file stored in:

Windows:

%APPDATA%/TaxTrail/

Mac:

~/Library/Application Support/TaxTrail/

Linux:

~/.config/taxtrail/

---

## Receipts

Receipt files stored separately from SQLite.

Example:

receipts/
  2026/
    01/
    02/

Benefits:

- Smaller database
- Easier backups
- Better performance

---

# Future Sync Architecture

Future cloud synchronization should use:

Local Database
↔ Sync Engine
↔ Cloud API

Each record should have:

- UUID
- Created timestamp
- Updated timestamp

This enables conflict resolution later.

---

# Backup Strategy

User-initiated backup:

- SQLite database
- Receipt directory

Packaged into:

ZIP archive

Backup should be restorable on any machine.

---

# Deployment

GitHub Repository

↓

GitHub Actions

↓

GitHub Releases

↓

Windows Installer
Mac Package
Linux Package
