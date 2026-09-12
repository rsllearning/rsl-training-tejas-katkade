package com.rsl.training;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/**
 * Production-grade Subscription Tier & Discount Processor.
 * Implements strict financial rounding, longevity discounts, and voucher transformations.
 */
public class SubscriptionPricingService {

    private static final int CURRENCY_SCALE = 2;
    private static final RoundingMode ROUNDING_MODE = RoundingMode.HALF_UP;
    private static final BigDecimal ZERO_FLOOR = BigDecimal.ZERO.setScale(CURRENCY_SCALE, ROUNDING_MODE);

    private static final BigDecimal LONGEVITY_TIER_1_FACTOR = new BigDecimal("0.90"); // 10% discount (> 12 months)
    private static final BigDecimal LONGEVITY_TIER_2_FACTOR = new BigDecimal("0.75"); // 25% discount (> 36 months)

    private static final BigDecimal SAVE20_DEDUCTION = new BigDecimal("20.00");
    private static final BigDecimal HALFPRICE_FACTOR = new BigDecimal("0.50");

    private static final String VOUCHER_SAVE20 = "SAVE20";
    private static final String VOUCHER_HALFPRICE = "HALFPRICE";

    /**
     * Calculates final monthly subscription price for a customer account.
     *
     * @param tier         The subscription tier (BASIC, PRO, ENTERPRISE)
     * @param activeMonths Number of continuous months the account has been active
     * @param voucherCode  Optional promotional voucher code
     * @return Calculated monthly price formatted to 2 decimal places (half-up)
     * @throws InvalidVoucherException if an unrecognized or invalid voucher code is supplied
     */
    public BigDecimal calculateMonthlyPrice(SubscriptionTier tier, int activeMonths, String voucherCode)
            throws InvalidVoucherException {

        Objects.requireNonNull(tier, "Subscription tier cannot be null");

        BigDecimal basePrice = tier.getBaseRate();
        BigDecimal postLongevityPrice = applyLongevityDiscount(basePrice, activeMonths);
        BigDecimal postVoucherPrice = applyVoucherDiscount(postLongevityPrice, voucherCode);

        return applyFloorAndRounding(postVoucherPrice);
    }

    /**
     * Computes longevity discount based on active account duration.
     */
    private BigDecimal applyLongevityDiscount(BigDecimal price, int activeMonths) {
        if (activeMonths > 36) {
            return price.multiply(LONGEVITY_TIER_2_FACTOR);
        } else if (activeMonths > 12) {
            return price.multiply(LONGEVITY_TIER_1_FACTOR);
        }
        return price;
    }

    /**
     * Applies promotional voucher code discounts using Java 17 switch expressions.
     */
    private BigDecimal applyVoucherDiscount(BigDecimal currentPrice, String voucherCode)
            throws InvalidVoucherException {

        if (voucherCode == null || voucherCode.trim().isEmpty()) {
            return currentPrice;
        }

        String normalizedCode = voucherCode.trim();

        return switch (normalizedCode) {
            case VOUCHER_SAVE20 -> currentPrice.subtract(SAVE20_DEDUCTION);
            case VOUCHER_HALFPRICE -> currentPrice.multiply(HALFPRICE_FACTOR);
            default -> throw new InvalidVoucherException(voucherCode);
        };
    }

    /**
     * Enforces HALF_UP rounding to 2 decimal places and applies the $0.00 floor rule.
     */
    private BigDecimal applyFloorAndRounding(BigDecimal price) {
        BigDecimal roundedPrice = price.setScale(CURRENCY_SCALE, ROUNDING_MODE);
        return roundedPrice.compareTo(ZERO_FLOOR) < 0 ? ZERO_FLOOR : roundedPrice;
    }
}
