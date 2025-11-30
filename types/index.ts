import { Prisma } from '@prisma/client';

export type CollectionOptions = 'menopause' | 'breast_cancer';

// export interface Community {
//   id: string;
//   name: string;
//   slug: string;
//   description: string | null;
//   coverImage: string | null;
//   tags: string[];
//   media: string | null;
//   memberCount: number | null;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   members?: number;
//   _count?: {
//     members: number;
//   };
// }

export interface AuthContextType {
  user: import('@supabase/supabase-js').User | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ data: any; error: any }>;
  getUserState: () => { user: import('@supabase/supabase-js').User | null; loading: boolean };
}

export type Community = Prisma.CommunityGetPayload<object>;
export type CommunityExtended<T> = Prisma.CommunityGetPayload<object> & T;
export type CommunityWithUser = Omit<Community, 'memberCount'> & { memberCount: number; hasUser?: boolean };
export type User = Prisma.usersGetPayload<object>;

export interface CommunitiesProps {
  communities: CommunityWithUser[];
}
