import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';

/**
 * Creates a Supabase client for Server Components
 * This should be used in Server Components, Server Actions, and Route Handlers
 */
export const createServerSupabaseClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
});

/**
 * Gets the current user session on the server
 * Returns null if no session exists
 * Cached per request using React cache
 */
export const getUser = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error getting user:', error);
    return null;
  }

  if (!user) {
    console.error('No supabase user found');
    return null;
  }

  const prismaUser = await prisma.users.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!prismaUser) {
    console.error('No prisma user found');
    return null;
  }

  return prismaUser;
});

/**
 * Gets the current session on the server
 * Returns null if no session exists
 * Cached per request using React cache
 */
export const getSession = cache(async () => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error getting session:', error);
    return null;
  }

  return session;
});

/**
 * Requires authentication - throws error if user is not authenticated
 * Use this in Server Actions or API routes that require auth
 */
export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    throw new Error('Unauthorized - User must be logged in');
  }

  return user;
}

/**
 * Helper for API routes - gets the current user from session
 * Returns the user object or null if not authenticated
 * Use this in API routes instead of creating a new Supabase client
 *
 * @example
 * const user = await getApiUser();
 * if (!user) {
 *   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 * }
 */
export async function getApiUser() {
  return await getUser();
}

/**
 * Helper for API routes that require authentication
 * Returns the user or a 401 NextResponse if not authenticated
 *
 * @example
 * const result = await requireApiAuth();
 * if (result instanceof NextResponse) return result;
 * const user = result;
 */
export async function requireApiAuth() {
  const user = await getUser();

  if (!user) {
    const { NextResponse } = await import('next/server');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return user;
}
