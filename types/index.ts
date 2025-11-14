export type CollectionOptions = 'menopause' | 'breast_cancer';

export interface AuthContextType {
  user: import('@supabase/supabase-js').User | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
}
