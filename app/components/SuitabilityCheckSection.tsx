import { CheckCircle2, XCircle } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function SuitabilityCheckSection() {
  const { heading, notForYou, perfectForYou } = activeContent.suitabilityCheck;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#52423d] mb-6 md:mb-8">
            {heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white bg-gradient-to-b from-[#e07a63]/6 to-white rounded-2xl border border-[#e07a63] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-center text-[#52423d] mb-4 md:mb-5">
                {notForYou.heading}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {notForYou.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-right">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#e07a63]/10 border border-[#e07a63]/40 p-1.5">
                        <XCircle className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#e07a63]" strokeWidth={2.4} />
                      </span>
                    </div>
                    <p className="text-base md:text-lg text-[#52423d] leading-relaxed flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white bg-gradient-to-b from-[#34d399]/8 to-white rounded-2xl border border-[#34d399] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-center text-[#52423d] mb-4 md:mb-5">
                {perfectForYou.heading}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {perfectForYou.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-right">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#34d399]/10 border border-[#34d399]/40 p-1.5">
                        <CheckCircle2 className="w-4.5 h-4.5 md:w-5 md:h-5 text-[#34d399]" strokeWidth={2.4} />
                      </span>
                    </div>
                    <p className="text-base md:text-lg text-[#52423d] leading-relaxed flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
