import { Star } from 'lucide-react';
import { useCheckout } from '~/lib/useCheckout';
import { useLoaderData } from '@remix-run/react';

export function IndependenceCtaSection() {
  const stars = Array.from({ length: 5 });
  const { goToCheckout, isSubmitting } = useCheckout();
  const { product } = useLoaderData<typeof import('~/routes/_index').loader>();

  const handleCheckout = () => {
    const firstVariant = product?.variants?.nodes?.[0];
    if (firstVariant?.id) {
      goToCheckout(firstVariant.id, 1);
    }
  };

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#f2e3dd] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 md:p-10 flex flex-col items-center text-center gap-6">
          <h2 className="w-full text-2xl md:text-3xl font-bold text-[#52423d] leading-tight text-right">
            הגיע הזמן להחזיר לעצמך את הידיים, את הזמן ואת השקט.
          </h2>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-[#de7e63] via-[#e79a7b] to-[#e9a481] text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'מעביר לצ\'קאאוט...' : 'אז אני רוצה להחזיר את הערכה שלי עכשיו!'}
          </button>

          <div className="w-full flex flex-col items-center gap-4">
            <img
              src="https://placehold.co/600x60/fff6f2/52423d?text=Payment+Icons+Image"
              alt="אמצעי תשלום"
              className="w-full max-w-lg"
              loading="lazy"
            />

            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 text-[#fbbf24]">
                {stars.map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" strokeWidth={2} />
                ))}
              </div>
              <p className="text-xs md:text-sm text-[#7a6c66]">חוות דעת 100% החזר כספי ל-30 יום</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

