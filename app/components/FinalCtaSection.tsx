import { Star, Check } from 'lucide-react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';
import { useEcommerceTracking } from '~/utils/gtm-tracking';

export function FinalCtaSection() {
  const stars = Array.from({ length: 5 });
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { selectedVariantIndex } = useSelectedVariant();
  const selectedVariant = product?.variants?.nodes?.[selectedVariantIndex];
  const { goToCheckout, isSubmitting } = useCheckout({
    product: product || undefined,
    variant: selectedVariant || undefined,
    quantity: 1,
  });
  const { trackAddToCart } = useEcommerceTracking();
  const { heading: ctaHeading, ctaButton, paymentMethodsAlt, paymentIconsPlaceholder, guaranteeText } = activeContent.finalCta;
  const { heading: bonusHeading, includedBadge, products: bonusProducts } = activeContent.bonusProducts;
  const { finalCta: ctaMedia, bonusProducts: bonusMedia } = landingMedia;

  const handleCheckout = () => {
    // Use the selected variant from context (default is 0 = ₪199)
    if (selectedVariant?.id && product) {
      // Track add_to_cart event
      trackAddToCart({
        product,
        variant: selectedVariant,
        quantity: 1,
      });
      goToCheckout(selectedVariant.id, 1);
    }
  };

  return (
    <section className="bg-bg-page py-8 md:py-10 lg:py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Bonus Products Section */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-6 md:mb-8">
              {bonusHeading}
            </h2>

            <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8 mb-10 md:mb-12">
              {bonusProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-border-default p-6 md:p-7 flex flex-col gap-4 items-center text-center"
                >
                  <div className="relative w-full">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-light px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-xs md:text-sm font-semibold text-white">
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" strokeWidth={2.6} />
                      <span>{includedBadge}</span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-border-default shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
                      <img
                        src={bonusMedia.products[index].image.src}
                        alt={bonusMedia.products[index].image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-bold text-text-primary leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-sm md:text-base text-text-secondary font-semibold">
                      {product.subtitle}
                    </p>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-t-8 border-primary-main shadow-lg p-8 md:p-12 flex flex-col items-center text-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
              {ctaHeading}
            </h2>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full md:w-auto bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full btn-3d-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-[0_6px_16px_rgba(224,122,99,0.35)]"
            >
              {isSubmitting ? ctaButton.submitting : ctaButton.default}
            </button>

            <div className="w-full flex flex-col items-center gap-3">
              <img
                src={ctaMedia.paymentMethods.src}
                alt={ctaMedia.paymentMethods.alt}
                className="w-full max-w-md"
                loading="lazy"
              />

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-ui-star">
                  {stars.map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-ui-star text-ui-star" strokeWidth={2} />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-text-secondary">{guaranteeText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
