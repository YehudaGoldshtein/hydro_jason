import { Baby } from 'lucide-react';

export function DecorativeDivider() {
  return (
    <div className="bg-bg-page py-2 md:py-3" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          {/* Left decorative swirled curve */}
          <svg
            className="flex-shrink-0 w-20 md:w-32 h-10"
            viewBox="0 0 128 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20 C 16 12, 24 12, 32 20 C 40 28, 48 28, 56 20 C 64 12, 72 12, 80 20 C 88 28, 96 28, 104 20 C 112 12, 120 12, 128 20"
              stroke="#f0e2dc"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M0 24 C 14 18, 22 18, 32 24 C 42 30, 50 30, 56 24 C 62 18, 70 18, 80 24 C 90 30, 98 30, 104 24 C 110 18, 118 18, 128 24"
              stroke="#f0e2dc"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>

          {/* Baby icon in the middle */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-lighter/30 flex items-center justify-center">
              <Baby className="w-6 h-6 md:w-7 md:h-7 text-primary-main" strokeWidth={2} />
            </div>
          </div>

          {/* Right decorative swirled curve */}
          <svg
            className="flex-shrink-0 w-20 md:w-32 h-10"
            viewBox="0 0 128 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M128 20 C 112 12, 104 12, 96 20 C 88 28, 80 28, 72 20 C 64 12, 56 12, 48 20 C 40 28, 32 28, 24 20 C 16 12, 8 12, 0 20"
              stroke="#f0e2dc"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M128 24 C 114 18, 106 18, 96 24 C 86 30, 78 30, 72 24 C 66 18, 58 18, 48 24 C 38 30, 30 30, 24 24 C 18 18, 10 18, 0 24"
              stroke="#f0e2dc"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

