import { Star } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function PaymentAndTestimonialSection() {
  const { quote, author, authorAlt } = activeContent.paymentTestimonial;

  return (
    <section className="bg-[#fff6f2] pt-6 pb-12 md:pt-8 md:pb-16" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial Section */}
          <div className="flex items-start gap-4 md:gap-6 justify-center">
            {/* Right Side: Avatar (RTL) */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-sm">
                <img 
                  src="https://placehold.co/100x100/e07a63/white?text=A" 
                  alt={authorAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Left Side: Quote, Stars, and Author Name (RTL) */}
            <div className="flex-1 max-w-xl">
              {/* Quote Text */}
              <p className="text-base md:text-lg text-[#52423d] leading-relaxed mb-3 md:mb-4 text-right">
                {quote}
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-2 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-[#fbbf24] text-[#fbbf24]"
                  />
                ))}
              </div>

              {/* Author Name */}
              <p className="text-sm md:text-base text-[#52423d] font-semibold text-right">
                {author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
