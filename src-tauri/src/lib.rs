mod commands;
mod errors;
mod paths;
mod repositories;
mod services;

use commands::get_app_status;

pub fn run() {
    tauri::Builder::default()
        .setup(|_app| Ok(()))
        .invoke_handler(tauri::generate_handler![get_app_status])
        .run(tauri::generate_context!())
        .expect("failed to run Tax Trail");
}
