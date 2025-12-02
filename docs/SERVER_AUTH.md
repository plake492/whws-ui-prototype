# Server-Side Authentication Guide

This guide explains how to detect and use authenticated users on the server side in Next.js.

## Overview

Your app now has comprehensive server-side authentication utilities that allow you to:
- Detect logged-in users in Server Components
- Pass user data to Client Components
- Protect routes and actions that require authentication
- Access user session data in API routes and Server Actions

## Key Files

- `lib/supabase-server.ts` - Server-side Supabase client and auth utilities
- `lib/auth-helpers.ts` - Helper functions and usage examples
- `components/UserProvider.tsx` - Server Component for passing user to children
- `middleware.ts` - Route protection middleware (already exists)

## Usage Examples

### 1. Get User in a Server Component (Page)

```tsx
import { getUser } from '@/lib/supabase-server';

export default async function MyPage() {
  const user = await getUser();

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### 2. Protected Page (Redirect if not authenticated)

```tsx
import { getUser } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
}
```

### 3. Pass User to Client Components

```tsx
// app/my-page/page.tsx (Server Component)
import { getUser } from '@/lib/supabase-server';
import ClientHeader from './ClientHeader';

export default async function MyPage() {
  const user = await getUser();

  return (
    <>
      <ClientHeader user={user} />
      <main>Content here</main>
    </>
  );
}

// app/my-page/ClientHeader.tsx (Client Component)
'use client';

import { User } from '@supabase/supabase-js';

export default function ClientHeader({ user }: { user: User | null }) {
  return (
    <header>
      {user ? (
        <span>Logged in as {user.email}</span>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
}
```

### 4. Using UserProvider Component

```tsx
import { UserProvider } from '@/components/UserProvider';
import MyClientComponent from './MyClientComponent';

export default function MyPage() {
  return (
    <UserProvider>
      {(user) => <MyClientComponent user={user} />}
    </UserProvider>
  );
}
```

### 5. Server Actions (Form submissions, mutations)

```tsx
'use server'

import { requireAuth } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  // This will throw an error if user is not authenticated
  const user = await requireAuth();

  const title = formData.get('title') as string;

  // Create post logic here using user.id
  await db.post.create({
    data: {
      title,
      authorId: user.id,
    },
  });

  revalidatePath('/posts');
}
```

### 6. API Routes (Route Handlers)

```tsx
// app/api/user/route.ts
import { getUser } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
```

### 7. Get Full Session Data

```tsx
import { getSession } from '@/lib/supabase-server';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>User: {session.user.email}</p>
      <p>Access Token: {session.access_token.substring(0, 20)}...</p>
      <p>Expires: {new Date(session.expires_at! * 1000).toLocaleString()}</p>
    </div>
  );
}
```

## Available Functions

### `getUser()`
Returns the current user or `null` if not authenticated. Cached per request.

```tsx
const user = await getUser();
// user.id, user.email, user.user_metadata, etc.
```

### `getSession()`
Returns the full session object or `null`. Cached per request.

```tsx
const session = await getSession();
// session.user, session.access_token, session.expires_at, etc.
```

### `requireAuth()`
Returns the user or throws an error if not authenticated. Use in Server Actions.

```tsx
const user = await requireAuth();
// Guaranteed to have a user or will throw
```

### `createServerSupabaseClient()`
Creates a Supabase client for server-side use. Use for database queries.

```tsx
const supabase = await createServerSupabaseClient();
const { data } = await supabase.from('posts').select('*');
```

## Benefits

1. **Performance**: User data is fetched on the server, reducing client-side requests
2. **Security**: Sensitive operations can verify authentication server-side
3. **SEO**: Pages can render with user-specific content for crawlers
4. **Caching**: React's `cache()` ensures user is fetched once per request
5. **Type Safety**: Full TypeScript support with Supabase types

## Middleware

Your existing middleware (`middleware.ts`) already handles:
- Protecting routes defined in `lib/protectedRoutes`
- Redirecting to login for unauthenticated users
- Managing Supabase session cookies

## Notes

- All functions use React's `cache()` to prevent duplicate fetches per request
- The server client automatically handles cookie management
- Middleware runs before these functions and ensures cookies are up-to-date
- Client-side auth via `AuthContext` still works for client components that need reactive auth state
