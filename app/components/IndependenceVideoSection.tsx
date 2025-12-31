import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';
import { useEcommerceTracking } from '~/utils/gtm-tracking';
import { Truck, Gift, ShieldCheck } from 'lucide-react';

export function IndependenceVideoSection() {
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { selectedVariantIndex } = useSelectedVariant();
  const selectedVariant = product?.variants?.nodes?.[selectedVariantIndex];
  const { goToCheckout, isSubmitting } = useCheckout({
    product: product || undefined,
    variant: selectedVariant || undefined,
    quantity: 1,
  });
  const { trackAddToCart } = useEcommerceTracking();
  const { heading, videoAlt, videoPlaceholder, ctaButton, paymentMethodsAlt, paymentIconsPlaceholder, avatarAlt, socialProofText } = activeContent.independenceVideo;
  const { independenceVideo: videoMedia } = landingMedia;
  const { heading: guaranteeHeading, subheading: guaranteeSubheading, bodyText: guaranteeBodyText } = activeContent.guarantee;

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
    <section className="bg-bg-page py-8 md:py-10 px-4" dir="rtl">
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-6">
        {/* Guarantee Section */}
        <div 
          className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center text-center gap-4 relative"
          style={{
            animation: 'guaranteeBorderGlow 4s ease-in-out infinite',
            boxShadow: '0 10px 30px rgba(224, 122, 99, 0.15), 0 0 0 2px rgba(229, 183, 163, 0.4), 0 0 0 4px rgba(224, 122, 99, 0.1)',
            border: '2px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(224, 122, 99, 0.4), rgba(242, 160, 133, 0.3), rgba(229, 183, 163, 0.4)) border-box',
          }}
        >
          {/* Glow effect overlay */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(224, 122, 99, 0.2) 0%, transparent 70%)',
            }}
          />
          
          <div 
            className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-main to-primary-light flex items-center justify-center text-white relative z-10"
            style={{
              animation: 'guaranteeIconPulse 3s ease-in-out infinite',
            }}
          >
            <ShieldCheck className="w-7 h-7" strokeWidth={2.5} />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-text-primary relative z-10">
            {guaranteeHeading}
          </h3>

          <p className="text-base md:text-lg font-medium text-text-secondary relative z-10">
            {guaranteeSubheading}
          </p>

          <div className="w-12 h-0.5 bg-primary-light rounded-full relative z-10" />

          <p className="text-sm md:text-base leading-relaxed text-text-primary max-w-2xl relative z-10">
            {guaranteeBodyText}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full btn-3d-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-[0_6px_16px_rgba(224,122,99,0.35)]"
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
            
            {/* Free Shipping Badge */}
            <div className="flex items-center gap-2 mt-3 px-4 py-2.5 bg-gradient-to-r from-primary-lighter/20 to-primary-light/20 rounded-full border border-primary-lighter shadow-sm">
              <div className="flex items-center gap-1.5">
                <Truck 
                  className="w-4 h-4 text-primary-main flex-shrink-0" 
                  strokeWidth={2.5}
                  style={{
                    animation: 'truckDriving 2s ease-in-out infinite',
                  }}
                />
                <span className="text-xs md:text-sm font-bold text-primary-main">
                  משלוח עד הבית חינם
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-text-secondary font-medium">(עד גמר המלאי)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
