import { useEffect, useState } from 'react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { useAnalytics } from '@shopify/hydrogen';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { trackAddToCart } from '~/lib/analytics';

export function StickyBuyBar() {
  const [visible, setVisible] = useState(true);
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const analytics = useAnalytics();
  const { productName, stockWarning, ctaButton, fallbackImageAlt } = activeContent.stickyBuyBar;
  const { stickyBuyBar: barMedia } = landingMedia;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      // Show bar after scrolling 50px (very low threshold)
      setVisible(y > 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Check immediately on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    console.log('🔘 StickyBuyBar clicked!');
    console.log('📦 Product:', product);
    console.log('🎯 All Variants:', product?.variants?.nodes);
    
    // ALWAYS use variant 0 (₪199) for sticky bar - as per user requirement
    const defaultVariant = product?.variants?.nodes?.[0];
    console.log('✅ Using default variant (₪199):', defaultVariant);
    
    if (defaultVariant?.id) {
      // Track product_added_to_cart event using Shopify Analytics (default quantity is 1)
      if (product && analytics?.publish) {
        try {
          analytics.publish('product_added_to_cart', {
            url: typeof window !== 'undefined' ? window.location.href : '',
            products: [
              {
                id: product.id,
                title: product.title,
                price: defaultVariant.price.amount,
                variantId: defaultVariant.id,
                variantTitle: defaultVariant.title,
                quantity: 1,
                vendor: product.vendor || '',
              },
            ],
          });
        } catch (error) {
          console.error('Error publishing product_added_to_cart:', error);
        }
      }

      // Track AddToCart event for Meta Pixel
      if (product && defaultVariant && typeof window !== 'undefined') {
        try {
          trackAddToCart({
            content_name: product.title,
            content_ids: [product.id],
            content_type: 'product',
            value: parseFloat(defaultVariant.price.amount),
            currency: 'ILS',
            quantity: 1,
          });
          console.log('[Meta Pixel] ✅ Tracked AddToCart from StickyBuyBar:', product.title);
        } catch (error) {
          console.error('[Meta Pixel] ❌ Error tracking AddToCart:', error);
        }
      }

      console.log('🚀 Calling goToCheckout with variant 0 (₪199):', defaultVariant.id);
      goToCheckout(defaultVariant.id, 1);
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
      className={`fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-300 ${
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
            className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-sm md:text-base px-6 py-2 rounded-full btn-3d-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-[0_6px_16px_rgba(224,122,99,0.35)]"
          >
            {isSubmitting ? ctaButton.submitting : ctaButton.default}
          </button>
        </div>
      </div>
    </div>
  );
}
