// app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MetricCard from '@/components/analytics/MetricCard';

export default function DashboardOverview() {
  const [ragData, setRagData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ragRes, userRes] = await Promise.all([
        fetch('/api/analytics/rag?days=7'),
        fetch('/api/analytics/user?days=7'),
      ]);

      const ragResult = await ragRes.json();
      const userResult = await userRes.json();

      setRagData(ragResult);
      setUserData(userResult);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WHWS Analytics Overview</h1>
          <p className="text-gray-600 mt-2">Last 7 days • Real-time insights from ClickHouse</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/dashboard/rag"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-600"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">🤖 RAG Analytics</h2>
            <p className="text-gray-600">Chat performance, costs, and quality metrics</p>
          </Link>

          <Link
            href="/dashboard/users"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-green-600"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">👥 User Analytics</h2>
            <p className="text-gray-600">User engagement and behavior tracking</p>
          </Link>
        </div>

        {/* RAG Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">RAG Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Requests"
              value={ragData?.overview?.total_requests?.toLocaleString() || '0'}
              icon={<span className="text-4xl">💬</span>}
            />
            <MetricCard
              title="Avg Response Time"
              value={`${ragData?.overview?.avg_response_time || 0}ms`}
              icon={<span className="text-4xl">⚡</span>}
            />
            <MetricCard
              title="Total Cost"
              value={`$${ragData?.overview?.total_cost || '0.00'}`}
              icon={<span className="text-4xl">💰</span>}
            />
            <MetricCard
              title="Answer Rate"
              value={`${ragData?.overview?.answer_rate || 0}%`}
              icon={<span className="text-4xl">✅</span>}
            />
          </div>
        </div>

        {/* User Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Users"
              value={userData?.overview?.total_users?.toLocaleString() || '0'}
              icon={<span className="text-4xl">👥</span>}
            />
            <MetricCard
              title="Page Views"
              value={userData?.overview?.page_views?.toLocaleString() || '0'}
              icon={<span className="text-4xl">📄</span>}
            />
            <MetricCard
              title="Chats Started"
              value={userData?.overview?.chats_started?.toLocaleString() || '0'}
              icon={<span className="text-4xl">💬</span>}
            />
            <MetricCard
              title="Sponsor Clicks"
              value={userData?.overview?.sponsor_clicks?.toLocaleString() || '0'}
              icon={<span className="text-4xl">🎯</span>}
            />
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Health</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Error Rate</span>
              <span
                className={`font-semibold ${(ragData?.overview?.error_rate || 0) < 1 ? 'text-green-600' : 'text-red-600'}`}
              >
                {ragData?.overview?.error_rate || 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">P95 Response Time</span>
              <span className="font-semibold">{ragData?.overview?.p95_response_time || 0}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Events Per Session</span>
              <span className="font-semibold">{userData?.overview?.events_per_session || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
