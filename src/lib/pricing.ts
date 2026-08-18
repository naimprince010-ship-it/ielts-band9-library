export type CouponDefinition = {
  discount: number;
  type: 'percent' | 'fixed';
  description: string;
};

export const COUPON_CODES: Record<string, CouponDefinition> = {
  WELCOME20: { discount: 20, type: 'percent', description: '20% off your first purchase' },
  IELTS50: { discount: 50, type: 'fixed', description: '৳50 off any plan' },
  STUDENT15: { discount: 15, type: 'percent', description: '15% student discount' },
  NEWYEAR25: { discount: 25, type: 'percent', description: '25% New Year special' },
};

export type DiscountCalculation = {
  baseAmount: number;
  finalAmount: number;
  discountAmount: number;
  couponCode: string | null;
  isValidCoupon: boolean;
};

export function calculateDiscountedPrice(basePrice: number, couponCode?: string | null): DiscountCalculation {
  const baseAmount = Math.max(0, Math.round(Number(basePrice) || 0));
  const normalizedCode = couponCode?.trim().toUpperCase() || null;
  const coupon = normalizedCode ? COUPON_CODES[normalizedCode] : undefined;

  if (!coupon) {
    return {
      baseAmount,
      finalAmount: baseAmount,
      discountAmount: 0,
      couponCode: null,
      isValidCoupon: !normalizedCode,
    };
  }

  const rawDiscount = coupon.type === 'percent'
    ? Math.round(baseAmount * (coupon.discount / 100))
    : Math.round(coupon.discount);
  const discountAmount = Math.min(baseAmount, Math.max(0, rawDiscount));

  return {
    baseAmount,
    finalAmount: Math.max(0, baseAmount - discountAmount),
    discountAmount,
    couponCode: normalizedCode,
    isValidCoupon: true,
  };
}
