// app/dashboard/layout.tsx

'use client';

import { useEffect, useState } from 'react';
import DashboardNav from '@/components/DashboardNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  );
}
