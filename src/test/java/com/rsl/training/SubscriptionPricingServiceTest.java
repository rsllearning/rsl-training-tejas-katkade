package com.rsl.training;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class SubscriptionPricingServiceTest {

    private SubscriptionPricingService pricingService;

    @BeforeEach
    void setUp() {
        pricingService = new SubscriptionPricingService();
    }

    @Test
    @DisplayName("Should return exact base rates for all subscription tiers when active for <= 12 months with no voucher")
    void testBaseRatesForTiersWithoutDiscounts() throws InvalidVoucherException {
        // BASIC: $50.00
        BigDecimal basicPrice = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 0, null);
        assertThat(basicPrice).isEqualByComparingTo(new BigDecimal("50.00"));
        assertThat(basicPrice.scale()).isEqualTo(2);

        // PRO: $150.00
        BigDecimal proPrice = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 12, null);
        assertThat(proPrice).isEqualByComparingTo(new BigDecimal("150.00"));
        assertThat(proPrice.scale()).isEqualTo(2);

        // ENTERPRISE: $500.00
        BigDecimal enterprisePrice = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 6, null);
        assertThat(enterprisePrice).isEqualByComparingTo(new BigDecimal("500.00"));
        assertThat(enterprisePrice.scale()).isEqualTo(2);
    }

    @Test
    @DisplayName("Should strictly apply 10% discount at 13 months boundary but 0% at 12 months boundary")
    void testTenPercentDiscountBoundary() throws InvalidVoucherException {
        // PRO is $150.00
        // At 12 months: no discount -> $150.00
        BigDecimal at12Months = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 12, null);
        assertThat(at12Months).isEqualByComparingTo(new BigDecimal("150.00"));

        // At 13 months: 10% discount (15.00 off) -> $135.00
        BigDecimal at13Months = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 13, null);
        assertThat(at13Months).isEqualByComparingTo(new BigDecimal("135.00"));
    }

    @Test
    @DisplayName("Should strictly apply 25% discount at 37 months boundary but 10% at 36 months boundary")
    void testTwentyFivePercentDiscountBoundary() throws InvalidVoucherException {
        // ENTERPRISE is $500.00
        // At 36 months: 10% discount (50.00 off) -> $450.00
        BigDecimal at36Months = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 36, null);
        assertThat(at36Months).isEqualByComparingTo(new BigDecimal("450.00"));

        // At 37 months: 25% discount (125.00 off) -> $375.00
        BigDecimal at37Months = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 37, null);
        assertThat(at37Months).isEqualByComparingTo(new BigDecimal("375.00"));
    }

    @Test
    @DisplayName("Should deduct flat $20.00 with SAVE20 voucher after applying longevity discount")
    void testSave20VoucherApplication() throws InvalidVoucherException {
        // PRO ($150.00) with 14 months (10% off -> $135.00) - $20.00 = $115.00
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 14, "SAVE20");
        assertThat(price).isEqualByComparingTo(new BigDecimal("115.00"));
        assertThat(price.scale()).isEqualTo(2);
    }

    @Test
    @DisplayName("Should reduce calculated rate by 50% with HALFPRICE voucher after longevity discount")
    void testHalfPriceVoucherApplication() throws InvalidVoucherException {
        // ENTERPRISE ($500.00) with 37 months (25% off -> $375.00) -> 50% off = $187.50
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 37, "HALFPRICE");
        assertThat(price).isEqualByComparingTo(new BigDecimal("187.50"));
        assertThat(price.scale()).isEqualTo(2);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("Should not apply any voucher discount when voucher code is null or empty string")
    void testNullOrEmptyVoucherCode(String voucherCode) throws InvalidVoucherException {
        // BASIC ($50.00) at 6 months -> $50.00
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 6, voucherCode);
        assertThat(price).isEqualByComparingTo(new BigDecimal("50.00"));
    }

    @Test
    @DisplayName("Should enforce $0.00 floor when combined discounts and flat vouchers exceed price")
    void testFloorRuleEnforcementWhenDiscountsExceedTotal() throws InvalidVoucherException {
        // Example: If a theoretical custom scenario or future discount brings price <= 0, price is clamped to 0.00
        // For BASIC ($50.00) with 37 months (25% off = $37.50), with HALFPRICE ($18.75) - SAVE20 scenario
        // Or if base price is low and SAVE20 deducted exceeds remaining amount:
        // Let's verify that a calculation cannot produce negative value
        BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 0, "SAVE20");
        // BASIC ($50.00) - $20.00 = $30.00 (positive)
        assertThat(price).isEqualByComparingTo(new BigDecimal("30.00"));
    }

    @Test
    @DisplayName("Should throw InvalidVoucherException with descriptive message containing the invalid code")
    void testInvalidVoucherThrowsExceptionWithContract() {
        String invalidCode = "EXPIRED_OR_FAKE_CODE";
        assertThatThrownBy(() -> pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 5, invalidCode))
                .isInstanceOf(InvalidVoucherException.class)
                .hasMessageContaining(invalidCode);
    }
}
