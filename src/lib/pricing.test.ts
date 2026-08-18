import { describe, expect, it } from 'vitest';
import { calculateDiscountedPrice } from './pricing';

describe('calculateDiscountedPrice', () => {
  it('returns the base price when no coupon is supplied', () => {
    expect(calculateDiscountedPrice(299)).toEqual({
      baseAmount: 299,
      finalAmount: 299,
      discountAmount: 0,
      couponCode: null,
      isValidCoupon: true,
    });
  });

  it('applies percentage coupons using integer taka rounding', () => {
    expect(calculateDiscountedPrice(299, 'welcome20')).toMatchObject({
      finalAmount: 239,
      discountAmount: 60,
      couponCode: 'WELCOME20',
      isValidCoupon: true,
    });
  });

  it('applies fixed coupons without allowing a negative total', () => {
    expect(calculateDiscountedPrice(40, 'IELTS50')).toMatchObject({
      finalAmount: 0,
      discountAmount: 40,
    });
  });

  it('marks unknown coupons invalid and does not discount', () => {
    expect(calculateDiscountedPrice(299, 'FAKE')).toEqual({
      baseAmount: 299,
      finalAmount: 299,
      discountAmount: 0,
      couponCode: null,
      isValidCoupon: false,
    });
  });
});
