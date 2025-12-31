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
 * Checks if GTM is ready and dataLayer is available
 * @returns true if GTM is ready, false otherwise
 */
function isGTMReady(): boolean {
  // Safety check: only run on client-side
  if (typeof window === 'undefined') {
    return false;
  }

  // Initialize dataLayer if it doesn't exist (GTM script should create it, but we ensure it exists)
  if (!window.dataLayer) {
    window.dataLayer = [];
    // If GTM script hasn't loaded yet, return false to wait
    // We'll still create the array so events can be queued
    return true; // Allow queuing even if GTM hasn't fully loaded
  }

  return true;
}

/**
 * Pushes event data to Google Tag Manager dataLayer
 * Only pushes if we're on client-side and dataLayer is available
 * @param eventData - The event data object to push to dataLayer
 */
export function pushToDataLayer(eventData: Record<string, unknown>): void {
  // Safety check: only run on client-side
  if (typeof window === 'undefined') {
    console.warn('GTM: pushToDataLayer called on server-side, skipping');
    return;
  }

  // Check if GTM is ready
  if (!isGTMReady()) {
    console.warn('GTM: dataLayer not ready, skipping event push');
    return;
  }

  // Validate eventData is not empty
  if (!eventData || typeof eventData !== 'object' || Object.keys(eventData).length === 0) {
    console.warn('GTM: Invalid eventData provided, skipping push');
    return;
  }

  // Push the event data
  window.dataLayer.push(eventData);
}

