/**
 * Theme Version 1: "Warm Peach" Color Palette
 * 
 * Color Strategy: Warm, family-friendly, soft peach/coral with muted browns
 * Target Emotion: Comfort, trust, warmth
 * 
 * Created: Dec 2025
 * Status: Active baseline
 */

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: {
      main: '#e07a63',      // Main brand color (peach/coral)
      light: '#f2a085',     // Lighter variant
      lighter: '#e5b7a3',   // Even lighter
      dark: '#c45f4c',      // Darker variant for hover states
    },
    
    // Text Colors
    text: {
      primary: '#52423d',   // Main text (dark brown)
      secondary: '#7a6c66', // Secondary text (lighter brown)
      muted: '#b9a9a2',     // Muted/disabled text
      price: '#5c4b43',     // Price display
    },
    
    // Background Colors
    background: {
      page: '#fff6f2',      // Main page background (soft peach)
      card: '#ffffff',      // Card background (white)
      hover: '#f7f7f7',     // Hover state background
      alt: '#fff3ed',       // Alternative surface color
    },
    
    // Border Colors
    border: {
      default: '#f2e3dd',   // Default border
      selected: '#e5b7a3',  // Selected state border
      divider: '#f0e2dc',   // Divider lines
    },
    
    // UI Element Colors
    ui: {
      radioUnchecked: '#cdb9b1',  // Radio button unchecked
      starRating: '#fbbf24',       // Star rating gold
      success: '#34d399',          // Success/checkmark green
      announcement: '#ddb3a5',     // Announcement bar
      sellingBg: '#ffe7dc',        // Selling points background
      iconBg: '#f7e6dc',           // Icon background
      iconColor: '#d5ab9a',        // Icon color
      tag: '#fce9de',              // Tag background
      whatsapp: '#25D366',         // WhatsApp green
    },
    
    // Gradient (for buttons and highlights)
    gradient: {
      from: '#de7e63',
      via: '#e79a7b',
      to: '#e9a481',
    },
  },
  
  // Shadow values (optional - can override Tailwind defaults)
  shadows: {
    card: '0 10px 30px rgba(0,0,0,0.06)',
    button: '0 6px 16px rgba(224,122,99,0.35)',
    buttonHover: '0 8px 20px rgba(224,122,99,0.45)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  
  // Border radius values
  radius: {
    card: '16px',
    pill: '9999px',
    rounded: '12px',
  },
  
  // Typography
  typography: {
    fontFamily: {
      main: "'Assistant', 'Heebo', 'Rubik', sans-serif",
      // Future: Add support for heading fonts, monospace, etc.
      // heading: "'Assistant', 'Heebo', 'Rubik', sans-serif",
    },
    googleFonts: [
      // Fonts to load from Google Fonts
      { name: 'Assistant', weights: [400, 500, 600, 700] },
      { name: 'Heebo', weights: [400, 500, 600, 700] },
      { name: 'Rubik', weights: [400, 500, 600, 700] },
    ],
  },
};

export type Theme = typeof theme;

