'use client';

import { useState } from 'react';
import { Container, Box, Stack, Paper, Typography, Alert } from '@mui/material';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import { sendChatMessageStream, ChatMessage as ApiChatMessage, StreamChunk } from '@/utils/api';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: StreamChunk['sources'];
  isStreaming?: boolean;
}

export default function ChatAltPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      await sendChatMessageStream(content, history, {
        onChunk: (chunk: string) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        },
        onSources: (sources) => {
          // Deduplicate sources based on content and source URL
          const deduplicatedSources = sources?.reduce((acc, source) => {
            const isDuplicate = acc.some(
              (existing) =>
                existing.content === source.content &&
                existing.metadata.source === source.metadata.source
            );
            if (!isDuplicate) {
              acc.push(source);
            }
            return acc;
          }, [] as typeof sources);

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId ? { ...msg, sources: deduplicatedSources } : msg
            )
          );
        },
        onComplete: () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId ? { ...msg, isStreaming: false } : msg
            )
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

  return (
    <Box
      sx={{
        height: '100dvh',
        width: '100dvw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <Paper
        component="header"
        elevation={2}
        sx={(theme) => ({
          width: '100%',
          backgroundColor: theme.palette.accent.yellow,
          borderRadius: 0,
          p: 2,
          zIndex: 10,
        })}
      >
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            AI Chat Assistant
          </Typography>
        </Container>
      </Paper>

      {/* Main Chat Area */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          py: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <ChatMessages messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </Stack>
      </Container>
    </Box>
  );
}
