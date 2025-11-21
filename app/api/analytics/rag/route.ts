// app/api/analytics/rag/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { clickhouseClient } from '@/lib/clickhouse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '7');
    const collection = searchParams.get('collection') || null;

    // Build collection filter
    const collectionFilter = collection ? `AND collection = '${collection}'` : '';

    // 1. Overview metrics
    const overview = await clickhouseClient.query(`
      SELECT 
        count() as total_requests,
        countDistinct(user_id) as unique_users,
        round(avg(total_time_ms)) as avg_response_time,
        quantile(0.95)(total_time_ms) as p95_response_time,
        round(sum(estimated_cost), 2) as total_cost,
        round(avg(estimated_cost), 4) as avg_cost_per_request,
        countIf(error_occurred) as errors,
        round(countIf(error_occurred) / count() * 100, 2) as error_rate,
        round(countIf(answered_from_context) / count() * 100, 1) as answer_rate
      FROM rag_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        ${collectionFilter}
    `);

    // 2. Performance over time
    const performance = await clickhouseClient.query(`
      SELECT 
        toStartOfHour(event_time) as hour,
        count() as requests,
        round(avg(total_time_ms)) as avg_time,
        quantile(0.95)(total_time_ms) as p95_time,
        countIf(error_occurred) as errors
      FROM rag_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        ${collectionFilter}
      GROUP BY hour
      ORDER BY hour ASC
    `);

    // 3. Collection breakdown
    const collections = await clickhouseClient.query(`
      SELECT 
        collection,
        count() as requests,
        round(avg(total_time_ms)) as avg_time,
        round(sum(estimated_cost), 2) as total_cost,
        round(countIf(answered_from_context) / count() * 100, 1) as answer_rate
      FROM rag_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
      GROUP BY collection
      ORDER BY requests DESC
    `);

    // 4. Pipeline timing breakdown
    const pipeline = await clickhouseClient.query(`
      SELECT 
        collection,
        round(avg(embedding_time_ms)) as embedding,
        round(avg(vector_search_time_ms)) as vector_search,
        round(avg(rerank_time_ms)) as rerank,
        round(avg(llm_generation_time_ms)) as llm_generation,
        round(avg(total_time_ms)) as total
      FROM rag_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        AND error_occurred = false
        ${collectionFilter}
      GROUP BY collection
    `);

    // 5. Cost breakdown by day
    const costs = await clickhouseClient.query(`
      SELECT 
        toDate(event_time) as date,
        collection,
        count() as requests,
        round(sum(estimated_cost), 2) as cost
      FROM rag_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
      GROUP BY date, collection
      ORDER BY date DESC
    `);

    // 6. Quality metrics
    const quality = await clickhouseClient.query(`
      SELECT 
        collection,
        round(avg(avg_relevance_score), 3) as avg_relevance,
        round(avg(sources_retrieved), 1) as avg_sources,
        round(countIf(answered_from_context) / count() * 100, 1) as answer_rate
      FROM rag_analytics
      WHERE event_time >= now() - INTERVAL ${days} DAY
        AND error_occurred = false
      GROUP BY collection
    `);

    // 7. Recent errors
    const recentErrors = await clickhouseClient.query(`
      SELECT 
        event_time,
        collection,
        error_type,
        error_message,
        query_text
      FROM rag_analytics
      WHERE error_occurred = true
        AND event_time >= now() - INTERVAL ${days} DAY
        ${collectionFilter}
      ORDER BY event_time DESC
      LIMIT 20
    `);

    return NextResponse.json({
      overview: overview[0] || {},
      performance,
      collections,
      pipeline,
      costs,
      quality,
      recentErrors,
    });
  } catch (error) {
    console.error('RAG analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
