/**
 * Meta Pixel Analytics Utility
 * Tracks events for Meta Pixel (Facebook Pixel)
 * Pixel ID: 1855054518452200
 */

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      data?: Record<string, any>
    ) => void;
    _fbq?: any;
  }
}

const PIXEL_ID = '1855054518452200';

/**
 * Initialize Meta Pixel
 * Should be called once in root.tsx
 */
export function initMetaPixel() {
  if (typeof window === 'undefined') return;

  // Check if already initialized
  if (window.fbq && window.fbq.loaded) {
    console.log('[Meta Pixel] Already initialized');
    return;
  }

  // Create fbq function
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    t.onload = function() {
      console.log('[Meta Pixel] Script loaded successfully');
      // Initialize pixel after script loads
      if (window.fbq) {
        try {
          window.fbq('init', PIXEL_ID);
          window.fbq('track', 'PageView');
          console.log('[Meta Pixel] Initialized with ID:', PIXEL_ID);
        } catch (error) {
          console.error('[Meta Pixel] Error initializing:', error);
        }
      }
    };
    t.onerror = function() {
      console.error('[Meta Pixel] Failed to load script');
    };
    s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  // Fallback: Try to initialize after a short delay if onload didn't fire
  setTimeout(() => {
    if (window.fbq && !window.fbq.loaded) {
      try {
        window.fbq('init', PIXEL_ID);
        window.fbq('track', 'PageView');
        console.log('[Meta Pixel] Initialized via fallback timeout');
      } catch (error) {
        console.error('[Meta Pixel] Fallback initialization error:', error);
      }
    }
  }, 1000);
}

/**
 * Track PageView event
 */
export function trackPageView() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

/**
 * Track ViewContent event (product viewed)
 */
export function trackViewContent(product: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: product.content_name,
      content_ids: product.content_ids,
      content_type: product.content_type || 'product',
      value: product.value,
      currency: product.currency || 'ILS',
    });
  }
}

/**
 * Track AddToCart event
 */
export function trackAddToCart(data: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  quantity?: number;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: data.content_name,
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      value: data.value,
      currency: data.currency || 'ILS',
      quantity: data.quantity || 1,
    });
  }
}

/**
 * Track InitiateCheckout event (checkout started)
 */
export function trackInitiateCheckout(data: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: data.content_name,
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      value: data.value,
      currency: data.currency || 'ILS',
      num_items: data.num_items || 1,
    });
  }
}

/**
 * Track Purchase event
 */
export function trackPurchase(data: {
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      content_name: data.content_name,
      content_ids: data.content_ids,
      content_type: data.content_type || 'product',
      value: data.value,
      currency: data.currency || 'ILS',
      num_items: data.num_items || 1,
    });
  }
}

