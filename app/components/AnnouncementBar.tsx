import { Truck, RefreshCw, Star } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

const iconMap = {
  customers: Star,
  gift: RefreshCw,
  shipping: Truck,
};

export function AnnouncementBar() {
  const items = activeContent.announcementBar.items;

  return (
    <div className="bg-[#ddb3a5] py-2.5 animate-slide-down overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-nowrap items-center justify-between gap-2 md:gap-6 lg:gap-8">
          {items.map((item, index) => {
            const Icon = iconMap[item.id as keyof typeof iconMap];
            return (
              <div
                key={item.id}
                className="flex items-center gap-1 md:gap-2 text-white flex-shrink-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon 
                  className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 animate-pulse transition-transform hover:scale-110 duration-300" 
                  strokeWidth={2} 
                />
                {/* Mobile: Same Text but smaller */}
                <span className="md:hidden text-[11px] font-medium whitespace-nowrap transition-colors hover:text-white/90">
                  {item.mobileText}
                </span>
                {/* Desktop: Full Text */}
                <span className="hidden md:inline text-sm font-medium whitespace-nowrap transition-colors hover:text-white/90">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

