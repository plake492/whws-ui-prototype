'use client';

import { createContext, useContext } from 'react';
import { UserContextType } from '@/types';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function UserProvider({ children, user }: { children: React.ReactNode; user: UserContextType['user'] | null }) {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}
