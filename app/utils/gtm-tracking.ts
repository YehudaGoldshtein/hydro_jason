import { useRef } from 'react';
import { pushToDataLayer } from './gtm.client';

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
   */
  const trackAddToCart = ({ product, variant, quantity }: TrackAddToCartParams) => {
    const key = `${product.id}-${variant.id}-${quantity}`;
    
    if (addToCartFired.current.has(key)) {
      console.log('⚠️ add_to_cart already fired for:', key);
      return;
    }

    const price = parseFloat(variant.price.amount) || 0;
    pushToDataLayer({
      event: 'add_to_cart',
      ecommerce: {
        currency: variant.price.currencyCode || 'ILS',
        value: price * quantity,
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: price,
            currency: variant.price.currencyCode || 'ILS',
            quantity: quantity,
          },
        ],
      },
    });

    addToCartFired.current.add(key);
    console.log('✅ add_to_cart tracked for:', key);
  };

  /**
   * Track begin_checkout event - only once per unique product+variant+quantity combination
   */
  const trackBeginCheckout = ({ product, variant, quantity }: TrackBeginCheckoutParams) => {
    const key = `${product.id}-${variant.id}-${quantity}`;
    
    if (beginCheckoutFired.current.has(key)) {
      console.log('⚠️ begin_checkout already fired for:', key);
      return;
    }

    const price = parseFloat(variant.price.amount) || 0;
    pushToDataLayer({
      event: 'begin_checkout',
      ecommerce: {
        currency: variant.price.currencyCode || 'ILS',
        value: price * quantity,
        items: [
          {
            item_id: product.id,
            item_name: product.title,
            price: price,
            currency: variant.price.currencyCode || 'ILS',
            quantity: quantity,
          },
        ],
      },
    });

    beginCheckoutFired.current.add(key);
    console.log('✅ begin_checkout tracked for:', key);
  };

  return {
    trackAddToCart,
    trackBeginCheckout,
  };
}

