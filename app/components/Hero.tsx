import { Heart, RefreshCw, Truck, Star } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

const iconMap = {
  quality: Heart,
  returns: RefreshCw,
  shipping: Truck,
};

export function Hero() {
  const { headline, subtitle, socialProofBadge, rating, benefits } = activeContent.hero;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 leading-tight">
            <span className="text-[#52423d]">{headline.part1}</span>
            <span className="text-[#e07a63]">{headline.part2Highlight}</span>
            <span className="text-[#52423d]">{headline.part3}</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base md:text-lg text-[#7a6c66] text-center mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
            {subtitle}
          </p>

          {/* Social Proof Badge */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#f2a085] text-white px-6 py-2.5 rounded-full font-medium text-sm md:text-base shadow-sm">
              {socialProofBadge}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mb-12 md:mb-16">
            <span className="text-[#52423d] font-semibold ml-2 text-lg">
              ({rating})
            </span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 md:w-6 md:h-6 fill-[#fbbf24] text-[#fbbf24]"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

