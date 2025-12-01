import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CardActions,
  Button,
} from '@mui/material';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date | string;
  };
  author?: {
    id: string;
    displayName: string;
    avatar?: string;
  };
}

export default function PostCard({ post, author }: PostCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar src={author?.avatar} sx={{ mr: 1 }} />
          <Typography variant="body2">{author?.displayName || 'Anonymous'}</Typography>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Post</Button>
      </CardActions>
    </Card>
  );
}
