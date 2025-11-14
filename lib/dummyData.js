export const dummyUsers = [
  {
    id: 'user-1',
    username: 'sarah_wellness',
    displayName: 'Sarah M.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Newly diagnosed with T2D. Learning every day. 💪',
    medicalTopic: 'diabetes',
    role: 'MEMBER',
  },
  {
    id: 'user-2',
    username: 'mike_health',
    displayName: 'Michael R.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: '15 years managing diabetes. Here to help. 🎯',
    medicalTopic: 'diabetes',
    role: 'MEMBER',
  },
  {
    id: 'user-3',
    username: 'lisa_caregiver',
    displayName: 'Lisa T.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Caregiver for my mom. Looking for support. ❤️',
    medicalTopic: 'diabetes',
    role: 'MEMBER',
  },
  {
    id: 'user-4',
    username: 'dr_wellness',
    displayName: 'Dr. Emily W.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Certified Diabetes Educator. Here to answer questions. 👩‍⚕️',
    medicalTopic: 'diabetes',
    role: 'MODERATOR',
  },
];

export const dummyCommunities = [
  {
    id: 'comm-1',
    name: 'Diabetes Support & Education',
    slug: 'diabetes-support',
    description: 'A supportive community for people living with diabetes and their loved ones. Share experiences, ask questions, and learn from others managing Type 1, Type 2, and gestational diabetes.',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    medicalTopic: 'Diabetes',
    tags: ['support', 'education', 'lifestyle', 'nutrition'],
    isPublic: true,
    memberCount: 1234,
    postCount: 234,
  },
  {
    id: 'comm-2',
    name: 'Cancer Survivors Network',
    slug: 'cancer-survivors',
    description: 'Connect with cancer survivors and caregivers for support, hope, and practical advice. All cancer types welcome.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    medicalTopic: 'Cancer',
    tags: ['support', 'survivorship', 'treatment', 'caregiving'],
    isPublic: true,
    memberCount: 2845,
    postCount: 489,
  },
  {
    id: 'comm-3',
    name: 'Mental Health & Wellness',
    slug: 'mental-health',
    description: 'A safe space to discuss mental health, share coping strategies, and find support.',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    medicalTopic: 'Mental Health',
    tags: ['support', 'mental-health', 'wellness', 'coping'],
    isPublic: true,
    memberCount: 3567,
    postCount: 892,
  },
];

export const dummyPosts = [
  {
    id: 'post-1',
    title: 'Just got diagnosed with Type 2 - feeling overwhelmed',
    content: 'Hi everyone, I was just diagnosed with Type 2 diabetes last week and I\'m feeling really overwhelmed. My doctor gave me a lot of information but I don\'t know where to start. What were your first steps? What helped you most in the beginning?',
    type: 'QUESTION',
    tags: ['newly-diagnosed', 'type-2', 'getting-started'],
    authorId: 'user-1',
    communityId: 'comm-1',
    viewCount: 156,
    commentCount: 12,
    reactionCount: 24,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'post-2',
    title: '15 years with diabetes - Here\'s what I wish I knew on day one',
    content: 'After 15 years of managing diabetes, I wanted to share some wisdom:\n\n1. Small changes matter more than perfection\n2. Find a doctor you trust\n3. Test regularly\n4. Don\'t skip meals\n5. Exercise doesn\'t mean the gym\n\nWhat else would you add?',
    type: 'DISCUSSION',
    tags: ['advice', 'long-term-management', 'wisdom'],
    authorId: 'user-2',
    communityId: 'comm-1',
    isPinned: true,
    viewCount: 892,
    commentCount: 45,
    reactionCount: 156,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'post-3',
    title: 'Caregiver burnout - how do you cope?',
    content: 'I\'ve been caring for my mom with diabetes for 3 years. Lately feeling exhausted and guilty. How do you take care of yourself while caring for someone else?',
    type: 'SUPPORT',
    tags: ['caregiving', 'burnout', 'self-care'],
    authorId: 'user-3',
    communityId: 'comm-1',
    viewCount: 234,
    commentCount: 18,
    reactionCount: 42,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

export const dummyComments = [
  {
    id: 'comment-1',
    content: 'Welcome! The first few weeks are the hardest but it gets easier. My advice: don\'t try to change everything at once. Pick one thing and build from there.',
    authorId: 'user-2',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 90 * 60 * 1000),
  },
  {
    id: 'comment-2',
    content: 'I felt the same way when diagnosed. What helped me was joining a diabetes education class at my local hospital.',
    authorId: 'user-3',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 75 * 60 * 1000),
  },
];

// Helper functions
export function getUserById(id) {
  return dummyUsers.find(u => u.id === id);
}

export function getCommunityById(id) {
  return dummyCommunities.find(c => c.id === id);
}

export function getCommunityBySlug(slug) {
  return dummyCommunities.find(c => c.slug === slug);
}

export function getPostsByCommunity(communityId) {
  return dummyPosts.filter(p => p.communityId === communityId);
}

export function getPostById(postId) {
  return dummyPosts.find(p => p.id === postId);
}

export function getCommentsByPost(postId) {
  return dummyComments.filter(c => c.postId === postId);
}
