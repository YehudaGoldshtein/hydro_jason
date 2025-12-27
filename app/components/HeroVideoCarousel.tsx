import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';

interface Slide {
  id: number;
  type: 'video' | 'image';
  src?: string;
  alt: string;
}

export function HeroVideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { slides: slidesData, ariaLabels, placeholders } = activeContent.heroVideoCarousel;
  const mediaSlides = landingMedia.heroVideoCarousel.slides;

  const slides: Slide[] = slidesData.map((slide, index) => ({
    ...slide,
    src: mediaSlides[index]?.src, // Use actual src from media config
  }));

  // Stop all videos when slide changes, then start the new one if it's a video
  useEffect(() => {
    // Stop all videos first
    videoRefs.current.forEach((video) => {
      if (video && !video.paused) {
        video.pause();
      }
    });

    // Check if current slide is a video and start it if needed
    const currentVideo = videoRefs.current[currentSlide];
    const isCurrentSlideVideo = slides[currentSlide]?.type === 'video' && slides[currentSlide]?.src;
    
    if (currentVideo && isCurrentSlideVideo) {
      currentVideo.muted = isMuted;
      // Auto-play the new video slide (autoplay attribute should handle this, but we ensure it)
      currentVideo.play().catch(() => {
        // Autoplay might be blocked, that's okay
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentSlide, isMuted]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    const video = videoRefs.current[currentSlide];
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRefs.current[currentSlide];
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Check if current slide is a video
  const isCurrentSlideVideo = slides[currentSlide]?.type === 'video' && slides[currentSlide]?.src;

  // #region agent log
  useEffect(() => {
    const logElementSizes = () => {
      const outer = outerContainerRef.current;
      const carousel = carouselRef.current;
      
      if (outer && carousel) {
        const outerRect = outer.getBoundingClientRect();
        const carouselRect = carousel.getBoundingClientRect();
        const outerComputedStyle = getComputedStyle(outer);
        
        fetch('http://127.0.0.1:7242/ingest/26410a63-5106-4bd0-b49a-22b6d6600567', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location: 'HeroVideoCarousel.tsx:useEffect',
            message: 'Element dimensions measured - no white container',
            data: {
              outerContainer: { 
                width: outerRect.width, 
                height: outerRect.height, 
                top: outerRect.top,
                left: outerRect.left, 
                right: outerRect.right,
                bottom: outerRect.bottom,
                maxWidth: outerComputedStyle.maxWidth,
                paddingTop: outerComputedStyle.paddingTop
              },
              carousel: { 
                width: carouselRect.width, 
                height: carouselRect.height,
                top: carouselRect.top,
                left: carouselRect.left, 
                right: carouselRect.right,
                bottom: carouselRect.bottom
              },
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight,
              overflows: {
                carouselOverflowsRight: carouselRect.right > outerRect.right,
                carouselOverflowsLeft: carouselRect.left < outerRect.left,
                carouselOverflowsTop: carouselRect.top < 0
              }
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'post-fix-2',
            hypothesisId: 'A'
          })
        }).catch(() => {});
      }
    };
    
    logElementSizes();
    window.addEventListener('resize', logElementSizes);
    const timeout = setTimeout(logElementSizes, 100);
    
    return () => {
      window.removeEventListener('resize', logElementSizes);
      clearTimeout(timeout);
    };
  }, [currentSlide]);
  // #endregion

  return (
    <section className="bg-bg-page py-0 overflow-visible" dir="rtl">
      <div className="w-full px-4 md:px-8" style={{ overflow: 'visible', paddingTop: '15%', paddingBottom: '5%' }}>
        <div ref={outerContainerRef} className="mx-auto" style={{ 
          maxWidth: 'min(calc(100vw - 2rem), 1560px)',
          perspective: '3250px',
          perspectiveOrigin: '50% 50%',
          overflow: 'visible'
        }}>
          {/* Slides - 3D Cube Container */}
          <div ref={carouselRef} className="relative overflow-hidden w-full" style={{
            aspectRatio: '1 / 1',
            transform: 'scale(1.3)',
            transformOrigin: 'center center',
            perspective: '3250px',
            transformStyle: 'preserve-3d'
          }}>
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                const slideOffset = index - currentSlide;
                
                // Calculate 3D cube rotation - each slide rotates 90 degrees
                const rotateY = slideOffset * 90;
                const translateZ = -780; // Deep 3D effect - much more depth! (increased by 30%)
                
                // Scale effect - non-active slides are smaller for depth perception
                const scale = Math.abs(slideOffset) === 0 ? 1 : 0.7;
                
                // Only show active and adjacent slides for performance
                const opacity = Math.abs(slideOffset) <= 1 ? 1 : 0;
                
                // Calculate z-index - active slide on top
                const zIndex = 10 - Math.abs(slideOffset);
                
                // Minimal shadow for 3D effect - no bottom shadow
                const shadowDepth = Math.abs(slideOffset);
                const shadowIntensity = isActive ? 0.15 : 0.05;
                const boxShadow = `0 2px 8px rgba(0, 0, 0, ${shadowIntensity * 0.5}), 
                                   0 0 0 1px rgba(224, 122, 99, ${0.1 + shadowDepth * 0.03})`;
                
                return (
                  <div
                    key={slide.id}
                    className="absolute inset-0"
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      opacity,
                      zIndex,
                      transition: 'transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      boxShadow,
                      filter: isActive ? 'brightness(1)' : 'brightness(0.6)',
                    }}
                  >
                  {slide.type === 'video' ? (
                    slide.src ? (
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        className="w-full h-full object-cover rounded-2xl"
                        autoPlay
                        loop
                        playsInline
                        muted={isMuted}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      >
                        <source src={slide.src} type="video/mp4" />
                        {placeholders.browserNotSupported}
                      </video>
                    ) : (
                      // Video Placeholder
                      <div className="w-full h-full bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to flex items-center justify-center">
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
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      // Image Placeholder
                      <div className="w-full h-full bg-gradient-to-br from-primary-light to-primary-lighter flex items-center justify-center">
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
                );
              })}
            </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 z-20"
            aria-label={ariaLabels.previous}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 z-20"
            aria-label={ariaLabels.next}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
          </button>

          {/* Video Controls - Only show for video slides */}
          {isCurrentSlideVideo && (
            <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label={isPlaying ? 'עצור' : 'נגן'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
                )}
              </button>

              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label={isMuted ? 'הפעל סאונד' : 'כבה סאונד'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
                ) : (
                  <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
                )}
              </button>
            </div>
          )}

          {/* Pagination Dots */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
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

        {/* Thumbnails */}
        <div className="mt-6 md:mt-8 flex justify-center items-center gap-3 md:gap-4 overflow-x-auto pb-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 transition-all ${
                index === currentSlide
                  ? 'ring-2 ring-primary-main ring-offset-2 scale-105'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              } rounded-lg overflow-hidden`}
              aria-label={`${ariaLabels.goToSlide} ${index + 1}`}
            >
              {slide.type === 'video' && slide.src ? (
                <video
                  className="w-16 h-16 md:w-20 md:h-20 object-cover"
                  src={slide.src}
                  muted
                  playsInline
                />
              ) : slide.src ? (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-light to-primary-lighter flex items-center justify-center">
                  <span className="text-xs">?</span>
                </div>
              )}
              {index === currentSlide && (
                <div className="absolute inset-0 bg-primary-main/10 pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}





