/**
 * Cart utility functions for Shopify Hydrogen
 * Handles adding items to cart and redirecting to checkout
 */

/**
 * Scroll to pricing section (for buttons that need to show pricing first)
 */
export function scrollToPricing() {
  const target = document.getElementById('pricing');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Create a direct checkout URL using Shopify cart permalink
 * This is the simplest way to add to cart and go to checkout
 * Format: https://{store}.myshopify.com/cart/{variantId}:{quantity}
 */
export function createDirectCheckoutUrl(
  variantId: string,
  quantity: number = 1,
  storeDomain?: string
): string {
  if (!storeDomain) {
    // Fallback: use current domain or redirect to cart
    return '/cart';
  }
  
  // Extract variant ID from GID format (gid://shopify/ProductVariant/123456)
  const variantIdNumber = variantId.split('/').pop() || variantId;
  
  // Direct checkout URL format: /cart/{variantId}:{quantity}
  return `https://${storeDomain}/cart/${variantIdNumber}:${quantity}`;
}

