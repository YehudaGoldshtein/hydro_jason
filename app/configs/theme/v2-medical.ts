/**
 * Theme Version 2: "Medical Trust" Color Palette
 * 
 * Color Strategy: Professional, trustworthy, medical-grade appearance
 * Target Emotion: Safety, reliability, medical authority, trust
 * 
 * Created: Dec 2025
 * Status: Medical/health-focused theme
 * Use Case: Health-conscious messaging, pediatrician recommendations
 */

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: {
      main: '#2A5C82',      // Deep Medical Blue (trust, professionalism)
      light: '#4A7BA7',     // Lighter blue variant
      lighter: '#E1F5FE',   // Soft Sky Blue (calm, clean)
      dark: '#1A4568',      // Darker blue for hover states
    },
    
    // Text Colors
    text: {
      primary: '#1A365D',   // Dark Navy (strong, authoritative)
      secondary: '#4A5568', // Slate Gray (readable, professional)
      muted: '#A0AEC0',     // Light Gray (subtle)
      price: '#2A5C82',     // Medical Blue (trustworthy)
    },
    
    // Background Colors
    background: {
      page: '#F7FAFC',      // Very Light Gray (clean, clinical)
      card: '#FFFFFF',      // Pure White (sterile, clean)
      hover: '#EDF2F7',     // Soft Gray (subtle interaction)
      alt: '#E6F7FF',       // Light Blue Tint (calm background)
    },
    
    // Border Colors
    border: {
      default: '#E2E8F0',   // Light Gray Border (clean)
      selected: '#4A7BA7',  // Light Blue (selected state)
      divider: '#CBD5E0',   // Medium Gray (clear separation)
    },
    
    // UI Element Colors
    ui: {
      radioUnchecked: '#CBD5E0',  // Gray (unchecked state)
      starRating: '#F59E0B',       // Amber (ratings)
      success: '#10B981',          // Medical Green (success, checkmarks)
      announcement: '#3B82F6',     // Bright Blue (announcements)
      sellingBg: '#DBEAFE',        // Very Light Blue (highlights)
      iconBg: '#E0F2FE',           // Light Blue (icon backgrounds)
      iconColor: '#0284C7',        // Sky Blue (icon color)
      tag: '#BFDBFE',              // Light Blue Tag
      whatsapp: '#25D366',         // WhatsApp Green (unchanged)
    },
    
    // Gradient (for buttons and highlights)
    gradient: {
      from: '#2563EB',     // Blue 600
      via: '#3B82F6',      // Blue 500
      to: '#60A5FA',       // Blue 400
    },
  },
  
  // Shadow values (more subtle, professional)
  shadows: {
    card: '0 4px 20px rgba(42, 92, 130, 0.08)',
    button: '0 4px 12px rgba(42, 92, 130, 0.25)',
    buttonHover: '0 6px 16px rgba(42, 92, 130, 0.35)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  
  // Border radius values (slightly sharper for professional look)
  radius: {
    card: '12px',
    pill: '9999px',
    rounded: '8px',
  },
  
  // Typography
  typography: {
    fontFamily: {
      main: "'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      // Future: Add support for heading fonts, monospace, etc.
      // heading: "'Heebo', sans-serif",
    },
    googleFonts: [
      // Fonts to load from Google Fonts
      // Heebo is more professional and works excellently for Hebrew medical content
      { name: 'Heebo', weights: [300, 400, 500, 600, 700] },
    ],
  },
};

export type Theme = typeof theme;











