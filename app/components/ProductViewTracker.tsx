import { useEffect, useRef } from 'react';
import { ClientOnly } from './ClientOnly';
import { pushToDataLayer } from '~/utils/gtm.client';

interface Product {
  id: string;
  title: string;
  variants?: {
    nodes?: Array<{
      id: string;
      price?: {
        amount: string;
        currencyCode: string;
      };
    }>;
  };
}

interface ProductViewTrackerProps {
  product: Product | null;
}

/**
 * Client-only component that tracks view_item events
 * Isolated from server-side rendering to prevent hydration errors
 */
function ProductViewTrackerInner({ product }: ProductViewTrackerProps) {
  const hasFired = useRef(false);
  const previousProductId = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Safety guard: only run on client-side (double-check even though we're in ClientOnly)
    if (typeof window === 'undefined') {
      return;
    }

    // Safety check: product must exist
    if (!product) {
      console.log('[Tracking] Product not ready yet, waiting...');
      return;
    }

    // Safety check: product.id must exist and be a valid non-empty string
    if (!product.id || typeof product.id !== 'string' || product.id.trim() === '') {
      console.warn('[Tracking] Missing or empty product.id', { productId: product.id });
      return;
    }

    // Only fire when product.id changes from undefined/empty to a real value
    const currentProductId = product.id;
    const previousId = previousProductId.current;
    
    // If product ID hasn't changed, don't fire again
    if (previousId === currentProductId) {
      return;
    }

    // Update the ref to track the current product ID
    previousProductId.current = currentProductId;

    // Safety check: variant must exist
    const defaultVariant = product.variants?.nodes?.[0];
    if (!defaultVariant) {
      console.warn('[Tracking] Missing variant');
      return;
    }

    // Safety check: variant.id must exist and be a valid non-empty string
    if (!defaultVariant.id || typeof defaultVariant.id !== 'string' || defaultVariant.id.trim() === '') {
      console.warn('[Tracking] Missing or empty variant.id', { variantId: defaultVariant.id });
      return;
    }

    // Safety check: price object must exist
    if (!defaultVariant.price || typeof defaultVariant.price !== 'object') {
      console.warn('[Tracking] Missing price object', { variant: defaultVariant });
      return;
    }

    // Safety check: price amount must exist and be a valid string
    if (!defaultVariant.price.amount || typeof defaultVariant.price.amount !== 'string' || defaultVariant.price.amount.trim() === '') {
      console.warn('[Tracking] Missing or empty price.amount', { variant: defaultVariant });
      return;
    }

    const price = parseFloat(defaultVariant.price.amount);
    if (isNaN(price) || price <= 0 || !isFinite(price)) {
      console.warn('[Tracking] Invalid price', { price, amount: defaultVariant.price.amount, variant: defaultVariant });
      return;
    }

    // Safety check: currency must exist and be a valid non-empty string
    if (!defaultVariant.price.currencyCode || typeof defaultVariant.price.currencyCode !== 'string' || defaultVariant.price.currencyCode.trim() === '') {
      console.warn('[Tracking] Missing or empty currency', { variant: defaultVariant });
      return;
    }

    // All safety checks passed - fire event only once
    if (!hasFired.current) {
      console.log('[Tracking] Data is ready, firing view_item event now', {
        productId: product.id,
        variantId: defaultVariant.id,
        price,
        currency: defaultVariant.price.currencyCode,
      });

      pushToDataLayer({
        event: 'view_item',
        ecommerce: {
          currency: defaultVariant.price.currencyCode,
          value: price,
          items: [
            {
              item_id: product.id,
              item_name: product.title || 'Unknown Product',
              price: price,
              currency: defaultVariant.price.currencyCode,
              quantity: 1,
            },
          ],
        },
      });
      hasFired.current = true;
      console.log('[Tracking] ✅ view_item tracked for:', product.id);
    }
  }, [product]);

  return null; // This component doesn't render anything
}

/**
 * Client-only wrapper for ProductViewTracker
 * Prevents server-side rendering to avoid hydration errors
 */
export function ProductViewTracker(props: ProductViewTrackerProps) {
  return (
    <ClientOnly>
      <ProductViewTrackerInner {...props} />
    </ClientOnly>
  );
}

