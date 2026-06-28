# Data Model

Version: 0.1

---

# Common Fields

Most persisted entities should have:

- id (integer primary key)
- uuid
- created_at
- updated_at

Entities that users can remove should also have:

- deleted_at (nullable)

`deleted_at` means soft delete. Soft-deleted records are hidden from normal views but remain available for audit, restore, and future sync conflict handling.

---

# Deletion And Archive Strategy

## Expenses

Expenses use soft delete through `deleted_at`.

Normal delete actions should set `deleted_at` instead of hard-deleting the row. Expenses do not use an `active` flag.

## Vendors

Vendors use `active` for archive/inactive behavior.

Archived vendors should remain attached to historical expenses and should be hidden from default selection lists. Vendors also include `deleted_at` for rare soft-delete cases where the record should be hidden from normal views.

## Categories

Categories use `active` for archive/inactive behavior.

Archived categories should remain attached to historical expenses and should be hidden from default selection lists. Categories also include `deleted_at` for rare soft-delete cases where the record should be hidden from normal views.

## Payment Methods

Payment methods use `active` for archive/inactive behavior.

Archived payment methods should remain attached to historical expenses and should be hidden from default selection lists. Payment methods also include `deleted_at` for rare soft-delete cases where the record should be hidden from normal views.

## Receipts

Receipt records use `deleted_at` when a receipt is removed from an expense.

The managed file deletion behavior should be explicit in the UI when implemented.

## Tax Years

Tax years use `status` instead of `active`.

Examples:

- open
- closed
- archived

## Settings

Settings are a single local configuration record and should not be deleted through normal app workflows.

---

# Expense

Represents a business expense.

Fields:

- id
- uuid
- date
- amount
- vendor_id
- category_id
- payment_method_id
- description
- business_purpose
- deductible
- notes
- receipt_count
- created_at
- updated_at
- deleted_at

---

# Vendor

Fields:

- id
- uuid
- name
- website
- phone
- notes
- active
- created_at
- updated_at
- deleted_at

---

# Category

Fields:

- id
- uuid
- name
- description
- active
- created_at
- updated_at
- deleted_at

Examples:

- Office Supplies
- Software
- Travel
- Meals
- Equipment

---

# Payment Method

Fields:

- id
- uuid
- name
- active
- created_at
- updated_at
- deleted_at

Examples:

- Cash
- Business Checking
- Business Credit Card
- Personal Card

---

# Receipt

Fields:

- id
- uuid
- expense_id
- original_filename
- stored_filename
- file_path
- file_size
- file_hash
- created_at
- updated_at
- deleted_at

---

# Tax Year

Fields:

- id
- uuid
- year
- status
- created_at
- updated_at
- deleted_at

Examples:

2025
2026
2027

---

# Settings

Fields:

- id
- uuid
- company_name
- business_type
- tax_id
- created_at
- updated_at

---

# Audit Log (Future)

Fields:

- id
- entity_type
- entity_id
- action
- created_at

Purpose:

Track important changes.
