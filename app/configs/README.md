# Unified Configuration System

This directory contains all configuration for the Feed-Ease landing page, including marketing copy and visual theme.

## 📁 Structure

```
app/configs/
├── content/
│   └── v1-original.ts          # Marketing copy version 1
├── theme/
│   └── v1-peach.ts             # Color palette version 1
├── content-active.ts           # Active content switcher
└── theme-active.ts             # Active theme switcher
```

## 🎯 How It Works

### Content Management
All marketing text is in `content/v1-original.ts`. To change the site's copy:

```typescript
// In content-active.ts:
import { content } from './content/v1-original';  // ← Change this import
export const activeContent = content;
```

### Theme Management
All colors and typography are in `theme/v1-peach.ts`. To change the site's appearance:

```typescript
// In theme-active.ts:
import { theme } from './theme/v1-peach';  // ← Change this import
export const activeTheme = theme;
```

**Theme includes:**
- 🎨 Colors (primary, text, backgrounds, borders, UI elements)
- 🔤 Typography (font families, Google Fonts config)
- 📐 Spacing and sizing
- 🌈 Gradients and shadows

## 🚀 Quick Start

### Switch Content Version
1. Create new file: `content/v2-urgency.ts`
2. Copy structure from `v1-original.ts`
3. Update marketing copy
4. Change import in `content-active.ts`

### Switch Theme
1. Create new file: `theme/v2-blue.ts`
2. Copy structure from `v1-peach.ts`
3. Update color values **and/or** font families
4. Change import in `theme-active.ts`

### Change Font (Quick)
To change fonts without creating a new theme:
1. Open `theme/v1-peach.ts`
2. Edit `typography.fontFamily.main`
3. Update `typography.googleFonts` array
4. Reload the site

**See `FONT-MANAGEMENT.md` for detailed font configuration guide.**

## 🎨 Using Semantic Color Classes

Instead of hardcoded hex colors, use semantic Tailwind classes:

**OLD WAY (hardcoded):**
```tsx
<div className="bg-[#e07a63] text-[#52423d]">
```

**NEW WAY (semantic):**
```tsx
<div className="bg-primary-main text-text-primary">
```

### Available Color Classes

#### Primary Colors
- `bg-primary-main` / `text-primary-main` - Main brand color
- `bg-primary-light` / `text-primary-light` - Lighter variant
- `bg-primary-lighter` / `text-primary-lighter` - Even lighter
- `bg-primary-dark` / `text-primary-dark` - Darker variant (hover states)

#### Text Colors
- `text-text-primary` - Main text
- `text-text-secondary` - Secondary text
- `text-text-muted` - Muted/disabled text
- `text-text-price` - Price display

#### Background Colors
- `bg-bg-page` - Main page background
- `bg-bg-card` - Card background
- `bg-bg-hover` - Hover state background
- `bg-bg-alt` - Alternative surface

#### Border Colors
- `border-border-default` - Default border
- `border-border-selected` - Selected state
- `border-border-divider` - Divider lines

#### UI Colors
- `bg-ui-announcement` - Announcement bar
- `text-ui-star` - Star ratings
- `bg-ui-success` / `text-ui-success` - Success states
- `bg-ui-whatsapp` - WhatsApp button

#### Gradients
```tsx
<div className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to">
```

## 📝 Component Import Pattern

**All components should import from `configs`:**

```typescript
// ✅ CORRECT
import { activeContent } from '~/configs/content-active';

// ❌ WRONG (old path)
import { landingContent } from '~/data/landing-content';
```

## 🔄 Migration Checklist

- [x] Update all component imports to use `~/configs/content-active`
- [ ] Replace hardcoded hex colors with semantic classes
- [ ] Test theme switching
- [ ] Test content switching
- [x] Remove old `app/data/` directory (completed - all 20 components migrated)

## 💡 Example Refactor

**Before:**
```tsx
export function Hero() {
  return (
    <section className="bg-[#fff6f2]" dir="rtl">
      <h1 className="text-[#52423d]">
        סוף סוף, <span className="text-[#e07a63]">היד השלישית</span>
      </h1>
    </section>
  );
}
```

**After:**
```tsx
import { activeContent } from '~/configs/content-active';

export function Hero() {
  const { headline } = activeContent.hero;
  
  return (
    <section className="bg-bg-page" dir="rtl">
      <h1 className="text-text-primary">
        {headline.part1}
        <span className="text-primary-main">{headline.part2Highlight}</span>
        {headline.part3}
      </h1>
    </section>
  );
}
```

## 🎯 Benefits

1. **Single Source of Truth** - All config in one place
2. **Easy A/B Testing** - Change one import, entire site updates
3. **Theme Flexibility** - Rebrand in minutes
4. **Type Safety** - TypeScript ensures consistency
5. **CSS Variables** - Dynamic colors injected at runtime
6. **Semantic Classes** - Readable, maintainable code

## 📊 Version History

### Content Versions
| Version | Strategy | Status |
|---------|----------|--------|
| v1-original | Comfort & Freedom | ✅ Active |

### Theme Versions
| Version | Palette | Status |
|---------|---------|--------|
| v1-peach | Warm Peach/Coral | ✅ Active |

## 🚨 Important Notes

- CSS variables are injected in `app/root.tsx`
- Tailwind config uses these CSS variables
- Font families are automatically loaded from Google Fonts based on theme config
- All components must use semantic classes for colors
- Never hardcode hex colors in components
- Always import from `-active.ts` files, never directly from versions

## 📚 Additional Documentation

- **`FONT-MANAGEMENT.md`** - Complete guide to font configuration, font stacks, and typography management
- **`MIGRATION.md`** - Migration guide from old `app/data/` structure (completed)
- **`CLEANUP-COMPLETE.md`** - Report of the cleanup and migration process

