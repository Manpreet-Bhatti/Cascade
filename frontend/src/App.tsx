import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Graph from "./components/Graph";
import Table from "./components/Table";

interface LogEntry {
  service: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

interface Metric {
  time: string;
  count: number;
}

const socket = io("http://localhost:3001");

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    socket.on("new-log", (log: LogEntry) => {
      setLogs((prevLogs) => [...prevLogs, log].slice(0, 50));

      const now = new Date().toLocaleTimeString();

      setMetrics((prevMetrics) => {
        const lastEntry = prevMetrics[prevMetrics.length - 1];

        if (lastEntry && lastEntry.time === now) {
          const updated = [...prevMetrics];
          const lastItem = { ...updated[updated.length - 1] };
          lastItem.count += 1;
          updated[updated.length - 1] = lastItem;
          return updated;
        } else {
          return [...prevMetrics, { time: now, count: 1 }].slice(-20);
        }
      });
    });

    return () => {
      socket.off("new-log");
    };
  }, []);

  return (
    <div className="p-6 bg-gray-900 h-screen text-white font-sans flex flex-col">
      <h1 className="text-2xl mb-4 font-bold border-b border-gray-700 pb-2 flex items-center gap-2 font-mono">
        🌊 Cascade
      </h1>

      <Graph data={metrics} />

      <div className="flex-1 min-h-0">
        <Table logs={logs} />
      </div>
    </div>
  );
};

export default App;
