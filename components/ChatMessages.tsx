'use client';

import { useRef, useEffect } from 'react';
import { Box, Paper, Typography, Stack, Chip, Collapse, Link } from '@mui/material';
import { Message } from '../app/chat/page';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
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
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: 'flex',
            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          <Paper
            elevation={1}
            sx={{
              maxWidth: '70%',
              p: 2,
              bgcolor: message.role === 'user' ? 'primary.main' : 'background.cream',
              color: message.role === 'user' ? 'white' : 'text.primary',
              borderRadius: 2,
            }}
          >
            <Stack spacing={1}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  opacity: 0.8,
                  letterSpacing: '0.05em',
                }}
              >
                {message.role === 'user' ? 'You' : 'Assistant'}
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
                          bgcolor: message.role === 'user' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
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
                              color: message.role === 'user' ? 'white' : 'primary.main',
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
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
}
