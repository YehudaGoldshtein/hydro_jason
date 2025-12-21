import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { heading, items } = activeContent.faq;

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#52423d] mb-8 text-right">{heading}</h2>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className="border-b border-gray-200 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleIndex(index)}
                    className="w-full flex items-center justify-between py-4 text-right"
                  >
                    <span className="font-semibold text-[#52423d]">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#7a6c66] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-4 text-sm md:text-base text-[#525252] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
