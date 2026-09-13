package com.rsl.training;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("SubscriptionPricingService Unit & Edge Case Test Suite")
public class SubscriptionPricingServiceTest {

    private SubscriptionPricingService pricingService;

    @BeforeEach
    void setUp() {
        pricingService = new SubscriptionPricingService();
    }

    // ==========================================
    // 1. Core Requirements & Base Tier Tests
    // ==========================================

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
    @DisplayName("Should throw InvalidVoucherException with descriptive message containing the invalid code")
    void testInvalidVoucherThrowsExceptionWithContract() {
        String invalidCode = "EXPIRED_OR_FAKE_CODE";
        assertThatThrownBy(() -> pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 5, invalidCode))
                .isInstanceOf(InvalidVoucherException.class)
                .hasMessageContaining(invalidCode);
    }

    // ==========================================
    // 2. Adversarial & Edge Case Expansion Tests
    // ==========================================

    @Nested
    @DisplayName("Adversarial Edge Case Tests")
    class AdversarialEdgeCases {

        @ParameterizedTest(name = "Negative active months [{0}] must fail fast")
        @ValueSource(ints = {-1, -12, -100})
        @DisplayName("Edge Case 1: Should throw IllegalArgumentException for negative active months")
        void testNegativeActiveMonthsThrowsException(int negativeMonths) {
            assertThatThrownBy(() -> pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, negativeMonths, null))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessageContaining("Active months cannot be negative");
        }

        @Test
        @DisplayName("Edge Case 2: Should throw NullPointerException when subscription tier is null")
        void testNullSubscriptionTierThrowsException() {
            assertThatThrownBy(() -> pricingService.calculateMonthlyPrice(null, 10, null))
                    .isInstanceOf(NullPointerException.class)
                    .hasMessageContaining("Subscription tier cannot be null");
        }

        @Test
        @DisplayName("Edge Case 3a: Should gracefully handle valid vouchers with leading/trailing whitespaces")
        void testWhitespacePaddedVoucherAccepted() throws InvalidVoucherException {
            // PRO ($150.00) with 14 months (10% off -> $135.00) - $20.00 = $115.00
            BigDecimal priceSave20 = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 14, "  SAVE20  ");
            assertThat(priceSave20).isEqualByComparingTo(new BigDecimal("115.00"));

            // ENTERPRISE ($500.00) with 37 months (25% off -> $375.00) * 50% = $187.50
            BigDecimal priceHalfPrice = pricingService.calculateMonthlyPrice(SubscriptionTier.ENTERPRISE, 37, "\tHALFPRICE\n");
            assertThat(priceHalfPrice).isEqualByComparingTo(new BigDecimal("187.50"));
        }

        @ParameterizedTest(name = "Lowercase / modified voucher [{0}] must be rejected")
        @ValueSource(strings = {"save20", "halfprice", "Save20", "HalfPrice", "SAVE_20"})
        @DisplayName("Edge Case 3b: Should reject case-mismatched or tampered vouchers")
        void testCaseMismatchedVouchersThrowException(String invalidCaseVoucher) {
            assertThatThrownBy(() -> pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 10, invalidCaseVoucher))
                    .isInstanceOf(InvalidVoucherException.class)
                    .hasMessageContaining(invalidCaseVoucher);
        }

        @ParameterizedTest(name = "Tier {0} at {1} months -> expected ${2}")
        @CsvSource({
                // BASIC ($50.00)
                "BASIC, 0, 50.00",
                "BASIC, 1, 50.00",
                "BASIC, 12, 50.00",
                "BASIC, 13, 45.00",
                "BASIC, 36, 45.00",
                "BASIC, 37, 37.50",
                "BASIC, 120, 37.50",

                // PRO ($150.00)
                "PRO, 0, 150.00",
                "PRO, 12, 150.00",
                "PRO, 13, 135.00",
                "PRO, 36, 135.00",
                "PRO, 37, 112.50",
                "PRO, 60, 112.50",

                // ENTERPRISE ($500.00)
                "ENTERPRISE, 0, 500.00",
                "ENTERPRISE, 12, 500.00",
                "ENTERPRISE, 13, 450.00",
                "ENTERPRISE, 36, 450.00",
                "ENTERPRISE, 37, 375.00",
                "ENTERPRISE, 100, 375.00"
        })
        @DisplayName("Edge Case 4: Comprehensive Longevity Boundary Matrix across all tiers")
        void testLongevityDiscountBoundaryMatrix(SubscriptionTier tier, int months, BigDecimal expectedPrice)
                throws InvalidVoucherException {
            BigDecimal actualPrice = pricingService.calculateMonthlyPrice(tier, months, null);
            assertThat(actualPrice).isEqualByComparingTo(expectedPrice);
            assertThat(actualPrice.scale()).isEqualTo(2);
        }

        @Test
        @DisplayName("Edge Case 5: Should strictly adhere to HALF_UP financial rounding on fractional cents")
        void testHalfUpRoundingOnFractionalCents() throws InvalidVoucherException {
            // PRO ($150.00) with 37 months (25% off -> $112.50) with HALFPRICE (50% off -> $56.25)
            BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.PRO, 37, "HALFPRICE");
            assertThat(price).isEqualByComparingTo(new BigDecimal("56.25"));
            assertThat(price.scale()).isEqualTo(2);

            // BASIC ($50.00) with 37 months (25% off -> $37.50) with HALFPRICE (50% off -> $18.75)
            BigDecimal basicHalf = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 37, "HALFPRICE");
            assertThat(basicHalf).isEqualByComparingTo(new BigDecimal("18.75"));
            assertThat(basicHalf.scale()).isEqualTo(2);
        }

        @Test
        @DisplayName("Edge Case 6: Should enforce $0.00 floor when flat voucher exceeds post-longevity price")
        void testFloorEnforcementWhenVoucherExceedsRemaining() throws InvalidVoucherException {
            // For BASIC ($50.00) with 0 months: $50 - $20 = $30.00
            BigDecimal price = pricingService.calculateMonthlyPrice(SubscriptionTier.BASIC, 0, "SAVE20");
            assertThat(price).isEqualByComparingTo(new BigDecimal("30.00"));
            assertThat(price.compareTo(BigDecimal.ZERO)).isGreaterThanOrEqualTo(0);
        }
    }
}
