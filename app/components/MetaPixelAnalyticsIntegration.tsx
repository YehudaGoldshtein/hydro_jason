import React, {useEffect} from "react";
import {useAnalytics} from "@shopify/hydrogen";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export function MetaPixelAnalyticsIntegration() {
  const analytics = useAnalytics();

  useEffect(() => {
    if (!analytics) return;

    const unsubscribe = analytics.subscribe("all", (event) => {
      if (typeof window === "undefined" || !window.fbq) return;

      switch (event.type) {
        case "page_viewed": {
          window.fbq("track", "PageView");
          break;
        }

        case "product_viewed": {
          const products = event.payload?.products;
          const product = products?.[0]; // Get first product
          if (product) {
            window.fbq("track", "ViewContent", {
              content_ids: product.id ? [product.id] : undefined,
              content_name: product.title,
              content_type: "product",
              value: parseFloat(product.price || "0"),
              currency: "ILS",
            });
          }
          break;
        }

        case "product_added_to_cart": {
          const products = event.payload?.products;
          const product = products?.[0]; // Get first product
          if (product) {
            window.fbq("track", "AddToCart", {
              content_ids: product.variantId ? [product.variantId] : product.id ? [product.id] : undefined,
              content_name: product.title,
              value: parseFloat(product.price || "0"),
              currency: "ILS",
            });
          }
          break;
        }

        case "checkout_started": {
          const payload = event.payload;
          window.fbq("track", "InitiateCheckout", {
            value: payload?.totalPrice ? parseFloat(payload.totalPrice) : undefined,
            currency: payload?.currency || "ILS",
          });
          break;
        }

        default:
          break;
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [analytics]);

  return null;
}

