'use client';

import { useState, KeyboardEvent } from 'react';
import { TextField, Button, Stack, Paper } from '@mui/material';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        variant="outlined"
        disabled={disabled}
        sx={({ palette }) => ({
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary.dark,
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            borderColor: palette.primary.dark,
          },
        })}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        sx={{
          minWidth: '100px',
          height: '56px',
          borderRadius: 2,
        }}
      >
        {disabled ? 'Sending...' : 'Send'}
      </Button>
    </Stack>
  );
}
