// app/api/analytics/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { clickhouseClient } from '@/lib/clickhouse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '7');

    // 1. Overview metrics
    const overview = await clickhouseClient.query(`
      SELECT 
        countDistinct(user_id) as total_users,
        countDistinct(session_id) as total_sessions,
        count() as total_events,
        round(count() / countDistinct(session_id), 1) as events_per_session,
        countIf(event_type = 'page_view') as page_views,
        countIf(event_type = 'chat_start') as chats_started,
        countIf(event_type = 'sponsor_click') as sponsor_clicks,
        countIf(event_type = 'qr_scan') as qr_scans
      FROM user_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
    `);

    // 2. Daily active users
    const dailyUsers = await clickhouseClient.query(`
      SELECT 
        toDate(event_time) as date,
        countDistinct(user_id) as users,
        countDistinct(session_id) as sessions,
        countIf(event_type = 'chat_start') as chats
      FROM user_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
      GROUP BY date
      ORDER BY date ASC
    `);

    // 3. Top pages
    const topPages = await clickhouseClient.query(`
      SELECT 
        page_url,
        count() as views,
        countDistinct(user_id) as unique_users,
        round(avg(time_on_page_seconds), 1) as avg_time
      FROM user_analytics
      WHERE event_type = 'page_view'
        AND event_time >= now() - INTERVAL ${days} DAY
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 10
    `);

    // 4. Collection popularity
    const collections = await clickhouseClient.query(`
      SELECT 
        collection,
        countDistinct(user_id) as users,
        countIf(event_type = 'chat_start') as chats,
        countIf(event_type = 'chat_message_sent') as messages
      FROM user_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        AND collection IS NOT NULL
      GROUP BY collection
      ORDER BY users DESC
    `);

    // 5. Device breakdown
    const devices = await clickhouseClient.query(`
      SELECT 
        device_type,
        count() as events,
        countDistinct(user_id) as users,
        countDistinct(session_id) as sessions
      FROM user_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        AND device_type IS NOT NULL
      GROUP BY device_type
      ORDER BY users DESC
    `);

    // 6. Sponsor performance
    const sponsors = await clickhouseClient.query(`
      SELECT 
        sponsor_id,
        countIf(event_type = 'sponsor_click') as clicks,
        countIf(event_type = 'qr_scan') as qr_scans,
        countDistinct(user_id) as unique_users,
        round(countIf(event_type = 'qr_scan') / countIf(event_type = 'sponsor_click') * 100, 1) as conversion_rate
      FROM user_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        AND sponsor_id IS NOT NULL
      GROUP BY sponsor_id
      ORDER BY clicks DESC
    `);

    // 7. Event funnel
    const funnel = await clickhouseClient.query(`
      SELECT 
        event_type,
        count() as events,
        countDistinct(user_id) as users
      FROM user_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        AND event_type IN ('page_view', 'chat_start', 'chat_message_sent', 'sponsor_click', 'feedback')
      GROUP BY event_type
      ORDER BY users DESC
    `);

    return NextResponse.json({
      overview: overview[0] || {},
      dailyUsers,
      topPages,
      collections,
      devices,
      sponsors,
      funnel,
    });
  } catch (error) {
    console.error('User analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
