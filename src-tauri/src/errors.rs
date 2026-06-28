use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Could not determine the local app data directory.")]
    MissingAppDataDir,

    #[error("Could not prepare local app directory at {path}: {source}")]
    PrepareDirectory {
        path: String,
        source: std::io::Error,
    },

    #[error("Database error: {0}")]
    Database(#[from] rusqlite::Error),
}

pub type AppResult<T> = Result<T, AppError>;
