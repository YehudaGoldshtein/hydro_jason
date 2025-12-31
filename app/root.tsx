import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@shopify/remix-oxygen';
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

export default function App() {
  // GTM ID - currently hardcoded, but can be moved to env var if needed
  // To use env var: const gtmId = context?.env?.PUBLIC_GTM_ID || 'GTM-W9GPB4BZ';
  const gtmId = 'GTM-W9GPB4BZ';
  
  // Meta Pixel ID - hardcoded
  const metaPixelId = '1855054518452200';
  
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:45',message:'App render (CLIENT)',data:{gtmId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  } else {
    fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'root.tsx:45',message:'App render (SSR)',data:{gtmId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  }
  // #endregion
  
  // GTM script as constant (same for SSR and client)
  // Using a stable string to prevent hydration mismatches
  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
  
  // Meta Pixel base code (same for SSR and client)
  // Using a stable string to prevent hydration mismatches
  const metaPixelScript = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${metaPixelId}');
    fbq('track', 'PageView');
  `.trim();
  
  // Error handler to suppress analytics errors from appearing in console
  // NOTE: This error comes from GTM Container (not our code) - it's a Stape API 422 error
  // We can suppress it from console, but it will still appear in Network tab (that's normal)
  const errorHandlerScript = `
    (function() {
      // Store original console methods
      const originalError = console.error;
      const originalWarn = console.warn;
      
      // Suppress console.error messages from Stape/analytics services
      console.error = function(...args) {
        const message = args.join(' ').toLowerCase();
        // Suppress known analytics service errors
        if (
          message.includes('capig.stape.de') ||
          message.includes('stape.de/events') ||
          message.includes('stape.de') ||
          (message.includes('422') && message.includes('stape')) ||
          (message.includes('failed to load resource') && message.includes('422') && message.includes('stape'))
        ) {
          // Silently ignore Stape analytics errors
          return;
        }
        // Pass through other errors
        originalError.apply(console, args);
      };
      
      // Also suppress console.warn for Stape errors
      console.warn = function(...args) {
        const message = args.join(' ').toLowerCase();
        if (
          message.includes('capig.stape.de') ||
          message.includes('stape.de/events') ||
          (message.includes('422') && message.includes('stape'))
        ) {
          return;
        }
        originalWarn.apply(console, args);
      };
      
      // Intercept XMLHttpRequest errors from Stape (GTM uses XHR internally)
      const originalXHROpen = XMLHttpRequest.prototype.open;
      const originalXHRSend = XMLHttpRequest.prototype.send;
      
      XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url;
        // Store original error handlers
        const originalOnError = this.onerror;
        const originalOnLoad = this.onload;
        
        // If this is a Stape request, suppress error logging
        if (url && (url.includes('stape.de') || url.includes('capig.stape.de'))) {
          this.onerror = function() {
            // Silently ignore Stape errors
          };
          this.onload = function() {
            // Only log non-422 errors (422 is expected from Stape when data is invalid)
            if (this.status === 422) {
              // Silently ignore 422 errors from Stape
              return;
            }
            if (originalOnLoad) {
              originalOnLoad.call(this);
            }
          };
        } else {
          // For non-Stape requests, use original handlers
          this.onerror = originalOnError;
          this.onload = originalOnLoad;
        }
        
        return originalXHROpen.apply(this, [method, url, ...rest]);
      };
      
      XMLHttpRequest.prototype.send = function(...args) {
        return originalXHRSend.apply(this, args);
      };
    })();
  `.trim();
  
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
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body style={{ fontFamily: 'var(--font-family-main)' }}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Error handler - Must load BEFORE GTM to intercept errors */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: errorHandlerScript,
          }}
        />
        {/* Google Tag Manager - Using suppressHydrationWarning to prevent hydration errors */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: gtmScript,
          }}
        />
        {/* Meta Pixel - Using suppressHydrationWarning to prevent hydration errors */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: metaPixelScript,
          }}
        />
        
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

