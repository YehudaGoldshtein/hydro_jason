import { Check } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function BonusProductsSection() {
  const { heading, includedBadge, products } = activeContent.bonusProducts;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#52423d] leading-tight">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-[#f2e3dd] p-6 md:p-7 flex flex-col gap-4 items-center text-center"
            >
              <div className="relative w-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f2a085] px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-xs md:text-sm font-semibold text-white">
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" strokeWidth={2.6} />
                  <span>{includedBadge}</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-[#f2e3dd] shadow-[0_6px_16px_rgba(0,0,0,0.05)]">
                  <img
                    src={product.imagePlaceholder}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-bold text-[#52423d] leading-tight">
                  {product.title}
                </h3>
                <p className="text-sm md:text-base text-[#7a6c66] font-semibold">
                  {product.subtitle}
                </p>
                <p className="text-sm md:text-base text-[#7a6c66] leading-relaxed">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
