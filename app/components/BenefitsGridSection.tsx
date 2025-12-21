import { activeContent } from '~/configs/content-active';

export function BenefitsGridSection() {
  const { heading, items } = activeContent.benefitsGrid;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#52423d] mb-8 md:mb-10">
            {heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {items.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5b7a3] shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-[#e07a63]"
              >
                <div className="aspect-[4/3] w-full bg-[#fff3ed]">
                  <img
                    src={benefit.imagePlaceholder}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 md:p-6 text-right">
                  <h3 className="text-lg md:text-xl font-bold text-[#52423d] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#7a6c66] leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
