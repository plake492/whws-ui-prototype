// app/dashboard/users/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import MetricCard from '@/components/analytics/MetricCard';
import LineChart from '@/components/analytics/LineChart';
import PieChart from '@/components/analytics/PieChart';
import DataTable from '@/components/analytics/DataTable';

export default function UserDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics/user?days=${days}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-8">Failed to load analytics</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor user engagement and behavior</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          >
            <option value={1}>Last 24 hours</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>

          <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Refresh
          </button>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={data?.overview?.total_users?.toLocaleString() || '0'}
            subtitle={`${data?.overview?.total_sessions || 0} sessions`}
            icon={<span className="text-4xl">👥</span>}
          />
          <MetricCard
            title="Page Views"
            value={data?.overview?.page_views?.toLocaleString() || '0'}
            subtitle={`${data?.overview?.events_per_session || 0} events/session`}
            icon={<span className="text-4xl">📄</span>}
          />
          <MetricCard
            title="Chats Started"
            value={data?.overview?.chats_started?.toLocaleString() || '0'}
            icon={<span className="text-4xl">💬</span>}
          />
          <MetricCard
            title="Sponsor Clicks"
            value={data?.overview?.sponsor_clicks?.toLocaleString() || '0'}
            subtitle={`${data?.overview?.qr_scans || 0} QR scans`}
            icon={<span className="text-4xl">🎯</span>}
          />
        </div>

        {/* Daily Active Users */}
        <div className="mb-8">
          <LineChart
            title="Daily Active Users"
            data={
              data?.dailyUsers?.map((d: any) => ({
                date: format(new Date(d.date), 'MM/dd'),
                users: d.users,
                sessions: d.sessions,
                chats: d.chats,
              })) || []
            }
            xKey="date"
            yKeys={[
              { key: 'users', name: 'Users', color: '#8884d8' },
              { key: 'sessions', name: 'Sessions', color: '#82ca9d' },
              { key: 'chats', name: 'Chats', color: '#ffc658' },
            ]}
            height={350}
          />
        </div>

        {/* Device and Collection Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PieChart
            title="Users by Device"
            data={data?.devices || []}
            dataKey="users"
            nameKey="device_type"
            colors={['#0088FE', '#00C49F', '#FFBB28']}
          />

          <PieChart
            title="Users by Collection"
            data={data?.collections || []}
            dataKey="users"
            nameKey="collection"
            colors={['#8884d8', '#82ca9d', '#ffc658', '#ff8042']}
          />
        </div>

        {/* Top Pages */}
        <div className="mb-8">
          <DataTable
            title="Top Pages"
            columns={[
              { key: 'page_url', label: 'Page', format: (v) => v?.substring(0, 60) || 'N/A' },
              { key: 'views', label: 'Views', format: (v) => v?.toLocaleString() || '0' },
              { key: 'unique_users', label: 'Unique Users', format: (v) => v?.toLocaleString() || '0' },
              { key: 'avg_time', label: 'Avg Time (s)', format: (v) => v?.toFixed(1) || 'N/A' },
            ]}
            data={data?.topPages || []}
          />
        </div>

        {/* Sponsor Performance */}
        {data?.sponsors && data?.sponsors.length > 0 && (
          <div className="mb-8">
            <DataTable
              title="Sponsor Performance"
              columns={[
                { key: 'sponsor_id', label: 'Sponsor' },
                { key: 'clicks', label: 'Clicks', format: (v) => v?.toLocaleString() || '0' },
                { key: 'qr_scans', label: 'QR Scans', format: (v) => v?.toLocaleString() || '0' },
                { key: 'unique_users', label: 'Unique Users', format: (v) => v?.toLocaleString() || '0' },
                { key: 'conversion_rate', label: 'Conversion', format: (v) => `${v || 0}%` },
              ]}
              data={data?.sponsors}
            />
          </div>
        )}

        {/* Event Funnel */}
        <div className="mb-8">
          <DataTable
            title="User Funnel"
            columns={[
              { key: 'event_type', label: 'Event' },
              { key: 'events', label: 'Total Events', format: (v) => v?.toLocaleString() || '0' },
              { key: 'users', label: 'Unique Users', format: (v) => v?.toLocaleString() || '0' },
            ]}
            data={data?.funnel || []}
          />
        </div>
      </div>
    </div>
  );
}
