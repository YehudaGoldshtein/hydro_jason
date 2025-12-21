import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

interface Slide {
  id: number;
  type: 'video' | 'image';
  src?: string;
  alt: string;
}

export function HeroVideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { slides: slidesData, ariaLabels, placeholders } = activeContent.heroVideoCarousel;

  const slides: Slide[] = slidesData.map((slide) => ({
    ...slide,
    src: undefined, // Placeholder - will show colored box
  }));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  return (
    <section className="bg-[#fff6f2] py-8 md:py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-[1120px] mx-auto">
          {/* Carousel Container */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            {/* Slides */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {slide.type === 'video' ? (
                    slide.src ? (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={slide.src} type="video/mp4" />
                        {placeholders.browserNotSupported}
                      </video>
                    ) : (
                      // Video Placeholder
                      <div className="w-full h-full bg-gradient-to-br from-[#de7e63] via-[#e79a7b] to-[#e9a481] flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 opacity-50" />
                          <p className="text-xl md:text-3xl font-bold">{placeholders.video}</p>
                          <p className="text-sm md:text-base mt-2 opacity-75">
                            {slide.alt}
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    slide.src ? (
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Image Placeholder
                      <div className="w-full h-full bg-gradient-to-br from-[#f2a085] to-[#e5b7a3] flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                            <span className="text-4xl md:text-6xl">🖼️</span>
                          </div>
                          <p className="text-xl md:text-3xl font-bold">{placeholders.image}</p>
                          <p className="text-sm md:text-base mt-2 opacity-75">
                            {slide.alt}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label={ariaLabels.previous}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#52423d]" strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label={ariaLabels.next}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#52423d]" strokeWidth={2.5} />
            </button>

            {/* Play/Pause Button (Optional - for better UX) */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#52423d]/70 hover:bg-[#52423d]/90 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 opacity-0 hover:opacity-100"
              aria-label={isPlaying ? ariaLabels.pause : ariaLabels.play}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" fill="white" />
              ) : (
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white" fill="white" />
              )}
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all ${
                    index === currentSlide
                      ? 'w-8 h-2 bg-white'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                  } rounded-full`}
                  aria-label={`${ariaLabels.goToSlide} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





