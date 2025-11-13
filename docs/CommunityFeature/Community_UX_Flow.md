# Community UX Flow - Visual Guide

Quick reference for understanding the user journey through the community features.

---

## 🗺️ User Journey Map

```
┌──────────────────────────────────────────────────────────────────┐
│                     VISITOR JOURNEY                               │
└──────────────────────────────────────────────────────────────────┘

Landing Page
     │
     ├─ See hero with welcome message
     ├─ Search for communities
     └─ View featured communities
     │
     ↓
Community Hub (Main Page)
     │
     ├─ Browse all communities
     ├─ Filter by topic/activity
     ├─ See community cards with stats
     └─ Click "Join" or "View"
     │
     ↓
Individual Community Page
     │
     ├─ See community description & rules
     ├─ View recent posts
     ├─ Click "Join Community"
     └─ Browse without joining
     │
     ↓
Post Detail Page
     │
     ├─ Read full post
     ├─ See all comments
     ├─ React to post/comments
     └─ Add comment (if member)


┌──────────────────────────────────────────────────────────────────┐
│                     MEMBER JOURNEY                                │
└──────────────────────────────────────────────────────────────────┘

Dashboard / My Communities
     │
     ├─ Quick access to joined communities
     ├─ See activity notifications (X new posts)
     ├─ Recent activity feed from all communities
     └─ Discover new communities
     │
     ↓
Community Home (After Joining)
     │
     ├─ Create new post
     ├─ Browse posts (sorted: new, popular, trending)
     ├─ Search within community
     └─ Access community resources
     │
     ↓
Create Post
     │
     ├─ Choose post type (Question, Discussion, Story, etc.)
     ├─ Write title & content
     ├─ Add tags
     └─ Submit to community
     │
     ↓
Post Detail (As Member)
     │
     ├─ Read & react to post
     ├─ Add comments
     ├─ Reply to comments (nested)
     ├─ Save post for later
     └─ Report if inappropriate
```

---

## 📱 Screen Breakdown

### Screen 1: Community Hub (Main Page)

**Purpose:** Entry point for discovering and accessing communities

**Key Elements:**
1. Hero with search
2. "My Communities" section (if logged in)
3. "Discover Communities" with tabs
4. Recent activity feed

**User Actions:**
- Search communities
- Click community card to view
- Join/leave communities
- Access individual posts

---

### Screen 2: Individual Community View

**Purpose:** Home page for a specific community

```
┌─────────────────────────────────────────────────────────┐
│ [← Back]                                    [Join]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ [Cover Image]                                           │
│                                                         │
│ 💙 Diabetes Support & Education                         │
│ 👥 1,234 members  •  💬 234 posts  •  🕐 Active today  │
│                                                         │
│ A supportive community for people living with           │
│ diabetes and their loved ones...                        │
│                                                         │
│ 🏷️ support  education  lifestyle  nutrition            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ [+ New Post]                                            │
│                                                         │
│ Sort: [New] [Popular] [Trending]                        │
│                                                         │
│ ┌─────────────────────────────────────────────┐        │
│ │ 📌 PINNED                                    │        │
│ │ 15 years with diabetes - wisdom to share    │        │
│ │ by Michael R. • 5 days ago                  │        │
│ │ 💬 45  👍 156                                │        │
│ └─────────────────────────────────────────────┘        │
│                                                         │
│ ┌─────────────────────────────────────────────┐        │
│ │ Just diagnosed - feeling overwhelmed        │        │
│ │ by Sarah M. • 2 hours ago                   │        │
│ │ 💬 12  👍 24                                 │        │
│ └─────────────────────────────────────────────┘        │
│                                                         │
│ [Load More]                                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Elements:**
1. Community header with cover image
2. Stats and description
3. Join/Leave button
4. "Create Post" button (for members)
5. Post feed with sorting
6. Pinned posts at top

---

### Screen 3: Post Detail View

**Purpose:** Full post view with comments

```
┌─────────────────────────────────────────────────────────┐
│ [← Back to Diabetes Support]                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 💬 QUESTION                                             │
│ Just got diagnosed with Type 2 - feeling overwhelmed   │
│                                                         │
│ Posted by Sarah M. • 2 hours ago                        │
│ in Diabetes Support & Education                         │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ Hi everyone, I was just diagnosed with Type 2           │
│ diabetes last week and I'm feeling really               │
│ overwhelmed. My doctor gave me a lot of                 │
│ information but I don't know where to start...          │
│                                                         │
│ 🏷️ newly-diagnosed  type-2  getting-started            │
│                                                         │
│ [👍 Helpful: 24]  [💙 Support: 8]  [🔖 Save]  [⋯]      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ 💬 12 Comments                                          │
│                                                         │
│ [Add a comment...]                                      │
│                                                         │
│ ┌───────────────────────────────────────────┐          │
│ │ [Avatar] Michael R.  •  90 min ago        │          │
│ │                                           │          │
│ │ Welcome to the community! The first few   │          │
│ │ weeks are the hardest but it gets easier. │          │
│ │ My advice: don't try to change...         │          │
│ │                                           │          │
│ │ [👍 Helpful: 5]  [💬 Reply]               │          │
│ │                                           │          │
│ │   ├─ [Avatar] Sarah M.  •  85 min ago     │          │
│ │   │  Thank you so much! That's really     │          │
│ │   │  helpful advice.                      │          │
│ │   │  [👍 2]                                │          │
│ └───────────────────────────────────────────┘          │
│                                                         │
│ ┌───────────────────────────────────────────┐          │
│ │ [Avatar] Dr. Emily W.  •  60 min ago      │          │
│ │ 👩‍⚕️ MODERATOR                               │          │
│ │                                           │          │
│ │ As a diabetes educator, I always          │          │
│ │ recommend focusing on these three...      │          │
│ │                                           │          │
│ │ [👍 Helpful: 12]  [💬 Reply]              │          │
│ └───────────────────────────────────────────┘          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Elements:**
1. Post type badge
2. Full post content
3. Author info with avatar
4. Tags
5. Reaction buttons
6. Comment count
7. Comment input box
8. Threaded comments with replies
9. Moderator badges

---

## 🎨 Component Hierarchy

```
CommunityHub (Page)
├── Hero
│   ├── Title
│   ├── Description
│   └── SearchBar
├── MyCommunitiesSection
│   └── CommunityGrid
│       └── CommunityCard (compact)
├── DiscoverSection
│   ├── TabBar
│   └── CommunityList
│       └── CommunityCard (horizontal)
└── ActivityFeedSection
    └── PostCard (preview)

IndividualCommunity (Page)
├── CommunityHeader
│   ├── CoverImage
│   ├── Stats
│   ├── Description
│   └── JoinButton
├── CreatePostButton
├── PostSortBar
└── PostFeed
    └── PostCard (full)

PostDetail (Page)
├── PostContent
│   ├── PostHeader
│   ├── PostBody
│   ├── PostTags
│   └── PostReactions
├── CommentInput
└── CommentList
    └── CommentCard
        ├── CommentContent
        ├── CommentReactions
        └── ReplyList
```

---

## 🎯 Key Interactions

### Joining a Community
```
User clicks "Join" 
    ↓
Button changes to "Joined" ✓
    ↓
User sees confirmation toast
    ↓
Community appears in "My Communities"
    ↓
User can now create posts
```

### Creating a Post
```
User clicks "+ New Post"
    ↓
Modal/Form opens
    ↓
User selects post type
    ↓
User writes title & content
    ↓
User adds tags (optional)
    ↓
User clicks "Post"
    ↓
Post appears at top of feed
    ↓
User sees success message
```

### Commenting
```
User reads post
    ↓
User clicks comment input
    ↓
Types comment
    ↓
Clicks "Post Comment"
    ↓
Comment appears in thread
    ↓
Comment count updates
    ↓
Post author gets notification
```

### Reacting
```
User clicks reaction button
    ↓
Button fills with color
    ↓
Counter increments
    ↓
Animation plays
    ↓
Author gets notification
```

---

## 🎨 Visual Design Principles

### Color Usage
- **Primary Blue (#2196F3)**: Trust, calm, medical
- **Purple (#7C4DFF)**: Support, community
- **Green (#4CAF50)**: Success, growth, positivity
- **Warm colors sparingly**: For celebration posts

### Typography Hierarchy
```
Page Title (h2):        32px, Bold
Section Title (h5):     24px, Semibold
Card Title (h6):        20px, Semibold
Body Text:              16px, Regular
Caption/Meta:           14px, Regular
```

### Spacing System
```
xs:  4px    (tight spacing, inline elements)
sm:  8px    (small gaps)
md:  16px   (default spacing)
lg:  24px   (section spacing)
xl:  32px   (major sections)
xxl: 48px   (page sections)
```

### Card Patterns
```
Base Card:
- Border radius: 12px
- Padding: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)
- Hover: translateY(-4px) + deeper shadow

Interactive Card:
- Add cursor: pointer
- Transition: 0.2s ease
- Hover state clearly visible
```

---

## 📊 Data Display Patterns

### Stats Format
```
👥 1.2K members     (format large numbers)
💬 234 posts        (exact count)
🕐 Active today     (relative time)
⭐ 4.8 rating       (if applicable)
```

### Time Display
```
< 1 min:    "just now"
< 1 hour:   "45m ago"
< 1 day:    "8h ago"
< 1 week:   "3d ago"
< 1 month:  "2w ago"
> 1 month:  "Mar 15"
> 1 year:   "Jan 2023"
```

### User Display
```
Full name + avatar:     Sarah M. [avatar]
With role:              Dr. Emily W. 👩‍⚕️ MODERATOR
With status:            Michael R. • Online
With bio preview:       Lisa T. "Caregiver for..."
```

---

## 🔄 State Management

### Loading States
```
Initial Load:
- Show skeleton screens
- Fade in content when ready

Pagination:
- Show spinner at bottom
- Smooth append of new items

Infinite Scroll:
- Load more trigger at 80% scroll
- Show loading indicator
```

### Empty States
```
No communities:
"No communities yet. Be the first to create one!"
[Create Community] button

No posts:
"No posts yet. Start the conversation!"
[Create Post] button

No comments:
"No comments yet. Be the first to comment!"
```

### Error States
```
Failed to load:
"Something went wrong. Please try again."
[Retry] button

No results:
"No communities found matching 'diabetes'"
Try different keywords or browse all communities
```

---

## ✅ Implementation Checklist

### Phase 1: Static Prototype (Week 1)
- [ ] Create dummy data file
- [ ] Build CommunityCard component
- [ ] Build Community Hub page layout
- [ ] Add search bar (UI only)
- [ ] Add tab navigation (UI only)
- [ ] Test responsive design

### Phase 2: Individual Community (Week 2)
- [ ] Build community detail page
- [ ] Build PostCard component
- [ ] Add post filtering (UI)
- [ ] Add pagination
- [ ] Test navigation flow

### Phase 3: Post Detail (Week 3)
- [ ] Build post detail page
- [ ] Build CommentCard component
- [ ] Add nested comment display
- [ ] Add reaction buttons (UI)
- [ ] Test comment threading

### Phase 4: Interactions (Week 4)
- [ ] Add "Join" functionality
- [ ] Add post creation modal
- [ ] Add comment submission
- [ ] Add reaction toggling
- [ ] Add form validation

### Phase 5: Database Integration (Week 5-6)
- [ ] Set up Prisma with PostgreSQL
- [ ] Migrate dummy data to database
- [ ] Replace static data with API calls
- [ ] Add authentication
- [ ] Add permission checks

---

## 🚀 Quick Win: Start Here

**Your first session should build:**
1. ✅ Community Hub page with dummy data
2. ✅ CommunityCard component (horizontal layout)
3. ✅ Basic routing to individual community

**This gives you:**
- Visual proof of concept
- Something to show stakeholders
- Foundation for iteration
- Testable navigation flow

**Time estimate:** 4-6 hours for basic working prototype

---

Ready to start building! 🎨
