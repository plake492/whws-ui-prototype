import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';

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

  return user;
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
