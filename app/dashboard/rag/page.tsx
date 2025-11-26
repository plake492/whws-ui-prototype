// app/dashboard/rag/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import MetricCard from '@/components/analytics/MetricCard';
import LineChart from '@/components/analytics/LineChart';
import BarChart from '@/components/analytics/BarChart';
import DataTable from '@/components/analytics/DataTable';

export default function RAGDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [collection, setCollection] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [days, collection]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ days: days.toString() });
      if (collection) params.append('collection', collection);

      const response = await fetch(`/api/analytics/rag?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('RAG Analytics data:', result);
      setData(result);
    } catch (error) {
      console.error('Failed to fetch RAG analytics:', error);
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
          <h1 className="text-3xl font-bold text-gray-900">RAG Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor chat performance, costs, and quality metrics</p>
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

          <select
            value={collection || ''}
            onChange={(e) => setCollection(e.target.value || null)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Collections</option>
            <option value="menopause">Menopause</option>
            <option value="pcos">PCOS</option>
            <option value="fertility">Fertility</option>
          </select>

          <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Refresh
          </button>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Requests"
            value={data?.overview?.total_requests?.toLocaleString() || '0'}
            subtitle={`${data?.overview?.unique_users || 0} unique users`}
            icon={<span className="text-4xl">💬</span>}
          />
          <MetricCard
            title="Avg Response Time"
            value={`${data?.overview?.avg_response_time || 0}ms`}
            subtitle={`P95: ${data?.overview?.p95_response_time || 0}ms`}
            icon={<span className="text-4xl">⚡</span>}
          />
          <MetricCard
            title="Total Cost"
            value={`$${data?.overview?.total_cost || '0.00'}`}
            subtitle={`$${data?.overview?.avg_cost_per_request || '0.00'} per request`}
            icon={<span className="text-4xl">💰</span>}
          />
          <MetricCard
            title="Answer Rate"
            value={`${data?.overview?.answer_rate || 0}%`}
            subtitle={`${data?.overview?.errors || 0} errors (${data?.overview?.error_rate || 0}%)`}
            icon={<span className="text-4xl">✅</span>}
          />
        </div>

        {/* Performance Over Time */}
        <div className="mb-8">
          <LineChart
            title="Performance Over Time"
            data={
              data?.performance?.map((p: any) => ({
                time: format(new Date(p.hour), 'MM/dd HH:mm'),
                requests: p.requests,
                avg_time: p.avg_time,
                p95_time: p.p95_time,
              })) || []
            }
            xKey="time"
            yKeys={[
              { key: 'avg_time', name: 'Avg Time (ms)', color: '#8884d8' },
              { key: 'p95_time', name: 'P95 Time (ms)', color: '#ff8042' },
            ]}
            height={350}
          />
        </div>

        {/* Collection Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarChart
            title="Requests by Collection"
            data={data?.collections || []}
            xKey="collection"
            yKeys={[{ key: 'requests', name: 'Requests', color: '#0088FE' }]}
          />

          <BarChart
            title="Cost by Collection"
            data={data?.collections || []}
            xKey="collection"
            yKeys={[{ key: 'total_cost', name: 'Cost ($)', color: '#00C49F' }]}
          />
        </div>

        {/* Pipeline Timing Breakdown */}
        <div className="mb-8">
          <BarChart
            title="Pipeline Timing Breakdown (ms)"
            data={data?.pipeline || []}
            xKey="collection"
            yKeys={[
              { key: 'embedding', name: 'Embedding', color: '#8884d8' },
              { key: 'vector_search', name: 'Vector Search', color: '#82ca9d' },
              { key: 'rerank', name: 'Rerank', color: '#ffc658' },
              { key: 'llm_generation', name: 'LLM Generation', color: '#ff8042' },
            ]}
            height={350}
          />
        </div>

        {/* Quality Metrics */}
        <div className="mb-8">
          <DataTable
            title="RAG Quality Metrics"
            columns={[
              { key: 'collection', label: 'Collection' },
              { key: 'avg_relevance', label: 'Avg Relevance', format: (v) => v?.toFixed(3) || 'N/A' },
              { key: 'avg_sources', label: 'Avg Sources', format: (v) => v?.toFixed(1) || 'N/A' },
              { key: 'answer_rate', label: 'Answer Rate', format: (v) => `${v || 0}%` },
            ]}
            data={data?.quality || []}
          />
        </div>

        {/* Daily Costs */}
        <div className="mb-8">
          <LineChart
            title="Daily Costs"
            data={
              data?.costs?.map((c: any) => ({
                date: format(new Date(c.date), 'MM/dd'),
                cost: c.cost,
                requests: c.requests,
              })) || []
            }
            xKey="date"
            yKeys={[{ key: 'cost', name: 'Cost ($)', color: '#00C49F' }]}
          />
        </div>

        {/* Recent Errors */}
        {data?.recentErrors?.length > 0 && (
          <div className="mb-8">
            <DataTable
              title="Recent Errors"
              columns={[
                { key: 'event_time', label: 'Time', format: (v) => format(new Date(v), 'MM/dd HH:mm:ss') },
                { key: 'collection', label: 'Collection' },
                { key: 'error_type', label: 'Error Type' },
                { key: 'error_message', label: 'Message', format: (v) => v?.substring(0, 50) + '...' || 'N/A' },
              ]}
              data={data?.recentErrors}
              maxRows={20}
            />
          </div>
        )}
      </div>
    </div>
  );
}
