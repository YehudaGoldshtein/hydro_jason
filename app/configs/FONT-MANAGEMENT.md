# 🔤 Font Management System

**Status:** ✅ Active  
**Updated:** December 21, 2025

---

## 📋 Overview

The font management system allows you to change the typography of the entire site by simply updating the font family in your theme configuration file. Fonts are automatically loaded from Google Fonts based on the theme configuration.

---

## 🎯 How It Works

### 1. **Theme Configuration**
Each theme file (`app/configs/theme/v*.ts`) contains a `typography` section:

```typescript
typography: {
  fontFamily: {
    main: "'Assistant', 'Heebo', 'Rubik', sans-serif",
  },
  googleFonts: [
    { name: 'Assistant', weights: [400, 500, 600, 700] },
    { name: 'Heebo', weights: [400, 500, 600, 700] },
    { name: 'Rubik', weights: [400, 500, 600, 700] },
  ],
},
```

### 2. **Automatic Font Loading**
`app/root.tsx` automatically generates the Google Fonts URL from the theme config:

```typescript
const googleFontsUrl = activeTheme.typography.googleFonts
  .map(font => {
    const weights = font.weights.join(';');
    return `family=${font.name}:wght@${weights}`;
  })
  .join('&');
```

### 3. **CSS Variable Injection**
The font family is injected as a CSS variable in `:root`:

```css
:root {
  --font-family-main: 'Assistant', 'Heebo', 'Rubik', sans-serif;
}
```

### 4. **Tailwind Integration**
Tailwind is configured to use the CSS variable:

```javascript
fontFamily: {
  sans: ['var(--font-family-main)', 'system-ui', 'sans-serif'],
}
```

### 5. **Body Application**
The font is applied to the entire site via the `<body>` tag:

```html
<body style={{ fontFamily: 'var(--font-family-main)' }}>
```

---

## 🚀 Usage

### Change the Font for Entire Site

**Option 1: Modify Existing Theme**

Edit `app/configs/theme/v1-peach.ts`:

```typescript
typography: {
  fontFamily: {
    main: "'Poppins', 'Roboto', sans-serif",  // ← Change this
  },
  googleFonts: [
    { name: 'Poppins', weights: [400, 500, 600, 700] },  // ← Add these
    { name: 'Roboto', weights: [400, 500, 600, 700] },
  ],
},
```

**Option 2: Create New Theme**

1. Create `app/configs/theme/v2-modern.ts`
2. Copy from `v1-peach.ts`
3. Update the `typography` section
4. Switch in `theme-active.ts`:

```typescript
import { theme } from './theme/v2-modern';
export const activeTheme = theme;
```

---

## 📚 Font Stacks for Different Languages

### Hebrew (Current)
```typescript
fontFamily: {
  main: "'Assistant', 'Heebo', 'Rubik', sans-serif",
}
```

**Google Fonts:**
- **Assistant** - Clean, modern Hebrew font
- **Heebo** - Versatile Hebrew font with excellent readability
- **Rubik** - Rounded, friendly Hebrew font

### English (International)
```typescript
fontFamily: {
  main: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
}
```

### Arabic (RTL)
```typescript
fontFamily: {
  main: "'Tajawal', 'Cairo', 'Noto Sans Arabic', sans-serif",
}
```

### Modern/Techy
```typescript
fontFamily: {
  main: "'Manrope', 'DM Sans', 'Space Grotesk', sans-serif",
}
```

### Classic/Elegant
```typescript
fontFamily: {
  main: "'Playfair Display', 'Lora', 'Merriweather', serif",
}
```

---

## 🔧 Advanced Configuration

### Multiple Font Families

You can extend the system to support different fonts for headings, body, and monospace:

```typescript
typography: {
  fontFamily: {
    main: "'Assistant', 'Heebo', sans-serif",
    heading: "'Frank Ruhl Libre', 'Varela Round', sans-serif",
    mono: "'Fira Code', 'JetBrains Mono', monospace",
  },
  googleFonts: [
    { name: 'Assistant', weights: [400, 500, 600, 700] },
    { name: 'Heebo', weights: [400, 500, 600, 700] },
    { name: 'Frank Ruhl Libre', weights: [400, 700] },
    { name: 'Fira Code', weights: [400, 500] },
  ],
},
```

Then update `root.tsx` to inject additional CSS variables:

```typescript
--font-family-main: ${activeTheme.typography.fontFamily.main};
--font-family-heading: ${activeTheme.typography.fontFamily.heading};
--font-family-mono: ${activeTheme.typography.fontFamily.mono};
```

And update `tailwind.config.cjs`:

```javascript
fontFamily: {
  sans: ['var(--font-family-main)', 'system-ui', 'sans-serif'],
  serif: ['var(--font-family-heading)', 'Georgia', 'serif'],
  mono: ['var(--font-family-mono)', 'Courier New', 'monospace'],
}
```

### Font Loading Optimization

**Preload Critical Fonts:**
Add to `root.tsx` links function:

```typescript
{
  rel: 'preload',
  href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&display=swap',
  as: 'style',
}
```

**Font Display Strategy:**
The current setup uses `&display=swap` which means:
- Text is displayed immediately in fallback font
- Custom font replaces it when loaded (prevents FOIT)

For faster perceived performance, consider `&display=optional` (but may not load on slow connections).

---

## 🎨 Font Weight Reference

Common weight values used in themes:

| Weight | Name       | Usage                     |
|--------|------------|---------------------------|
| 400    | Regular    | Body text                 |
| 500    | Medium     | Emphasized text, buttons  |
| 600    | Semibold   | Subheadings, labels       |
| 700    | Bold       | Headings, CTAs            |

Hebrew fonts typically work well with 400, 500, 600, and 700 weights.

---

## 🔍 Testing Your Fonts

### Visual Check
1. Change the font in your theme file
2. Reload the page
3. Inspect the `<body>` element in DevTools
4. Verify `font-family` is set correctly

### DevTools Check
```javascript
// In browser console
getComputedStyle(document.body).fontFamily
// Should return: "Assistant", "Heebo", "Rubik", sans-serif
```

### Network Check
1. Open DevTools → Network tab
2. Filter by "font"
3. Verify fonts are loading from Google Fonts
4. Check for any 404 errors

---

## 📊 Performance Considerations

### Current Setup (3 fonts)
- **Assistant:** ~23KB (woff2)
- **Heebo:** ~21KB (woff2)
- **Rubik:** ~22KB (woff2)
- **Total:** ~66KB

This is well within acceptable limits for web performance.

### Best Practices
1. **Limit Font Families:** Use 2-3 max
2. **Limit Weights:** Only load weights you actually use
3. **Subset Fonts:** For Hebrew-only sites, consider subsetting to Hebrew glyphs
4. **Use Variable Fonts:** Consider variable fonts for better performance (future enhancement)

---

## 🐛 Troubleshooting

### Font Not Loading

**Check 1: Verify CSS Variable**
```javascript
// Browser console
getComputedStyle(document.documentElement).getPropertyValue('--font-family-main')
```

**Check 2: Check Google Fonts URL**
View source and verify the Google Fonts `<link>` tag is correct.

**Check 3: Clear Cache**
Hard refresh (Ctrl+Shift+R) to clear browser cache.

### Font Looks Wrong

**Issue:** Font family is correct but looks different than expected.

**Solution:** Check if the font weights you're using match the weights you're loading from Google Fonts.

### FOUT (Flash of Unstyled Text)

**Issue:** Page loads with fallback font then switches to custom font.

**Solution:** This is expected behavior with `&display=swap`. To minimize:
1. Use similar fallback fonts (system-ui works well for Hebrew)
2. Preload critical fonts
3. Consider font-display: optional for better UX

---

## ✅ Checklist for Adding New Fonts

When adding a new font to your theme:

- [ ] Update `typography.fontFamily.main` with new font stack
- [ ] Add font to `typography.googleFonts` array with weights
- [ ] Specify only the weights you'll actually use
- [ ] Test on development server
- [ ] Verify font loads in Network tab
- [ ] Check visual appearance on mobile and desktop
- [ ] Test with Hebrew text (if applicable)
- [ ] Verify fallback fonts work if Google Fonts fail

---

## 🔮 Future Enhancements

Potential improvements to the font system:

1. **Variable Fonts:** Support for variable fonts (single file, all weights)
2. **Self-Hosted Fonts:** Add support for locally hosted fonts
3. **Font Subsetting:** Automatic Hebrew-only font subsetting
4. **Font Pairing Helper:** Tool to test font combinations
5. **Performance Metrics:** Track font loading performance
6. **A/B Testing:** Test different fonts with different user segments

---

## 📝 Example Theme with Custom Fonts

```typescript
// app/configs/theme/v2-modern.ts
export const theme = {
  colors: {
    // ... (same as v1)
  },
  
  typography: {
    fontFamily: {
      main: "'Manrope', 'Inter', 'system-ui', sans-serif",
    },
    googleFonts: [
      { name: 'Manrope', weights: [400, 500, 600, 700] },
      { name: 'Inter', weights: [400, 500, 600, 700] },
    ],
  },
  
  // ... rest of theme
};
```

Switch to this theme in `theme-active.ts`:

```typescript
import { theme } from './theme/v2-modern';
export const activeTheme = theme;
```

**Result:** Entire site now uses Manrope font! 🎉

---

## 📖 Related Documentation

- **Main Config System:** `README.md`
- **Theme Architecture:** `MIGRATION.md`
- **Cleanup Report:** `CLEANUP-COMPLETE.md`

---

**Questions?** Refer to `README.md` or check the inline comments in theme files.

