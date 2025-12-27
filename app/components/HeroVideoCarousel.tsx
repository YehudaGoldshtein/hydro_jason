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

  return (
    <section className="bg-bg-page py-0" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 py-5">
        <div className="max-w-[500px] sm:max-w-[600px] lg:max-w-[650px] mx-auto" style={{ 
          perspective: '2500px',
          perspectiveOrigin: '50% 50%'
        }}>
          {/* Carousel Container */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
            {/* Slides - 3D Cube Container */}
            <div className="relative aspect-square overflow-hidden" style={{ 
              perspective: '2500px',
              transformStyle: 'preserve-3d'
            }}>
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                const slideOffset = index - currentSlide;
                
                // Calculate 3D cube rotation - each slide rotates 90 degrees
                const rotateY = slideOffset * 90;
                const translateZ = -600; // Deep 3D effect - much more depth!
                
                // Scale effect - non-active slides are smaller for depth perception
                const scale = Math.abs(slideOffset) === 0 ? 1 : 0.7;
                
                // Only show active and adjacent slides for performance
                const opacity = Math.abs(slideOffset) <= 1 ? 1 : 0;
                
                // Calculate z-index - active slide on top
                const zIndex = 10 - Math.abs(slideOffset);
                
                // Enhanced shadow for strong 3D effect
                const shadowDepth = Math.abs(slideOffset);
                const shadowIntensity = isActive ? 0.25 : 0.1;
                const boxShadow = `0 ${20 + shadowDepth * 30}px ${60 + shadowDepth * 50}px rgba(0, 0, 0, ${shadowIntensity}), 
                                   0 0 0 1px rgba(224, 122, 99, ${0.15 + shadowDepth * 0.05})`;
                
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
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label={ariaLabels.previous}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label={ariaLabels.next}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-text-primary" strokeWidth={2.5} />
            </button>

            {/* Video Controls - Only show for video slides */}
            {isCurrentSlideVideo && (
              <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3">
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





