'use client';

import { useState } from 'react';
import { Container, Box, Stack, Paper, Typography, Alert, Button } from '@mui/material';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import { sendChatMessageStream, ChatMessage as ApiChatMessage, StreamChunk } from '@/utils/api';
import AddIcon from '@mui/icons-material/Add';
import { colors } from '@/theme/colors';

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

const SUGGESTED_PROMPTS = [
  'What are the common symptoms of menopause?',
  'How can I manage hot flashes?',
  'What lifestyle changes help with menopause?',
  'When should I talk to my doctor about menopause?',
];

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([INITAL_MESSAGE]);
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
      className="animated-gradient"
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
          suggestedPrompts={SUGGESTED_PROMPTS}
          onPromptClick={handleSendMessage}
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
              borderRadius: 10,
              bgcolor: palette.accent.yellow,
              width: '100%',
              mb: 4,
            })}
          >
            <Container maxWidth="lg">
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </Container>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
