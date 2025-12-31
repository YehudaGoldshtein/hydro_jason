/**
 * Google Tag Manager Client-side Utility
 * All functions are client-side only to prevent SSR crashes
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Pushes event data to Google Tag Manager dataLayer
 * @param eventData - The event data object to push to dataLayer
 */
export function pushToDataLayer(eventData: Record<string, unknown>): void {
  // Safety check: only run on client-side
  if (typeof window === 'undefined') {
    console.warn('GTM: pushToDataLayer called on server-side, skipping');
    return;
  }

  // Initialize dataLayer if it doesn't exist
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  // Push the event data
  window.dataLayer.push(eventData);
}

