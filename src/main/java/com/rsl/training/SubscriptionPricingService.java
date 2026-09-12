package com.rsl.training;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class SubscriptionPricingService {

    public BigDecimal calculateMonthlyPrice(SubscriptionTier tier, int activeMonths, String voucherCode)
            throws InvalidVoucherException {

        if (tier == null) {
            throw new IllegalArgumentException("Subscription tier cannot be null");
        }

        BigDecimal price = tier.getBaseRate();

        // Longevity discount calculation
        if (activeMonths > 36) {
            price = price.multiply(new BigDecimal("0.75"));
        } else if (activeMonths > 12) {
            price = price.multiply(new BigDecimal("0.90"));
        }

        // Voucher discount calculation
        if (voucherCode != null && !voucherCode.trim().isEmpty()) {
            if ("SAVE20".equals(voucherCode)) {
                price = price.subtract(new BigDecimal("20.00"));
            } else if ("HALFPRICE".equals(voucherCode)) {
                price = price.multiply(new BigDecimal("0.50"));
            } else {
                throw new InvalidVoucherException(voucherCode);
            }
        }

        // Rounding and floor rule enforcement
        price = price.setScale(2, RoundingMode.HALF_UP);

        if (price.compareTo(BigDecimal.ZERO) < 0) {
            price = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return price;
    }
}
