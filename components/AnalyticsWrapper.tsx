'use client';

import { ReactNode } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AnalyticsWrapper({ children }: { children: ReactNode }) {
  useAnalytics();

  return <>{children}</>;
}
