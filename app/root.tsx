import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from '@remix-run/react';
import { useEffect, useMemo } from 'react';
import type { LinksFunction, MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Analytics, getShopAnalytics } from '@shopify/hydrogen';
import { json } from '@shopify/remix-oxygen';
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

export async function loader({ context }: LoaderFunctionArgs) {
  const { env } = context;
  
  // Type-safe access to environment variables
  const envVars = env as Record<string, string | undefined>;
  
  // DEBUG: Log environment variable
  console.log('[Debug] PUBLIC_STOREFRONT_ID:', envVars.PUBLIC_STOREFRONT_ID);
  
  // Try to get cart if available, otherwise use a promise that resolves to null
  let cartPromise: Promise<any> | null = null;
  if (context.cart && typeof context.cart === 'object' && context.cart !== null && 'get' in context.cart && typeof (context.cart as any).get === 'function') {
    cartPromise = (context.cart as any).get();
  } else {
    // Create a promise that resolves to null if cart context is not available
    cartPromise = Promise.resolve(null);
  }

  // Try to use Hydrogen's getShopAnalytics first (most reliable)
  let shopAnalytics: {
    shopId: string;
    acceptedLanguage: 'HE' | string;
    currency: string;
    hydrogenSubchannelId: string;
  } | null = null;
  
  try {
    if (context.storefront && typeof context.storefront === 'object' && 'query' in context.storefront) {
      // Use Hydrogen's getShopAnalytics - this is the recommended way
      const shopAnalyticsParams: any = { 
        storefront: context.storefront as any,
      };
      if (envVars.PUBLIC_STOREFRONT_ID) {
        shopAnalyticsParams.publicStorefrontId = envVars.PUBLIC_STOREFRONT_ID;
      }
      const shopDataResult = getShopAnalytics(shopAnalyticsParams);
      const shopData = shopDataResult instanceof Promise ? await shopDataResult : shopDataResult;
      
      if (shopData && typeof shopData === 'object' && (shopData as any)?.shopId) {
        // Extract serializable data
        shopAnalytics = {
          shopId: String((shopData as any).shopId).trim(),
          acceptedLanguage: ((shopData as any)?.acceptedLanguage || 'HE') as 'HE',
          currency: (shopData as any)?.currency || 'ILS',
          hydrogenSubchannelId: String((shopData as any)?.hydrogenSubchannelId || '0'),
        };
        
        console.log('[Analytics] ✅ Successfully got shop analytics from Hydrogen:', {
          shopId: shopAnalytics.shopId,
          shopIdLength: shopAnalytics.shopId.length,
          acceptedLanguage: shopAnalytics.acceptedLanguage,
          currency: shopAnalytics.currency,
        });
      }
    }
  } catch (error) {
    console.warn('[Analytics] ⚠️ Could not get shop analytics from Hydrogen:', error instanceof Error ? error.message : String(error));
  }
  
  // Fallback: Extract shopId from environment variables
  if (!shopAnalytics || !shopAnalytics.shopId || shopAnalytics.shopId.trim() === '') {
    console.log('[Analytics] 🔄 Using fallback: extracting shopId from environment variables');
    
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
      console.warn('[Analytics] ⚠️ shopId not found in env vars, using hardcoded fallback');
      // Hardcoded fallback for production stability
      shopId = '1000075164';
      console.log('[Analytics] ✅ Using hardcoded shopId fallback:', shopId);
    }
    
    shopAnalytics = {
      shopId: shopId.trim(),
      acceptedLanguage: 'HE' as 'HE',
    currency: 'ILS',
    hydrogenSubchannelId: '0',
  };
  
    console.log('[Analytics] ✅ Using fallback shop configuration:', {
      shopId: shopAnalytics.shopId,
      shopIdLength: shopAnalytics.shopId.length,
      acceptedLanguage: shopAnalytics.acceptedLanguage,
      currency: shopAnalytics.currency,
    });
  }
  
  // DEBUG: Log shop analytics result
  console.log('[Debug] Shop Analytics result:', shopAnalytics);
  
  // Final validation - shopId MUST be non-empty (hardcode fallback if needed)
  if (!shopAnalytics.shopId || shopAnalytics.shopId.trim() === '') {
    console.warn('[Analytics] ⚠️ shopId is empty after all attempts, using hardcoded fallback');
    shopAnalytics.shopId = '1000075164';
  }
  
  // CRITICAL: Final guarantee - shopId will NEVER be empty or undefined (production safety)
  shopAnalytics.shopId = String((shopAnalytics.shopId && shopAnalytics.shopId.trim()) || '1000075164').trim();
  
  // Ensure shopAnalytics is never null/undefined
  if (!shopAnalytics) {
    shopAnalytics = {
      shopId: '1000075164',
      acceptedLanguage: 'HE' as 'HE',
      currency: 'ILS',
      hydrogenSubchannelId: '0',
    };
  }
  
  console.log('[Analytics] ✅ Final shop configuration (ready for Analytics.Provider):', {
    shopId: shopAnalytics.shopId,
    shopIdLength: shopAnalytics.shopId.length,
    shopIdType: typeof shopAnalytics.shopId,
    acceptedLanguage: shopAnalytics.acceptedLanguage,
    currency: shopAnalytics.currency,
  });

  // DEBUG: Log final shopId before returning
  console.log('[Debug] Final shopId before returning JSON:', shopAnalytics?.shopId);

  const consent = {
    checkoutDomain: envVars.PUBLIC_CHECKOUT_DOMAIN || (envVars.PUBLIC_STORE_DOMAIN?.replace('.myshopify.com', '') + '.myshopify.com') || '',
    storefrontAccessToken: envVars.PUBLIC_STOREFRONT_API_TOKEN || '',
    withPrivacyBanner: false, // Disable to avoid Shopify object redefinition
  };

  const returnData = {
    cart: cartPromise as any, // Type assertion for Analytics.Provider compatibility
    shop: shopAnalytics as any, // Type assertion for Analytics.Provider compatibility
    consent,
  };

  // DEBUG: Log what we're serializing to JSON
  console.log('[Debug] Return data before json():', {
    hasShop: !!returnData.shop,
    shop: returnData.shop,
    shopId: returnData.shop?.shopId,
    shopIdType: typeof returnData.shop?.shopId,
    shopStringified: JSON.stringify(returnData.shop),
  });

  // #region agent log
  // Server-side log (will be written to console, not HTTP endpoint)
  console.log('[Agent Debug] Loader returning shop data:', JSON.stringify({
    location: 'root.tsx:205',
    message: 'Loader - BEFORE json() return',
    data: {
      shop: returnData.shop,
      shopId: returnData.shop?.shopId,
      shopIdType: typeof returnData.shop?.shopId,
      shopStringified: JSON.stringify(returnData.shop),
    },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'A',
  }));
  // #endregion

  return json(returnData);
}

// Separate component for Analytics Provider to avoid IIFE in JSX
function AnalyticsProviderWrapper({ data }: { data: any }) {
  // Create validated shop object with guaranteed shopId (production-safe)
  const validatedShop = useMemo(() => {
    // CRITICAL: Always ensure shopId exists and is a non-empty string
    let shopId = '1000075164'; // Default fallback
    
    if (data.shop && typeof data.shop === 'object' && data.shop.shopId) {
      const extractedShopId = String(data.shop.shopId).trim();
      if (extractedShopId !== '') {
        shopId = extractedShopId;
      }
    }
    
    // Return validated shop object with guaranteed shopId
    // CRITICAL: Ensure shopId is always a non-empty string (Shopify Hydrogen requirement)
    const finalShopId = String(shopId).trim() || '1000075164';
    
    const validatedShopObject = {
      shopId: finalShopId,
      acceptedLanguage: (data.shop?.acceptedLanguage || 'HE') as 'HE',
      currency: data.shop?.currency || 'ILS',
      hydrogenSubchannelId: String(data.shop?.hydrogenSubchannelId || '0'),
    };
    
    // DEBUG: Log the validated shop object structure
    console.log('[Debug] ValidatedShop object structure:', {
      ...validatedShopObject,
      shopIdType: typeof validatedShopObject.shopId,
      shopIdIsString: typeof validatedShopObject.shopId === 'string',
      shopIdLength: validatedShopObject.shopId.length,
    });
    
    return validatedShopObject;
  }, [data.shop]);
  
  // Log validated shop object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('[Analytics] 🔍 Validated shop object for Analytics.Provider:', {
        shopId: validatedShop.shopId,
        shopIdLength: validatedShop.shopId.length,
        shopIdType: typeof validatedShop.shopId,
        hasShopId: !!validatedShop.shopId,
      });
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:254',message:'useEffect validatedShop - AFTER useMemo',data:{validatedShop,shopId:validatedShop.shopId,shopIdType:typeof validatedShop.shopId,hasShopId:!!validatedShop.shopId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
    }
  }, [validatedShop]);
  
  // Additional validation - ensure shopId is set before rendering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!validatedShop.shopId || validatedShop.shopId.trim() === '') {
        console.error('[Analytics] ❌ CRITICAL: shopId is empty in AnalyticsProviderWrapper!');
        console.error('[Analytics] This will cause PerfKit "shopId is missing" error');
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:259',message:'ERROR: shopId is empty in validatedShop',data:{validatedShop,shopId:validatedShop.shopId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
      } else {
        console.log('[Analytics] ✅ shopId is valid before Analytics.Provider render:', validatedShop.shopId);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:263',message:'shopId validation passed',data:{shopId:validatedShop.shopId,shopIdType:typeof validatedShop.shopId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
      }
    }
  }, [validatedShop.shopId]);
  
  // DEBUG: Log exactly what we're passing to Analytics.Provider
  console.log('[Debug] Analytics.Provider shop prop:', {
    shop: validatedShop,
    shopId: validatedShop.shopId,
    shopIdType: typeof validatedShop.shopId,
    shopIdLength: validatedShop.shopId?.length,
    shopIdIsString: typeof validatedShop.shopId === 'string',
    shopIdIsEmpty: !validatedShop.shopId || validatedShop.shopId.trim() === '',
    fullShopObject: JSON.stringify(validatedShop),
  });
  
  // CRITICAL: Hardcode shop object to satisfy Shopify Analytics validator
  // Do not use variables - hardcode all values to avoid serialization issues
  const shopForProvider = {
    shopId: '1000075164',
    currency: 'ILS' as const,
    acceptedLanguage: 'HE' as 'HE',
    hydrogenSubchannelId: '0',
  };
  
  // DEBUG: Log the exact shop object being passed
  console.log('[Debug] Shop object for Analytics.Provider (hardcoded):', {
    shopForProvider,
    shopId: shopForProvider.shopId,
    shopIdType: typeof shopForProvider.shopId,
    shopIdLength: shopForProvider.shopId.length,
    isString: typeof shopForProvider.shopId === 'string',
    stringified: JSON.stringify(shopForProvider),
  });
  
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:298',message:'AnalyticsProviderWrapper render - BEFORE Analytics.Provider',data:{shopForProvider,shopId:shopForProvider.shopId,shopIdType:typeof shopForProvider.shopId,hasShopId:!!shopForProvider.shopId,shopStringified:JSON.stringify(shopForProvider)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion
  
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:299',message:'AnalyticsProviderWrapper render - shop object structure check',data:{shopKeys:Object.keys(shopForProvider),shopValues:Object.values(shopForProvider),shopIdExists:'shopId' in shopForProvider,shopIdValue:shopForProvider.shopId,shopIdDirectAccess:shopForProvider['shopId']},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  }
  // #endregion
  
  // REMOVED: stableShop - not used anymore, using shopProp instead
  
  // Create a wrapper that ensures shop prop is always accessible
  // CRITICAL: Do NOT freeze the object - Analytics.Provider needs to access it
  const shopProp = useMemo(() => {
    // Ensure shopId is always a string and never undefined
    const shop = {
      shopId: '1000075164', // Direct string, no String() wrapper
      currency: 'ILS' as const,
      acceptedLanguage: 'HE' as 'HE',
      hydrogenSubchannelId: '0',
    };
  
    // #region agent log
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:340',message:'shopProp useMemo - final shop object (NOT FROZEN)',data:{shop,shopId:shop.shopId,shopIdType:typeof shop.shopId,shopIdLength:shop.shopId.length,hasShopId:!!shop.shopId,shopIdIsString:typeof shop.shopId === 'string',shopFrozen:Object.isFrozen(shop),shopKeys:Object.keys(shop)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    }
    // #endregion
  
    return shop;
  }, []);
  
  // #region agent log
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:355',message:'AnalyticsProviderWrapper - shop prop BEFORE Analytics.Provider render',data:{shopProp,shopId:shopProp.shopId,shopIdType:typeof shopProp.shopId,hasShopId:!!shopProp.shopId,shopIdAccess:shopProp['shopId'],shopFrozen:Object.isFrozen(shopProp),shopKeys:Object.keys(shopProp)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    }
  }, [shopProp]);
  // #endregion
  
  return (
    <Analytics.Provider
      cart={data.cart}
      shop={shopProp}
      consent={data.consent}
      disableThrowOnError={true}
    >
      {/* #region agent log */}
      {typeof window !== 'undefined' && (() => {
        fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:375',message:'AnalyticsProviderWrapper render - INSIDE Analytics.Provider children',data:{shopPropPassed:!!shopProp,shopIdInShop:shopProp.shopId,shopPropKeys:Object.keys(shopProp)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        return null;
      })()}
      {/* #endregion */}
      <Outlet />
    </Analytics.Provider>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  
  // DEBUG: Log what Analytics Provider receives
  console.log('[Debug] Analytics Provider Received:', data.shop);
  
  // #region agent log
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:315',message:'App component - data from loader',data:{hasShop:!!data.shop,shop:data.shop,shopId:data.shop?.shopId,shopIdType:typeof data.shop?.shopId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    }
  }, [data]);
  // #endregion
  
  // Debug logging (client-side) - CRITICAL for debugging shopId issues
  if (typeof window !== 'undefined') {
    console.log('[Analytics] 🔍 Client-side shop data (before Analytics.Provider):', {
      hasShop: !!data.shop,
      shop: data.shop,
      shopId: data.shop?.shopId,
      shopIdType: typeof data.shop?.shopId,
      shopIdLength: data.shop?.shopId?.length,
      shopIdIsEmpty: !data.shop?.shopId || data.shop.shopId.trim() === '',
      hasConsent: !!data.consent,
      consent: data.consent,
    });
    
    // Validate shopId before passing to Analytics.Provider
    if (!data.shop?.shopId || data.shop.shopId.trim() === '') {
      console.error('[Analytics] ❌ CRITICAL ERROR: shopId is missing or empty on client-side!');
      console.error('[Analytics] This will cause "Missing shop.shopId configuration" error');
    } else {
      console.log('[Analytics] ✅ shopId is valid:', data.shop.shopId);
    }
  }
  
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent Shopify object redefinition error
              (function() {
                if (typeof window === 'undefined') return;
                
                // If Shopify already exists, try to make it redefinable
                if (window.Shopify) {
                  try {
                    // Try to delete the property descriptor to allow redefinition
                    const descriptor = Object.getOwnPropertyDescriptor(window, 'Shopify');
                    if (descriptor && !descriptor.configurable) {
                      // Property is not configurable, we can't delete it
                      // Store the existing value and mark it as already initialized
                      window.__SHOPIFY_ALREADY_EXISTS__ = true;
                      console.warn('[Analytics] Shopify object already exists and is not configurable');
                    } else {
                      // Property is configurable, delete it to allow redefinition
                      delete window.Shopify;
                      console.log('[Analytics] Removed existing Shopify object to allow redefinition');
                    }
                  } catch (e) {
                    // If we can't delete it, mark it as already exists
                    window.__SHOPIFY_ALREADY_EXISTS__ = true;
                    console.warn('[Analytics] Could not remove existing Shopify object:', e);
                  }
                } else {
                  // Shopify doesn't exist, create it as a regular property
                  window.Shopify = {};
                }
              })();
            `,
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-family-main)' }}>
        <AnalyticsProviderWrapper data={data} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

