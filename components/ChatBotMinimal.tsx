'use client';

import { useState } from 'react';
import {
  Container,
  Box,
  Stack,
  Paper,
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
import { collections, makeMachineName } from '@/lib/collections';
import { CollectionOptions } from '@/types';
import AddIcon from '@mui/icons-material/Add';

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

const SUGGESTED_PROMPTS = {
  menopause: [
    'What are the common symptoms of menopause?',
    'How can I manage hot flashes?',
    'What lifestyle changes help with menopause?',
    'When should I talk to my doctor about menopause?',
  ],
  breast_cancer: [
    'What are the early signs of breast cancer?',
    'How often should I get a mammogram?',
    'What are the risk factors for breast cancer?',
    'What should I know about breast cancer prevention?',
  ],
};

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([INITAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collectionSelected, setCollectionSelected] = useState<'menopause' | 'breast_cancer'>('menopause');
  const [pendingCollection, setPendingCollection] = useState<CollectionOptions | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSendMessage = async (content: string) => {
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
      setCollectionSelected(collection);
    }
  };

  const handleConfirmSwitch = () => {
    if (pendingCollection) {
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

  return (
    <Box
      sx={({ palette }) => ({
        height: '100dvh',
        width: '100dvw',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        maxHeight: '900px',
        position: 'relative',
      })}
      className="primary-gradient"
    >
      {/* Main Chat Area */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <ChatMessages
          messages={messages}
          preventScroll
          showPlaceholder
          scrollOnResponse
          suggestedPrompts={SUGGESTED_PROMPTS[collectionSelected]}
          onPromptClick={handleSendMessage}
          onRetry={handleSendMessage}
        />
      </Container>

      {/* Footer */}
      <Container>
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
              borderRadius: '12px',
              bgcolor: palette.accent.yellow,
              width: '100%',
              mb: 4,
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
      </Container>

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
    </Box>
  );
}
