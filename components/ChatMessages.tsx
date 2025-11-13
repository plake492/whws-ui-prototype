'use client';

import { useRef, useEffect } from 'react';
import { Box, Paper, Typography, Stack, Chip, Collapse, Link } from '@mui/material';
import { Message } from '../app/chat/page';
import { Pallet } from '@mui/icons-material';

interface ChatMessagesProps {
  messages: Message[];
  preventScroll?: boolean;
  showPlaceholder?: boolean;
  scrollOnResponse?: boolean;
  suggestedPrompts?: string[];
  onPromptClick?: (prompt: string) => void;
}

export default function ChatMessages({
  messages,
  preventScroll,
  showPlaceholder,
  scrollOnResponse,
  suggestedPrompts,
  onPromptClick,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

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
        messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
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
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.content || (message.isStreaming ? '' : 'No response')}
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
                            key={idx}
                            elevation={0}
                            sx={{
                              p: 1.5,
                              bgcolor: isUser ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
                              borderRadius: 1,
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
            </Box>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
}
