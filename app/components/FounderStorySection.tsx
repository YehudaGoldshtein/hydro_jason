import { activeContent } from '~/configs/content-active';

export function FounderStorySection() {
  const { headline, paragraph1, paragraph2Highlight, paragraph3 } = activeContent.founderStory;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#52423d] mb-6 md:mb-8 leading-tight">
              {headline}
            </h2>

            <p className="text-base md:text-lg text-[#52423d] leading-relaxed max-w-prose mx-auto mb-5 md:mb-6">
              {paragraph1}
            </p>

            <p className="text-base md:text-lg font-bold text-[#e07a63] leading-relaxed max-w-prose mx-auto mb-5 md:mb-6">
              {paragraph2Highlight}
            </p>

            <p className="text-base md:text-lg text-[#52423d] leading-relaxed max-w-prose mx-auto">
              {paragraph3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
