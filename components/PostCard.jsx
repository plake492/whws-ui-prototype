'use client';

import { Card, CardContent, Typography, Avatar, Stack, Chip, Box } from '@mui/material';
import { Comment, ThumbUp } from '@mui/icons-material';
import Link from 'next/link';
import { getUserById, getCommunityById } from '@/lib/dummyData';
import { formatTimeAgo } from '@/utils/formatTime';

export default function PostCard({ post }) {
  const author = getUserById(post.authorId);
  const community = getCommunityById(post.communityId);

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
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={author?.avatar} alt={author?.displayName} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {author?.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posted in {community?.name} • {formatTimeAgo(post.createdAt)}
            </Typography>
          </Box>
          <Chip label={post.type.toLowerCase()} size="small" color={getPostTypeColor(post.type)} />
        </Stack>

        <Link href={`/communities/${community?.slug}/${post.id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.content.substring(0, 150)}...
          </Typography>
        </Link>

        <Stack direction="row" spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Comment fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {post.commentCount} comments
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbUp fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {post.reactionCount} helpful
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
