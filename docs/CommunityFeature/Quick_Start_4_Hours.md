# Community Prototype - Quick Start (4 Hours)

Get your working prototype running with dummy data in one focused session.

---

## 🎯 Goal
Build a navigable community hub with dummy data that you can demo and iterate on.

**What you'll have:**
- Community hub main page
- Individual community pages
- Navigation between pages
- Responsive design
- Professional UI with MUI

**Time:** ~4 hours

---

## 📋 Prerequisites

```bash
# Your existing Next.js project
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

---

## 🚀 Step-by-Step Build

### Step 1: Create Dummy Data (15 min)

Create `lib/dummyData.js`:

```javascript
// Just copy the entire dummyData.js content from the main guide
// Or use this minimal version:

export const communities = [
  {
    id: '1',
    name: 'Diabetes Support',
    slug: 'diabetes-support',
    description: 'A supportive community for people living with diabetes.',
    memberCount: 1234,
    postCount: 234,
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    tags: ['support', 'education'],
  },
  {
    id: '2',
    name: 'Cancer Survivors',
    slug: 'cancer-survivors',
    description: 'Connect with cancer survivors and caregivers.',
    memberCount: 2845,
    postCount: 489,
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    tags: ['support', 'survivorship'],
  },
];

export const posts = [
  {
    id: '1',
    title: 'Just got diagnosed - feeling overwhelmed',
    content: 'Hi everyone, I was just diagnosed...',
    communityId: '1',
    authorName: 'Sarah M.',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    commentCount: 12,
    reactionCount: 24,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];
```

---

### Step 2: Create MUI Theme (10 min)

Create `theme/index.js`:

```javascript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#7C4DFF',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});
```

Update `app/layout.js`:

```javascript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Step 3: Community Card Component (30 min)

Create `components/CommunityCard.jsx`:

```javascript
'use client';

import { Card, CardMedia, CardContent, Typography, Button, Box, Stack, Chip } from '@mui/material';
import { People, Forum } from '@mui/icons-material';
import Link from 'next/link';

export default function CommunityCard({ community }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={community.coverImage}
        alt={community.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {community.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {community.description}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <People fontSize="small" />
            <Typography variant="body2">
              {community.memberCount.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Forum fontSize="small" />
            <Typography variant="body2">
              {community.postCount}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {community.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>

        <Button
          component={Link}
          href={`/communities/${community.slug}`}
          variant="contained"
          fullWidth
        >
          View Community
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

### Step 4: Community Hub Page (45 min)

Create `app/communities/page.js`:

```javascript
'use client';

import { Container, Typography, Grid, Box, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import CommunityCard from '@/components/CommunityCard';
import { communities } from '@/lib/dummyData';

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Community Hub
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Connect with others on similar health journeys
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Search communities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ maxWidth: 600, mx: 'auto' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Communities Grid */}
      <Box mb={6}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          All Communities
        </Typography>
        <Grid container spacing={3}>
          {filteredCommunities.map((community) => (
            <Grid item xs={12} sm={6} md={4} key={community.id}>
              <CommunityCard community={community} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
```

---

### Step 5: Individual Community Page (60 min)

Create `app/communities/[slug]/page.js`:

```javascript
'use client';

import { Container, Typography, Box, Button, Stack, Chip, Card, CardContent, Avatar } from '@mui/material';
import { People, Forum, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { communities, posts } from '@/lib/dummyData';

export default function CommunityPage() {
  const params = useParams();
  const community = communities.find(c => c.slug === params.slug);

  if (!community) {
    return <Container><Typography>Community not found</Typography></Container>;
  }

  const communityPosts = posts.filter(p => p.communityId === community.id);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        component={Link}
        href="/communities"
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back to Communities
      </Button>

      {/* Community Header */}
      <Box
        sx={{
          backgroundImage: `url(${community.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 200,
          borderRadius: 2,
          mb: 3,
        }}
      />

      <Box mb={4}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {community.name}
        </Typography>

        <Stack direction="row" spacing={3} mb={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <People />
            <Typography>{community.memberCount.toLocaleString()} members</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Forum />
            <Typography>{community.postCount} posts</Typography>
          </Box>
        </Stack>

        <Typography variant="body1" color="text.secondary" mb={2}>
          {community.description}
        </Typography>

        <Stack direction="row" spacing={1} mb={3}>
          {community.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </Stack>

        <Button variant="contained" size="large">
          Join Community
        </Button>
      </Box>

      {/* Posts */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Recent Posts
      </Typography>

      <Stack spacing={2}>
        {communityPosts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <Stack direction="row" spacing={2} mb={2}>
                <Avatar src={post.authorAvatar} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {post.authorName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="h6" fontWeight={600} mb={1}>
                {post.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" mb={2}>
                {post.content}
              </Typography>

              <Stack direction="row" spacing={3}>
                <Typography variant="body2" color="text.secondary">
                  💬 {post.commentCount} comments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  👍 {post.reactionCount} reactions
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {communityPosts.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No posts yet. Be the first to start a discussion!
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Create Post
          </Button>
        </Box>
      )}
    </Container>
  );
}
```

---

### Step 6: Navigation Header (30 min)

Create `components/Navigation.jsx`:

```javascript
'use client';

import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function Navigation() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            HealthHub
          </Typography>
          <Button color="inherit" component={Link} href="/communities">
            Communities
          </Button>
          <Button color="inherit">
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
```

Update `app/layout.js` to include navigation:

```javascript
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Step 7: Homepage (30 min)

Create `app/page.js`:

```javascript
'use client';

import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import { communities } from '@/lib/dummyData';

export default function HomePage() {
  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Your Health Journey, Together
          </Typography>
          <Typography variant="h6" mb={4}>
            Connect with supportive communities around your health topics
          </Typography>
          <Button
            component={Link}
            href="/communities"
            variant="contained"
            size="large"
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Explore Communities
          </Button>
        </Container>
      </Box>

      {/* Featured Communities */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          Featured Communities
        </Typography>
        <Grid container spacing={3}>
          {communities.slice(0, 3).map((community) => (
            <Grid item xs={12} md={4} key={community.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {community.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {community.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {community.memberCount.toLocaleString()} members
                  </Typography>
                  <Box mt={2}>
                    <Button
                      component={Link}
                      href={`/communities/${community.slug}`}
                      variant="outlined"
                      fullWidth
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
```

---

## ✅ Testing Your Prototype

### Run it
```bash
npm run dev
```

### Test Flow
1. Visit `http://localhost:3000`
2. Click "Explore Communities"
3. Search for a community
4. Click a community card
5. View posts in the community
6. Navigate back

### What Should Work
- ✅ Navigation between pages
- ✅ Search filtering
- ✅ Responsive design on mobile
- ✅ Clean, professional UI
- ✅ Fast navigation with Next.js

### What Won't Work Yet
- ❌ Joining communities (just UI)
- ❌ Creating posts (no form yet)
- ❌ Commenting (no form yet)
- ❌ Reactions (no state management)

---

## 🎨 Quick Customizations

### Change Colors
```javascript
// theme/index.js
palette: {
  primary: { main: '#YOUR_COLOR' },
  secondary: { main: '#YOUR_COLOR' },
}
```

### Add More Communities
```javascript
// lib/dummyData.js
export const communities = [
  ...existing,
  {
    id: '3',
    name: 'Your Community',
    slug: 'your-community',
    // ...
  }
];
```

### Customize Layout
```javascript
// Change container width
<Container maxWidth="xl">  // or "md", "lg"

// Adjust spacing
<Grid container spacing={4}>  // larger gaps

// Change card appearance
<Card elevation={3}>  // more shadow
```

---

## 📊 Project Structure After Build

```
your-app/
├── app/
│   ├── layout.js              ✅ With theme & nav
│   ├── page.js                ✅ Homepage
│   └── communities/
│       ├── page.js            ✅ Community hub
│       └── [slug]/
│           └── page.js        ✅ Community detail
├── components/
│   ├── Navigation.jsx         ✅ Nav bar
│   └── CommunityCard.jsx      ✅ Reusable card
├── lib/
│   └── dummyData.js           ✅ Mock data
└── theme/
    └── index.js               ✅ MUI theme
```

---

## 🚀 Next Session (When You're Ready)

**Add Post Detail Page (2 hours)**
1. Create `app/communities/[slug]/[postId]/page.js`
2. Show full post content
3. Display comments
4. Add comment form (UI only)

**Add Interactions (3 hours)**
1. Join/leave community (local state)
2. Create post modal
3. Add comment functionality
4. Like/reaction buttons

**Connect to Database (4+ hours)**
1. Set up Prisma
2. Seed database with dummy data
3. Replace static data with API calls
4. Add authentication

---

## 💡 Tips

**Keep It Simple**
- Don't worry about perfect code yet
- Focus on getting navigation working
- Polish the UI later

**Test on Mobile**
- Use Chrome DevTools responsive mode
- Test all breakpoints
- Ensure touch targets are big enough

**Show Progress**
- Take screenshots at each step
- Demo to stakeholders early
- Get feedback before adding features

**Iterate Fast**
- Build → Test → Adjust → Repeat
- Don't get stuck on one feature
- Move forward, refine later

---

**You got this! Start with Step 1 and work through sequentially. In 4 hours you'll have a working, demoable prototype. 🚀**
