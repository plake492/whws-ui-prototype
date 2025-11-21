'use client';

import { useEffect, useRef } from 'react';
import { Analytics } from '@/lib/analytics';

export function useScrollTracking(userId: string | undefined, collection: string | null) {
  const maxScroll = useRef<number>(0);
  const tracked = useRef<Set<number>>(new Set());
  const userIdRef = useRef(userId);
  const collectionRef = useRef(collection);

  useEffect(() => {
    // Update refs when dependencies change
    userIdRef.current = userId;
    collectionRef.current = collection;
  }, [userId, collection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const scrollDepth = Math.floor((scrolled / scrollHeight) * 100);

      if (scrollDepth > maxScroll.current) {
        maxScroll.current = scrollDepth;
      }

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollDepth >= milestone && !tracked.current.has(milestone)) {
          tracked.current.add(milestone);
          // Use refs to get current values without re-creating the listener
          Analytics.trackScrollDepth(userIdRef.current, collectionRef.current, milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty deps - only set up once
}
