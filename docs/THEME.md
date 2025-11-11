# WHWS Theme Files

## Overview
These theme files were created for the Women's Health & Wellness Society (WHWS) website. Since direct access to the site's source code was limited, this theme is based on:

1. The content and messaging visible on the site
2. Best practices for women's health organization branding
3. Accessible, warm, and professional design patterns

## Files Included

### 1. `theme.ts` - MUI Theme Configuration
A complete Material-UI (MUI) theme file with:
- **Color Palette**: Warm, professional colors emphasizing trust and wellness
- **Typography**: Playfair Display for elegant headings, Inter for clean body text
- **Component Overrides**: Custom styling for buttons, cards, chips, and more
- **Responsive Breakpoints**: Mobile-first responsive design

### 2. `global.css` - Global Styles
Comprehensive CSS including:
- CSS custom properties (variables) for consistent theming
- Modern CSS reset
- Typography scales with fluid responsive sizing
- Utility classes for spacing, text, and layout
- Reusable component styles (buttons, cards, sections)
- Accessibility features and focus states
- Animations and transitions
- Print styles

## Color Palette

### Primary Colors
- **Primary Purple**: `#7B4B94` - Wisdom, trust, wellness
- **Secondary Rose**: `#E8A5A5` - Warm, compassionate, approachable
- **Tertiary Teal**: `#6B9B9E` - Calming, healing, balanced

### Semantic Colors
- **Success**: `#5B9B5F`
- **Error**: `#D84A4A`
- **Warning**: `#E8A84A`
- **Info**: `#4A8BD8`

### Background & Text
- **Background**: `#FDFBF9` (warm off-white)
- **Surface**: `#FFFFFF`
- **Text Primary**: `#2C2C2C`
- **Text Secondary**: `#5A5A5A`

## Typography

### Font Families
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-primary: 'Inter', system-ui, sans-serif;
```

### Font Scales
- **H1**: 3.5rem (56px) - Display titles
- **H2**: 2.75rem (44px) - Section headers
- **H3**: 2.25rem (36px) - Subsection headers
- **H4**: 1.75rem (28px) - Card titles
- **Body**: 1rem (16px) - Body text
- **Caption**: 0.75rem (12px) - Small text

## Installation & Usage

### For React/MUI Projects

1. **Install dependencies**:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

2. **Import Google Fonts** (add to your HTML `<head>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

3. **Import the theme**:
```typescript
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

4. **Import global CSS** (in your main file or `_app.tsx`):
```typescript
import './global.css';
```

### For Next.js Projects

Add to `_app.tsx` or `_app.jsx`:
```typescript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

## Component Examples

### Using Theme Colors
```tsx
import { Button, Typography, Box } from '@mui/material';

function Example() {
  return (
    <Box>
      <Typography variant="h1" color="primary">
        Welcome to WHWS
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Box>
  );
}
```

### Using CSS Utilities
```html
<div class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Communities</h2>
      <p class="section-subtitle">Connect with supportive peers</p>
    </div>
    
    <div class="grid grid-3 gap-lg">
      <div class="card">
        <h3 class="card-title">Menopause Support</h3>
        <p class="card-text">Expert guidance and community</p>
      </div>
      <!-- More cards -->
    </div>
  </div>
</div>
```

## Customization

### Adjusting Colors
Modify the palette in `theme.ts`:
```typescript
primary: {
  main: '#YOUR_COLOR',
  light: '#LIGHTER_SHADE',
  dark: '#DARKER_SHADE',
}
```

### Adjusting Typography
Change font families or sizes:
```typescript
typography: {
  fontFamily: 'Your Font, sans-serif',
  h1: {
    fontSize: '4rem',
  }
}
```

### CSS Variables
Easily customize the entire design by modifying CSS custom properties in `global.css`:
```css
:root {
  --color-primary: #YOUR_COLOR;
  --font-primary: 'Your Font', sans-serif;
  --spacing-md: 1.5rem;
}
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6+ JavaScript

## Notes

Since the actual site styling wasn't directly accessible, this theme represents:
- **Professional assumptions** based on women's health industry standards
- **Accessibility-first** design with WCAG compliance in mind
- **Modern best practices** for web applications
- **Flexibility** for customization

To get the exact colors and fonts from the actual site, you can:
1. Use browser DevTools to inspect elements
2. Check the Network tab for CSS files
3. Copy computed styles from the inspector
4. Update the theme files accordingly

## Resources
- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Fonts](https://fonts.google.com/)