# Security and Privacy

Version: 0.1

---

# Philosophy

User financial information is sensitive.

The application should collect the minimum amount of data necessary.

---

# Local Storage

All data remains on the user's machine.

No cloud services are required.

---

# Authentication

MVP:

No authentication.

Future:

Optional local passcode.

Future:

OS-backed authentication.

Examples:

- Windows Hello
- macOS Keychain
- Linux Secret Service

---

# Data Encryption

MVP:

No encryption.

Reason:

Local-first simplicity.

Future:

Optional database encryption.

Potential solutions:

- SQLCipher
- Encrypted file vault

---

# Sensitive Data

The application should never store:

- Bank passwords
- Credit card CVV values
- Tax filing credentials

---

# Receipt Security

Receipts should be:

- Stored in managed directories
- Referenced through database records
- Validated before opening

---

# Backups

Backups are user-controlled.

Backup archives should include:

- Database
- Receipts

Future:

Encrypted backups.

---

# Future Cloud Sync

If cloud sync is implemented:

Requirements:

- TLS encryption
- Account authentication
- End-to-end encryption investigation
- User-controlled synchronization

Offline functionality must remain available.

---

# Logging

Never log:

- Receipt contents
- Financial details
- Tax identifiers

Logs should contain only technical diagnostic information.

---

# Third Party Services

MVP should contain no third-party analytics.

No telemetry.

No advertising.

No data collection.

User privacy is a core product value.