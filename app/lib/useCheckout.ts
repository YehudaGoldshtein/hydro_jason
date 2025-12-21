import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';

/**
 * Hook for handling checkout actions
 * Adds item to cart and redirects to Shopify checkout
 */
export function useCheckout() {
  const fetcher = useFetcher<{ success: boolean; checkoutUrl?: string; error?: string }>();

  // Handle redirect when checkout URL is received
  useEffect(() => {
    if (fetcher.data?.success && fetcher.data.checkoutUrl) {
      window.location.href = fetcher.data.checkoutUrl;
    }
  }, [fetcher.data]);

  const goToCheckout = (merchandiseId: string, quantity: number = 1) => {
    if (!merchandiseId) {
      console.error('No merchandise ID provided');
      return;
    }

    const formData = new FormData();
    formData.append('cartAction', 'ADD_TO_CART');
    formData.append('merchandiseId', merchandiseId);
    formData.append('quantity', quantity.toString());

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

