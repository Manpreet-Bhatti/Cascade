export interface LogEntry {
  service: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: Date;
}
