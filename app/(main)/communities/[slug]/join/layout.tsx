import React from 'react';
import { getUser } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

const layout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) => {
  const user = await getUser();

  if (!user) {
    redirect(`/login?redirect=/communities/${(await params).slug}/join`);
  }

  return children;
};

export default layout;
