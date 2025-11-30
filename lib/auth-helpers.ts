/**
 * Auth Helper Examples and Utilities
 *
 * This file contains examples of how to use server-side authentication
 * in different contexts within your Next.js app.
 */

import { getUser, getSession, requireAuth } from './supabase-server';

/**
 * EXAMPLE 1: Using in a Server Component (Page)
 *
 * import { getUser } from '@/lib/supabase-server';
 *
 * export default async function MyPage() {
 *   const user = await getUser();
 *
 *   return (
 *     <div>
 *       {user ? (
 *         <p>Welcome, {user.email}</p>
 *       ) : (
 *         <p>Please log in</p>
 *       )}
 *     </div>
 *   );
 * }
 */

/**
 * EXAMPLE 2: Using with UserProvider Component
 *
 * import { UserProvider } from '@/components/UserProvider';
 * import ClientComponent from './ClientComponent';
 *
 * export default function MyPage() {
 *   return (
 *     <UserProvider>
 *       {(user) => <ClientComponent user={user} />}
 *     </UserProvider>
 *   );
 * }
 */

/**
 * EXAMPLE 3: Using in a Server Action
 *
 * 'use server'
 *
 * import { requireAuth } from '@/lib/supabase-server';
 *
 * export async function createPost(formData: FormData) {
 *   const user = await requireAuth(); // Throws if not authenticated
 *
 *   const title = formData.get('title');
 *   // ... create post logic
 * }
 */

/**
 * EXAMPLE 4: Using in a Route Handler (API Route)
 *
 * import { getUser } from '@/lib/supabase-server';
 * import { NextResponse } from 'next/server';
 *
 * export async function GET() {
 *   const user = await getUser();
 *
 *   if (!user) {
 *     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 *   }
 *
 *   return NextResponse.json({ user });
 * }
 */

/**
 * EXAMPLE 5: Passing user to multiple child components
 *
 * export default async function DashboardPage() {
 *   const user = await getUser();
 *
 *   if (!user) {
 *     redirect('/login');
 *   }
 *
 *   return (
 *     <>
 *       <Header user={user} />
 *       <Sidebar user={user} />
 *       <MainContent user={user} />
 *     </>
 *   );
 * }
 */

// Export commonly used functions
export { getUser, getSession, requireAuth };
