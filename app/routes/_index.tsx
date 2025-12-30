import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useAnalytics } from '@shopify/hydrogen';
import { storefrontQuery } from '~/lib/shopify.server';
import { Layout } from '~/components/Layout';
import { HeroVideoCarousel } from '~/components/HeroVideoCarousel';
import { ProductHeroSection } from '~/components/ProductHeroSection';
import { Hero } from '~/components/Hero';
import { ProductBenefits } from '~/components/ProductBenefits';
import { BonusGiftsSection } from '~/components/BonusGiftsSection';
import { BenefitsList } from '~/components/BenefitsList';
import { PricingSelectionSection } from '~/components/PricingSelectionSection';
import { ProblemSolutionSection } from '~/components/ProblemSolutionSection';
import { BenefitsGridSection } from '~/components/BenefitsGridSection';
import { SuitabilityCheckSection } from '~/components/SuitabilityCheckSection';
import { SocialProof } from '~/components/SocialProof';
import { FounderStorySection } from '~/components/FounderStorySection';
import { IndependenceVideoSection } from '~/components/IndependenceVideoSection';
import { FaqSection } from '~/components/FaqSection';
import { FinalCtaSection } from '~/components/FinalCtaSection';
import { Footer } from '~/components/Footer';
import { DecorativeDivider } from '~/components/DecorativeDivider';
import { StickyBuyBar } from '~/components/StickyBuyBar';
import { LiveVisitorsCounter } from '~/components/LiveVisitorsCounter';
import { SelectedVariantProvider } from '~/lib/SelectedVariantContext';

const PRODUCT_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  }
`;

const CART_QUERY = `#graphql
  query cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalQuantity
    }
  }
`;

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    console.log('🔍 LOADER: Starting product fetch');
    console.log('🔍 LOADER: PUBLIC_STORE_DOMAIN:', context.env.PUBLIC_STORE_DOMAIN);
    console.log('🔍 LOADER: Has PUBLIC_STOREFRONT_API_TOKEN:', !!context.env.PUBLIC_STOREFRONT_API_TOKEN);

    // Try using the custom storefrontQuery first
    // Try multiple possible handles
    const possibleHandles = [
      'האכלה-קלה-ערכת',
      'האכלה-קלה',
      'feedease',
      'feed-ease',
      'ערכת-האכלה-קלה'
    ];

    let data = null;
    let errors = null;

    for (const handle of possibleHandles) {
      console.log(`🔍 Trying handle: "${handle}"`);
      const result = await storefrontQuery(
        PRODUCT_QUERY,
        { handle },
        {
          storeDomain: context.env.PUBLIC_STORE_DOMAIN,
          storefrontApiToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
        }
      );

      if (result.data?.product) {
        data = result.data;
        console.log(`✅ Found product with handle: "${handle}"`);
        break;
      }
    }

    if (!data) {
      errors = ['No product found with any of the tried handles'];
    }

    if (errors) {
      console.error('❌ LOADER: GraphQL errors:', errors);
      throw new Error(`Shopify API Error: ${JSON.stringify(errors)}`);
    }

    if (!data?.product) {
      console.error('❌ LOADER: Product not found with handle: האכלה-קלה-ערכת');
      throw new Error('Product not found. Please verify the product handle in your Shopify store.');
    }

    console.log('✅ LOADER: Product fetched successfully');
    console.log('✅ LOADER: Product ID:', data.product.id);
    console.log('✅ LOADER: Variants count:', data.product?.variants?.nodes?.length);

    // Get cart count from cookie if exists
    let cartCount = 0;
    const cookieHeader = request.headers.get('Cookie');
    // Shopify Hydrogen stores cart ID in 'cart' cookie
    const cartIdMatch = cookieHeader?.match(/cart=([^;]+)/);
    const cartId = cartIdMatch?.[1];

    if (cartId) {
      try {
        const cartResult = await storefrontQuery(
          CART_QUERY,
          { cartId },
          {
            storeDomain: context.env.PUBLIC_STORE_DOMAIN,
            storefrontApiToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
          }
        );
        cartCount = cartResult.data?.cart?.totalQuantity ?? 0;
        console.log('🛒 LOADER: Cart count:', cartCount);
      } catch (error) {
        console.log('⚠️ LOADER: Could not fetch cart (might not exist):', error);
        cartCount = 0;
      }
    }

    return json({
      product: data.product,
      cartCount,
    });
  } catch (error) {
    console.error('❌ LOADER ERROR:', error instanceof Error ? error.message : String(error));
    console.error('❌ Stack:', error instanceof Error ? error.stack : 'N/A');
    throw error;
  }
}

export default function Index() {
  const { product, cartCount } = useLoaderData<typeof loader>();
  const { publish } = useAnalytics();

  // Track page_viewed and product_viewed events when product is loaded
  useEffect(() => {
    if (product) {
      const selectedVariant = product.variants?.nodes?.[0];
      const price = selectedVariant?.price?.amount
        ? parseFloat(selectedVariant.price.amount)
        : undefined;

      // Publish page_viewed event
      publish('page_viewed', {
        url: window.location.href,
      });

      // Publish product_viewed event
      if (selectedVariant) {
        publish('product_viewed', {
          url: window.location.href,
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant.price.amount,
              variantId: selectedVariant.id,
              variantTitle: selectedVariant.title,
              quantity: 1,
              vendor: product.vendor || '',
            },
          ],
        });
      }
    }
  }, [product, publish]);

  return (
    <SelectedVariantProvider>
      <Layout cartCount={cartCount}>
        <LiveVisitorsCounter />
        <div className="pb-28 md:pb-32">
          <HeroVideoCarousel />
          <ProductHeroSection />
          {/* <div className="container mx-auto px-4 py-8 md:py-12">
            <BenefitsList />
          </div> */}
          <div id="pricing">
            <PricingSelectionSection product={product} />
          </div>
          <DecorativeDivider />
          <ProblemSolutionSection />
          <DecorativeDivider />
          <SuitabilityCheckSection />
          <BenefitsGridSection />
          <IndependenceVideoSection />
          <DecorativeDivider />
          <SocialProof />
          <DecorativeDivider />
          <FounderStorySection />
          <FinalCtaSection />
          <DecorativeDivider />
          <FaqSection />
          <DecorativeDivider />
          <Footer />
        </div>
        <StickyBuyBar />
      </Layout>
    </SelectedVariantProvider>
  );
}

