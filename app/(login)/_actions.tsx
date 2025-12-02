'use server';

import { prisma } from '@/lib/prisma';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { User } from '@/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Upserts a user to the database after Supabase auth
 * Internal helper - called by signUp action
 */
export const upsertUser = async (user: User) => {
  return prisma.users.upsert({
    where: {
      email: user.email,
    },
    create: {
      id: user.id,
      email: user.email,
      name: user.name,
      aiLearningConsent: user.aiLearningConsent || false,
      showInChannelOnly: user.showInChannelOnly || false,
      updatedAt: new Date(),
    },
    update: {
      name: user.name,
      aiLearningConsent: user.aiLearningConsent || false,
      showInChannelOnly: user.showInChannelOnly || false,
      updatedAt: new Date(),
    },
  });
};

/**
 * Server Action: Sign up a new user
 * Creates Supabase auth user and syncs to database
 */
export async function signUp(email: string, password: string, metadata: Record<string, any> = {}) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    console.log('[AUTH] New Signup: ', data);

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      // Sync user to database
      await upsertUser({
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.display_name || null,
        avatarUrl: data.user.user_metadata?.avatarUrl || null,
        aiLearningConsent: data.user.user_metadata?.aiLearningConsent || false,
        showInChannelOnly: data.user.user_metadata?.showInChannelOnly || false,
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(),
      });
    }

    revalidatePath('/');
    return { success: true, data };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: 'An unexpected error occurred during sign up' };
  }
}

/**
 * Server Action: Sign in an existing user
 */
export async function signIn(email: string, password: string) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('[AUTH] User Login: ', data);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    return { success: true, data };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: 'An unexpected error occurred during sign in' };
  }
}

/**
 * Server Action: Sign out the current user
 */
export async function signOut() {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/');
    redirect('/login');
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: 'An unexpected error occurred during sign out' };
  }
}

/**
 * Server Action: Request password reset email
 */
export async function resetPassword(email: string, redirectTo?: string) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: 'An unexpected error occurred during password reset' };
  }
}
