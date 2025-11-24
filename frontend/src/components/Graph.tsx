import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Metric {
  time: string;
  count: number;
}

interface GraphProps {
  data: Metric[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 shadow-lg h-64">
      <h3 className="text-gray-400 mb-2">Live Ingestion Rate (Logs/Sec)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#8b5a2b" />
          <YAxis stroke="#8b5a2b" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#ffb7c5"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
