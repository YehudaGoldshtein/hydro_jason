import { Star, Baby, Sparkles, RefreshCw, Hand, Gift, Package, Grip } from 'lucide-react';
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

  // Gift images for carousel with titles and descriptions
  const giftsImages: ImageCarouselImage[] = [
    {
      id: 'gift-1',
      src: 'https://cdn.shopify.com/s/files/1/0661/6416/2608/files/Gemini_Generated_Image_qpr44wqpr44wqpr4.png?v=1766316875',
      alt: 'מחזיק בקבוק לעגלה במתנה',
      title: 'מחזיק בקבוק לעגלה',
      width: 400,
      height: 400,
    },
    {
      id: 'gift-2',
      src: 'https://cdn.shopify.com/s/files/1/0661/6416/2608/files/Gemini_Generated_Image_5l3r7p5l3r7p5l3r.png?v=1766316758',
      alt: 'מחזיק מוצץ מעץ במתנה',
      title: 'מחזיק מוצץ מעץ',
      width: 400,
      height: 400,
    },
    {
      id: 'gift-3',
      src: 'https://cdn.shopify.com/s/files/1/0661/6416/2608/files/Gemini_Generated_Image_64vnf364vnf364vn_1.png?v=1766319466',
      alt: 'ידיות אוניברסליות לבקבוק במתנה',
      title: 'ידיות אוניברסליות לבקבוק',
      width: 400,
      height: 400,
    },
    {
      id: 'gift-4',
      src: 'https://cdn.shopify.com/s/files/1/0661/6416/2608/files/unnamed_5.jpg?v=1766316631',
      alt: 'מחזיק סיליקון לבקבוק במתנה',
      title: 'מחזיק סיליקון לבקבוק',
      width: 400,
      height: 400,
    },
    {
      id: 'gift-5',
      src: 'https://cdn.shopify.com/s/files/1/0661/6416/2608/files/unnamed_10.jpg?v=1766316637',
      alt: 'כיסוי בקבוק חם במתנה',
      title: 'כיסוי בקבוק חם',
      width: 400,
      height: 400,
    },
    {
      id: 'gift-6',
      src: 'https://cdn.shopify.com/s/files/1/0710/4846/2518/files/1212.jpg?v=1764090881',
      alt: 'מגש אוכל לתינוק במתנה',
      title: 'מגש אוכל לתינוק',
      width: 400,
      height: 400,
    },
  ];

  return (
    <section className="bg-bg-page py-0" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Rating and Social Proof */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 md:w-6 md:h-6 fill-ui-star text-ui-star"
                  />
                ))}
              </div>
              <span className="text-xl md:text-2xl font-bold text-text-primary">
                {rating}/5
              </span>
            </div>
            <div className="h-6 w-px bg-border-divider hidden md:block"></div>
            <span className="text-base md:text-lg font-semibold text-text-primary">
              {socialProofBadge}
            </span>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-text-primary mb-6 md:mb-8">
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
                  "אפילו בעלי התלונן כל פעם שהיה צריך להרים אותו. עכשיו הוא זה שמבקש לשים את המנשא. אין לי מושג איך הסתדרנו בלעדיו"
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

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-primary-main" strokeWidth={2} />
                  <p className="text-xs md:text-sm font-medium text-text-primary leading-tight">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Special Bundle Offer */}
          <div className="relative mb-6 md:mb-8">
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
                  <div className="w-1 h-8 bg-gradient-to-b from-primary-main to-primary-light rounded-full"></div>
                  <p className="text-lg md:text-xl font-bold text-[#52423d]">
                    בקניית הכרית תקבלי
                  </p>
                  <div className="w-1 h-8 bg-gradient-to-b from-primary-main to-primary-light rounded-full"></div>
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

          {/* Limited Time Promotion - Premium Clean Design */}
          <div className="text-center mb-6 md:mb-8">
            <div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-main via-primary-light to-primary-main text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
              style={{
                animation: 'cleanBadgeGlow 4s ease-in-out infinite',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 0 8px rgba(255, 255, 255, 0.3)',
                letterSpacing: '0.03em',
              }}
            >
              {/* Content - Emphasized */}
              <span className="relative z-10 tracking-wide font-extrabold drop-shadow-lg">המתנות עד גמר המלאי</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
