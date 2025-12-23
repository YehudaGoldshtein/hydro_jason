import { useEffect, useState } from 'react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { selectedVariantIndex } = useSelectedVariant();
  const { productName, stockWarning, ctaButton, fallbackImageAlt } = activeContent.stickyBuyBar;
  const { stickyBuyBar: barMedia } = landingMedia;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setVisible(y > 300);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    console.log('🔘 StickyBuyBar clicked!');
    console.log('📦 Product:', product);
    console.log('🎯 Selected Index:', selectedVariantIndex);
    console.log('🎯 All Variants:', product?.variants?.nodes);
    
    // Use the selected variant from context (default is 0 = ₪199)
    const selectedVariant = product?.variants?.nodes?.[selectedVariantIndex];
    console.log('✅ Selected Variant:', selectedVariant);
    
    if (selectedVariant?.id) {
      console.log('🚀 Calling goToCheckout with:', selectedVariant.id);
      goToCheckout(selectedVariant.id, 1);
    } else {
      console.log('⚠️ No variant found, scrolling to pricing');
      // Fallback: scroll to pricing section
      const target = document.getElementById('pricing');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4" dir="rtl">
          <div className="flex items-center gap-3">
            <img
              src={barMedia.productImage.src}
              alt={barMedia.productImage.alt}
              className="w-12 h-12 rounded-full border border-border-default object-cover"
              loading="lazy"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-text-primary">{productName}</span>
              <span className="text-xs text-primary-main">{stockWarning}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClick}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-sm md:text-base px-6 py-2 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? ctaButton.submitting : ctaButton.default}
          </button>
        </div>
      </div>
    </div>
  );
}
