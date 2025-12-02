import { Prisma } from '@prisma/client';

export type CollectionOptions = 'menopause' | 'breast_cancer';

export type Community = Prisma.CommunityGetPayload<object>;
export type CommunityExtended<T> = Prisma.CommunityGetPayload<object> & T;
export type CommunityWithUser = Omit<Community, 'memberCount'> & { memberCount: number; hasUser?: boolean };
export type User = Prisma.usersGetPayload<object>;

export interface UserContextType {
  // user: import('@supabase/supabase-js').User | null;
  user: User | null;
}
export interface CommunitiesProps {
  communities: CommunityWithUser[];
}
