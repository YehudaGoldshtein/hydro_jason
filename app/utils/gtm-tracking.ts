import { useRef } from 'react';
import { pushToDataLayer } from './gtm.client';
import { trackAddToCart as trackMetaAddToCart, trackInitiateCheckout as trackMetaInitiateCheckout } from './meta-pixel.client';

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

interface TrackAddToCartParams {
  product: Product;
  variant: Variant;
  quantity: number;
}

interface TrackBeginCheckoutParams {
  product: Product;
  variant: Variant;
  quantity: number;
}

/**
 * Hook for tracking e-commerce events with duplicate prevention
 * Returns functions to track add_to_cart and begin_checkout events
 */
export function useEcommerceTracking() {
  const addToCartFired = useRef<Set<string>>(new Set());
  const beginCheckoutFired = useRef<Set<string>>(new Set());

  /**
   * Track add_to_cart event - only once per unique product+variant+quantity combination
   * Comprehensive safety checks: product, variant, ID, price, currency must all be valid
   * PATIENT: Only fires when all data is fully populated and ready
   */
  const trackAddToCart = ({ product, variant, quantity }: TrackAddToCartParams) => {
    // Safety check: only run on client-side
    if (typeof window === 'undefined') {
      console.warn('⚠️ trackAddToCart: Called on server-side, skipping');
      return;
    }

    // Safety check: product and variant must exist
    if (!product || !variant) {
      console.warn('⚠️ trackAddToCart: Missing product or variant', { hasProduct: !!product, hasVariant: !!variant });
      return;
    }

    // Safety check: IDs must be populated and not empty strings
    if (!product.id || typeof product.id !== 'string' || product.id.trim() === '') {
      console.warn('⚠️ trackAddToCart: Missing or empty product.id', { productId: product.id });
      return;
    }

    if (!variant.id || typeof variant.id !== 'string' || variant.id.trim() === '') {
      console.warn('⚠️ trackAddToCart: Missing or empty variant.id', { variantId: variant.id });
      return;
    }

    // Safety check: price object must exist
    if (!variant.price || typeof variant.price !== 'object') {
      console.warn('⚠️ trackAddToCart: Missing price object', { variant });
      return;
    }

    // Safety check: price amount must exist and be a valid string
    if (!variant.price.amount || typeof variant.price.amount !== 'string' || variant.price.amount.trim() === '') {
      console.warn('⚠️ trackAddToCart: Missing or empty price.amount', { variant });
      return;
    }

    const price = parseFloat(variant.price.amount);
    if (isNaN(price) || price <= 0 || !isFinite(price)) {
      console.warn('⚠️ trackAddToCart: Invalid price', { price, amount: variant.price.amount, variant });
      return;
    }

    // Safety check: currency must exist and be a valid string
    if (!variant.price.currencyCode || typeof variant.price.currencyCode !== 'string' || variant.price.currencyCode.trim() === '') {
      console.warn('⚠️ trackAddToCart: Missing or empty currency', { variant });
      return;
    }

    // Safety check: quantity must be a valid positive number
    if (!quantity || typeof quantity !== 'number' || quantity <= 0 || !isFinite(quantity) || !Number.isInteger(quantity)) {
      console.warn('⚠️ trackAddToCart: Invalid quantity', { quantity });
      return;
    }

    const key = `${product.id}-${variant.id}-${quantity}`;
    
    if (addToCartFired.current.has(key)) {
      console.log('⚠️ add_to_cart already fired for:', key);
      return;
    }

    // All safety checks passed - push to dataLayer
    pushToDataLayer({
      event: 'add_to_cart',
      ecommerce: {
        currency: variant.price.currencyCode,
        value: price * quantity,
        items: [
          {
            item_id: product.id,
            item_name: product.title || 'Unknown Product',
            price: price,
            currency: variant.price.currencyCode,
            quantity: quantity,
          },
        ],
      },
    });

    // Track with Meta Pixel
    trackMetaAddToCart(
      price * quantity,
      variant.price.currencyCode,
      product.title || 'Unknown Product',
      [product.id]
    );

    addToCartFired.current.add(key);
    console.log('✅ add_to_cart tracked (GTM + Meta Pixel) for:', key);
  };

  /**
   * Track begin_checkout event - only once per unique product+variant+quantity combination
   * Comprehensive safety checks: product, variant, ID, price, currency must all be valid
   * PATIENT: Only fires when all data is fully populated and ready
   */
  const trackBeginCheckout = ({ product, variant, quantity }: TrackBeginCheckoutParams) => {
    // Safety check: only run on client-side
    if (typeof window === 'undefined') {
      console.warn('⚠️ trackBeginCheckout: Called on server-side, skipping');
      return;
    }

    // Safety check: product and variant must exist
    if (!product || !variant) {
      console.warn('⚠️ trackBeginCheckout: Missing product or variant', { hasProduct: !!product, hasVariant: !!variant });
      return;
    }

    // Safety check: IDs must be populated and not empty strings
    if (!product.id || typeof product.id !== 'string' || product.id.trim() === '') {
      console.warn('⚠️ trackBeginCheckout: Missing or empty product.id', { productId: product.id });
      return;
    }

    if (!variant.id || typeof variant.id !== 'string' || variant.id.trim() === '') {
      console.warn('⚠️ trackBeginCheckout: Missing or empty variant.id', { variantId: variant.id });
      return;
    }

    // Safety check: price object must exist
    if (!variant.price || typeof variant.price !== 'object') {
      console.warn('⚠️ trackBeginCheckout: Missing price object', { variant });
      return;
    }

    // Safety check: price amount must exist and be a valid string
    if (!variant.price.amount || typeof variant.price.amount !== 'string' || variant.price.amount.trim() === '') {
      console.warn('⚠️ trackBeginCheckout: Missing or empty price.amount', { variant });
      return;
    }

    const price = parseFloat(variant.price.amount);
    if (isNaN(price) || price <= 0 || !isFinite(price)) {
      console.warn('⚠️ trackBeginCheckout: Invalid price', { price, amount: variant.price.amount, variant });
      return;
    }

    // Safety check: currency must exist and be a valid string
    if (!variant.price.currencyCode || typeof variant.price.currencyCode !== 'string' || variant.price.currencyCode.trim() === '') {
      console.warn('⚠️ trackBeginCheckout: Missing or empty currency', { variant });
      return;
    }

    // Safety check: quantity must be a valid positive number
    if (!quantity || typeof quantity !== 'number' || quantity <= 0 || !isFinite(quantity) || !Number.isInteger(quantity)) {
      console.warn('⚠️ trackBeginCheckout: Invalid quantity', { quantity });
      return;
    }

    const key = `${product.id}-${variant.id}-${quantity}`;
    
    if (beginCheckoutFired.current.has(key)) {
      console.log('⚠️ begin_checkout already fired for:', key);
      return;
    }

    // All safety checks passed - push to dataLayer
    pushToDataLayer({
      event: 'begin_checkout',
      ecommerce: {
        currency: variant.price.currencyCode,
        value: price * quantity,
        items: [
          {
            item_id: product.id,
            item_name: product.title || 'Unknown Product',
            price: price,
            currency: variant.price.currencyCode,
            quantity: quantity,
          },
        ],
      },
    });

    // Track with Meta Pixel
    trackMetaInitiateCheckout(
      price * quantity,
      variant.price.currencyCode,
      product.title || 'Unknown Product',
      [product.id]
    );

    beginCheckoutFired.current.add(key);
    console.log('✅ begin_checkout tracked (GTM + Meta Pixel) for:', key);
  };

  return {
    trackAddToCart,
    trackBeginCheckout,
  };
}

