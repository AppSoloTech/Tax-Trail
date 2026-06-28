use serde::Serialize;

use crate::errors::AppResult;
use crate::paths::AppPaths;
use crate::repositories::DatabaseRepository;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AppStatus {
    pub app_data_dir: String,
    pub database_path: String,
    pub receipts_dir: String,
    pub database_ready: bool,
    pub receipts_ready: bool,
    pub applied_migrations: i64,
    pub latest_migration: i64,
}

pub fn get_app_status() -> AppResult<AppStatus> {
    let paths = AppPaths::prepare()?;
    let mut repository = DatabaseRepository::open(&paths.database_path)?;
    let database_status = repository.initialize()?;

    Ok(AppStatus {
        database_ready: paths.database_path.exists(),
        receipts_ready: paths.receipts_dir.exists(),
        app_data_dir: paths.app_data_dir.display().to_string(),
        database_path: paths.database_path.display().to_string(),
        receipts_dir: paths.receipts_dir.display().to_string(),
        applied_migrations: database_status.applied_migrations,
        latest_migration: database_status.latest_migration,
    })
}
