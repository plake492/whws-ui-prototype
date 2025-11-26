// components/analytics/BarChart.tsx

'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: any[];
  xKey: string;
  yKeys: { key: string; name: string; color: string }[];
  title?: string;
  height?: number;
}

export default function BarChart({ data, xKey, yKeys, title, height = 300 }: BarChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yKeys.map((yKey) => (
            <Bar key={yKey.key} dataKey={yKey.key} fill={yKey.color} name={yKey.name} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
