import { Box } from '@mui/material';
import React from 'react';

interface RichTextRendererProps {
  content: any; // Tiptap JSON
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !content.content) {
    return null;
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    switch (node.type) {
      case 'paragraph':
        return <p key={index}>{node.content?.map((child: any, i: number) => renderNode(child, i))}</p>;

      case 'heading':
        const headingLevel = `h${node.attrs.level}`;
        return React.createElement(
          headingLevel,
          { key: index },
          node.content?.map((child: any, i: number) => renderNode(child, i))
        );

      case 'bulletList':
        return <ul key={index}>{node.content?.map((child: any, i: number) => renderNode(child, i))}</ul>;

      case 'orderedList':
        return <ol key={index}>{node.content?.map((child: any, i: number) => renderNode(child, i))}</ol>;

      case 'listItem':
        return <li key={index}>{node.content?.map((child: any, i: number) => renderNode(child, i))}</li>;

      case 'text':
        let text: React.ReactNode = node.text;

        if (node.marks) {
          node.marks.forEach((mark: any) => {
            if (mark.type === 'bold') {
              text = <strong>{text}</strong>;
            } else if (mark.type === 'italic') {
              text = <em>{text}</em>;
            } else if (mark.type === 'link') {
              text = (
                <a href={mark.attrs.href} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              );
            }
          });
        }

        return <React.Fragment key={index}>{text}</React.Fragment>;

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        '& p': { mb: 2 },
        '& h1, & h2, & h3': { mt: 3, mb: 2, fontWeight: 600 },
        '& ul, & ol': { pl: 3, mb: 2 },
        '& li': { mb: 1 },
        '& a': {
          color: 'primary.main',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        },
      }}
    >
      {content.content.map((node: any, index: number) => renderNode(node, index))}
    </Box>
  );
}
