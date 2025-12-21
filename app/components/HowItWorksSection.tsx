import { activeContent } from '~/configs/content-active';

export function HowItWorksSection() {
  const { heading, steps } = activeContent.howItWorks;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#52423d]">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step) => {
            const isHighlight = step.highlight;
            const cardBg = isHighlight ? 'bg-[#e79a7b]' : 'bg-[#fdf2ed]';
            const titleColor = isHighlight ? 'text-white' : 'text-[#52423d]';
            const textColor = isHighlight ? 'text-white/90' : 'text-[#7a6c66]';

            return (
              <article
                key={step.number}
                className={`${cardBg} rounded-3xl p-8 text-center shadow-sm flex flex-col items-center justify-center gap-3`}
              >
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm text-3xl font-bold text-[#e07a63]">
                  {step.number}
                </div>
                <h3 className={`text-xl md:text-2xl font-bold ${titleColor}`}>
                  {step.title}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed ${textColor}`}>
                  {step.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
