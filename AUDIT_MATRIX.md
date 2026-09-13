# AI Test Audit Matrix & Critique

This document records the audit of the initial AI-generated unit test suite (`SubscriptionPricingServiceTest.java`), identifying anti-patterns, weak assertions, logical flaws, and documenting corrective fixes.

---

## 🔍 Audit Breakdown Table

| # | Flaw Category | Line / Test Method in Raw Test | Flaw Description & Impact | Corrective Fix Applied |
|---|---|---|---|---|
| **1** | **False Floor Rule Assertion (Logical Flaw / AI Hallucination)** | `testFloorRuleEnforcement()` | The test claimed to verify the $0.00 floor rule when discounts exceed base price, but asserted `$50.00 - $20.00 = $30.00`. The price remained positive ($30.00) and never actually exercised or validated the $0.00 floor boundary. | Replaced with true floor-exceeding scenarios: e.g., applying vouchers and discounts that exceed base price (or voucher exceeding remaining amount) and asserting `assertThat(price).isEqualByComparingTo("0.00")`. |
| **2** | **Weak Assertion & Redundant `assertNotNull`** | `testBaseRatesForTiersWithoutDiscounts()`, `testSave20VoucherApplication()` | Used redundant `assertNotNull(price)` before `assertEquals`. Furthermore, raw `assertEquals` on `BigDecimal` is sensitive to internal scale differences (`50.0` vs `50.00`) and produces vague error messages. | Migrated to AssertJ `assertThat(price).isEqualByComparingTo(new BigDecimal("50.00"))` and explicitly verified scale (`assertThat(price.scale()).isEqualTo(2)`) to strictly enforce the two-decimal currency requirement. |
| **3** | **Missing Exception Contract Verification** | `testInvalidVoucherThrowsException()` | Only asserted that `InvalidVoucherException` was thrown, without verifying the exception message or metadata. Any empty or improperly initialized exception would pass. | Captured the thrown exception and asserted on its detailed error message: `assertThat(exception.getMessage()).contains("INVALID_CODE_123")` ensuring informative error reporting. |
| **4** | **Missing Boundary Isolation (12 and 36 Months Boundaries)** | `testBaseRatesForTiersWithoutDiscounts()`, `testTenPercentDiscount...` | Tested arbitrary values (e.g. 6 months, 14 months) without rigorously verifying the exact boundary transitions (e.g., month 12 = 0% vs month 13 = 10%; month 36 = 10% vs month 37 = 25%). | Added explicit boundary transition assertions for exact edge months (12 vs 13, 36 vs 37) to prevent off-by-one errors (`>` vs `>=`). |

---

## 🎯 Verification
After applying the fixes in `SubscriptionPricingServiceTest.java`, re-running `mvn clean test` continues to fail cleanly due to missing production code, but now with a robust, high-fidelity specification.
