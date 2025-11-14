import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create Menopause community
  const menopauseCommunity = await prisma.community.upsert({
    where: { slug: 'menopause' },
    update: {},
    create: {
      name: 'Menopause Support & Wellness',
      slug: 'menopause',
      description:
        'A supportive community for women navigating menopause. Share experiences, get advice, and connect with others who understand the journey. Discuss symptoms, treatments, lifestyle changes, and find support during this natural transition.',
      coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      tags: ['Menopause', 'Women\'s Health', 'Wellness', 'Support', 'Lifestyle'],
    },
  });

  console.log('Created/Updated Menopause community:', menopauseCommunity);

  // Create Breast Cancer community
  const breastCancerCommunity = await prisma.community.upsert({
    where: { slug: 'breast-cancer' },
    update: {},
    create: {
      name: 'Breast Cancer Support & Recovery',
      slug: 'breast-cancer',
      description:
        'A compassionate community for those affected by breast cancer - survivors, patients, and supporters. Share stories, find hope, discuss treatment options, and connect with others on similar journeys. Together we are stronger.',
      coverImage: 'https://images.unsplash.com/photo-1579154204845-fde8a3e1c1c5?w=800',
      tags: ['Breast Cancer', 'Cancer Support', 'Recovery', 'Women\'s Health', 'Survivorship'],
    },
  });

  console.log('Created/Updated Breast Cancer community:', breastCancerCommunity);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
