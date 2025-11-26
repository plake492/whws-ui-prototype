// components/analytics/LineChart.tsx

'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKeys: { key: string; name: string; color: string }[];
  title?: string;
  height?: number;
}

export default function LineChart({ data, xKey, yKeys, title, height = 300 }: LineChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yKeys.map((yKey) => (
            <Line
              key={yKey.key}
              type="monotone"
              dataKey={yKey.key}
              stroke={yKey.color}
              name={yKey.name}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
