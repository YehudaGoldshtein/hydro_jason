import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from '@remix-run/react';
import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Analytics, useAnalytics } from '@shopify/hydrogen';
import { json } from '@shopify/remix-oxygen';
import { useEffect } from 'react';
import { activeTheme } from './configs/theme-active';
import styles from './styles/app.css?url';

export const links: LinksFunction = () => {
  // Dynamically generate Google Fonts URL from active theme
  const googleFontsUrl = activeTheme.typography.googleFonts
    .map(font => {
      const weights = font.weights.join(';');
      return `family=${font.name}:wght@${weights}`;
    })
    .join('&');
  
  return [
    // Favicon
    { rel: 'icon', href: '/favicon.png', type: 'image/png' },
    { rel: 'stylesheet', href: styles },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css2?${googleFontsUrl}&display=swap`,
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { title: 'FeedEase' },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  const { env } = context;
  
  // Try to get cart if available, otherwise use a promise that resolves to null
  let cartPromise: Promise<any> | null = null;
  if (context.cart) {
    cartPromise = context.cart.get();
  } else {
    // Create a promise that resolves to null if cart context is not available
    cartPromise = Promise.resolve(null);
  }

  // Create minimal shop analytics without using getShopAnalytics
  // This avoids the "Cannot redefine property: Shopify" error
  // getShopAnalytics tries to define Shopify object which may already exist
  const shopAnalytics = {
    shopId: env.PUBLIC_STOREFRONT_ID || env.PUBLIC_STORE_DOMAIN?.replace('.myshopify.com', '') || '',
    acceptedLanguage: 'HE' as const,
    currency: 'ILS' as const,
    hydrogenSubchannelId: '0',
  };

  return json({
    cart: cartPromise,
    shop: shopAnalytics,
    // Minimal consent config to avoid Shopify object redefinition errors
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN || env.PUBLIC_STORE_DOMAIN?.replace('.myshopify.com', '') + '.myshopify.com' || '',
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN || '',
      withPrivacyBanner: false, // Disable to avoid Shopify object redefinition
    },
  });
}

// Inner component that uses useAnalytics hook (must be inside Analytics.Provider)
function AnalyticsPageView() {
  const { publish } = useAnalytics();
  const location = useLocation();

  useEffect(() => {
    // Publish page_viewed event on every page load and navigation
    // This will be picked up by Shopify Custom Pixel and forwarded to Facebook
    if (typeof window !== 'undefined') {
      publish('page_viewed', {
        url: window.location.href,
        path: location.pathname,
      });
    }
  }, [publish, location.pathname]);

  return null;
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  // Generate CSS variables from active theme
  const cssVariables = `
    :root {
      /* Typography */
      --font-family-main: ${activeTheme.typography.fontFamily.main};
      
      /* Primary Colors */
      --color-primary-main: ${activeTheme.colors.primary.main};
      --color-primary-light: ${activeTheme.colors.primary.light};
      --color-primary-lighter: ${activeTheme.colors.primary.lighter};
      --color-primary-dark: ${activeTheme.colors.primary.dark};
      
      /* Text Colors */
      --color-text-primary: ${activeTheme.colors.text.primary};
      --color-text-secondary: ${activeTheme.colors.text.secondary};
      --color-text-muted: ${activeTheme.colors.text.muted};
      --color-text-price: ${activeTheme.colors.text.price};
      
      /* Background Colors */
      --color-bg-page: ${activeTheme.colors.background.page};
      --color-bg-card: ${activeTheme.colors.background.card};
      --color-bg-hover: ${activeTheme.colors.background.hover};
      --color-bg-alt: ${activeTheme.colors.background.alt};
      
      /* Border Colors */
      --color-border-default: ${activeTheme.colors.border.default};
      --color-border-selected: ${activeTheme.colors.border.selected};
      --color-border-divider: ${activeTheme.colors.border.divider};
      
      /* UI Colors */
      --color-ui-radio-unchecked: ${activeTheme.colors.ui.radioUnchecked};
      --color-ui-star: ${activeTheme.colors.ui.starRating};
      --color-ui-success: ${activeTheme.colors.ui.success};
      --color-ui-announcement: ${activeTheme.colors.ui.announcement};
      --color-ui-selling-bg: ${activeTheme.colors.ui.sellingBg};
      --color-ui-icon-bg: ${activeTheme.colors.ui.iconBg};
      --color-ui-icon-color: ${activeTheme.colors.ui.iconColor};
      --color-ui-tag: ${activeTheme.colors.ui.tag};
      --color-ui-whatsapp: ${activeTheme.colors.ui.whatsapp};
      
      /* Gradient Colors */
      --color-gradient-from: ${activeTheme.colors.gradient.from};
      --color-gradient-via: ${activeTheme.colors.gradient.via};
      --color-gradient-to: ${activeTheme.colors.gradient.to};
    }
  `.trim();

  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body style={{ fontFamily: 'var(--font-family-main)' }}>
        <Analytics.Provider
          cart={data.cart}
          shop={data.shop}
          consent={data.consent}
          disableThrowOnError={true}
        >
          <AnalyticsPageView />
          <Outlet />
        </Analytics.Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

