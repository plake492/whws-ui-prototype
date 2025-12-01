'use server';

import { prisma } from '@/lib/prisma';
import { User } from '@/types';

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
