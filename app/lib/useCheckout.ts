import { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { useEcommerceTracking } from '~/utils/gtm-tracking';

interface Product {
  id: string;
  title: string;
}

interface Variant {
  id: string;
  title?: string | null;
  price: {
    amount: string;
    currencyCode: string;
  };
}

interface UseCheckoutOptions {
  product?: Product | null;
  variant?: Variant | null;
  quantity?: number;
}

/**
 * Hook for handling checkout actions
 * Adds item to cart and redirects to Shopify checkout
 */
export function useCheckout(options?: UseCheckoutOptions) {
  const fetcher = useFetcher<{ success: boolean; checkoutUrl?: string; error?: string }>();
  const { trackBeginCheckout } = useEcommerceTracking();
  const redirectFired = useRef(false);
  const previousFetcherData = useRef<typeof fetcher.data>(undefined);

  // Handle redirect when checkout URL is received
  // Only fire when fetcher.data changes from undefined to a real value
  useEffect(() => {
    // Safety guard: only run on client-side
    if (typeof window === 'undefined') {
      return;
    }

    // Deep check: verify fetcher.data exists and has required structure
    if (!fetcher.data) {
      console.log('[Tracking] fetcher.data not ready yet, waiting...');
      return;
    }

    // Deep check: verify fetcher.data has the required properties (success and checkoutUrl)
    if (!fetcher.data.success || !fetcher.data.checkoutUrl) {
      // If error exists, log it but don't track
      if (fetcher.data.error) {
        console.error('[Tracking] Checkout error:', fetcher.data.error);
      }
      return;
    }

    // Deep check: verify checkoutUrl is a valid string
    if (typeof fetcher.data.checkoutUrl !== 'string' || fetcher.data.checkoutUrl.trim() === '') {
      console.warn('[Tracking] Invalid checkoutUrl', { checkoutUrl: fetcher.data.checkoutUrl });
      return;
    }

    // Only fire when fetcher.data changes from undefined to a real value
    const currentData = fetcher.data;
    const previousData = previousFetcherData.current;

    // If data hasn't changed, don't fire again
    if (previousData === currentData) {
      return;
    }

    // Update the ref to track the current data
    previousFetcherData.current = currentData;

    console.log('[Tracking] useCheckout - fetcher.data:', fetcher.data);
    
    // Safety check: product and variant must exist
    if (!options?.product || !options?.variant) {
      console.warn('[Tracking] Missing product or variant in options', { 
        hasProduct: !!options?.product, 
        hasVariant: !!options?.variant 
      });
      return;
    }

    // Additional validation: ensure IDs exist and are valid
    if (!options.product.id || typeof options.product.id !== 'string' || options.product.id.trim() === '') {
      console.warn('[Tracking] Missing or empty product.id', { productId: options.product.id });
      return;
    }

    if (!options.variant.id || typeof options.variant.id !== 'string' || options.variant.id.trim() === '') {
      console.warn('[Tracking] Missing or empty variant.id', { variantId: options.variant.id });
      return;
    }
    
    // All deep checks passed - proceed with tracking
    if (!redirectFired.current) {
      redirectFired.current = true;
      const checkoutUrl = fetcher.data.checkoutUrl;
      
      console.log('[Tracking] Data is ready, firing begin_checkout event now', {
        productId: options.product.id,
        variantId: options.variant.id,
        checkoutUrl,
        quantity: options.quantity || 1,
      });
      
      // Track begin_checkout event (with comprehensive safety guards inside trackBeginCheckout)
      trackBeginCheckout({
        product: options.product,
        variant: options.variant,
        quantity: options.quantity || 1,
      });
      
      // Wait 300ms to allow Meta Pixel/GTM to send data before redirect
      setTimeout(() => {
        console.log('[Tracking] ✅ Redirecting to checkout after 300ms delay');
        if (typeof window !== 'undefined' && checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      }, 300);
    }
  }, [fetcher.data, options, trackBeginCheckout]);

  const goToCheckout = (merchandiseId: string, quantity: number = 1) => {
    console.log('🚀 goToCheckout called with:', { merchandiseId, quantity });
    
    if (!merchandiseId) {
      console.error('❌ No merchandise ID provided');
      return;
    }

    const formData = new FormData();
    formData.append('cartAction', 'ADD_TO_CART');
    formData.append('merchandiseId', merchandiseId);
    formData.append('quantity', quantity.toString());

    console.log('📤 Submitting to /cart with formData:', {
      cartAction: 'ADD_TO_CART',
      merchandiseId,
      quantity: quantity.toString()
    });

    fetcher.submit(formData, {
      method: 'post',
      action: '/cart',
    });
  };

  return {
    goToCheckout,
    isSubmitting: fetcher.state === 'submitting',
    error: fetcher.data?.error,
  };
}

