import Join from './_render';
import { getUser } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Component({ params }: PageProps) {
  const supabaseUser = await getUser();

  const { slug } = await params;

  if (!supabaseUser) {
    redirect(`/login?redirect=/communities/${slug}/join`);
  }

  const user = await prisma.users.findUnique({
    where: {
      id: supabaseUser.id,
    },
  });

  if (!user) {
    redirect(`/login?redirect=/communities/${slug}/join`);
  }

  return <Join user={user} />;
}
