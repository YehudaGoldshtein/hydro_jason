import { Heart, RotateCcw, Truck } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

const iconMap = {
  quality: Heart,
  returns: RotateCcw,
  shipping: Truck,
};

export function BenefitsList() {
  const benefits = activeContent.benefitsList.items;

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-6 lg:gap-8" dir="rtl">
      {benefits.map((benefit) => {
        const Icon = iconMap[benefit.id as keyof typeof iconMap];
        return (
          <div
            key={benefit.id}
            className="flex items-center gap-1.5 md:gap-2"
            dir="ltr"
          >
            <Icon 
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#d5ab9a] flex-shrink-0" 
              strokeWidth={2} 
            />
            {/* Mobile: Short Text */}
            <span className="md:hidden text-xs font-medium text-[#52423d] whitespace-nowrap">
              {benefit.mobileText}
            </span>
            {/* Desktop: Full Text */}
            <span className="hidden md:inline text-base lg:text-lg font-medium text-[#52423d] whitespace-nowrap">
              {benefit.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
