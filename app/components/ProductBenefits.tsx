import { Package, Droplet, RefreshCw } from 'lucide-react';

const benefits = [
  {
    id: 'universal-fit',
    icon: Package,
    text: 'מתאים לכל הבקבוקים',
  },
  {
    id: 'washable',
    icon: Droplet,
    text: 'אפשר לכבס',
  },
  {
    id: 'return-policy',
    icon: RefreshCw,
    text: '30 יום אפשר להחזיר',
  },
];

export function ProductBenefits() {
  return (
    <section className="bg-bg-page py-8 md:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="flex flex-col items-center gap-3 md:gap-4"
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary-main to-primary-light flex items-center justify-center shadow-[0_4px_12px_rgba(224,122,99,0.25)] transition-all hover:scale-105 hover:shadow-[0_6px_16px_rgba(224,122,99,0.35)]">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" strokeWidth={2} />
                  </div>
                  {/* Text */}
                  <p className="text-xs md:text-sm lg:text-base font-medium text-text-primary text-center max-w-[120px] md:max-w-[140px] leading-tight">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

