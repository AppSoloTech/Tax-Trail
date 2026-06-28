import { invoke } from "@tauri-apps/api/core";

export type AppStatus = {
  appDataDir: string;
  databasePath: string;
  receiptsDir: string;
  databaseReady: boolean;
  receiptsReady: boolean;
  appliedMigrations: number;
  latestMigration: number;
};

export function getAppStatus(): Promise<AppStatus> {
  return invoke<AppStatus>("get_app_status");
}
