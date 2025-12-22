import { Star } from 'lucide-react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';

export function FinalCtaSection() {
  const stars = Array.from({ length: 5 });
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { selectedVariantIndex } = useSelectedVariant();
  const { heading, ctaButton, paymentMethodsAlt, paymentIconsPlaceholder, guaranteeText } = activeContent.finalCta;
  const { finalCta: ctaMedia } = landingMedia;

  const handleCheckout = () => {
    // Use the selected variant from context (default is 0 = ₪199)
    const selectedVariant = product?.variants?.nodes?.[selectedVariantIndex];
    if (selectedVariant?.id) {
      goToCheckout(selectedVariant.id, 1);
    }
  };

  return (
    <section className="bg-bg-page py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border-t-8 border-primary-main shadow-lg p-8 md:p-12 flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight">
            {heading}
          </h2>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  );
}
