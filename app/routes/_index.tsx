import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { storefrontQuery } from '~/lib/shopify.server';
import { Layout } from '~/components/Layout';
import { HeroVideoCarousel } from '~/components/HeroVideoCarousel';
import { Hero } from '~/components/Hero';
import { BenefitsList } from '~/components/BenefitsList';
import { WhyChooseUsSection } from '~/components/WhyChooseUsSection';
import { PricingSelectionSection } from '~/components/PricingSelectionSection';
import { PaymentAndTestimonialSection } from '~/components/PaymentAndTestimonialSection';
import { ProblemSolutionSection } from '~/components/ProblemSolutionSection';
import { AntiColicBenefitsSection } from '~/components/AntiColicBenefitsSection';
import { BenefitsGridSection } from '~/components/BenefitsGridSection';
import { SuitabilityCheckSection } from '~/components/SuitabilityCheckSection';
import { SocialProof } from '~/components/SocialProof';
import { HowItWorksSection } from '~/components/HowItWorksSection';
import { FounderStorySection } from '~/components/FounderStorySection';
import { BonusProductsSection } from '~/components/BonusProductsSection';
import { IndependenceVideoSection } from '~/components/IndependenceVideoSection';
import { GuaranteeSection } from '~/components/GuaranteeSection';
import { FaqSection } from '~/components/FaqSection';
import { FinalCtaSection } from '~/components/FinalCtaSection';
import { Footer } from '~/components/Footer';
import { StickyBuyBar } from '~/components/StickyBuyBar';
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

export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    console.log('🔍 LOADER: Starting product fetch');
    console.log('🔍 LOADER: Context env:', {
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
      hasToken: !!context.env.PUBLIC_STOREFRONT_API_TOKEN
    });

    const { data } = await storefrontQuery(
      PRODUCT_QUERY,
      { handle: 'האכלה-קלה-ערכת' },
      {
        storeDomain: context.env.PUBLIC_STORE_DOMAIN,
        storefrontApiToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
      }
    );

    console.log('🔍 LOADER: Product fetched:', JSON.stringify(data.product, null, 2));
    console.log('🔍 LOADER: Variants:', data.product?.variants?.nodes?.map((v: any) => ({ id: v.id, title: v.title })));

    return json({
      product: data.product,
    });
  } catch (error) {
    console.error('❌ LOADER ERROR:', error);
    // Return null product if there's an error, so the page still loads
    return json({
      product: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default function Index() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <SelectedVariantProvider>
      <Layout>
        <div className="pb-24 md:pb-28">
          <HeroVideoCarousel />
          <Hero />
          <div className="container mx-auto px-4 py-8 md:py-12">
            <BenefitsList />
          </div>
          <div id="pricing">
            <PricingSelectionSection product={product} />
          </div>
          <WhyChooseUsSection />
          <PaymentAndTestimonialSection />
          <ProblemSolutionSection />
          <AntiColicBenefitsSection />
          <SuitabilityCheckSection />
          <BenefitsGridSection />
          <SocialProof />
          <HowItWorksSection />
          <FounderStorySection />
          <BonusProductsSection />
          <IndependenceVideoSection />
          <GuaranteeSection />
          <FaqSection />
          <FinalCtaSection />
          <Footer />
        </div>
        <StickyBuyBar />
      </Layout>
    </SelectedVariantProvider>
  );
}

