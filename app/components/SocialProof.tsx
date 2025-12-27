import { CheckCircle2, Globe2, MessageCircle, MoreHorizontal, ThumbsUp, User } from 'lucide-react';
import { activeContent } from '~/configs/content-active';

export function SocialProof() {
  const { badge, heading, subheading, verifiedPurchase, likeButton, replyButton, reviews } = activeContent.socialProof;

  return (
    <section className="bg-bg-page py-8 md:py-10 lg:py-12" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base md:text-lg text-text-secondary mt-2 max-w-3xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="bg-white rounded-2xl border border-border-default shadow-[0_8px_22px_rgba(0,0,0,0.05)] p-4 md:p-5 flex flex-col gap-3"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-primary-lighter to-primary-light flex items-center justify-center shadow-sm flex-shrink-0">
                    {review.image ? (
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : review.initials ? (
                      <span className="text-base md:text-lg text-white font-bold">{review.initials}</span>
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col text-right leading-tight">
                    <span className="text-base md:text-lg font-semibold text-text-primary">{review.name}</span>
                    <div className="flex items-center gap-1 text-[11px] md:text-xs text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-ui-success" strokeWidth={2.6} />
                      <span>{verifiedPurchase}</span>
                      <span className="text-text-muted">·</span>
                      <span>{review.timeAgo}</span>
                      <span className="text-text-muted">·</span>
                      <Globe2 className="w-3.5 h-3.5 text-text-muted" />
                    </div>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-text-muted flex-shrink-0" />
              </header>

              <div className="text-text-primary text-sm md:text-base leading-relaxed text-right bg-bg-page rounded-xl border border-border-default px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <p>{review.text}</p>
              </div>

              <footer className="flex items-center justify-between text-xs md:text-sm text-text-secondary pt-1">
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-1 text-text-primary hover:text-primary-main transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{likeButton}</span>
                  </button>
                  <button className="inline-flex items-center gap-1 text-text-primary hover:text-primary-main transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{replyButton}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <div className="flex items-center gap-1 bg-bg-hover px-2 py-1 rounded-full border border-border-divider shadow-sm">
                    <ThumbsUp className="w-4 h-4 text-primary-main" />
                    <span className="font-semibold text-text-primary">{review.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-bg-hover px-2 py-1 rounded-full border border-border-divider shadow-sm">
                    <MessageCircle className="w-4 h-4 text-text-secondary" />
                    <span className="font-semibold text-text-primary">{review.comments}</span>
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
