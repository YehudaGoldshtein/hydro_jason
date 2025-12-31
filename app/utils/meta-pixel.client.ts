/**
 * Meta Pixel (Facebook Pixel) Client-side Utility
 * All functions are client-side only to prevent SSR crashes
 */

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      data?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Checks if Meta Pixel is ready and fbq is available
 * @returns true if Meta Pixel is ready, false otherwise
 */
function isMetaPixelReady(): boolean {
  // Safety check: only run on client-side
  if (typeof window === 'undefined') {
    return false;
  }

  // Check if fbq function exists
  if (!window.fbq || typeof window.fbq !== 'function') {
    return false;
  }

  return true;
}

/**
 * Calls Meta Pixel fbq function
 * Only calls if we're on client-side and fbq is available
 * @param action - The action type (e.g., 'track', 'trackCustom')
 * @param event - The event name (e.g., 'AddToCart', 'InitiateCheckout')
 * @param data - Optional event data object
 */
export function callFbq(
  action: string,
  event: string,
  data?: Record<string, unknown>
): void {
  // Safety check: only run on client-side
  if (typeof window === 'undefined') {
    console.warn('Meta Pixel: callFbq called on server-side, skipping');
    return;
  }

  // Check if Meta Pixel is ready
  if (!isMetaPixelReady()) {
    console.warn('Meta Pixel: fbq not ready, skipping event');
    return;
  }

  // Validate action and event are not empty
  if (!action || typeof action !== 'string' || action.trim() === '') {
    console.warn('Meta Pixel: Invalid action provided, skipping call');
    return;
  }

  if (!event || typeof event !== 'string' || event.trim() === '') {
    console.warn('Meta Pixel: Invalid event provided, skipping call');
    return;
  }

  // Call fbq function
  try {
    if (data) {
      window.fbq!(action, event, data);
    } else {
      window.fbq!(action, event);
    }
  } catch (error) {
    console.error('Meta Pixel: Error calling fbq', error);
  }
}

/**
 * Track AddToCart event with Meta Pixel
 * @param value - The monetary value
 * @param currency - The currency code
 * @param contentName - The product name
 * @param contentIds - Array of product IDs
 */
export function trackAddToCart(
  value: number,
  currency: string,
  contentName: string,
  contentIds: string[]
): void {
  callFbq('track', 'AddToCart', {
    value,
    currency,
    content_name: contentName,
    content_ids: contentIds,
  });
}

/**
 * Track InitiateCheckout event with Meta Pixel
 * @param value - The monetary value
 * @param currency - The currency code
 * @param contentName - The product name
 * @param contentIds - Array of product IDs
 */
export function trackInitiateCheckout(
  value: number,
  currency: string,
  contentName: string,
  contentIds: string[]
): void {
  callFbq('track', 'InitiateCheckout', {
    value,
    currency,
    content_name: contentName,
    content_ids: contentIds,
  });
}

