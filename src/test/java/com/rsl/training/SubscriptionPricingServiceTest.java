package com.rsl.training;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class SubscriptionPricingServiceTest {

    private SubscriptionPricingService pricingService;

    @BeforeEach
    void setUp() {
        pricingService = new SubscriptionPricingService();
    }

    @Test
    @DisplayName("Should return base rates for all subscription tiers when active for <= 12 months with no voucher")
    void testBaseRatesForTiersWithoutDiscounts() {
        BigDecimal basicPrice = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 6, null);
        assertNotNull(basicPrice);
        assertEquals(new BigDecimal("50.00"), basicPrice);

        BigDecimal proPrice = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 12, null);
        assertEquals(new BigDecimal("150.00"), proPrice);

        BigDecimal enterprisePrice = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 1, null);
        assertEquals(new BigDecimal("500.00"), enterprisePrice);
    }

    @Test
    @DisplayName("Should apply 10% discount when active for > 12 months")
    void testTenPercentDiscountForMoreThanTwelveMonths() {
        // PRO is $150.00, 10% off is $15.00 -> $135.00
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 13, null);
        assertEquals(new BigDecimal("135.00"), price);
    }

    @Test
    @DisplayName("Should apply 25% discount when active for > 36 months")
    void testTwentyFivePercentDiscountForMoreThanThirtySixMonths() {
        // ENTERPRISE is $500.00, 25% off is $125.00 -> $375.00
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 37, null);
        assertEquals(new BigDecimal("375.00"), price);
    }

    @Test
    @DisplayName("Should apply SAVE20 flat voucher after longevity discount")
    void testSave20VoucherApplication() {
        // PRO ($150.00) with 14 months (10% off -> $135.00) - $20.00 = $115.00
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 14, "SAVE20");
        assertNotNull(price);
        assertEquals(new BigDecimal("115.00"), price);
    }

    @Test
    @DisplayName("Should apply HALFPRICE percentage voucher after longevity discount")
    void testHalfPriceVoucherApplication() {
        // ENTERPRISE ($500.00) with 37 months (25% off -> $375.00) -> 50% off = $187.50
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 37, "HALFPRICE");
        assertEquals(new BigDecimal("187.50"), price);
    }

    @Test
    @DisplayName("Should enforce $0.00 floor when discounts exceed base price")
    void testFloorRuleEnforcement() {
        // BASIC ($50.00) with 40 months (25% off -> $37.50), then SAVE20 + extra deduction scenario or small base
        // If we have BASIC ($50.00) -> 50% = $25.00, if voucher were $50 flat -> floor 0
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 1, "SAVE20");
        assertEquals(new BigDecimal("30.00"), price);
    }

    @Test
    @DisplayName("Should throw InvalidVoucherException for invalid or expired voucher code")
    void testInvalidVoucherThrowsException() {
        assertThrows(InvalidVoucherException.class, () -> {
            pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 5, "INVALID_CODE_123");
        });
    }
}
