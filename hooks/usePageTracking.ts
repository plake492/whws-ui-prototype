// hooks/usePageTracking.ts

'use client';

import { useEffect, useRef } from 'react';
import { Analytics } from '@/lib/analytics';

export function usePageTracking(userId: string | undefined, collection: string | null) {
  const startTime = useRef<number>(Date.now());
  const lastTrackedRef = useRef<{ userId?: string; collection: string | null }>({
    userId,
    collection
  });

  useEffect(() => {
    // Reset start time when component mounts or dependencies change
    startTime.current = Date.now();
    lastTrackedRef.current = { userId, collection };

    // Track time on page when component unmounts or route changes
    return () => {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      if (timeOnPage > 3) {
        // Only track if > 3 seconds
        // Use the ref values to avoid tracking with stale closure values
        Analytics.trackTimeOnPage(
          lastTrackedRef.current.userId,
          lastTrackedRef.current.collection,
          timeOnPage
        );
      }
    };
  }, [userId, collection]);
}
