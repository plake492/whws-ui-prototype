// lib/analytics.ts

import { v4 as uuidv4 } from 'uuid';
import { UAParser } from 'ua-parser-js';

interface TrackEventParams {
  eventType: string;
  userId?: string | null;
  sessionId?: string | null;
  pageUrl?: string;
  pageTitle?: string;
  featureName?: string;
  collection?: string | null;
  timeOnPage?: number;
  scrollDepth?: number;
  sponsorId?: string;
  offerId?: string;
  metadata?: Record<string, any>;
}

export class Analytics {
  /**
   * Track a user event (client-side)
   * Sends event to API route which logs to ClickHouse
   */
  static async trackEvent(params: TrackEventParams): Promise<void> {
    try {
      // Get browser info
      const parser = new UAParser();
      const result = parser.getResult();

      // Get session ID from localStorage or create new one
      const sessionId = this.getOrCreateSessionId();

      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: uuidv4(),
          eventType: params.eventType,
          userId: params.userId || null,
          sessionId: sessionId,
          pageUrl: params.pageUrl || window.location.href,
          pageTitle: params.pageTitle || document.title,
          referrer: document.referrer || null,
          featureName: params.featureName || null,
          collection: params.collection || null,
          timeOnPage: params.timeOnPage || null,
          scrollDepth: params.scrollDepth || null,
          sponsorId: params.sponsorId || null,
          offerId: params.offerId || null,
          deviceType: this.getDeviceType(result),
          browser: result.browser.name || null,
          os: result.os.name || null,
          userAgent: navigator.userAgent,
          metadata: params.metadata ? JSON.stringify(params.metadata) : null,
        }),
      });
    } catch (error) {
      // Silently fail - don't break user experience
      console.error('Analytics tracking failed:', error);
    }
  }

  /**
   * Track page view
   */
  static trackPageView(userId?: string | null, collection?: string | null): void {
    this.trackEvent({
      eventType: 'page_view',
      userId,
      collection,
    });
  }

  /**
   * Track chat start
   */
  static trackChatStart(userId: string | undefined, collection: string): void {
    this.trackEvent({
      eventType: 'chat_start',
      userId: userId || null,
      collection,
      featureName: 'chat_interface',
    });
  }

  /**
   * Track chat message sent
   */
  static trackChatMessage(userId: string | undefined, collection: string, messageLength: number): void {
    this.trackEvent({
      eventType: 'chat_message_sent',
      userId,
      collection,
      metadata: { messageLength },
    });
  }

  /**
   * Track topic switch
   */
  static trackTopicSwitch(userId: string | undefined, fromCollection: string, toCollection: string): void {
    this.trackEvent({
      eventType: 'topic_switch',
      userId,
      collection: toCollection,
      featureName: 'topic_switcher',
      metadata: { fromCollection, toCollection },
    });
  }

  /**
   * Track sponsor offer click
   */
  static trackSponsorClick(userId: string | undefined, sponsorId: string, offerId: string): void {
    this.trackEvent({
      eventType: 'sponsor_click',
      userId,
      sponsorId,
      offerId,
      featureName: 'sponsor_offer',
    });
  }

  /**
   * Track QR code scan
   */
  static trackQRScan(userId: string | undefined, sponsorId: string, offerId: string): void {
    this.trackEvent({
      eventType: 'qr_scan',
      userId,
      sponsorId,
      offerId,
      featureName: 'qr_code',
    });
  }

  /**
   * Track source expansion (when user clicks to see full source)
   */
  static trackSourceExpand(userId: string | undefined, collection: string, sourceId: string): void {
    this.trackEvent({
      eventType: 'source_expand',
      userId,
      collection,
      featureName: 'source_viewer',
      metadata: { sourceId },
    });
  }

  /**
   * Track user feedback (thumbs up/down)
   */
  static trackFeedback(
    userId: string | undefined,
    collection: string,
    messageId: string,
    feedbackType: 'positive' | 'negative'
  ): void {
    this.trackEvent({
      eventType: 'feedback',
      userId,
      collection,
      featureName: `feedback_${feedbackType}`,
      metadata: { messageId, feedbackType },
    });
  }

  /**
   * Track newsletter signup
   */
  static trackNewsletterSignup(userId: string | undefined, email: string): void {
    this.trackEvent({
      eventType: 'newsletter_signup',
      userId,
      featureName: 'newsletter',
      metadata: { email },
    });
  }

  /**
   * Track time on page (call on beforeunload or route change)
   */
  static trackTimeOnPage(userId: string | undefined, collection: string | null, seconds: number): void {
    this.trackEvent({
      eventType: 'time_on_page',
      userId,
      collection,
      timeOnPage: seconds,
    });
  }

  /**
   * Track scroll depth (percentage of page scrolled)
   */
  static trackScrollDepth(userId: string | undefined, collection: string | null, depthPercent: number): void {
    this.trackEvent({
      eventType: 'scroll_depth',
      userId,
      collection,
      scrollDepth: depthPercent,
    });
  }

  // Helper methods
  private static getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return '';

    let sessionId = sessionStorage.getItem('whws_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('whws_session_id', sessionId);
    }
    return sessionId;
  }

  private static getDeviceType(parser: UAParser.IResult): string {
    if (parser.device.type === 'mobile') return 'mobile';
    if (parser.device.type === 'tablet') return 'tablet';
    return 'desktop';
  }
}
