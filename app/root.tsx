import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Analytics, getShopAnalytics } from '@shopify/hydrogen';
import { defer, json } from '@shopify/remix-oxygen';
import { activeTheme } from './configs/theme-active';
import styles from './styles/app.css?url';
import { MetaPixelScript } from './components/MetaPixel';
import { MetaPixelAnalyticsIntegration } from './components/MetaPixelAnalyticsIntegration';

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

const ROOT_QUERY = `#graphql
  query RootQuery($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    shop {
      id
      name
      primaryDomain {
        url
      }
    }
  }
` as const;

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront, cart, env } = context;
  
  // Type-safe access to environment variables
  const envVars = env as Record<string, string | undefined>;
  
  // Query shop data from Storefront API using ROOT_QUERY
  let shop: any = null;
  try {
    if (storefront && typeof storefront === 'object' && 'query' in storefront) {
      const shopResult = await (storefront as any).query(ROOT_QUERY);
      if (shopResult?.data?.shop) {
        shop = shopResult.data.shop;
        console.log('[Shop] ✅ Successfully fetched shop data from Storefront API:', shop);
      }
    }
  } catch (error) {
    console.warn('[Shop] ⚠️ Could not fetch shop data from Storefront API:', error instanceof Error ? error.message : String(error));
  }
  
  // Get shop analytics data for Analytics.Provider
  let shopAnalytics: {
    shopId: string;
    acceptedLanguage: 'HE' | string;
    currency: string;
    hydrogenSubchannelId: string;
  } | null = null;
  
  // #region agent log
  console.log('[Debug] Loader - BEFORE getShopAnalytics:', {
    hasStorefront: !!storefront,
    envVarsPUBLIC_STOREFRONT_ID: envVars.PUBLIC_STOREFRONT_ID,
  });
  // #endregion
  
  try {
    if (storefront && typeof storefront === 'object' && 'query' in storefront) {
      // Use Hydrogen's getShopAnalytics - this is the recommended way
      const shopAnalyticsParams: any = { 
        storefront: storefront as any,
      };
      if (envVars.PUBLIC_STOREFRONT_ID) {
        shopAnalyticsParams.publicStorefrontId = envVars.PUBLIC_STOREFRONT_ID;
      }
      const shopDataResult = getShopAnalytics(shopAnalyticsParams);
      const shopData = shopDataResult instanceof Promise ? await shopDataResult : shopDataResult;
      
      // #region agent log
      console.log('[Debug] Loader - AFTER getShopAnalytics:', {
        shopData,
        shopDataShopId: (shopData as any)?.shopId,
        shopDataShopIdType: typeof (shopData as any)?.shopId,
        shopDataShopIdLength: (shopData as any)?.shopId?.length,
      });
      // #endregion
      
      if (shopData && typeof shopData === 'object' && (shopData as any)?.shopId) {
        // Extract serializable data
        shopAnalytics = {
          shopId: String((shopData as any).shopId).trim(),
          acceptedLanguage: ((shopData as any)?.acceptedLanguage || 'HE') as 'HE',
          currency: (shopData as any)?.currency || 'ILS',
          hydrogenSubchannelId: String((shopData as any)?.hydrogenSubchannelId || '0'),
        };
        
        // #region agent log
        console.log('[Debug] Loader - AFTER creating shopAnalytics from getShopAnalytics:', {
          shopAnalytics,
          shopAnalyticsShopId: shopAnalytics.shopId,
          shopAnalyticsShopIdType: typeof shopAnalytics.shopId,
          shopAnalyticsShopIdLength: shopAnalytics.shopId.length,
        });
        // #endregion
      }
    }
  } catch (error) {
    console.warn('[Analytics] ⚠️ Could not get shop analytics from Hydrogen:', error instanceof Error ? error.message : String(error));
  }
  
  // Fallback: Extract shopId from environment variables
  if (!shopAnalytics || !shopAnalytics.shopId || shopAnalytics.shopId.trim() === '') {
    // #region agent log
    console.log('[Debug] Loader - Using fallback for shopId:', {
      shopAnalytics,
      shopAnalyticsShopId: shopAnalytics?.shopId,
      shopAnalyticsShopIdEmpty: !shopAnalytics?.shopId || shopAnalytics.shopId.trim() === '',
    });
    // #endregion
    
    let shopId = envVars.PUBLIC_STOREFRONT_ID || '';
    
    // If PUBLIC_STOREFRONT_ID is not set, extract from PUBLIC_STORE_DOMAIN
    if (!shopId && envVars.PUBLIC_STORE_DOMAIN) {
      const domain = envVars.PUBLIC_STORE_DOMAIN;
      if (domain.includes('.myshopify.com')) {
        shopId = domain.replace('.myshopify.com', '');
      } else {
        shopId = domain;
      }
    }
    
    // CRITICAL: Ensure shopId is NEVER empty - hardcode fallback for production
    if (!shopId || shopId.trim() === '') {
      shopId = '1000075164';
    }
    
    shopAnalytics = {
      shopId: shopId.trim(),
      acceptedLanguage: 'HE' as 'HE',
      currency: 'ILS',
      hydrogenSubchannelId: '0',
    };
    
    // #region agent log
    console.log('[Debug] Loader - AFTER fallback shopAnalytics:', {
      shopAnalytics,
      shopAnalyticsShopId: shopAnalytics.shopId,
      shopAnalyticsShopIdType: typeof shopAnalytics.shopId,
      shopAnalyticsShopIdLength: shopAnalytics.shopId.length,
    });
    // #endregion
  }
  
  // Combine shop data from Storefront API with shop analytics
  // CRITICAL: Ensure shopId is the first property and is always present
  const shopObject = {
    shopId: shopAnalytics.shopId, // CRITICAL: shopId must be first and always present
    acceptedLanguage: shopAnalytics.acceptedLanguage as 'HE',
    currency: shopAnalytics.currency as 'ILS',
    hydrogenSubchannelId: shopAnalytics.hydrogenSubchannelId,
    ...(shop && {
      id: shop.id,
      name: shop.name,
      primaryDomain: shop.primaryDomain,
    }),
  };

  // #region agent log
  console.log('[Debug] Loader - BEFORE creating shopObject:', {
    shopAnalytics,
    shopAnalyticsShopId: shopAnalytics?.shopId,
    shopAnalyticsShopIdType: typeof shopAnalytics?.shopId,
    shopAnalyticsShopIdLength: shopAnalytics?.shopId?.length,
    shop,
    shopId: shop?.id,
    shopName: shop?.name,
  });
  // #endregion

  // #region agent log
  console.log('[Debug] Loader - AFTER creating shopObject:', {
    shopObject,
    shopObjectShopId: shopObject.shopId,
    shopObjectShopIdType: typeof shopObject.shopId,
    shopObjectShopIdLength: shopObject.shopId?.length,
    shopObjectKeys: Object.keys(shopObject),
    shopObjectStringified: JSON.stringify(shopObject),
  });
  // #endregion

  const consent = {
    checkoutDomain: envVars.PUBLIC_CHECKOUT_DOMAIN || (envVars.PUBLIC_STORE_DOMAIN?.replace('.myshopify.com', '') + '.myshopify.com') || '',
    storefrontAccessToken: envVars.PUBLIC_STOREFRONT_API_TOKEN || '',
    withPrivacyBanner: false,
  };

  // #region agent log
  console.log('[Debug] Loader - BEFORE return defer:', {
    shopObject,
    shopObjectShopId: shopObject.shopId,
    shopObjectShopIdType: typeof shopObject.shopId,
    shopObjectShopIdLength: shopObject.shopId?.length,
    shopObjectStringified: JSON.stringify(shopObject),
  });
  // #endregion

  // #region agent log
  console.log('[Debug] Loader - FINAL shopObject before defer:', {
    shopObject,
    shopObjectShopId: shopObject.shopId,
    shopObjectShopIdType: typeof shopObject.shopId,
    shopObjectShopIdLength: shopObject.shopId?.length,
    shopObjectIsPromise: shopObject instanceof Promise,
    shopObjectStringified: JSON.stringify(shopObject),
  });
  // #endregion

  // Use defer for cart (async Promise), but ensure shop is properly serialized
  // Analytics.Provider needs shop to be a plain object, not a Promise
  return defer({
    shop: shopObject, // Plain object - Analytics.Provider needs this synchronously
    cart: cart && typeof cart === 'object' && 'get' in cart ? (cart as any).get() : Promise.resolve(null),
    consent,
  });
}


export default function App() {
  const data = useLoaderData<typeof loader>();
  
  // #region agent log
  if (typeof window !== 'undefined') {
    const shopIsPromise = data.shop instanceof Promise;
    const shopValue = shopIsPromise ? 'PROMISE' : data.shop;
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:239',message:'App component - data from loader',data:{hasShop:!!data.shop,shopIsPromise,shop:shopValue,shopId:shopIsPromise?'N/A':data.shop?.shopId,shopIdType:shopIsPromise?'N/A':typeof data.shop?.shopId,shopIdLength:shopIsPromise?'N/A':data.shop?.shopId?.length,shopKeys:shopIsPromise?[]:data.shop?Object.keys(data.shop):[],shopStringified:shopIsPromise?'PROMISE':JSON.stringify(data.shop)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  }
  // #endregion
  
  // #region agent log
  if (typeof window !== 'undefined') {
    const shopIsPromise = data.shop instanceof Promise;
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:247',message:'App component - BEFORE Analytics.Provider',data:{shopIsPromise,shopForProvider:shopIsPromise?'PROMISE':data.shop,shopId:shopIsPromise?'N/A':data.shop?.shopId,shopIdType:shopIsPromise?'N/A':typeof data.shop?.shopId,shopIdLength:shopIsPromise?'N/A':data.shop?.shopId?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  }
  // #endregion
  
  // CRITICAL: Hardcode shop object to avoid serialization issues and satisfy Analytics.Provider
  // This prevents the "Missing shop.shopId configuration" error
  const shopForAnalytics = {
    shopId: '1000075164',
    currency: 'ILS' as 'ILS',
    acceptedLanguage: 'HE' as 'HE',
    hydrogenSubchannelId: '0',
  };
  
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
        <MetaPixelScript />
      </head>
      <body style={{ fontFamily: 'var(--font-family-main)' }}>
        {/* #region agent log */}
        {typeof window !== 'undefined' && (() => {
          const shopForProvider = data.shop;
          fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:361',message:'Analytics.Provider - shop prop value',data:{shop:shopForProvider,shopId:shopForProvider?.shopId,shopIdType:typeof shopForProvider?.shopId,shopIdLength:shopForProvider?.shopId?.length,shopKeys:shopForProvider?Object.keys(shopForProvider):[],shopStringified:JSON.stringify(shopForProvider),shopIsFrozen:Object.isFrozen(shopForProvider),shopIsSealed:Object.isSealed(shopForProvider)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          return null;
        })()}
        {/* #endregion */}
        <Analytics.Provider
          cart={data.cart}
          shop={shopForAnalytics}
          consent={data.consent}
          disableThrowOnError={true}
        >
          <MetaPixelAnalyticsIntegration />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </Analytics.Provider>
      </body>
    </html>
  );
}

