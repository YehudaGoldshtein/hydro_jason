import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';

export function IndependenceVideoSection() {
  const avatars = [
    'https://placehold.co/40x40/e5b7a3/ffffff?text=A',
    'https://placehold.co/40x40/f2a085/ffffff?text=B',
    'https://placehold.co/40x40/de7e63/ffffff?text=C'
  ];
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { heading, videoAlt, videoPlaceholder, ctaButton, paymentMethodsAlt, paymentIconsPlaceholder, avatarAlt, socialProofText } = activeContent.independenceVideo;

  const handleCheckout = () => {
    const firstVariant = product?.variants?.nodes?.[0];
    if (firstVariant?.id) {
      goToCheckout(firstVariant.id, 1);
    }
  };

  return (
    <section className="bg-[#fff6f2] py-16 px-4" dir="rtl">
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#52423d] leading-tight">
          {heading}
        </h2>

        <div className="w-full">
          <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <img
              src={`https://placehold.co/300x530/e07a63/white?text=${videoPlaceholder}`}
              alt={videoAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#de7e63] via-[#e79a7b] to-[#e9a481] text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? ctaButton.submitting : ctaButton.default}
        </button>

        <div className="w-full flex flex-col items-center gap-4">
          <img
            src={`https://placehold.co/600x60/fff6f2/52423d?text=${paymentIconsPlaceholder}`}
            alt={paymentMethodsAlt}
            className="w-full max-w-lg"
            loading="lazy"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {avatars.map((avatar, index) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt={`${avatarAlt} ${index + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
            <p className="text-xs md:text-sm text-[#7a6c66]">
              {socialProofText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
