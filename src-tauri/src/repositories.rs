use std::path::Path;

use rusqlite::{params, Connection};
use uuid::Uuid;

use crate::errors::AppResult;

const MIGRATIONS: &[(i64, &str)] = &[(1, include_str!("../migrations/0001_app_shell.sql"))];

#[derive(Debug)]
pub struct DatabaseStatus {
    pub applied_migrations: i64,
    pub latest_migration: i64,
}

pub struct DatabaseRepository {
    connection: Connection,
}

impl DatabaseRepository {
    pub fn open(database_path: &Path) -> AppResult<Self> {
        let connection = Connection::open(database_path)?;
        connection.pragma_update(None, "foreign_keys", "ON")?;

        Ok(Self { connection })
    }

    pub fn initialize(&mut self) -> AppResult<DatabaseStatus> {
        self.connection.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS schema_migrations (
              version INTEGER PRIMARY KEY,
              name TEXT NOT NULL,
              applied_at TEXT NOT NULL
            );
            ",
        )?;

        for (version, sql) in MIGRATIONS {
            if !self.is_migration_applied(*version)? {
                let transaction = self.connection.transaction()?;
                transaction.execute_batch(sql)?;
                transaction.execute(
                    "
                    INSERT INTO schema_migrations (version, name, applied_at)
                    VALUES (?1, ?2, datetime('now'))
                    ",
                    params![version, format!("migration_{version}")],
                )?;
                transaction.commit()?;
            }
        }

        self.ensure_settings_record()?;

        Ok(DatabaseStatus {
            applied_migrations: self.applied_migration_count()?,
            latest_migration: latest_migration(),
        })
    }

    fn is_migration_applied(&self, version: i64) -> AppResult<bool> {
        let count: i64 = self.connection.query_row(
            "SELECT COUNT(*) FROM schema_migrations WHERE version = ?1",
            params![version],
            |row| row.get(0),
        )?;

        Ok(count > 0)
    }

    fn applied_migration_count(&self) -> AppResult<i64> {
        let count =
            self.connection
                .query_row("SELECT COUNT(*) FROM schema_migrations", [], |row| {
                    row.get(0)
                })?;

        Ok(count)
    }

    fn ensure_settings_record(&self) -> AppResult<()> {
        let settings_count: i64 =
            self.connection
                .query_row("SELECT COUNT(*) FROM settings", [], |row| row.get(0))?;

        if settings_count == 0 {
            self.connection.execute(
                "
                INSERT INTO settings (
                  uuid,
                  company_name,
                  business_type,
                  tax_id,
                  created_at,
                  updated_at
                )
                VALUES (?1, NULL, NULL, NULL, datetime('now'), datetime('now'))
                ",
                params![Uuid::new_v4().to_string()],
            )?;
        }

        Ok(())
    }
}

fn latest_migration() -> i64 {
    MIGRATIONS
        .last()
        .map(|(version, _)| *version)
        .unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use std::fs;

    use super::DatabaseRepository;

    #[test]
    fn initializes_database_with_migrations_and_settings() {
        let db_path =
            std::env::temp_dir().join(format!("tax-trail-test-{}.sqlite3", uuid::Uuid::new_v4()));

        {
            let mut repository = DatabaseRepository::open(&db_path).unwrap();
            let status = repository.initialize().unwrap();

            assert_eq!(status.latest_migration, 1);
            assert_eq!(status.applied_migrations, 1);

            let settings_count: i64 = repository
                .connection
                .query_row("SELECT COUNT(*) FROM settings", [], |row| row.get(0))
                .unwrap();

            assert_eq!(settings_count, 1);
        }

        fs::remove_file(db_path).unwrap();
    }
}
