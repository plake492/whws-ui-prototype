/**
 * EXAMPLE: Server-Side Authentication Usage
 *
 * This file demonstrates different ways to use server-side authentication
 * in your Next.js app components.
 */

import { getUser } from '@/lib/supabase-server';
import { UserProvider } from '@/components/UserProvider';
import { redirect } from 'next/navigation';

// ============================================
// EXAMPLE 1: Direct Server Component Usage
// ============================================

export async function DirectAuthExample() {
  const user = await getUser();

  return (
    <div>
      <h2>Direct Auth Example</h2>
      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 2: Protected Page (Redirect if not authenticated)
// ============================================

export async function ProtectedPageExample() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome, {user.email}!</p>
      <p>This page is only accessible to authenticated users.</p>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Using UserProvider with render prop
// ============================================

export function UserProviderExample() {
  return (
    <UserProvider>
      {(user) => (
        <div>
          <h2>UserProvider Example</h2>
          {user ? (
            <>
              <p>Email: {user.email}</p>
              <ClientComponent user={user} />
            </>
          ) : (
            <LoginPrompt />
          )}
        </div>
      )}
    </UserProvider>
  );
}

// ============================================
// EXAMPLE 4: Passing user to client components
// ============================================

export async function ParentWithUserProp() {
  const user = await getUser();

  return (
    <div>
      {/* Pass user as prop to client components */}
      <Header user={user} />
      <MainContent user={user} />
      <Footer user={user} />
    </div>
  );
}

// ============================================
// Supporting Client Components
// ============================================

// 'use client';

import { User } from '@supabase/supabase-js';

function ClientComponent({ user }: { user: User | null }) {
  return (
    <div>
      <h3>Client Component</h3>
      <p>Received user: {user?.email || 'No user'}</p>
    </div>
  );
}

function LoginPrompt() {
  return (
    <div>
      <p>Please log in to continue</p>
      <a href="/login">Go to Login</a>
    </div>
  );
}

function Header({ user }: { user: User | null }) {
  return (
    <header>
      <nav>{user ? <span>Welcome, {user.email}</span> : <a href="/login">Login</a>}</nav>
    </header>
  );
}

function MainContent({ user }: { user: User | null }) {
  return (
    <main>
      <p>Main content for {user?.email || 'guest'}</p>
    </main>
  );
}

function Footer({ user }: { user: User | null }) {
  return (
    <footer>
      <p>{user ? 'Authenticated User' : 'Guest'}</p>
    </footer>
  );
}
