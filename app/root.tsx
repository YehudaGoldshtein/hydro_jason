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
  // Meta Pixel ID
  const metaPixelId = '1855054518452200';
  
  // Meta Pixel base code - must be identical for SSR and client to prevent hydration mismatches
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
        {/* Meta Pixel Code */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: metaPixelScript,
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-family-main)' }}>
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

