'use client';

import { useState, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Container,
  Box,
  Stack,
  Paper,
  Typography,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import { sendChatMessageStream, ChatMessage as ApiChatMessage, StreamChunk } from '@/utils/api';
import AddIcon from '@mui/icons-material/Add';
import { collections, makeMachineName, makeReadableName } from '@/lib/collections';
import { CollectionOptions } from '@/types';
import Link from 'next/link';
import { Analytics } from '@/lib/analytics';
import { usePageTracking } from '@/hooks/usePageTracking';
import { useScrollTracking } from '@/hooks/useScrollTracking';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: StreamChunk['sources'];
  isStreaming?: boolean;
}
const INITAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: 'Hello! How can I help you today?',
  timestamp: new Date(),
};

export default function Component() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([INITAL_MESSAGE]);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collectionSelected, setCollectionSelected] = useState<'menopause' | 'breast_cancer'>('menopause');
  const [pendingCollection, setPendingCollection] = useState<CollectionOptions | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  usePageTracking(user?.id, collectionSelected);
  useScrollTracking(user?.id, collectionSelected);

  const handleSendMessage = async (content: string) => {
    if (!hasStartedChat) {
      Analytics.trackChatStart(user?.id, collectionSelected);
      setHasStartedChat(true);
    }

    Analytics.trackChatMessage(user?.id, collectionSelected, content.length);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Create a placeholder message for the streaming response
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Convert messages to API format
      const history: ApiChatMessage[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send message to API with streaming
      await sendChatMessageStream(content, history, collectionSelected, {
        onChunk: (chunk: string) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: msg.content + chunk } : msg))
          );
        },
        onSources: (sources) => {
          // Deduplicate sources based on content and source URL
          const deduplicatedSources = sources?.reduce(
            (acc, source) => {
              const isDuplicate = acc.some(
                (existing) => existing.content === source.content && existing.metadata.source === source.metadata.source
              );
              if (!isDuplicate) {
                acc.push(source);
              }
              return acc;
            },
            [] as typeof sources
          );

          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, sources: deduplicatedSources } : msg))
          );
        },
        onComplete: () => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg))
          );
          setIsLoading(false);
        },
        onError: (err) => {
          console.error('Streaming error:', err);
          const errorMessage = err.message || 'Failed to get response from server';
          setError(errorMessage);

          // Update the message with error
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: `Sorry, I encountered an error: ${errorMessage}. Please make sure the API server is running on localhost:3000.`,
                    isStreaming: false,
                  }
                : msg
            )
          );
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = (err as { message?: string }).message || 'Failed to get response from server';
      setError(errorMessage);

      // Update the message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: `Sorry, I encountered an error: ${errorMessage}. Please make sure the API server is running on localhost:3000.`,
                isStreaming: false,
              }
            : msg
        )
      );
      setIsLoading(false);
    }
  };

  const newChat = () => {
    setMessages([INITAL_MESSAGE]);
  };

  const handleCollectionClick = (collection: CollectionOptions) => {
    // If it's the same collection, do nothing
    if (collection === collectionSelected) return;

    // If there are messages beyond the initial one, show confirmation
    if (messages.length > 1) {
      setPendingCollection(collection);
      setShowConfirmDialog(true);
    } else {
      // No messages yet, just switch
      Analytics.trackTopicSwitch(user?.id, collectionSelected, collection);
      setCollectionSelected(collection);
    }
  };

  const handleConfirmSwitch = () => {
    if (pendingCollection) {
      Analytics.trackTopicSwitch(user?.id, collectionSelected, pendingCollection);
      setCollectionSelected(pendingCollection);
      setMessages([INITAL_MESSAGE]);
      setPendingCollection(null);
    }
    setShowConfirmDialog(false);
  };

  const handleCancelSwitch = () => {
    setPendingCollection(null);
    setShowConfirmDialog(false);
  };

  // TODO Make social sidebar?
  return (
    <Stack flexDirection={'row'} sx={{ height: '100dvh', width: '100dvw' }}>
      {/* <Box sx={{ height: '100%', width: '275px', bgcolor: 'navy' }}></Box> */}
      <Box
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          flex: 1,
        }}
        className="primary-gradient"
      >
        {/* Header */}
        <Paper
          component="header"
          elevation={0}
          sx={({ palette }) => ({
            width: '100%',
            bgcolor: palette.accent.yellow,
            p: 2,
            zIndex: 10,
          })}
        >
          <Container maxWidth="lg">
            <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
              <Button
                variant="text"
                component={Link}
                href="/"
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  WHWS
                </Typography>
              </Button>
              <Typography
                variant="h4"
                sx={({ palette }) => ({
                  color: palette.primary.light,
                })}
              >
                {`${makeReadableName(collectionSelected)} - AI Chat Assistant`.toUpperCase()}
              </Typography>
            </Stack>
          </Container>
        </Paper>

        {/* Main Chat Area */}
        <Container
          component="main"
          // maxWidth="lg"
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <ChatMessages messages={messages} onRetry={handleSendMessage} />
        </Container>

        {/* Footer */}
        <Box>
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Paper
            elevation={0}
            sx={({ palette }) => ({
              p: 2,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              bgcolor: palette.accent.yellow,
              width: '100%',
            })}
          >
            <Container maxWidth="lg">
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
              <Stack flexDirection={'row'} gap={2} mt={2} alignItems={'center'}>
                {collections.map((collection: string) => (
                  <Button
                    key={collection}
                    sx={({ palette }) => ({
                      borderRadius: '12px',
                      borderColor: palette.primary.dark,
                    })}
                    variant={collectionSelected === makeMachineName(collection) ? 'contained' : 'outlined'}
                    className={makeMachineName(collection)}
                    onClick={() => handleCollectionClick(makeMachineName(collection) as CollectionOptions)}
                  >
                    {collection}
                  </Button>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ borderRadius: '12px', ml: 'auto' }}
                  onClick={newChat}
                >
                  New Chat
                </Button>
              </Stack>
            </Container>
          </Paper>
        </Box>
      </Box>
      {/* <Box sx={{ height: '100%', maxWidth: '275px', overflow: 'hidden' }} className="primary-gradient"></Box> */}

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={handleCancelSwitch}>
        <DialogTitle>Switch Topic?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Switching topics will clear your current conversation. Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSwitch}>Cancel</Button>
          <Button onClick={handleConfirmSwitch} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
