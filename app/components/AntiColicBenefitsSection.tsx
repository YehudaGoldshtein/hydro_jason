import { Star, Gift, Baby } from 'lucide-react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';

function InlineDivider() {
  return (
    <div className="w-full py-2 md:py-3" dir="rtl">
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {/* Left decorative swirled curve */}
        <svg
          className="flex-shrink-0 w-20 md:w-32 h-10"
          viewBox="0 0 128 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20 C 16 12, 24 12, 32 20 C 40 28, 48 28, 56 20 C 64 12, 72 12, 80 20 C 88 28, 96 28, 104 20 C 112 12, 120 12, 128 20"
            stroke="#f0e2dc"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M0 24 C 14 18, 22 18, 32 24 C 42 30, 50 30, 56 24 C 62 18, 70 18, 80 24 C 90 30, 98 30, 104 24 C 110 18, 118 18, 128 24"
            stroke="#f0e2dc"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>

        {/* Baby icon in the middle */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-lighter/30 flex items-center justify-center">
            <Baby className="w-6 h-6 md:w-7 md:h-7 text-primary-main" strokeWidth={2} />
          </div>
        </div>

        {/* Right decorative swirled curve */}
        <svg
          className="flex-shrink-0 w-20 md:w-32 h-10"
          viewBox="0 0 128 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128 20 C 112 12, 104 12, 96 20 C 88 28, 80 28, 72 20 C 64 12, 56 12, 48 20 C 40 28, 32 28, 24 20 C 16 12, 8 12, 0 20"
            stroke="#f0e2dc"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M128 24 C 114 18, 106 18, 96 24 C 86 30, 78 30, 72 24 C 66 18, 58 18, 48 24 C 38 30, 30 30, 24 24 C 18 18, 10 18, 0 24"
            stroke="#f0e2dc"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}

function CheckoutButton() {
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { selectedVariantIndex } = useSelectedVariant();
  const { ctaButton } = activeContent.antiColicBenefits;

  const handleCheckout = () => {
    // Use the selected variant from context (default is 0 = ₪199)
    const selectedVariant = product?.variants?.nodes?.[selectedVariantIndex];
    if (selectedVariant?.id) {
      goToCheckout(selectedVariant.id, 1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isSubmitting}
      className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 md:px-10 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? ctaButton.submitting : ctaButton.default}
    </button>
  );
}

export function AntiColicBenefitsSection() {
  const { headline, subtext, highlightText, benefits } = activeContent.antiColicBenefits;

  return (
    <section className="bg-bg-page py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* White Card Container */}
          <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-text-primary mb-4 md:mb-6">
              {headline}
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-center text-text-secondary mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              {subtext}
            </p>

            {/* Highlight Text */}
            <p className="text-base md:text-lg lg:text-xl font-bold text-center text-primary-main mb-8 md:mb-10">
              {highlightText}
            </p>

            {/* Benefits List */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex items-center gap-3 md:gap-4 bg-bg-alt rounded-xl md:rounded-2xl p-4 md:p-5 border border-ui-icon-bg"
                >
                  {/* Star Icon on the right (RTL) */}
                  <div className="flex-shrink-0">
                    <Star 
                      className="w-5 h-5 md:w-6 md:h-6 text-primary-main fill-primary-main" 
                      strokeWidth={0}
                    />
                  </div>
                  
                  {/* Benefit Text */}
                  <p className="text-sm md:text-base text-text-primary leading-relaxed flex-1">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-3 mb-8 md:mb-10">
              <CheckoutButton />
              
              {/* Gifts Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-lighter/20 to-primary-light/20 rounded-full border border-primary-lighter shadow-sm">
                <Gift 
                  className="w-4 h-4 md:w-5 md:h-5 text-primary-main flex-shrink-0" 
                  strokeWidth={2.5}
                  style={{
                    animation: 'giftPulse 1.5s ease-in-out infinite',
                  }}
                />
                <span className="text-xs md:text-sm font-bold text-primary-main">3 מתנות</span>
                <span className="text-[10px] md:text-xs text-text-secondary font-medium">(עד גמר המלאי)</span>
              </div>
            </div>

            {/* Divider */}
            <InlineDivider />

          </div>
        </div>
      </div>
    </section>
  );
}
