import { Star, Baby, Sparkles, RefreshCw, Hand, Gift, Package, Grip, Sparkles as SparklesIcon, ChevronDown } from 'lucide-react';
import { activeContent } from '~/configs/content-active';
import { ImageCarousel, type ImageCarouselImage } from './ImageCarousel';

const features = [
  {
    id: 'age-range',
    icon: Baby,
    text: 'מתאים לכל סוגי הבקבוקים',
  },
  {
    id: 'no-pain',
    icon: Sparkles,
    text: 'עמיד בכביסה',
  },
  {
    id: 'quick-setup',
    icon: RefreshCw,
    text: 'החזרים - תוך 30 יום',
  },
  {
    id: 'free-hands',
    icon: Hand,
    text: 'משחרר את הידיים',
  },
];

export function ProductHeroSection() {
  const { rating, socialProofBadge } = activeContent.hero;
  const { productName } = activeContent.global;

  // Scroll to gifts section
  const scrollToGifts = () => {
    const giftsSection = document.getElementById('gifts-section');
    if (giftsSection) {
      giftsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Gift images for carousel with titles and descriptions
  const giftsImages: ImageCarouselImage[] = [
    {
      id: 'gift-1',
      src: 'https://cdn.shopify.com/s/files/1/0710/4846/2518/files/6.gif?v=1766842103',
      alt: 'ידיות אוניברסליות לבקבוק במתנה',
      title: 'ידיות אוניברסליות לבקבוק',
      description: 'ידיות המתאימות לכל סוגי הבקבוק',
      width: 400,
      height: 400,
      price: '29.90₪',
    },
    {
      id: 'gift-2',
      src: 'https://cdn.shopify.com/s/files/1/0710/4846/2518/files/1be04c5874f535bc3ec9b7f993d34bc2.jpg?v=1766846465',
      alt: 'מחזיק מוצץ מעץ במתנה',
      title: 'מחזיק מוצץ מעץ',
      description: 'מחזיק מוצץ יוקרתי מעץ',
      width: 400,
      height: 400,
      price: '39.90₪',
    },
    {
      id: 'gift-6',
      src: 'https://cdn.shopify.com/s/files/1/0710/4846/2518/files/O1CN014CsOE41a5N8pLhT0J__2212488763278-0-cib.jpg?v=1766846288',
      alt: 'שומר בקבוק לעגלה במתנה',
      title: 'שומר בקבוק לעגלה',
      description: 'רצועה הנתפסת לכל מקום ולכל מקבוק ושומרת על הבקבוק שלא יאבד',
      width: 400,
      height: 400,
      price: '19.90₪',
    },
  ];

  return (
    <section id="product-hero" className="bg-bg-page py-0" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Rating and Social Proof */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-6 mt-6 md:mt-8">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 fill-ui-star text-ui-star"
                  />
                ))}
              </div>
              <span className="text-lg md:text-xl font-bold text-text-primary">
                {rating}/5
              </span>
            </div>
            <div className="h-5 w-px bg-border-divider hidden md:block"></div>
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
              <span className="text-sm md:text-base font-semibold text-text-primary">
                {socialProofBadge}
              </span>
              <span className="text-lg md:text-xl font-bold text-primary-main">
                199₪
              </span>
              <button
                onClick={scrollToGifts}
                className="relative flex items-center gap-1.5 hover:scale-110 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#fff6f2] hover:to-[#fce9de] rounded-lg px-3 py-1.5 cursor-pointer group animate-[giftBounce_2s_ease-in-out_infinite]"
                style={{
                  animation: 'giftBounce 2s ease-in-out infinite, giftGlow 2s ease-in-out infinite',
                }}
                aria-label="גלול לראות את המתנות"
              >
                <Gift 
                  className="w-4 h-4 md:w-5 md:h-5 text-primary-main group-hover:scale-125 transition-transform duration-300" 
                  style={{
                    animation: 'giftPulse 1.5s ease-in-out infinite',
                  }}
                  strokeWidth={2.5} 
                />
                <span className="text-xs md:text-sm font-semibold text-primary-main group-hover:text-[#c45f4c] transition-colors">
                  (3 מתנות)
                </span>
                <ChevronDown 
                  className="w-3 h-3 md:w-4 md:h-4 text-primary-main opacity-70 group-hover:opacity-100 transition-opacity" 
                  style={{
                    animation: 'arrowBounce 1.5s ease-in-out infinite',
                  }}
                  strokeWidth={2.5}
                />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-main rounded-full animate-ping opacity-75"></span>
              </button>
              <span className="text-xs md:text-sm text-text-secondary">
                (עד גמר המלאי)
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-text-primary mb-6 md:mb-8 whitespace-nowrap">
            {productName} - תומך הנקה
          </h1>

          {/* Customer Testimonial */}
          <div className="max-w-xl mx-auto">
            <div className="bg-gradient-to-br from-primary-lighter to-white rounded-xl p-4 md:p-5 mb-6 md:mb-8 shadow-[0_4px_12px_rgba(224,122,99,0.15)] border border-primary-lighter relative overflow-hidden">
              {/* Decorative Quote Icon */}
              <div className="absolute top-2 right-2 text-primary-main opacity-20">
                <svg className="w-12 h-12 md:w-14 md:h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <p className="text-sm md:text-base text-text-primary text-center leading-relaxed mb-3 font-medium italic">
                  "זה מסוג המוצרים שאחרי שאת קונה אותם את לא מבינה איך הסתדרת לפני זה"
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-primary-main"></div>
                  <p className="text-xs md:text-sm text-primary-main text-center font-bold">
                    הילה
                  </p>
                  <div className="h-px w-8 bg-primary-main"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Bundle Offer */}
          <div id="gifts-section" className="relative mb-6 md:mb-8">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f6] via-[#fff6f2] to-white rounded-2xl border border-[#e8ddd4] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"></div>
            
            {/* Falling Gift Icons Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => {
                const colors = ['#e07a63', '#f2a085', '#e5b7a3'];
                const color = colors[i % colors.length];
                const randomLeft = (i * 13 + (i % 7) * 5) % 95;
                const size = 14 + (i % 5) * 3;
                const duration = 6 + (i % 7) * 2;
                const delay = i * 0.25;
                return (
                  <Gift
                    key={i}
                    className="absolute"
                    style={{
                      left: `${randomLeft}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      color: color,
                      opacity: 0.12 + (i % 4) * 0.04,
                      animation: `fallingGift ${duration}s linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                    strokeWidth={1.5}
                  />
                );
              })}
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-6 md:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-primary-main" strokeWidth={2} />
                  <p className="text-lg md:text-xl font-bold text-[#52423d]">
                    בקניית הכרית תקבלי
                  </p>
                  <Gift className="w-5 h-5 text-primary-main" strokeWidth={2} />
                </div>
                <p className="text-sm md:text-base font-normal text-[#7a6c66]">
                  (עד גמר המלאי)
                </p>
              </div>

              {/* Gifts Carousel */}
              <div className="mb-6 flex justify-center">
                <div className="w-full max-w-md">
                  <ImageCarousel images={giftsImages} />
                </div>
              </div>

              {/* CTA Badge - Premium Design */}
              <div className="text-center">
                <div 
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#e07a63] via-[#e79a7b] to-[#e9a481] text-white px-8 py-4 rounded-full text-base md:text-lg font-bold relative overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    animation: 'premiumBadgeGlow 3s ease-in-out infinite',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {/* Animated shine effect - only on hover */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
                      width: '200%',
                      height: '200%',
                      top: '-50%',
                      left: '-50%',
                    }}
                  />
                  
                  {/* Static shine overlay */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                    }}
                  />
                  
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-full blur-xl opacity-50 -z-10 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(224, 122, 99, 0.6) 0%, transparent 70%)',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2.5">
                    <Gift 
                      className="w-5 h-5 md:w-6 md:h-6 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" 
                      strokeWidth={2.5}
                      style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                    <span className="tracking-wide font-extrabold">במתנה!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl p-3 md:p-4 border border-[#f2e3dd] shadow-sm mb-6 md:mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="flex flex-row md:flex-col items-center gap-2 text-center p-2 md:p-2.5 rounded-lg hover:bg-[#fff6f2] transition-colors"
                  >
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary-main flex-shrink-0" strokeWidth={2} />
                    <p className="text-[10px] md:text-xs font-medium text-text-primary leading-tight">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
