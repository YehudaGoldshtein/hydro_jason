import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ImageCarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

interface ImageCarouselProps {
  images: ImageCarouselImage[];
  className?: string;
  prevArrowIcon?: string | React.ReactNode;
  nextArrowIcon?: string | React.ReactNode;
}

export function ImageCarousel({ 
  images, 
  className = '', 
  prevArrowIcon,
  nextArrowIcon 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Detect mobile/desktop on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Always show only the current image
  const currentImage = images[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    // Could implement drag scrolling here if needed
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const diff = startX - x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, images.length]);

  return (
    <div
        className={`bg-[#FDFBF9] rounded-2xl p-4 md:p-6 relative transition-shadow duration-300 ${className}`}
        dir="rtl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered
            ? `
              0 25px 70px rgba(224, 122, 99, 0.2),
              0 15px 40px rgba(224, 122, 99, 0.15),
              0 0 0 1px rgba(229, 183, 163, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `
            : `
              0 20px 60px rgba(224, 122, 99, 0.15),
              0 10px 30px rgba(224, 122, 99, 0.1),
              0 0 0 1px rgba(229, 183, 163, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `,
        }}
      >
        {/* Glow effect overlay */}
        <div 
          className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-80' : 'opacity-60'
          }`}
          style={{
            background: 'radial-gradient(circle at center, rgba(224, 122, 99, 0.1) 0%, transparent 70%)',
          }}
        />
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative z-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Title and Image Container */}
        <div className="flex flex-col items-center gap-4">
          {/* Title */}
          {currentImage.title && (
            <h3 
              key={`title-${currentImage.id}`}
              className="text-lg md:text-xl font-bold text-text-primary text-center"
            >
              {currentImage.title}
            </h3>
          )}
          
          {/* Image */}
          <div className="w-full flex justify-center">
            <div
              className={`relative transition-shadow duration-300 rounded-[32px] overflow-hidden ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              } max-w-full`}
              style={{
                boxShadow: isHovered
                  ? `
                    0 20px 50px rgba(224, 122, 99, 0.25),
                    0 10px 25px rgba(224, 122, 99, 0.2),
                    0 0 0 1px rgba(242, 160, 133, 0.4)
                  `
                  : `
                    0 15px 40px rgba(224, 122, 99, 0.2),
                    0 5px 15px rgba(224, 122, 99, 0.15),
                    0 0 0 1px rgba(242, 160, 133, 0.3)
                  `,
              }}
            >
              {/* Image glow effect */}
              <div 
                className={`absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-70'
                }`}
                style={{
                  background: 'radial-gradient(circle at center, rgba(224, 122, 99, 0.12) 0%, transparent 60%)',
                }}
              />
              <img
                key={`img-${currentImage.id}`}
                src={currentImage.src}
                alt={currentImage.alt}
                width={currentImage.width || 400}
                height={currentImage.height || 400}
                loading="lazy"
                className="w-full h-auto object-cover transition-opacity duration-500 relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Always visible */}
        <button
          onClick={prevSlide}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-80'
          } hover:scale-110 active:scale-95 z-20`}
          aria-label="תמונה קודמת"
        >
          {prevArrowIcon ? (
            typeof prevArrowIcon === 'string' ? (
              <img 
                src={prevArrowIcon} 
                alt="חץ קודם" 
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
            ) : (
              prevArrowIcon
            )
          ) : (
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#E5B9A8]" strokeWidth={2.5} />
          )}
        </button>

        <button
          onClick={nextSlide}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-80'
          } hover:scale-110 active:scale-95 z-20`}
          aria-label="תמונה הבאה"
        >
          {nextArrowIcon ? (
            typeof nextArrowIcon === 'string' ? (
              <img 
                src={nextArrowIcon} 
                alt="חץ הבא" 
                className="w-5 h-5 md:w-6 md:h-6 object-contain"
              />
            ) : (
              nextArrowIcon
            )
          ) : (
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#E5B9A8]" strokeWidth={2.5} />
          )}
        </button>

        {/* Progress Lines - Thin, elegant */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'h-1 bg-[#E5B9A8]'
                  : 'h-0.5 bg-[#E5B9A8]/30 hover:bg-[#E5B9A8]/50'
              } rounded-full`}
              style={{
                width: index === currentIndex ? '32px' : '16px',
              }}
              aria-label={`עבור לתמונה ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

