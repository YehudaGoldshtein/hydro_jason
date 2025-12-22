import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';

export function IndependenceVideoSection() {
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { selectedVariantIndex } = useSelectedVariant();
  const { heading, videoAlt, videoPlaceholder, ctaButton, paymentMethodsAlt, paymentIconsPlaceholder, avatarAlt, socialProofText } = activeContent.independenceVideo;
  const { independenceVideo: videoMedia } = landingMedia;

  const handleCheckout = () => {
    // Use the selected variant from context (default is 0 = ₪199)
    const selectedVariant = product?.variants?.nodes?.[selectedVariantIndex];
    if (selectedVariant?.id) {
      goToCheckout(selectedVariant.id, 1);
    }
  };

  return (
    <section className="bg-bg-page py-16 px-4" dir="rtl">
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-tight">
          {heading}
        </h2>

        <div className="w-full">
          <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <img
              src={videoMedia.video.thumbnail}
              alt={videoMedia.video.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? ctaButton.submitting : ctaButton.default}
        </button>

        <div className="w-full flex flex-col items-center gap-4">
          <img
            src={videoMedia.paymentIcons.src}
            alt={videoMedia.paymentIcons.alt}
            className="w-full max-w-lg"
            loading="lazy"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {videoMedia.customerAvatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar.src}
                  alt={avatar.alt}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-xs md:text-sm text-text-secondary">
              {socialProofText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
