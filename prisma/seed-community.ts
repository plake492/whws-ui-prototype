import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Realistic names for breast cancer community
const FIRST_NAMES = [
  // African American / African
  'Aaliyah',
  'Aisha',
  'Amara',
  'Nia',
  'Zuri',
  'Imani',
  'Keisha',
  'Latoya',
  'Shaniqua',
  'Tamika',
  'Yara',
  'Zola',
  'Nala',
  'Amina',

  // Asian (East Asian)
  'Mei',
  'Li',
  'Yuki',
  'Akiko',
  'Hana',
  'Min-ji',
  'Soo-jin',
  'Jia',
  'Xiu',
  'Wei',
  'Aiko',
  'Keiko',
  'Hiromi',
  'Chen',

  // South Asian
  'Priya',
  'Anjali',
  'Kavita',
  'Deepa',
  'Lakshmi',
  'Pooja',
  'Meera',
  'Nisha',
  'Rani',
  'Sita',
  'Fatima',
  'Zainab',
  'Ayesha',

  // Hispanic / Latina
  'Maria',
  'Carmen',
  'Rosa',
  'Sofia',
  'Isabella',
  'Valentina',
  'Gabriela',
  'Camila',
  'Lucia',
  'Elena',
  'Adriana',
  'Mariana',
  'Catalina',
  'Beatriz',
  'Esperanza',
  'Luz',
  'Dolores',
  'Marisol',

  // Middle Eastern / Arab
  'Layla',
  'Noor',
  'Yasmin',
  'Amira',
  'Salma',
  'Rania',
  'Dalia',
  'Hala',
  'Lina',
  'Mona',
  'Nadine',
  'Samira',
  'Soraya',

  // Indigenous / Native American
  'Aiyana',
  'Kiona',
  'Tallulah',
  'Winona',
  'Ayita',
  'Chenoa',

  // White / European (diverse backgrounds)
  'Sarah',
  'Emma',
  'Jennifer',
  'Michelle',
  'Rebecca',
  'Katherine',
  'Anna',
  'Natalia',
  'Anastasia',
  'Petra',
  'Ingrid',
  'Astrid',
];

const LAST_NAMES = [
  // African American / African
  'Washington',
  'Jefferson',
  'Jackson',
  'Williams',
  'Robinson',
  'Johnson',
  'Brown',
  'Davis',
  'Thompson',
  'Harris',
  'Okafor',
  'Adeyemi',
  'Mensah',
  'Kamara',
  'Diallo',
  'Nkrumah',
  'Mwangi',

  // Asian (East Asian)
  'Chen',
  'Wang',
  'Li',
  'Zhang',
  'Liu',
  'Huang',
  'Wu',
  'Zhou',
  'Tanaka',
  'Suzuki',
  'Takahashi',
  'Yamamoto',
  'Sato',
  'Watanabe',
  'Kim',
  'Lee',
  'Park',
  'Choi',
  'Jung',
  'Kang',

  // South Asian
  'Patel',
  'Kumar',
  'Singh',
  'Shah',
  'Gupta',
  'Sharma',
  'Reddy',
  'Mehta',
  'Kapoor',
  'Desai',
  'Khan',
  'Ahmed',
  'Ali',
  'Rahman',

  // Hispanic / Latina
  'Garcia',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Perez',
  'Sanchez',
  'Ramirez',
  'Torres',
  'Flores',
  'Rivera',
  'Cruz',
  'Morales',
  'Reyes',
  'Gutierrez',
  'Ortiz',
  'Mendoza',

  // Middle Eastern / Arab
  'Hassan',
  'Hussein',
  'Mahmoud',
  'Khalil',
  'Mansour',
  'Said',
  'Farah',
  'Jabr',
  'Khoury',
  'Nasser',
  'Rashid',

  // Indigenous / Native American
  'Begay',
  'Tsosie',
  'Yazzie',
  'Benally',
  'Yellowhorse',

  // White / European (diverse backgrounds)
  'Smith',
  'Anderson',
  "O'Brien",
  'Murphy',
  'Sullivan',
  'Cohen',
  'Goldstein',
  'Rosenberg',
  'Novak',
  'Kowalski',
  'Petrov',
  'Nielsen',
];

// Avatar colors for consistent dummy avatars
const AVATAR_COLORS = [
  '#E91E63', // Pink
  '#9C27B0', // Purple
  '#673AB7', // Deep Purple
  '#3F51B5', // Indigo
  '#2196F3', // Blue
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#4CAF50', // Green
  '#FFC107', // Amber
  '#FF9800', // Orange
  '#FF5722', // Deep Orange
  '#795548', // Brown
  '#607D8B', // Blue Grey
  '#F06292', // Light Pink
  '#BA68C8', // Light Purple
];

// Generate consistent avatar URL based on name
function generateAvatar(name: string, index: number): string {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length].replace('#', '');
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${color}&color=fff&size=200`;
}

// Generate realistic user
function generateUser(index: number): any {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const name = `${firstName} ${lastName}`;

  // 70% consent to AI learning, 20% channel-only visibility
  const aiLearningConsent = Math.random() > 0.3;
  const showInChannelOnly = Math.random() > 0.8;

  return {
    id: faker.string.uuid(), // Fake UUID, not real Supabase user
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`,
    name: name,
    avatarUrl: generateAvatar(name, index),
    aiLearningConsent,
    showInChannelOnly,
    createdAt: faker.date.between({
      from: '2024-01-01',
      to: '2025-01-01',
    }),
  };
}

// Comment templates for breast cancer support community
const COMMENT_TEMPLATES = {
  supportive: [
    "Sending you so much love and strength. You've got this! 💕",
    'Thank you for sharing this. Your courage is inspiring.',
    "I'm thinking of you during this difficult time. You're not alone.",
    'This really resonates with me. Thank you for being so open.',
    'Your story gives me hope. Thank you for sharing.',
    'Sending healing thoughts your way. Stay strong! 💪',
    "I'm so glad you found this community. We're here for you.",
    'Your positivity is amazing. Thank you for lifting us up!',
    'This is exactly what I needed to hear today. Thank you.',
    'You are so brave for sharing this. Sending love. ❤️',
  ],

  experienceSharing: [
    "I went through something similar last year. Here's what helped me...",
    'My oncologist recommended [treatment] and it made a huge difference.',
    'I found that [coping strategy] really helped with the side effects.',
    'In my experience, talking to a therapist was incredibly valuable.',
    'I struggled with this too. What helped me was connecting with others who understood.',
    "My doctor suggested [approach] and I'm so glad I tried it.",
    'I felt the same way during my treatment. It does get easier.',
    'For me, [support group/resource] was a game-changer.',
    "I remember feeling exactly like this. Here's what I wish I'd known...",
    "This phase was really hard for me too. You're doing amazing.",
  ],

  questions: [
    'Did your doctor mention anything about [topic]?',
    "How are you managing the [symptom]? I'm struggling with that too.",
    "Have you tried [treatment/approach]? I'm curious about it.",
    'What questions did you ask your oncologist about this?',
    "Is there a support group you'd recommend?",
    'How did you decide between [option A] and [option B]?',
    'Did you experience [side effect] with that treatment?',
    'What resources have you found most helpful?',
    'How are you talking to your family about this?',
    'Did your insurance cover [treatment]?',
  ],

  gratitude: [
    "Thank you for creating this post. I've been wondering about this too.",
    'I really appreciate you sharing your experience.',
    'This is so helpful. Thank you for taking the time to write this.',
    "Thank you for being so honest. It helps to know I'm not alone.",
    "I'm grateful for this community and people like you.",
    'Thank you for the resource recommendations. Checking them out now!',
    'This perspective is so valuable. Thank you.',
    'I appreciate your vulnerability in sharing this.',
    "Thank you for the reminder that we're all in this together.",
    'Your words mean more than you know. Thank you.',
  ],

  encouragement: [
    "You're doing everything right. Be kind to yourself. 🌸",
    "One day at a time. You're stronger than you think.",
    "It's okay to have hard days. You're still amazing.",
    'Remember to celebrate small victories. They matter!',
    "You're allowed to feel however you feel. No judgment here.",
    'Take care of yourself. You deserve gentleness.',
    "Progress isn't always linear. You're doing great.",
    'Your feelings are valid. We see you and support you.',
    "Rest when you need to. Healing isn't a race.",
    "You're not just surviving, you're showing incredible resilience.",
  ],
};

// Reply templates (shorter, more conversational)
const REPLY_TEMPLATES = [
  'Thank you! This means a lot. 💕',
  'I really appreciate your support.',
  "That's such good advice. Thank you!",
  "I'll definitely try that. Thanks!",
  'Yes! Exactly this. Thank you for understanding.',
  "I'll ask my doctor about this. Great suggestion!",
  'Thank you for sharing your experience.',
  'This is so helpful! 🙏',
  'Sending love right back to you! ❤️',
  "I'm so glad I'm not alone in feeling this way.",
  'Thank you, I needed to hear this today.',
  'This community is amazing. Thank you all!',
  "Great question! I'm wondering the same thing.",
  "You're absolutely right. Thank you!",
  "I hadn't thought of it that way. Thanks!",
  "That's a really good point.",
  'Thank you for the encouragement! 💪',
  'This gives me hope. Thank you.',
  "I'm going to try this approach!",
  'Appreciate you! 🌟',
];

async function seedCommunityData() {
  console.log('🌱 Starting community seed...\n');

  // STEP 1: Create 50 Dummy Users
  console.log('👥 Creating 50 dummy users...');
  const users = [];

  for (let i = 0; i < 50; i++) {
    const userData = generateUser(i);
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });
    users.push(user);

    if ((i + 1) % 10 === 0) {
      console.log(`   ✓ Created ${i + 1}/50 users`);
    }
  }
  console.log(`✅ Created ${users.length} users\n`);

  // STEP 2: Get Existing Communities
  console.log('🏘️  Fetching existing communities...');
  const communities = await prisma.community.findMany({
    take: 5, // Use up to 5 communities
  });

  if (communities.length === 0) {
    console.error('❌ No communities found. Create communities first!');
    return;
  }
  console.log(`✅ Found ${communities.length} communities\n`);

  // STEP 3: Create Posts (if needed)
  console.log('📝 Creating posts...');
  const postsPerCommunity = 10;
  const posts = [];

  for (const community of communities) {
    for (let i = 0; i < postsPerCommunity; i++) {
      const author = users[Math.floor(Math.random() * users.length)];
      const createdAt = faker.date.between({
        from: '2024-06-01',
        to: '2025-11-15',
      });

      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          communityId: community.id,
          authorId: author.id,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
      });
      posts.push(post);
    }
    console.log(`   ✓ Created ${postsPerCommunity} posts for ${community.name}`);
  }
  console.log(`✅ Created ${posts.length} posts\n`);

  // STEP 4: Create Top-Level Comments
  console.log('💬 Creating top-level comments...');
  const comments = [];

  for (const post of posts) {
    const numComments = faker.number.int({ min: 3, max: 8 });

    for (let i = 0; i < numComments; i++) {
      const author = users[Math.floor(Math.random() * users.length)];

      // Pick random comment type
      const types = Object.keys(COMMENT_TEMPLATES);
      const type = types[Math.floor(Math.random() * types.length)] as keyof typeof COMMENT_TEMPLATES;
      const templates = COMMENT_TEMPLATES[type];
      const content = templates[Math.floor(Math.random() * templates.length)];

      // Comments created after post
      const createdAt = faker.date.between({
        from: post.createdAt,
        to: new Date(),
      });

      const comment = await prisma.comment.create({
        data: {
          content,
          postId: post.id,
          authorId: author.id,
          parentId: null, // Top-level
          createdAt,
          updatedAt: createdAt,
        },
      });
      comments.push(comment);
    }
  }
  console.log(`✅ Created ${comments.length} top-level comments\n`);

  // STEP 5: Create Nested Replies (1 level deep)
  console.log('↩️  Creating nested replies...');
  let replyCount = 0;

  // 60% of comments get 1-3 replies
  for (const comment of comments) {
    if (Math.random() > 0.4) {
      const numReplies = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < numReplies; i++) {
        const author = users[Math.floor(Math.random() * users.length)];
        const content = REPLY_TEMPLATES[Math.floor(Math.random() * REPLY_TEMPLATES.length)];

        // Replies created after parent comment
        const createdAt = faker.date.between({
          from: comment.createdAt,
          to: new Date(),
        });

        await prisma.comment.create({
          data: {
            content,
            postId: comment.postId,
            authorId: author.id,
            parentId: comment.id, // Nested under parent
            createdAt,
            updatedAt: createdAt,
          },
        });
        replyCount++;
      }
    }
  }
  console.log(`✅ Created ${replyCount} nested replies\n`);

  // STEP 6: Create Hearts (Reactions)
  console.log('❤️  Adding heart reactions...');
  let heartCount = 0;

  // Get all comments (including replies)
  const allComments = await prisma.comment.findMany();

  for (const comment of allComments) {
    // Random number of hearts per comment (0-8)
    const numHearts = faker.number.int({ min: 0, max: 8 });

    // Pick random unique users to heart this comment
    const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
    const heartersToUse = Math.min(numHearts, shuffledUsers.length);

    for (let i = 0; i < heartersToUse; i++) {
      try {
        await prisma.commentHeart.create({
          data: {
            commentId: comment.id,
            userId: shuffledUsers[i].id,
            createdAt: faker.date.between({
              from: comment.createdAt,
              to: new Date(),
            }),
          },
        });
        heartCount++;
      } catch (error) {
        // Skip if duplicate (shouldn't happen but just in case)
      }
    }
  }
  console.log(`✅ Created ${heartCount} heart reactions\n`);

  // STEP 7: Update Denormalized Counts
  console.log('🔢 Updating denormalized counts...');

  // Update comment heart counts
  for (const comment of allComments) {
    const heartCount = await prisma.commentHeart.count({
      where: { commentId: comment.id },
    });

    await prisma.comment.update({
      where: { id: comment.id },
      data: { heartCount },
    });
  }

  // Update post comment counts
  for (const post of posts) {
    const commentCount = await prisma.comment.count({
      where: { postId: post.id },
    });

    await prisma.post.update({
      where: { id: post.id },
      data: { commentCount },
    });
  }
  console.log(`✅ Updated all counts\n`);

  // STEP 8: Summary
  console.log('📊 SEED SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`👥 Users: ${users.length}`);
  console.log(`   ├─ AI Consent: ${users.filter((u) => u.aiLearningConsent).length}`);
  console.log(`   └─ Channel Only: ${users.filter((u) => u.showInChannelOnly).length}`);
  console.log(`🏘️  Communities: ${communities.length}`);
  console.log(`📝 Posts: ${posts.length}`);
  console.log(`💬 Comments: ${allComments.length}`);
  console.log(`   ├─ Top-level: ${comments.length}`);
  console.log(`   └─ Replies: ${replyCount}`);
  console.log(`❤️  Hearts: ${heartCount}`);
  console.log('═══════════════════════════════════════\n');
  console.log('🎉 Community seed complete!');
}

seedCommunityData()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
