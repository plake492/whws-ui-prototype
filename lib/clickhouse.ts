// lib/clickhouse.ts

import { createClient, ClickHouseClient as ClickHouseClientType } from '@clickhouse/client';

interface UserAnalyticsEvent {
  event_time: Date;
  event_id: string;
  user_id: string | null;
  session_id: string | null;
  event_type: string;
  page_url: string;
  page_title: string | null;
  referrer: string | null;
  feature_name: string | null;
  collection: string | null;
  time_on_page_seconds: number | null;
  scroll_depth_percent: number | null;
  sponsor_id: string | null;
  offer_id: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  user_agent: string | null;
  ip_address: string | null;
  metadata: string | null;
}

class ClickHouseClient {
  private client: ClickHouseClientType | null = null;
  private isConnected: boolean = false;

  constructor() {
    // Only initialize on server-side
    if (typeof window === 'undefined') {
      this.initClient();
    }
  }

  private async initClient() {
    try {
      this.client = createClient({
        host: process.env.CLICKHOUSE_HOST!,
        username: process.env.CLICKHOUSE_USER || 'default',
        password: process.env.CLICKHOUSE_PASSWORD!,
        database: process.env.CLICKHOUSE_DATABASE || 'whws_rag',
        request_timeout: 30000,
      });

      // Test connection
      await this.client.ping();
      console.log('✅ ClickHouse connected (Next.js)');
      this.isConnected = true;
    } catch (error) {
      console.error('❌ ClickHouse connection failed:', error);
      console.warn('⚠️  Continuing without user analytics');
      this.isConnected = false;
    }
  }

  async logUserEvent(event: UserAnalyticsEvent): Promise<void> {
    if (!this.isConnected || !this.client) {
      return;
    }

    try {
      await this.client.insert({
        table: 'user_analytics',
        values: [event],
        format: 'JSONEachRow',
      });
    } catch (error) {
      console.error('Failed to log user event to ClickHouse:', error);
    }
  }

  async query<T = any>(sql: string): Promise<T[]> {
    if (!this.isConnected || !this.client) {
      throw new Error('ClickHouse not connected');
    }

    const resultSet = await this.client.query({
      query: sql,
      format: 'JSONEachRow',
    });
    return (await resultSet.json()) as T[];
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.isConnected = false;
      this.client = null;
    }
  }
}

// Export singleton instance
export const clickhouseClient = new ClickHouseClient();
