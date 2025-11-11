# Development Setup

This guide will help you set up your development environment for the WHWS Learning RAG UI project.

## Prerequisites

- Node.js 18+
- Yarn package manager
- VS Code editor

## Initial Setup

Run the initialization script to install dependencies and VS Code extensions:

```bash
yarn init
```

This command will:

1. Install all project dependencies
2. Auto-install recommended VS Code extensions
3. Start Dev server

After running this, **reload VS Code** to activate the extensions.

## Manual Extension Installation

If you prefer to install extensions manually or the auto-install fails, you can:

1. Open VS Code Command Palette (`Cmd+Shift+P`)
2. Type "Extensions: Show Recommended Extensions"
3. Install the workspace recommendations

Or install individually:

```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
```

## Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run ESLint
yarn lint

# Format all files with Prettier
yarn format

# Check if files are formatted correctly
yarn format:check
```

## Code Formatting

This project uses **Prettier** for code formatting and **ESLint** for code quality.

### Automatic Formatting on Save

The workspace is configured to automatically:

1. Format code with Prettier on save
2. Apply ESLint fixes on save

This is configured in `.vscode/settings.json` and will override your user settings for this workspace.

### Formatting Rules

- **Print Width**: 120 characters
- **Tab Width**: 2 spaces
- **Quotes**: Single quotes for JavaScript/TypeScript, double quotes for JSX
- **Semicolons**: Always required
- **Trailing Commas**: ES5 compatible
- **Arrow Function Parentheses**: Always included

### Manual Formatting

If auto-format on save isn't working:

1. **Format entire file**: `Shift+Option+F` (or right-click → Format Document)
2. **Format selection**: Select code, then `Cmd+K Cmd+F`
3. **Check Prettier is set as formatter**:
   - Open a file
   - `Cmd+Shift+P` → "Format Document With..."
   - Select "Prettier - Code formatter"
   - Check "Configure Default Formatter"

## Troubleshooting

### Formatting not working on save

1. Ensure Prettier extension is installed: Check Extensions panel
2. Reload VS Code: `Cmd+Shift+P` → "Developer: Reload Window"
3. Check output panel: `Cmd+Shift+U` → Select "Prettier" from dropdown
4. Verify `.prettierrc` exists in project root

### ESLint not showing errors

1. Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Check ESLint output: `Cmd+Shift+U` → Select "ESLint" from dropdown
3. Ensure ESLint extension is installed and enabled

### Extensions not auto-installing

Make sure the `code` command is available in your terminal:

```bash
# Test if code command works
code --version

# If not found, open VS Code Command Palette and run:
# "Shell Command: Install 'code' command in PATH"
```

## Project Structure

```
learning-rag-ui/
├── app/                    # Next.js app directory
├── components/             # React components
├── public/                 # Static assets
├── utils/                  # Utility functions
├── scripts/                # Build and setup scripts
├── .vscode/                # VS Code workspace settings
│   ├── extensions.json     # Recommended extensions
│   └── settings.json       # Workspace settings
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore patterns
├── eslint.config.mjs       # ESLint configuration
├── theme.ts                # MUI theme configuration
└── package.json            # Dependencies and scripts
```

## Tech Stack

- **Framework**: Next.js 16
- **React**: 19.2
- **UI Library**: Material-UI (MUI) 7
- **Styling**: Emotion + CSS-in-JS
- **TypeScript**: 5.x
- **Linting**: ESLint 9 with flat config
- **Formatting**: Prettier 3

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
