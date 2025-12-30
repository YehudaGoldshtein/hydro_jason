import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useAnalytics } from '@shopify/hydrogen';

/**
 * Hook for handling checkout actions
 * Adds item to cart and redirects to Shopify checkout
 */
export function useCheckout() {
  const fetcher = useFetcher<{ success: boolean; checkoutUrl?: string; error?: string }>();
  const analytics = useAnalytics();

  // Handle redirect when checkout URL is received
  useEffect(() => {
    console.log('🔍 useCheckout - fetcher.data:', fetcher.data);
    if (fetcher.data?.success && fetcher.data.checkoutUrl) {
      // Track checkout_started event using Shopify Analytics
      // Note: We track with basic info since we don't have full cart details here
      if (analytics?.publish) {
        try {
          analytics.publish('checkout_started', {
            url: fetcher.data.checkoutUrl,
            cart: null, // Cart data not available here
            prevCart: null,
          });
        } catch (error) {
          console.error('Error publishing checkout_started:', error);
        }
      }

      // Wait 200ms to ensure Pixel has time to send InitiateCheckout before redirect
      console.log('⏳ Waiting 200ms before redirect to ensure Pixel data is sent...');
      setTimeout(() => {
        console.log('✅ Redirecting to checkout:', fetcher.data.checkoutUrl);
        window.location.href = fetcher.data.checkoutUrl;
      }, 200);
    } else if (fetcher.data?.error) {
      console.error('❌ Checkout error:', fetcher.data.error);
    }
  }, [fetcher.data]);

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

