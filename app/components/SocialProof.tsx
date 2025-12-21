import { CheckCircle2, Globe2, MessageCircle, MoreHorizontal, ThumbsUp, User } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function SocialProof() {
  const { badge, heading, subheading, verifiedPurchase, likeButton, replyButton, reviews } = activeContent.socialProof;

  return (
    <section className="bg-[#fff6f2] py-12 md:py-16 lg:py-20" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto mb-6 md:mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#f2e3dd] shadow-[0_10px_30px_rgba(0,0,0,0.05)] text-sm md:text-base text-[#52423d]">
            <CheckCircle2 className="w-4.5 h-4.5 text-[#34d399]" strokeWidth={2.4} />
            <span className="font-semibold">{badge}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#52423d] mt-3">
            {heading}
          </h2>
          <p className="text-base md:text-lg text-[#7a6c66] mt-2 max-w-3xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="bg-white rounded-2xl border border-[#f2e3dd] shadow-[0_8px_22px_rgba(0,0,0,0.05)] p-4 md:p-5 flex flex-col gap-3"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#e5b7a3] to-[#f2a085] flex items-center justify-center text-white font-bold shadow-sm">
                    {review.initials ? (
                      <span className="text-base md:text-lg">{review.initials}</span>
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex flex-col text-right leading-tight">
                    <span className="text-base md:text-lg font-semibold text-[#52423d]">{review.name}</span>
                    <div className="flex items-center gap-1 text-[11px] md:text-xs text-[#7a6c66]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" strokeWidth={2.6} />
                      <span>{verifiedPurchase}</span>
                      <span className="text-[#b9a9a2]">·</span>
                      <span>{review.timeAgo}</span>
                      <span className="text-[#b9a9a2]">·</span>
                      <Globe2 className="w-3.5 h-3.5 text-[#b9a9a2]" />
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-[#b9a9a2] flex-shrink-0" />
              </header>

              <div className="text-[#52423d] text-sm md:text-base leading-relaxed text-right bg-[#fff6f2] rounded-xl border border-[#f2e3dd] px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <p>{review.text}</p>
              </div>

              <footer className="flex items-center justify-between text-xs md:text-sm text-[#7a6c66] pt-1">
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-1 text-[#52423d] hover:text-[#e07a63] transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{likeButton}</span>
                  </button>
                  <button className="inline-flex items-center gap-1 text-[#52423d] hover:text-[#e07a63] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{replyButton}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[#7a6c66]">
                  <div className="flex items-center gap-1 bg-[#f7f7f7] px-2 py-1 rounded-full border border-[#f0e2dc] shadow-sm">
                    <ThumbsUp className="w-4 h-4 text-[#e07a63]" />
                    <span className="font-semibold text-[#52423d]">{review.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#f7f7f7] px-2 py-1 rounded-full border border-[#f0e2dc] shadow-sm">
                    <MessageCircle className="w-4 h-4 text-[#7a6c66]" />
                    <span className="font-semibold text-[#52423d]">{review.comments}</span>
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
