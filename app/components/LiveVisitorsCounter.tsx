import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export function LiveVisitorsCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Initialize with a random number between 18-32 (realistic and credible range)
    const initialCount = Math.floor(Math.random() * 15) + 18;
    setVisitorCount(initialCount);

    // Hide on mobile when scrolling down, show when scrolling up
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Simulate visitors joining/leaving every 4-10 seconds (more realistic timing)
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        // 75% chance to increase, 25% chance to decrease (but not below 15)
        const shouldIncrease = Math.random() > 0.25;
        if (shouldIncrease) {
          // Increase by 1-2 visitors (more gradual)
          return prev + Math.floor(Math.random() * 2) + 1;
        } else {
          // Decrease by 1-2 visitors (but not below 15)
          const decrease = Math.floor(Math.random() * 2) + 1;
          return Math.max(15, prev - decrease);
        }
      });
    }, Math.random() * 6000 + 4000); // Random interval between 4-10 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-24 md:top-20 right-2 md:right-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12),0_4px_12px_rgba(224,122,99,0.15)] border border-primary-lighter/30 px-3 py-2 md:px-4 md:py-2.5 flex items-center gap-2 transition-all duration-300"
      dir="rtl"
      style={{
        animation: 'floatUpDown 4s ease-in-out infinite',
      }}
    >
      <div className="relative flex-shrink-0">
        <Users className="w-4 h-4 md:w-5 md:h-5 text-primary-main" strokeWidth={2.5} />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] md:text-sm font-bold text-text-primary whitespace-nowrap">
          <span className="text-primary-main transition-all duration-500">{visitorCount}</span>
          <span className="text-text-secondary font-medium mr-0.5 md:mr-1 text-[10px] md:text-xs"> מבקרים באתר</span>
        </span>
      </div>
    </div>
  );
}

