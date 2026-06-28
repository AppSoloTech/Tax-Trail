use crate::services::{self, AppStatus};

#[tauri::command]
pub fn get_app_status() -> Result<AppStatus, String> {
    services::get_app_status().map_err(|error| error.to_string())
}
