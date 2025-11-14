'use client';

import { useRef, useEffect, useState } from 'react';
import { Box, Paper, Typography, Stack, Chip, Collapse, Link, IconButton, Tooltip } from '@mui/material';
import { Message } from '../app/chat/page';

import RefreshIcon from '@mui/icons-material/Refresh';

interface ChatMessagesProps {
  messages: Message[];
  preventScroll?: boolean;
  showPlaceholder?: boolean;
  scrollOnResponse?: boolean;
  suggestedPrompts?: string[];
  onPromptClick?: (prompt: string) => void;
  onRetry?: (messageContent: string) => void;
}

export default function ChatMessages({
  messages,
  preventScroll,
  showPlaceholder,
  scrollOnResponse,
  suggestedPrompts,
  onPromptClick,
  onRetry,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);
  const [hoveredSourceIndex, setHoveredSourceIndex] = useState<number | null>(null);

  // Function to parse content and replace [n] with clickable links
  const parseContentWithSources = (content: string, messageId: string, sources?: Message['sources']) => {
    const parts = content.split(/(\[\d+\])/g);

    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const sourceNum = parseInt(match[1]);
        const sourceIndex = sourceNum - 1;
        const sourceUrl = sources?.[sourceIndex]?.metadata?.source;

        return (
          <Box
            key={`${messageId}-${index}`}
            component="a"
            href={typeof sourceUrl === 'string' ? sourceUrl : `#source-${messageId}-${sourceNum}`}
            target={typeof sourceUrl === 'string' ? '_blank' : undefined}
            rel={typeof sourceUrl === 'string' ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setHoveredSourceIndex(sourceIndex)}
            onMouseLeave={() => setHoveredSourceIndex(null)}
            sx={{
              display: 'inline',
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {part}
          </Box>
        );
      }
      return part;
    });
  };

  const scrollToBottom = () => {
    if (!preventScroll) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // For scrollOnResponse mode, only scroll when a new message is added
    if (scrollOnResponse) {
      if (messages.length > prevMessagesLengthRef.current) {
        // Scroll the container itself, not the whole page
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
      prevMessagesLengthRef.current = messages.length;
    } else {
      scrollToBottom();
    }
  }, [messages, scrollOnResponse]);

  // Show placeholder when there's only 1 message (the initial one) and showPlaceholder is true
  const shouldShowPlaceholder = showPlaceholder && messages.length === 1;

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        px: 2,
        py: 2,
        '@keyframes blink': {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
      }}
    >
      {shouldShowPlaceholder ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            Try it out
          </Typography>
          {suggestedPrompts && suggestedPrompts.length > 0 && (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              {suggestedPrompts.map((prompt, index) => (
                <Chip
                  key={index}
                  label={prompt}
                  onClick={() => onPromptClick?.(prompt)}
                  sx={({ palette }) => ({
                    px: 2,
                    py: 3,
                    height: 'auto',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    backgroundColor: palette.primary.light,
                    color: palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: palette.primary.main,
                    },
                    transition: 'all 0.2s ease',
                  })}
                />
              ))}
            </Stack>
          )}
        </Box>
      ) : (
        messages.map((message, index) => {
          const isUser = message.role === 'user';
          // Find the last user message before this message for retry
          const lastUserMessage = messages
            .slice(0, index + 1)
            .reverse()
            .find((m) => m.role === 'user');

          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                gap: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={({ palette }) => ({
                  maxWidth: isUser ? '70%' : '100%',
                  px: 4,
                  py: 1.5,
                  background: isUser
                    ? `linear-gradient(45deg, ${palette.primary.dark}, ${palette.primary.main} ,${palette.primary.light})`
                    : 'transparent',
                  color: isUser ? 'white' : 'text.primary',
                  borderRadius: 2,
                })}
              >
                <Stack spacing={1} display={isUser ? 'flex' : 'block'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        opacity: 0.8,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {isUser ? 'You' : 'Assistant'}
                      {message.isStreaming && (
                        <Chip label="Typing..." size="small" sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} />
                      )}
                    </Typography>
                    {/* Try Again Button for Assistant */}
                    {!isUser && onRetry && lastUserMessage && !message.isStreaming && (
                      <Tooltip title="Try again">
                        <IconButton
                          size="small"
                          onClick={() => onRetry(lastUserMessage.content)}
                          sx={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            opacity: 0.7,
                            '&:hover': {
                              opacity: 1,
                              background: 'rgba(255, 255, 255, 0.15)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <RefreshIcon sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content
                      ? parseContentWithSources(message.content, message.id, message.sources)
                      : message.isStreaming
                        ? ''
                        : 'No response'}
                    {message.isStreaming && !message.content && (
                      <Box component="span" sx={{ animation: 'blink 1.5s infinite' }}>
                        ▋
                      </Box>
                    )}
                  </Typography>

                  {/* Sources Section */}
                  {message.sources && message.sources.length > 0 && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          mb: 1,
                          display: 'block',
                        }}
                      >
                        Sources ({message.sources.length})
                      </Typography>
                      <Stack spacing={1}>
                        {message.sources.map((source, idx) => (
                          <Paper
                            id={`source-${message.id}-${idx + 1}`}
                            key={idx}
                            elevation={0}
                            sx={{
                              p: 1.5,
                              bgcolor: isUser ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
                              borderRadius: 1,
                              transition: 'all 0.2s ease',
                              border: hoveredSourceIndex === idx ? '2px solid' : '2px solid transparent',
                              borderColor: hoveredSourceIndex === idx ? 'primary.main' : 'transparent',
                              transform: hoveredSourceIndex === idx ? 'scale(1.02)' : 'scale(1)',
                            }}
                          >
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                              {typeof source.metadata.title === 'string' && source.metadata.title && (
                                <strong>{String(source.metadata.title)}</strong>
                              )}
                              {typeof source.metadata.organization === 'string' && source.metadata.organization && (
                                <> - {String(source.metadata.organization)}</>
                              )}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '0.75rem',
                                opacity: 0.9,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {source.content}
                            </Typography>
                            {typeof source.metadata.source === 'string' && source.metadata.source && (
                              <Link
                                href={String(source.metadata.source)}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  fontSize: '0.7rem',
                                  display: 'block',
                                  mt: 0.5,
                                  color: isUser ? 'white' : 'primary.main',
                                }}
                              >
                                View Source →
                              </Link>
                            )}
                          </Paper>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  <Typography variant="caption" sx={{ opacity: 0.7, textAlign: 'right' }}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Stack>
              </Paper>
              {/* Try Again Button for User Messages Only */}
              {isUser && onRetry && lastUserMessage && !message.isStreaming && (
                <Tooltip title="Try again">
                  <IconButton
                    size="small"
                    onClick={() => onRetry(lastUserMessage.content)}
                    sx={{
                      opacity: 0.6,
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
}
