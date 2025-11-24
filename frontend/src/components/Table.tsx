import React, { useEffect, useRef } from "react";

interface LogEntry {
  service: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

interface TableProps {
  logs: LogEntry[];
}

const Table: React.FC<TableProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col border border-gray-700">
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-700 text-gray-200 font-bold sticky top-0 shadow-md">
            <tr>
              <th className="p-3 w-1/6 font-mono text-xs uppercase tracking-wider">
                Time
              </th>
              <th className="p-3 w-1/6 font-mono text-xs uppercase tracking-wider">
                Service
              </th>
              <th className="p-3 w-1/12 font-mono text-xs uppercase tracking-wider">
                Level
              </th>
              <th className="p-3 w-7/12 font-mono text-xs uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-300">
            {logs.map((log, i) => (
              <tr
                key={i}
                className="hover:bg-gray-700/50 transition-colors text-sm"
              >
                <td className="p-3 text-gray-500 font-mono text-xs">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>
                <td className="p-3 text-blue-400 font-semibold font-mono text-xs">
                  {log.service}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      log.level === "error"
                        ? "bg-red-900/50 text-red-400"
                        : log.level === "warn"
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-green-900/50 text-green-400"
                    }`}
                  >
                    {log.level.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 text-gray-300 break-all font-mono text-xs">
                  {log.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Table;
