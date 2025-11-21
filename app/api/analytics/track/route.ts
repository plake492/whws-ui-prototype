// app/api/analytics/track/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { clickhouseClient } from '@/lib/clickhouse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract IP address from headers (not from request body)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    let ip = forwarded ? forwarded.split(',')[0].trim() : realIp ? realIp.trim() : null;

    // Convert IPv6 localhost to IPv4 localhost for ClickHouse compatibility
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1';
    }

    // Validate IPv4 format (ClickHouse requires IPv4)
    // If not valid IPv4, set to null or convert to 127.0.0.1 for localhost
    if (ip && !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
      // If it's any IPv6 address, just use null or localhost
      ip = '127.0.0.1'; // Default to localhost for development
    }

    // Log to ClickHouse (fire and forget)
    clickhouseClient
      .logUserEvent({
        event_time: new Date(),
        event_id: body.eventId,
        user_id: body.userId || null,
        session_id: body.sessionId || null,
        event_type: body.eventType,
        page_url: body.pageUrl,
        page_title: body.pageTitle || null,
        referrer: body.referrer || null,
        feature_name: body.featureName || null,
        collection: body.collection || null,
        time_on_page_seconds: body.timeOnPage || null,
        scroll_depth_percent: body.scrollDepth || null,
        sponsor_id: body.sponsorId || null,
        offer_id: body.offerId || null,
        device_type: body.deviceType || null,
        browser: body.browser || null,
        os: body.os || null,
        user_agent: body.userAgent || null,
        ip_address: ip,
        metadata: body.metadata || null,
      })
      .catch((err) => {
        console.error('ClickHouse logging failed:', err);
      });

    // Always return success to client (don't block on analytics)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    // Still return success - don't break client
    return NextResponse.json({ success: true });
  }
}
