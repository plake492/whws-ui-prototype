import { getUser } from '@/lib/supabase-server';
import { User } from '@supabase/supabase-js';

interface UserProviderProps {
  children: (user: User | null) => React.ReactNode;
}

/**
 * Server Component that fetches the current user and passes it to children
 *
 * Usage:
 * ```tsx
 * <UserProvider>
 *   {(user) => (
 *     user ? <UserProfile user={user} /> : <LoginPrompt />
 *   )}
 * </UserProvider>
 * ```
 */
export async function UserProvider({ children }: UserProviderProps) {
  const user = await getUser();
  return <>{children(user)}</>;
}
