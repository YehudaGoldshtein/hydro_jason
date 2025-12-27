import { Image as ImageIcon, X } from 'lucide-react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';

interface ProblemSolutionSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function ProblemSolutionSection({
  imageSrc,
  imageAlt
}: ProblemSolutionSectionProps) {
  const { imageAlt: defaultAlt, imagePlaceholder, mainHeadline, subheadline, painPoints, solutionBox, videoPlaceholder } = activeContent.problemSolution;
  const { problemSolution: sectionMedia } = landingMedia;

  const finalImageAlt = imageAlt || defaultAlt;
  const finalImageSrc = imageSrc || sectionMedia.problemImage.src;

  return (
    <section className="bg-bg-page py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Top Media - Image Slot */}
          <div className="mb-10 md:mb-14">
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-border-default shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white">
                <div className="relative aspect-square">
                  {finalImageSrc ? (
                    <img
                      src={finalImageSrc}
                      alt={finalImageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-page via-ui-selling-bg to-primary-light/40">
                      <div className="text-center text-text-secondary px-6">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
                          <ImageIcon className="w-7 h-7 text-primary-main" strokeWidth={2.5} />
                        </div>
                        <p className="text-lg font-semibold text-text-primary mb-1">{imagePlaceholder.title}</p>
                        <p className="text-sm text-text-secondary">{imagePlaceholder.subtitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - The Problem */}
          <div className="mb-10 md:mb-12">
            {/* Main Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-text-primary mb-4 md:mb-6">
              {mainHeadline}
            </h2>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-center text-text-secondary mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              {subheadline}
            </p>

            {/* Pain Points List */}
            <div className="max-w-3xl mx-auto space-y-4 md:space-y-5">
              {painPoints.map((point) => (
                <div
                  key={point.id}
                  className="flex items-center gap-3 md:gap-4 text-right"
                >
                  {/* X Icon on the left */}
                  <div className="flex-shrink-0 order-1">
                    <X className="w-5 h-5 md:w-6 md:h-6 text-primary-main" strokeWidth={2.5} />
                  </div>
                  
                  {/* Text */}
                  <p className="text-base md:text-lg text-text-primary leading-relaxed order-2 flex-1">
                    {point.text}{' '}
                    <span className="text-primary-main font-semibold">{point.highlight}</span>
                    {point.textAfter && <> {point.textAfter}</>}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section - The Solution Box */}
          <div className="bg-ui-selling-bg border-2 border-primary-main rounded-2xl p-6 md:p-8 lg:p-10">
            {/* Solution Headline */}
            <h3 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-4 md:mb-5">
              {solutionBox.headline}
            </h3>

            {/* Solution Body Text */}
            <p className="text-base md:text-lg text-center text-text-primary leading-relaxed mb-4 max-w-3xl mx-auto">
              {solutionBox.bodyText}
            </p>

            {/* Small Italic Text */}
            <p className="text-sm md:text-base text-center text-text-secondary italic">
              {solutionBox.italicText}
            </p>
          </div>

          {/* Video at the End of the Page */}
          <div className="mt-10 md:mt-14">
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                {/* Video Option - Reduced height by 30% */}
                {sectionMedia.solutionVideo.src ? (
                  <video
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '9/11.2' }}
                    autoPlay
                    loop
                    playsInline
                    muted
                    controls
                  >
                    <source src={sectionMedia.solutionVideo.src} type="video/mp4" />
                    {videoPlaceholder.title}
                  </video>
                ) : (
                  <div className="relative bg-gradient-to-br from-primary-light to-primary-lighter" style={{ aspectRatio: '9/11.2' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white px-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <p className="text-xl font-bold mb-2">{videoPlaceholder.title}</p>
                        <p className="text-sm opacity-75">{videoPlaceholder.subtitle}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
