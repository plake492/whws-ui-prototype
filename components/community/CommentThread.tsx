'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';
import { Favorite, FavoriteBorder, Reply, Delete } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  heartCount: number;
  isEdited: boolean;
  isDeleted: boolean;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  hearts: Array<{ userId: string }>;
  replies?: Comment[];
}

interface CommentThreadProps {
  postId: string;
  currentUserId: string;
}

export function CommentThread({ postId, currentUserId }: CommentThreadProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`);
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      });

      if (res.ok) {
        setNewComment('');
        fetchComments(); // Refresh
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: replyContent,
          parentId,
        }),
      });

      if (res.ok) {
        setReplyContent('');
        setReplyingTo(null);
        fetchComments(); // Refresh
      }
    } catch (error) {
      console.error('Failed to post reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleHeart = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}/heart`, {
        method: 'POST',
      });

      if (res.ok) {
        fetchComments(); // Refresh to update heart counts
      }
    } catch (error) {
      console.error('Failed to toggle heart:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchComments(); // Refresh
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* New Comment Input */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={handleSubmitComment}
          disabled={!newComment.trim() || submitting}
          sx={{ mt: 1 }}
        >
          {submitting ? <CircularProgress size={20} /> : 'Post Comment'}
        </Button>
      </Box>

      {/* Comments List */}
      <Stack spacing={3}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
            onToggleHeart={handleToggleHeart}
            onDelete={handleDeleteComment}
            onReply={(id) => setReplyingTo(id)}
            replyingTo={replyingTo}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            onSubmitReply={handleSubmitReply}
            submitting={submitting}
          />
        ))}
      </Stack>

      {comments.length === 0 && (
        <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
          No comments yet. Be the first to share your thoughts!
        </Typography>
      )}
    </Box>
  );
}

// Individual Comment Component
interface CommentItemProps {
  comment: Comment;
  currentUserId: string;
  onToggleHeart: (id: string) => void;
  onDelete: (id: string) => void;
  onReply: (id: string) => void;
  replyingTo: string | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  onSubmitReply: (parentId: string) => void;
  submitting: boolean;
  isNested?: boolean;
}

function CommentItem({
  comment,
  currentUserId,
  onToggleHeart,
  onDelete,
  onReply,
  replyingTo,
  replyContent,
  setReplyContent,
  onSubmitReply,
  submitting,
  isNested = false,
}: CommentItemProps) {
  const isHearted = comment.hearts.some((h) => h.userId === currentUserId);
  const isAuthor = comment.author.id === currentUserId;
  const showReplyInput = replyingTo === comment.id;

  return (
    <Box
      sx={{
        ml: isNested ? 6 : 0, // Indent nested comments
        pl: isNested ? 2 : 0,
        borderLeft: isNested ? '2px solid' : 'none',
        borderColor: isNested ? 'divider' : 'transparent',
      }}
    >
      {/* Comment Header */}
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <Avatar
          src={comment.author.avatarUrl}
          alt={comment.author.name}
          sx={{ width: isNested ? 32 : 40, height: isNested ? 32 : 40 }}
        />

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {comment.author.name}
            </Typography>
            {comment.isEdited && <Chip label="edited" size="small" variant="outlined" sx={{ height: 18 }} />}
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </Typography>
          </Box>

          {/* Comment Content */}
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: comment.isDeleted ? 'text.disabled' : 'text.primary',
              fontStyle: comment.isDeleted ? 'italic' : 'normal',
            }}
          >
            {comment.content}
          </Typography>

          {/* Comment Actions */}
          {!comment.isDeleted && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Heart Button */}
              <Button
                size="small"
                startIcon={isHearted ? <Favorite /> : <FavoriteBorder />}
                onClick={() => onToggleHeart(comment.id)}
                sx={{
                  minWidth: 'auto',
                  color: isHearted ? 'error.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: 'error.main',
                  },
                }}
              >
                {comment.heartCount > 0 && comment.heartCount}
              </Button>

              {/* Reply Button (only on top-level comments) */}
              {!isNested && (
                <Button
                  size="small"
                  startIcon={<Reply />}
                  onClick={() => onReply(comment.id)}
                  sx={{ color: 'text.secondary' }}
                >
                  Reply
                </Button>
              )}

              {/* Delete Button (only author) */}
              {isAuthor && (
                <IconButton size="small" onClick={() => onDelete(comment.id)} sx={{ color: 'text.secondary' }}>
                  <Delete fontSize="small" />
                </IconButton>
              )}
            </Box>
          )}

          {/* Reply Input */}
          {showReplyInput && !isNested && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder={`Reply to ${comment.author.name}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => onSubmitReply(comment.id)}
                  disabled={!replyContent.trim() || submitting}
                >
                  {submitting ? <CircularProgress size={16} /> : 'Reply'}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    onReply(null as any);
                    setReplyContent('');
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onToggleHeart={onToggleHeart}
              onDelete={onDelete}
              onReply={onReply}
              replyingTo={replyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              onSubmitReply={onSubmitReply}
              submitting={submitting}
              isNested={true}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
