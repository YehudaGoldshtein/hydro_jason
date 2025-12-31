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

  // Handle redirect when checkout URL is received
  useEffect(() => {
    console.log('🔍 useCheckout - fetcher.data:', fetcher.data);
    if (fetcher.data?.success && fetcher.data.checkoutUrl && !redirectFired.current) {
      redirectFired.current = true;
      const checkoutUrl = fetcher.data.checkoutUrl;
      
      console.log('✅ Preparing to redirect to checkout:', checkoutUrl);
      
      // Track begin_checkout event immediately
      if (options?.product && options?.variant) {
        trackBeginCheckout({
          product: options.product,
          variant: options.variant,
          quantity: options.quantity || 1,
        });
      }
      
      // Wait 300ms to allow Meta Pixel/GTM to send data before redirect
      setTimeout(() => {
        console.log('🚀 Redirecting to checkout after 300ms delay');
        window.location.href = checkoutUrl;
      }, 300);
    } else if (fetcher.data?.error) {
      console.error('❌ Checkout error:', fetcher.data.error);
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

