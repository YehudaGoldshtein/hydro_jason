# FeedEase - Shopify Hydrogen Header Components

A complete implementation of the Header and Top Announcement Bar for a Hebrew RTL e-commerce site built with Shopify Hydrogen (Remix framework) and Tailwind CSS v3.

## Features

- ✅ **Full RTL Support**: Properly configured for Hebrew content with `dir="rtl"` at the HTML level
- ✅ **Top Announcement Bar**: Three feature highlights (Free Shipping, Gift, 5000+ Customers)
- ✅ **Main Header**: Logo, navigation links, and shopping cart with badge
- ✅ **Responsive Design**: Hamburger menu for mobile devices
- ✅ **Design System**: All colors, fonts, and spacing from `design.json`
- ✅ **Lucide React Icons**: Lightweight, simple icons (no large SVGs)

## Components

### AnnouncementBar (`app/components/AnnouncementBar.tsx`)
- Light peach/brown background (`#ddb3a5`)
- Three items with icons: Truck, Refresh, and Star
- White icons and text
- Responsive flexbox layout

### Header (`app/components/Header.tsx`)
- White background with subtle shadow
- **Right**: FeedEase logo (placeholder text)
- **Center**: Navigation links (desktop only)
- **Left**: Shopping cart icon with badge showing "3"
- Mobile hamburger menu that opens/closes navigation

### Layout (`app/components/Layout.tsx`)
- Combines AnnouncementBar and Header
- Sets RTL direction
- Applies warm background color from design system

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

## Design System

The project uses a comprehensive design system defined in `design.json`:

### Colors
- **Background**: `#fff6f2` (warm cream)
- **Primary**: `#e07a63` (coral)
- **Text Primary**: `#52423d` (dark brown)
- **Announcement Bar**: `#ddb3a5` (light peach)

### Typography
- **Font Family**: Heebo, Assistant, Rubik, sans-serif
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- Consistent spacing scale: xs (4px), sm (8px), md (12px), lg (20px), xl (32px), xxl (48px)

## Usage

To use the header in your routes:

```tsx
import { Layout } from '~/components/Layout';

export default function MyRoute() {
  return (
    <Layout>
      {/* Your page content */}
    </Layout>
  );
}
```

## Tailwind Configuration

The `tailwind.config.js` includes all design system values:
- Custom color palette with `brand-*` prefix
- Hebrew-friendly font stack
- Design system spacing and border radius
- Custom shadows for cards and buttons

## RTL Support

RTL is configured at multiple levels:
1. **HTML level**: `<html lang="he" dir="rtl">` in `app/root.tsx`
2. **Component level**: Each component explicitly sets `dir="rtl"`
3. **Layout**: Flexbox naturally reverses in RTL mode

## Mobile Responsiveness

- **Desktop (≥768px)**: Full navigation links visible, no hamburger menu
- **Mobile (<768px)**: Hamburger menu appears, navigation in dropdown
- Announcement bar items wrap gracefully on small screens

## File Structure

```
app/
├── components/
│   ├── AnnouncementBar.tsx
│   ├── Header.tsx
│   └── Layout.tsx
├── routes/
│   └── _index.tsx
├── styles/
│   └── app.css
└── root.tsx
design.json
tailwind.config.js
postcss.config.js
package.json
```

## Customization

### Changing Cart Badge Number

Edit `app/components/Header.tsx`:

```tsx
<span className="...">
  3  {/* Change this number */}
</span>
```

### Adding Logo Image

Replace the placeholder text in `app/components/Header.tsx`:

```tsx
<Link to="/" className="flex items-center">
  <img src="/logo.png" alt="FeedEase" className="h-8" />
</Link>
```

### Modifying Navigation Links

Edit the `navigationLinks` array in `app/components/Header.tsx`:

```tsx
const navigationLinks = [
  { label: 'Your Link', href: '/your-path' },
  // Add more links...
];
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- RTL support (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)

## License

Private project for FeedEase.

















