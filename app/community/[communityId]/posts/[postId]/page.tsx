import { Suspense } from 'react';
import { Box, Container, Typography, Paper, Divider, CircularProgress } from '@mui/material';
import { CommentThread } from '@/components/community/CommentThread';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ communityId: string; postId: string }>;
}) {
  const { communityId, postId } = await params;
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get post
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
      community: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Post Content */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary">
          Posted by {post.author.name} • {post.commentCount} comments
        </Typography>
      </Paper>

      {/* Comments Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>

        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <CommentThread postId={post.id} currentUserId={session?.user?.id || ''} />
        </Suspense>
      </Paper>
    </Container>
  );
}
