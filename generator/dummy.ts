import axios from "axios";

type ServiceName = "auth-service" | "payment-api" | "video-encoder";
type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  service: ServiceName;
  level: LogLevel;
  message: string;
  timestamp: string;
}

const SERVICES: ServiceName[] = [
  "auth-service",
  "payment-api",
  "video-encoder",
];
const LEVELS: LogLevel[] = ["info", "info", "info", "warn", "error"];

function generateLog(): LogEntry {
  const service = SERVICES[
    Math.floor(Math.random() * SERVICES.length)
  ] as ServiceName;
  const level = LEVELS[Math.floor(Math.random() * LEVELS.length)] as LogLevel;

  return {
    service,
    level,
    message: `Process ${Math.floor(Math.random() * 1000)} status update`,
    timestamp: new Date().toISOString(),
  };
}

const sendLog = async () => {
  const log = generateLog();

  try {
    await axios.post("http://localhost:3001/ingest/live", log);
    console.log(`Sent: [${log.level}] ${log.service}`);
  } catch (e) {
    console.error("Cascade Server unreachable");
  }

  // Random delay between 50ms and 500ms
  const delay = Math.floor(Math.random() * 450) + 50;
  setTimeout(sendLog, delay);
};

sendLog();
