import 'dotenv/config';
import { prisma } from '../lib/prisma';

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
      tags: ['Menopause', "Women's Health", 'Wellness', 'Support', 'Lifestyle'],
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
      tags: ['Breast Cancer', 'Cancer Support', 'Recovery', "Women's Health", 'Survivorship'],
    },
  });

  console.log('Created/Updated Breast Cancer community:', breastCancerCommunity);

  // Create Women's Health and Wellness community
  const womensHealthCommunity = await prisma.community.upsert({
    where: { slug: 'womens-health-wellness' },
    update: {},
    create: {
      name: "Women's Health and Wellness",
      slug: 'womens-health-wellness',
      description:
        "A comprehensive community dedicated to all aspects of women's health and wellness. Discuss nutrition, fitness, mental health, reproductive health, and preventive care. Share tips, ask questions, and support each other in living healthier, happier lives.",
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      tags: ["Women's Health", 'Wellness', 'Fitness', 'Nutrition', 'Mental Health', 'Self-Care'],
    },
  });

  console.log("Created/Updated Women's Health and Wellness community:", womensHealthCommunity);

  // Create PCOS community
  const pcosCommunity = await prisma.community.upsert({
    where: { slug: 'pcos-support' },
    update: {},
    create: {
      name: 'PCOS Support & Management',
      slug: 'pcos-support',
      description:
        'A supportive space for women with Polycystic Ovary Syndrome (PCOS). Share experiences, discuss symptoms, treatment options, lifestyle modifications, and fertility concerns. Connect with others who understand the challenges and triumphs of managing PCOS.',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      tags: ['PCOS', 'Hormonal Health', "Women's Health", 'Fertility', 'Lifestyle'],
    },
  });

  console.log('Created/Updated PCOS community:', pcosCommunity);

  // Create Pregnancy & Motherhood community
  const pregnancyCommunity = await prisma.community.upsert({
    where: { slug: 'pregnancy-motherhood' },
    update: {},
    create: {
      name: 'Pregnancy & Motherhood Journey',
      slug: 'pregnancy-motherhood',
      description:
        'A nurturing community for expectant mothers, new moms, and experienced parents. Share pregnancy experiences, parenting tips, postpartum recovery stories, and celebrate the joys and challenges of motherhood. Find support, advice, and friendship.',
      coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800',
      tags: ['Pregnancy', 'Motherhood', 'Parenting', 'Postpartum', 'Family'],
    },
  });

  console.log('Created/Updated Pregnancy & Motherhood community:', pregnancyCommunity);

  // Create Endometriosis community
  const endometriosisCommunity = await prisma.community.upsert({
    where: { slug: 'endometriosis-support' },
    update: {},
    create: {
      name: 'Endometriosis Support Network',
      slug: 'endometriosis-support',
      description:
        'A community for women living with endometriosis. Share pain management strategies, discuss treatment options, find support during difficult times, and connect with others who truly understand. You are not alone in this journey.',
      coverImage: 'https://images.unsplash.com/photo-1576765608866-5b51046452be?w=800',
      tags: ['Endometriosis', 'Chronic Pain', "Women's Health", 'Support', 'Treatment'],
    },
  });

  console.log('Created/Updated Endometriosis community:', endometriosisCommunity);

  // Create Mental Wellness community
  const mentalWellnessCommunity = await prisma.community.upsert({
    where: { slug: 'mental-wellness' },
    update: {},
    create: {
      name: 'Mental Wellness & Self-Care',
      slug: 'mental-wellness',
      description:
        'A safe space focused on mental health, emotional wellbeing, and self-care practices. Discuss anxiety, depression, stress management, therapy experiences, and mindfulness. Share coping strategies and support each other in prioritizing mental health.',
      coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
      tags: ['Mental Health', 'Self-Care', 'Wellness', 'Mindfulness', 'Support'],
    },
  });

  console.log('Created/Updated Mental Wellness community:', mentalWellnessCommunity);

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
