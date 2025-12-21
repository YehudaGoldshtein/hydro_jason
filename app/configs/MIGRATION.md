# Component Migration Guide

## ✅ SETUP COMPLETE

The following have been successfully created:

1. ✅ `app/configs/theme/v1-peach.ts` - Color palette
2. ✅ `app/configs/theme-active.ts` - Theme switcher
3. ✅ `app/configs/content/v1-original.ts` - Marketing copy
4. ✅ `app/configs/content-active.ts` - Content switcher
5. ✅ `app/root.tsx` - Updated with CSS variable injection
6. ✅ `tailwind.config.cjs` - Updated with semantic color classes

## 🔄 MIGRATION NEEDED

All components need two changes:

### 1. Update Import Path
**FROM:** `~/data/landing-content`
**TO:** `~/configs/content-active`

### 2. Update Import Name
**FROM:** `landingContent`
**TO:** `activeContent`

### 3. Replace Hex Colors with Semantic Classes

## 📝 Components to Update (18 total)

### Group 1: Hero & Navigation
- [ ] `app/components/Header.tsx`
- [ ] `app/components/AnnouncementBar.tsx`
- [ ] `app/components/Hero.tsx`
- [ ] `app/components/HeroVideoCarousel.tsx`
- [ ] `app/components/BenefitsList.tsx`

### Group 2: Features & Benefits
- [ ] `app/components/WhyChooseUsSection.tsx`
- [ ] `app/components/AntiColicBenefitsSection.tsx`
- [ ] `app/components/BenefitsGridSection.tsx`
- [ ] `app/components/HowItWorksSection.tsx`
- [ ] `app/components/SuitabilityCheckSection.tsx`

### Group 3: Social Proof
- [ ] `app/components/PaymentAndTestimonialSection.tsx`
- [ ] `app/components/SocialProof.tsx`
- [ ] `app/components/FounderStorySection.tsx`

### Group 4: Pricing & CTAs
- [ ] `app/components/PricingSelectionSection.tsx`
- [ ] `app/components/FinalCtaSection.tsx`
- [ ] `app/components/IndependenceVideoSection.tsx`
- [ ] `app/components/StickyBuyBar.tsx`

### Group 5: Support
- [ ] `app/components/BonusProductsSection.tsx`
- [ ] `app/components/GuaranteeSection.tsx`
- [ ] `app/components/FaqSection.tsx`
- [ ] `app/components/Footer.tsx`

## 🎨 Color Replacement Guide

### Most Common Replacements

| Old Hex Color | New Semantic Class | Usage |
|---------------|-------------------|--------|
| `#e07a63` | `primary-main` | Main brand color, CTAs |
| `#52423d` | `text-primary` | Headings, primary text |
| `#7a6c66` | `text-secondary` | Body text, descriptions |
| `#fff6f2` | `bg-page` | Page background |
| `#ffffff` | `bg-card` or `white` | Cards, surfaces |
| `#f2e3dd` | `border-default` | Default borders |
| `#e5b7a3` | `border-selected` | Selected state borders |
| `#fbbf24` | `ui-star` | Star ratings |
| `#34d399` | `ui-success` | Checkmarks, success |
| `#25D366` | `ui-whatsapp` | WhatsApp button |

### Gradient Replacements

**OLD:**
```tsx
className="bg-gradient-to-r from-[#de7e63] via-[#e79a7b] to-[#e9a481]"
```

**NEW:**
```tsx
className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to"
```

## 📋 Example Migrations

### Example 1: Simple Component

**BEFORE:**
```tsx
import { landingContent } from '~/data/landing-content';

export function GuaranteeSection() {
  const { heading } = landingContent.guarantee;
  
  return (
    <section className="bg-[#fff6f2]">
      <div className="bg-[#e07a63]">
        <h2 className="text-[#52423d]">{heading}</h2>
      </div>
    </section>
  );
}
```

**AFTER:**
```tsx
import { activeContent } from '~/configs/content-active';

export function GuaranteeSection() {
  const { heading } = activeContent.guarantee;
  
  return (
    <section className="bg-bg-page">
      <div className="bg-primary-main">
        <h2 className="text-text-primary">{heading}</h2>
      </div>
    </section>
  );
}
```

### Example 2: Complex Component with Multiple Colors

**BEFORE:**
```tsx
<div className="bg-white border border-[#f2e3dd]">
  <h3 className="text-[#52423d]">Title</h3>
  <p className="text-[#7a6c66]">Description</p>
  <button className="bg-gradient-to-r from-[#de7e63] via-[#e79a7b] to-[#e9a481] text-white">
    CTA
  </button>
</div>
```

**AFTER:**
```tsx
<div className="bg-bg-card border border-border-default">
  <h3 className="text-text-primary">Title</h3>
  <p className="text-text-secondary">Description</p>
  <button className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white">
    CTA
  </button>
</div>
```

## 🚀 Quick Migration Script

Use find & replace in your editor:

1. **Update imports:**
   - Find: `from '~/data/landing-content'`
   - Replace: `from '~/configs/content-active'`

2. **Update variable names:**
   - Find: `landingContent`
   - Replace: `activeContent`

3. **Replace colors** (do these one at a time to avoid errors):
   - Find: `bg-[#fff6f2]` → Replace: `bg-bg-page`
   - Find: `bg-[#e07a63]` → Replace: `bg-primary-main`
   - Find: `text-[#52423d]` → Replace: `text-text-primary`
   - Find: `text-[#7a6c66]` → Replace: `text-text-secondary`
   - Find: `border-[#f2e3dd]` → Replace: `border-border-default`
   - (Continue with other colors from the table above)

## ✅ Testing Checklist

After migration:

- [ ] All components compile without errors
- [ ] Page renders correctly
- [ ] Colors match the original design
- [ ] Content displays properly
- [ ] Try switching theme in `theme-active.ts` - colors should update
- [ ] Try switching content in `content-active.ts` - text should update

## 🎯 Next Steps

1. Start with Group 1 (Hero & Navigation) - 5 components
2. Test thoroughly
3. Continue with Group 2 (Features) - 5 components
4. Test again
5. Finish remaining groups
6. ✅ **COMPLETED:** All 20 components migrated and old `app/data/` directory deleted

## 💡 Pro Tips

- Use VSCode's multi-cursor (Ctrl+D) to replace multiple instances
- Test after each group to catch issues early
- ✅ **COMPLETED:** All components now use `~/configs/` architecture
- Use git to track changes and easily revert if needed

