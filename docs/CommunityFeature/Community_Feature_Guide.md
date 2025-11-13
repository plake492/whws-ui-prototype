# Community Feature - Database, UX/UI, & Prototype Guide

Complete guide to building your community platform from scratch with dummy data.

---

## 📊 Database Schema (Prisma)

### schema.prisma

```prisma
// This is your Prisma schema file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  username      String    @unique
  displayName   String?
  avatar        String?   // URL to avatar image
  bio           String?   @db.Text
  
  // Role & Status
  role          UserRole  @default(MEMBER)
  isVerified    Boolean   @default(false)
  isBanned      Boolean   @default(false)
  
  // Medical Context (optional)
  medicalTopic  String?   // e.g., "diabetes", "cancer_survivor", "caregiver"
  
  // Timestamps
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastActiveAt  DateTime  @default(now())
  
  // Relations
  posts         Post[]
  comments      Comment[]
  reactions     Reaction[]
  communityMemberships CommunityMember[]
  moderatedCommunities Community[] @relation("ModeratedBy")
  
  @@index([username])
  @@index([email])
}

enum UserRole {
  MEMBER
  MODERATOR
  ADMIN
}

// ============================================================================
// COMMUNITIES
// ============================================================================

model Community {
  id              String    @id @default(uuid())
  name            String
  slug            String    @unique
  description     String    @db.Text
  coverImage      String?
  
  // Medical Focus
  medicalTopic    String    // "Diabetes", "Breast Cancer", "Mental Health"
  tags            String[]  // ["support", "research", "lifestyle"]
  
  // Settings
  isPublic        Boolean   @default(true)
  requiresApproval Boolean  @default(false)
  
  // Stats (denormalized for performance)
  memberCount     Int       @default(0)
  postCount       Int       @default(0)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  posts           Post[]
  members         CommunityMember[]
  moderators      User[]    @relation("ModeratedBy")
  
  @@index([slug])
  @@index([medicalTopic])
}

model CommunityMember {
  id          String    @id @default(uuid())
  userId      String
  communityId String
  role        MemberRole @default(MEMBER)
  joinedAt    DateTime  @default(now())
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  community   Community @relation(fields: [communityId], references: [id], onDelete: Cascade)
  
  @@unique([userId, communityId])
  @@index([userId])
  @@index([communityId])
}

enum MemberRole {
  MEMBER
  MODERATOR
}

// ============================================================================
// POSTS & COMMENTS
// ============================================================================

model Post {
  id            String    @id @default(uuid())
  title         String
  content       String    @db.Text
  
  // Categorization
  type          PostType  @default(DISCUSSION)
  tags          String[]
  
  // Moderation
  isPinned      Boolean   @default(false)
  isLocked      Boolean   @default(false)
  isFeatured    Boolean   @default(false)
  
  // Stats (denormalized)
  viewCount     Int       @default(0)
  commentCount  Int       @default(0)
  reactionCount Int       @default(0)
  
  // Timestamps
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  authorId      String
  author        User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  communityId   String
  community     Community @relation(fields: [communityId], references: [id], onDelete: Cascade)
  
  comments      Comment[]
  reactions     Reaction[]
  
  @@index([authorId])
  @@index([communityId])
  @@index([createdAt])
  @@index([type])
}

enum PostType {
  DISCUSSION    // General discussion
  QUESTION      // Question seeking answers
  STORY         // Personal story/experience
  RESOURCE      // Sharing a resource
  SUPPORT       // Seeking support
}

model Comment {
  id          String    @id @default(uuid())
  content     String    @db.Text
  
  // Timestamps
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relations
  authorId    String
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  postId      String
  post        Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  // Nested comments (replies)
  parentId    String?
  parent      Comment?  @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies     Comment[] @relation("CommentReplies")
  
  reactions   Reaction[]
  
  @@index([authorId])
  @@index([postId])
  @@index([parentId])
  @@index([createdAt])
}

// ============================================================================
// REACTIONS (Likes, Hearts, etc.)
// ============================================================================

model Reaction {
  id        String       @id @default(uuid())
  type      ReactionType @default(HELPFUL)
  
  // Polymorphic - can react to posts or comments
  postId    String?
  post      Post?        @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  commentId String?
  comment   Comment?     @relation(fields: [commentId], references: [id], onDelete: Cascade)
  
  userId    String
  user      User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime     @default(now())
  
  // Ensure user can only react once per item
  @@unique([userId, postId])
  @@unique([userId, commentId])
  @@index([postId])
  @@index([commentId])
  @@index([userId])
}

enum ReactionType {
  HELPFUL     // Helpful information
  SUPPORT     // Emotional support
  CELEBRATE   // Celebrating good news
  INSIGHTFUL  // Insightful comment
}
```

---

## 👥 User Stories & Personas

### Primary Personas

**1. Sarah - Newly Diagnosed Patient**
- Age: 34
- Context: Recently diagnosed with Type 2 diabetes
- Goals:
  - Find others with similar experiences
  - Learn from people who've been managing diabetes longer
  - Ask questions without judgment
  - Feel less alone

**2. Michael - Long-time Community Member**
- Age: 52
- Context: Living with diabetes for 15 years
- Goals:
  - Share knowledge and experiences
  - Help newly diagnosed people
  - Stay updated on latest research
  - Connect with others

**3. Lisa - Caregiver**
- Age: 41
- Context: Supporting her mother with diabetes
- Goals:
  - Learn how to better support her mother
  - Connect with other caregivers
  - Find practical tips and resources
  - Reduce caregiver stress

---

## 🎯 User Stories

### Core Stories for Community Main Page

**As a visitor, I want to:**
- See all available communities so I can find relevant ones
- Preview community content before joining
- Understand what each community is about
- See how active each community is

**As a member, I want to:**
- See recent activity from my communities
- Quickly access communities I've joined
- Discover new communities that might interest me
- See trending posts across all communities

**As a first-time user, I want to:**
- Understand how the community works
- See examples of posts and discussions
- Feel welcomed and safe
- Know that this is a supportive space

---

## 🎨 UX/UI Design - Community Main Page

### Information Architecture

```
Community Hub
│
├── Hero Section
│   ├── Welcome message
│   ├── Search communities
│   └── CTA: "Join a Community"
│
├── My Communities (if logged in)
│   ├── Joined communities grid
│   ├── Recent activity feed
│   └── Quick actions
│
├── Featured Communities
│   ├── Most active
│   ├── Newest
│   └── Recommended
│
├── All Communities List
│   ├── Filters (topic, activity)
│   ├── Sort options
│   └── Community cards
│
└── Recent Activity Feed
    ├── Latest posts
    ├── Popular discussions
    └── Trending topics
```

### Wireframe Description (Main Community Page)

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                    Search Communities    [Avatar ▾] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│         Welcome to the Community Hub                          │
│         Connect, share, and learn from others                 │
│         on similar health journeys                            │
│                                                               │
│         [🔍 Search communities...]                            │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  My Communities                          [View All →]         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ 💙       │  │ 🎗️       │  │ 🧠       │                   │
│  │ Diabetes │  │ Cancer   │  │ Mental   │                   │
│  │ Support  │  │ Warriors │  │ Health   │                   │
│  │          │  │          │  │          │                   │
│  │ 234 new  │  │ 89 new   │  │ 156 new  │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Discover Communities                                         │
│  [All] [Most Active] [Newest] [Recommended]                  │
│                                                               │
│  ┌────────────────────────────────────────────────┐          │
│  │ 💙 Diabetes Support & Education                │          │
│  │ ─────────────────────────────────────────────  │          │
│  │ A supportive community for people living       │          │
│  │ with diabetes and their loved ones.            │          │
│  │                                                │          │
│  │ 👥 1,234 members  💬 234 discussions  ⭐ Active│          │
│  │                                    [Join] →    │          │
│  └────────────────────────────────────────────────┘          │
│                                                               │
│  ┌────────────────────────────────────────────────┐          │
│  │ 🎗️ Cancer Survivors Network                    │          │
│  │ ─────────────────────────────────────────────  │          │
│  │ Connect with cancer survivors and caregivers   │          │
│  │ for support, hope, and practical advice.       │          │
│  │                                                │          │
│  │ 👥 2,845 members  💬 489 discussions  ⭐ Active│          │
│  │                                    [Join] →    │          │
│  └────────────────────────────────────────────────┘          │
│                                                               │
│  ┌────────────────────────────────────────────────┐          │
│  │ 🧠 Mental Health & Wellness                     │          │
│  │ ─────────────────────────────────────────────  │          │
│  │ A safe space to discuss mental health,         │          │
│  │ share coping strategies, and find support.     │          │
│  │                                                │          │
│  │ 👥 3,567 members  💬 892 discussions  ⭐ Active│          │
│  │                                    [Join] →    │          │
│  └────────────────────────────────────────────────┘          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Key UI Components

**1. Community Card**
```
┌────────────────────────────────────┐
│ [Icon] Community Name              │
│ ──────────────────────────────────│
│ Brief description of the           │
│ community purpose and focus        │
│                                    │
│ 👥 1.2K members                    │
│ 💬 234 posts                       │
│ 🕐 Active today                    │
│                                    │
│ [View] [Join]                      │
└────────────────────────────────────┘
```

**2. Activity Feed Item**
```
┌────────────────────────────────────┐
│ [Avatar] Username                  │
│ Posted in Diabetes Support • 2h ago│
│                                    │
│ "Just got diagnosed - feeling      │
│  overwhelmed. Where do I start?"   │
│                                    │
│ 💬 12 comments  👍 24 helpful      │
└────────────────────────────────────┘
```

**3. My Communities Quick Access**
```
┌──────────┐
│ [Icon]   │
│ Name     │
│ ─────    │
│ 12 new   │
│ posts    │
└──────────┘
```

---

## 🎨 Design System Tokens (MUI Theme)

```javascript
// theme/communityTheme.js
import { createTheme } from '@mui/material/styles';

export const communityTheme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Blue - trustworthy, calm
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#7C4DFF', // Purple - supportive
      light: '#B388FF',
      dark: '#651FFF',
    },
    success: {
      main: '#4CAF50', // Green - growth, positive
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A202C',
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
```

---

## 💾 Dummy Data Generator

```javascript
// lib/dummyData.js

export const dummyUsers = [
  {
    id: 'user-1',
    username: 'sarah_wellness',
    displayName: 'Sarah M.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Newly diagnosed with T2D. Learning and growing every day. 💪',
    medicalTopic: 'diabetes',
    role: 'MEMBER',
    createdAt: new Date('2024-01-15'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user-2',
    username: 'mike_health',
    displayName: 'Michael R.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: '15 years managing diabetes. Here to help others. 🎯',
    medicalTopic: 'diabetes',
    role: 'MEMBER',
    createdAt: new Date('2023-03-20'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user-3',
    username: 'lisa_caregiver',
    displayName: 'Lisa T.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Caregiver for my mom. Looking for support and advice. ❤️',
    medicalTopic: 'diabetes',
    role: 'MEMBER',
    createdAt: new Date('2024-06-10'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user-4',
    username: 'dr_wellness',
    displayName: 'Dr. Emily W.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Certified Diabetes Educator. Here to answer questions. 👩‍⚕️',
    medicalTopic: 'diabetes',
    role: 'MODERATOR',
    createdAt: new Date('2023-01-05'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user-5',
    username: 'james_journey',
    displayName: 'James K.',
    avatar: 'https://i.pravatar.cc/150?img=13',
    bio: 'Cancer survivor 3 years strong. Living life to the fullest! 🎗️',
    medicalTopic: 'cancer',
    role: 'MEMBER',
    createdAt: new Date('2022-11-20'),
    lastActiveAt: new Date(),
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
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'comm-2',
    name: 'Cancer Survivors Network',
    slug: 'cancer-survivors',
    description: 'Connect with cancer survivors and caregivers for support, hope, and practical advice. All cancer types welcome. Share your journey and find strength in community.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    medicalTopic: 'Cancer',
    tags: ['support', 'survivorship', 'treatment', 'caregiving'],
    isPublic: true,
    memberCount: 2845,
    postCount: 489,
    createdAt: new Date('2022-06-15'),
  },
  {
    id: 'comm-3',
    name: 'Mental Health & Wellness',
    slug: 'mental-health',
    description: 'A safe space to discuss mental health, share coping strategies, and find support. Depression, anxiety, PTSD, and all mental health topics welcomed.',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    medicalTopic: 'Mental Health',
    tags: ['support', 'mental-health', 'wellness', 'coping'],
    isPublic: true,
    memberCount: 3567,
    postCount: 892,
    createdAt: new Date('2022-03-10'),
  },
  {
    id: 'comm-4',
    name: 'Heart Health Community',
    slug: 'heart-health',
    description: 'Support and information for people with heart conditions, including heart disease, high blood pressure, heart failure, and cardiac rehabilitation.',
    coverImage: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800',
    medicalTopic: 'Cardiology',
    tags: ['heart-health', 'cardiology', 'prevention', 'recovery'],
    isPublic: true,
    memberCount: 892,
    postCount: 156,
    createdAt: new Date('2023-05-20'),
  },
  {
    id: 'comm-5',
    name: 'Caregiver Connection',
    slug: 'caregiver-connection',
    description: 'A community for caregivers to share experiences, find support, and prevent burnout. Whether you\'re caring for a parent, spouse, or child, you\'re not alone.',
    coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800',
    medicalTopic: 'Caregiving',
    tags: ['caregiving', 'support', 'self-care', 'resources'],
    isPublic: true,
    memberCount: 1567,
    postCount: 312,
    createdAt: new Date('2023-08-01'),
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
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 'post-2',
    title: '15 years with diabetes - Here\'s what I wish I knew on day one',
    content: 'After 15 years of managing diabetes, I wanted to share some hard-earned wisdom with those newly diagnosed:\n\n1. Small changes matter more than perfection\n2. Find a doctor you trust and communicate openly\n3. Test your blood sugar regularly - data is power\n4. Don\'t skip meals\n5. Exercise doesn\'t have to mean the gym\n\nWhat else would you add to this list?',
    type: 'DISCUSSION',
    tags: ['advice', 'long-term-management', 'wisdom'],
    authorId: 'user-2',
    communityId: 'comm-1',
    isPinned: true,
    viewCount: 892,
    commentCount: 45,
    reactionCount: 156,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: 'post-3',
    title: 'Caregiver burnout - how do you cope?',
    content: 'I\'ve been caring for my mom with diabetes for 3 years now. Lately I\'m feeling exhausted and guilty for feeling that way. How do other caregivers take care of themselves while caring for someone else?',
    type: 'SUPPORT',
    tags: ['caregiving', 'burnout', 'self-care'],
    authorId: 'user-3',
    communityId: 'comm-1',
    viewCount: 234,
    commentCount: 18,
    reactionCount: 42,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: 'post-4',
    title: 'Celebrating 3 years cancer-free! 🎉',
    content: 'Just got back from my 3-year checkup and everything looks great! To anyone in treatment right now - there is hope. Keep fighting. You\'ve got this! 💪',
    type: 'STORY',
    tags: ['milestone', 'survivor', 'hope'],
    authorId: 'user-5',
    communityId: 'comm-2',
    isFeatured: true,
    viewCount: 567,
    commentCount: 34,
    reactionCount: 189,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: 'post-5',
    title: 'Best apps for tracking blood sugar?',
    content: 'I\'m looking for a good app to track my blood sugar readings, meals, and exercise. What apps do you all use and recommend?',
    type: 'QUESTION',
    tags: ['technology', 'tracking', 'apps'],
    authorId: 'user-1',
    communityId: 'comm-1',
    viewCount: 89,
    commentCount: 8,
    reactionCount: 5,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
];

export const dummyComments = [
  {
    id: 'comment-1',
    content: 'Welcome to the community! The first few weeks are the hardest but it gets easier. My advice: don\'t try to change everything at once. Pick one thing (like walking 10 minutes after meals) and build from there.',
    authorId: 'user-2',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 90 * 60 * 1000), // 90 min ago
  },
  {
    id: 'comment-2',
    content: 'I felt the same way when I was diagnosed. What really helped me was joining a diabetes education class at my local hospital. They teach you everything step by step.',
    authorId: 'user-3',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 75 * 60 * 1000),
  },
  {
    id: 'comment-3',
    content: 'As a diabetes educator, I always recommend focusing on these three things first:\n1. Understanding your numbers (what do they mean?)\n2. Meal planning basics\n3. Building a support system\n\nFeel free to ask questions anytime!',
    authorId: 'user-4',
    postId: 'post-1',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
];

// Helper to get user by ID
export function getUserById(userId) {
  return dummyUsers.find(u => u.id === userId);
}

// Helper to get community by ID
export function getCommunityById(communityId) {
  return dummyCommunities.find(c => c.id === communityId);
}

// Helper to get posts by community
export function getPostsByCommunity(communityId) {
  return dummyPosts
    .filter(p => p.communityId === communityId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

// Helper to get comments by post
export function getCommentsByPost(postId) {
  return dummyComments
    .filter(c => c.postId === postId)
    .sort((a, b) => a.createdAt - b.createdAt);
}
```

---

## 🔧 Implementation - Community Main Page

### File Structure
```
app/
├── communities/
│   ├── page.js                    # Main community hub
│   ├── [slug]/
│   │   ├── page.js                # Individual community view
│   │   └── [postId]/
│   │       └── page.js            # Post detail view
│   └── components/
│       ├── CommunityCard.jsx
│       ├── PostCard.jsx
│       ├── ActivityFeed.jsx
│       └── CommunityGrid.jsx
```

### app/communities/page.js

```javascript
'use client';

import { Box, Container, Typography, Grid, Tabs, Tab, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import CommunityCard from './components/CommunityCard';
import ActivityFeed from './components/ActivityFeed';
import { dummyCommunities, dummyPosts } from '@/lib/dummyData';

export default function CommunitiesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter communities based on search
  const filteredCommunities = dummyCommunities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
          Welcome to the Community Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Connect, share, and learn from others on similar health journeys
        </Typography>
        
        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search communities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ maxWidth: 600, mx: 'auto' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* My Communities (for logged-in users) */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          My Communities
        </Typography>
        <Grid container spacing={3}>
          {filteredCommunities.slice(0, 3).map((community) => (
            <Grid item xs={12} sm={6} md={4} key={community.id}>
              <CommunityCard community={community} isJoined />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Discover Communities */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Discover Communities
        </Typography>
        
        {/* Tabs */}
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="All Communities" />
          <Tab label="Most Active" />
          <Tab label="Newest" />
          <Tab label="Recommended" />
        </Tabs>

        {/* Community Grid */}
        <Grid container spacing={3}>
          {filteredCommunities.map((community) => (
            <Grid item xs={12} key={community.id}>
              <CommunityCard community={community} variant="horizontal" />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <ActivityFeed posts={dummyPosts.slice(0, 5)} />
      </Box>
    </Container>
  );
}
```

### app/communities/components/CommunityCard.jsx

```javascript
'use client';

import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Stack } from '@mui/material';
import { People as PeopleIcon, Forum as ForumIcon, TrendingUp as TrendingIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function CommunityCard({ community, variant = 'vertical', isJoined = false }) {
  const stats = [
    { icon: <PeopleIcon fontSize="small" />, label: `${community.memberCount.toLocaleString()} members` },
    { icon: <ForumIcon fontSize="small" />, label: `${community.postCount} discussions` },
  ];

  if (variant === 'horizontal') {
    return (
      <Card sx={{ display: 'flex', height: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
          image={community.coverImage}
          alt={community.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {community.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {community.description}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {community.tags.slice(0, 3).map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              {stats.map((stat, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.icon}
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
              <Chip
                icon={<TrendingIcon />}
                label="Active"
                size="small"
                color="success"
              />
            </Stack>
          </CardContent>

          <Box sx={{ p: 2, pt: 0 }}>
            {isJoined ? (
              <Button
                component={Link}
                href={`/communities/${community.slug}`}
                variant="outlined"
                fullWidth
              >
                View Community
              </Button>
            ) : (
              <Stack direction="row" spacing={1}>
                <Button
                  component={Link}
                  href={`/communities/${community.slug}`}
                  variant="outlined"
                  fullWidth
                >
                  View
                </Button>
                <Button variant="contained" fullWidth>
                  Join
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Card>
    );
  }

  // Vertical card (for grid view)
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={community.coverImage}
        alt={community.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {community.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {community.description.substring(0, 100)}...
        </Typography>

        <Stack direction="column" spacing={1}>
          {stats.map((stat, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {stat.icon}
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>

      <Box sx={{ p: 2 }}>
        {isJoined ? (
          <>
            <Typography variant="caption" color="success.main" sx={{ display: 'block', mb: 1 }}>
              12 new posts
            </Typography>
            <Button
              component={Link}
              href={`/communities/${community.slug}`}
              variant="contained"
              fullWidth
            >
              View
            </Button>
          </>
        ) : (
          <Button variant="outlined" fullWidth>
            Join Community
          </Button>
        )}
      </Box>
    </Card>
  );
}
```

### app/communities/components/ActivityFeed.jsx

```javascript
'use client';

import { Box, Card, CardContent, Typography, Avatar, Stack, Chip } from '@mui/material';
import { Comment as CommentIcon, ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import Link from 'next/link';
import { getUserById, getCommunityById } from '@/lib/dummyData';

export default function ActivityFeed({ posts }) {
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getPostTypeColor = (type) => {
    const colors = {
      QUESTION: 'info',
      DISCUSSION: 'default',
      STORY: 'secondary',
      RESOURCE: 'success',
      SUPPORT: 'warning',
    };
    return colors[type] || 'default';
  };

  return (
    <Stack spacing={2}>
      {posts.map((post) => {
        const author = getUserById(post.authorId);
        const community = getCommunityById(post.communityId);

        return (
          <Card key={post.id} sx={{ '&:hover': { boxShadow: 4 } }}>
            <CardContent>
              {/* Header */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar src={author.avatar} alt={author.displayName} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {author.displayName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted in {community.name} • {formatTimeAgo(post.createdAt)}
                  </Typography>
                </Box>
                <Chip
                  label={post.type.toLowerCase()}
                  size="small"
                  color={getPostTypeColor(post.type)}
                />
              </Stack>

              {/* Content */}
              <Link href={`/communities/${community.slug}/${post.id}`} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {post.content.substring(0, 150)}...
                </Typography>
              </Link>

              {/* Stats */}
              <Stack direction="row" spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CommentIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {post.commentCount} comments
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ThumbUpIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {post.reactionCount} helpful
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
```

---

## 🚀 Quick Start Implementation

### 1. Install Dependencies
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @prisma/client
npm install -D prisma
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Set up database
```bash
# Copy the schema.prisma content above
# Update your .env with DATABASE_URL
npx prisma db push
```

### 4. Create files
- Copy the dummy data to `lib/dummyData.js`
- Copy the components to their respective folders
- Copy the page code

### 5. Run it!
```bash
npm run dev
```

---

## 📱 Mobile Considerations

### Responsive Breakpoints
```javascript
// Mobile-first grid layout
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <CommunityCard />
  </Grid>
</Grid>

// Stack on mobile
<Stack 
  direction={{ xs: 'column', sm: 'row' }} 
  spacing={2}
>
  <Button>View</Button>
  <Button>Join</Button>
</Stack>
```

---

## 🎨 Next Steps

### Phase 1 (Current - Prototype)
- ✅ Database schema
- ✅ Dummy data
- ✅ Community main page
- ⏳ Individual community view
- ⏳ Post detail view

### Phase 2 (Add Interactivity)
- Create post functionality
- Comment system
- Reaction system
- Join/leave communities

### Phase 3 (Real Users)
- Replace dummy data with Prisma queries
- Add authentication
- Add user profiles
- Add moderation tools

---

That's your complete community foundation! You now have:
1. ✅ Database schema
2. ✅ User stories & personas
3. ✅ UX/UI design
4. ✅ Dummy data for prototyping
5. ✅ Working React components

Ready to build it out! 🚀
