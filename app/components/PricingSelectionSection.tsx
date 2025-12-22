import { useEffect } from 'react';
import { Check, Circle, Sparkles } from 'lucide-react';
import { useFetcher } from '@remix-run/react';
import { activeContent } from '~/configs/content-active';
import { landingMedia } from '~/configs/media-active';
import { useSelectedVariant } from '~/lib/SelectedVariantContext';

interface PricingOption {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  savings?: number;
  discountPercentage?: number;
  floatingBadge?: string;
  shippingText: string;
}

interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
}

interface Product {
  id: string;
  title: string;
  description: string;
  variants: {
    nodes: ProductVariant[];
  };
}

interface PricingSelectionSectionProps {
  product: Product | null;
}

export function PricingSelectionSection({ product }: PricingSelectionSectionProps) {
  // Use Context to share selection across all components
  const { selectedVariantIndex: selectedIdx, setSelectedVariantIndex: setSelectedIdx } = useSelectedVariant();
  const fetcher = useFetcher<{ success: boolean; checkoutUrl?: string; error?: string }>();
  const fetcherData = fetcher.data;
  const { pricing: pricingMedia } = landingMedia;

  // Log product data for debugging
  console.log('🛒 COMPONENT: Product prop:', product);
  console.log('🛒 COMPONENT: All variants:', product?.variants?.nodes);

  // Helper function to parse price amount (Shopify returns as string)
  const parsePrice = (amount: string): number => {
    return parseFloat(amount);
  };

  // Helper function to calculate discount percentage
  const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // Map product variants to pricing options
  const buildPricingOptions = (): PricingOption[] => {
    const contentOptions = activeContent.pricing.options;
    const defaultOptions: PricingOption[] = [
      {
        id: contentOptions[0].id,
        label: contentOptions[0].label,
        price: 199.00,
        shippingText: contentOptions[0].shippingText
      },
      {
        id: contentOptions[1].id,
        label: contentOptions[1].label,
        price: 349.00,
        originalPrice: 399.00,
        savings: 50.00,
        discountPercentage: 15,
        floatingBadge: contentOptions[1].floatingBadge,
        shippingText: contentOptions[1].shippingText
      },
      {
        id: contentOptions[2].id,
        label: contentOptions[2].label,
        price: 449.00,
        originalPrice: 599.00,
        savings: 150.00,
        discountPercentage: 25,
        floatingBadge: contentOptions[2].floatingBadge,
        shippingText: contentOptions[2].shippingText
      }
    ];

    // If no product data, return defaults
    if (!product || !product.variants?.nodes || product.variants.nodes.length === 0) {
      return defaultOptions;
    }

    const variants = product.variants.nodes;
    const labels = activeContent.pricing.options.map(opt => opt.label);
    const badges = activeContent.pricing.options.map(opt => opt.floatingBadge);

    return variants.slice(0, 3).map((variant, index) => {
      const price = parsePrice(variant.price.amount);
      const compareAtPrice = variant.compareAtPrice ? parsePrice(variant.compareAtPrice.amount) : null;
      const savings = compareAtPrice ? compareAtPrice - price : undefined;
      const discountPercentage = compareAtPrice ? calculateDiscountPercentage(compareAtPrice, price) : undefined;

      return {
        id: `option${index + 1}`,
        label: labels[index] || `קנה ${index + 1}`,
        price,
        originalPrice: compareAtPrice || undefined,
        savings,
        discountPercentage,
        floatingBadge: badges[index],
        shippingText: activeContent.pricing.options[0].shippingText
      };
    });
  };

  const pricingOptions = buildPricingOptions();
  const { heading, ctaButton, savingsText, paymentMethodsAlt } = activeContent.pricing;

  // Get selected variant with safe access
  const selectedVariant = product?.variants?.nodes?.[selectedIdx] || null;
  const merchandiseId = selectedVariant?.id || '';

  // CRITICAL DEBUGGING LOG
  console.log('🎯 Selected Variant ID:', selectedVariant?.id);
  console.log('🎯 Full Selected Variant:', selectedVariant);
  console.log('🎯 Selected Index:', selectedIdx);
  console.log('🎯 Merchandise ID for form:', merchandiseId);

  // Handle redirect when checkout URL is received
  useEffect(() => {
    if (fetcherData?.success && fetcherData.checkoutUrl) {
      window.location.href = fetcherData.checkoutUrl;
    }
  }, [fetcherData]);

  const handleAddToCart = () => {
    console.log('🚀 ADD TO CART CLICKED IN PRICING SECTION!');
    console.log('🎯 Selected Index:', selectedIdx);
    console.log('🚀 Merchandise ID:', merchandiseId);
    console.log('🚀 Selected Variant:', selectedVariant);
    console.log('📦 All Variants:', product?.variants?.nodes);

    if (!merchandiseId) {
      console.error('❌ NO MERCHANDISE ID! Cannot add to cart.');
      console.error('❌ Product data:', product);
      return;
    }

    const formData = new FormData();
    formData.append('cartAction', 'ADD_TO_CART');
    formData.append('merchandiseId', merchandiseId);
    formData.append('quantity', '1');

    console.log('📤 Submitting to cart with:', {
      cartAction: 'ADD_TO_CART',
      merchandiseId,
      quantity: 1
    });

    fetcher.submit(formData, {
      method: 'post',
      action: '/cart'
    });
  };

  return (
    <section className="bg-bg-page py-12 md:py-16" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-main mb-8 md:mb-12">
            {heading}
          </h2>

          <div className="space-y-4 mb-6">
            {pricingOptions.map((option, index) => {
              const isSelected = selectedIdx === index;
              
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedIdx(index)}
                  className={`
                    relative bg-white rounded-2xl p-5 cursor-pointer transition-all
                    ${isSelected 
                      ? 'border-2 border-border-selected shadow-[0_10px_30px_rgba(0,0,0,0.06)]' 
                      : 'border border-border-default'
                    }
                  `}
                >
                  {option.floatingBadge && (
                    <div className="absolute -top-3 right-6 min-w-[112px] px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to shadow-[0_6px_16px_rgba(224,122,99,0.35)] border border-border-selected flex items-center justify-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="leading-none">{option.floatingBadge}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col items-start text-right flex-shrink-0">
                      <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="text-lg md:text-xl font-bold text-text-price leading-none">
                          {option.price.toFixed(2)}
                        </span>
                        <span className="text-sm md:text-base text-text-secondary">₪</span>
                      </div>

                      {option.originalPrice && (
                        <div className="text-sm text-text-muted line-through mb-0.5">
                          ₪{option.originalPrice.toFixed(2)}
                        </div>
                      )}

                      {option.savings && (
                        <div className="text-sm text-primary-main font-medium mb-1">
                          {savingsText} ₪{option.savings.toFixed(2)}
                        </div>
                      )}

                      <div className="text-xs text-text-secondary">
                        {option.shippingText}
                      </div>
                    </div>

                    {option.discountPercentage && (
                      <div className="flex-shrink-0">
                        <div className="bg-primary-main text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-sm">
                          <span className="text-xs font-medium leading-tight">{savingsText}</span>
                          <span className="text-lg font-bold leading-tight">{option.discountPercentage}%</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-primary-main flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        ) : (
                          <Circle className="w-6 h-6 text-ui-radio-unchecked" strokeWidth={2} />
                        )}
                      </div>
                      <span className="text-text-primary font-semibold text-lg">
                        {option.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ✅ useFetcher for smooth cart updates */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white font-bold text-base md:text-lg py-3.5 md:py-4 px-8 rounded-full shadow-[0_6px_16px_rgba(224,122,99,0.35)] hover:shadow-[0_8px_20px_rgba(224,122,99,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {fetcher.state === 'submitting' ? ctaButton.submitting : ctaButton.default}
          </button>

          {/* Show any fetcher errors */}
          {fetcherData?.error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm text-right" dir="rtl">
              <strong>שגיאה:</strong> {fetcherData.error}
            </div>
          )}

          {/* Payment Logos */}
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-xl rounded-2xl bg-white border border-border-default shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-4 md:p-5 flex items-center justify-center min-h-[110px]">
              <img
                src={pricingMedia.paymentMethods.src}
                alt={pricingMedia.paymentMethods.alt}
                className="w-full h-16 md:h-20 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
