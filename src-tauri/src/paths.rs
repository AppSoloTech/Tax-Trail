use std::fs;
use std::path::PathBuf;

use crate::errors::{AppError, AppResult};

#[derive(Clone, Debug)]
pub struct AppPaths {
    pub app_data_dir: PathBuf,
    pub database_path: PathBuf,
    pub receipts_dir: PathBuf,
}

impl AppPaths {
    pub fn prepare() -> AppResult<Self> {
        let app_data_dir = platform_app_data_dir()?;
        let receipts_dir = app_data_dir.join("receipts");
        let database_path = app_data_dir.join("tax-trail.sqlite3");

        create_dir(&app_data_dir)?;
        create_dir(&receipts_dir)?;

        Ok(Self {
            app_data_dir,
            database_path,
            receipts_dir,
        })
    }
}

#[cfg(target_os = "linux")]
fn app_directory_name() -> &'static str {
    "taxtrail"
}

#[cfg(not(target_os = "linux"))]
fn app_directory_name() -> &'static str {
    "TaxTrail"
}

fn platform_app_data_dir() -> AppResult<PathBuf> {
    let config_dir = dirs::config_dir().ok_or(AppError::MissingAppDataDir)?;
    Ok(config_dir.join(app_directory_name()))
}

fn create_dir(path: &PathBuf) -> AppResult<()> {
    fs::create_dir_all(path).map_err(|source| AppError::PrepareDirectory {
        path: path.display().to_string(),
        source,
    })
}
