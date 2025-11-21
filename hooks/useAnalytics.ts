'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@/lib/analytics';

function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on mount and route change
    Analytics.trackPageView();
  }, [pathname]);
}

export { useAnalytics };
