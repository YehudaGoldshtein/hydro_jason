import { Star } from 'lucide-react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';

function CheckoutButton() {
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();
  const { ctaButton } = activeContent.antiColicBenefits;

  const handleCheckout = () => {
    const firstVariant = product?.variants?.nodes?.[0];
    if (firstVariant?.id) {
      goToCheckout(firstVariant.id, 1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isSubmitting}
      className="bg-gradient-to-r from-[#de7e63] via-[#e79a7b] to-[#e9a481] text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 md:px-10 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? ctaButton.submitting : ctaButton.default}
    </button>
  );
}

export function AntiColicBenefitsSection() {
  const { headline, subtext, highlightText, benefits } = activeContent.antiColicBenefits;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* White Card Container */}
          <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#52423d] mb-4 md:mb-6">
              {headline}
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-center text-[#7a6c66] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              {subtext}
            </p>

            {/* Highlight Text */}
            <p className="text-base md:text-lg lg:text-xl font-bold text-center text-[#e07a63] mb-8 md:mb-10">
              {highlightText}
            </p>

            {/* Benefits List */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex items-center gap-3 md:gap-4 bg-[#fdfbfa] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[#f5ebe7]"
                >
                  {/* Star Icon on the right (RTL) */}
                  <div className="flex-shrink-0">
                    <Star 
                      className="w-5 h-5 md:w-6 md:h-6 text-[#e07a63] fill-[#e07a63]" 
                      strokeWidth={0}
                    />
                  </div>
                  
                  {/* Benefit Text */}
                  <p className="text-sm md:text-base text-[#52423d] leading-relaxed flex-1">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-8 md:mb-10">
              <CheckoutButton />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
