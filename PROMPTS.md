# AI Prompt History & Audit Log

This document records the exact prompts provided to the AI assistant throughout the TDD workflow, along with the engineering context and outcomes.

---

## Task 1 — Contextual Prompt (RED Phase)

### 5-Part Contextual Prompt:

```text
[ROLE]: You are a Senior QA Automation Engineer specializing in Test-Driven Development (TDD) using Java 17, JUnit 5, and AssertJ.

[TARGET CLASS & METHOD]: 
Target Class: com.rsl.training.SubscriptionPricingService
Target Method: public BigDecimal calculateMonthlyPrice(SubscriptionTier tier, int activeMonths, String voucherCode) throws InvalidVoucherException

[BUSINESS RULES]:
1. Tier Base Rates:
   - SubscriptionTier.BASIC: $50.00 / month
   - SubscriptionTier.PRO: $150.00 / month
   - SubscriptionTier.ENTERPRISE: $500.00 / month
2. Longevity Discounts:
   - Active > 12 months: 10% discount on monthly base rate.
   - Active > 36 months: 25% discount on monthly base rate.
3. Promotional Voucher Codes:
   - "SAVE20": Deducts a flat $20.00 after percentage discounts.
   - "HALFPRICE": Reduces calculated rate by 50% (after longevity discounts).
   - Invalid or expired vouchers: Throws custom InvalidVoucherException.
4. Rounding & Floor Rule:
   - Final total cannot drop below $0.00 (floor rule).
   - Currency calculations must use BigDecimal with HALF_UP rounding to 2 decimal places.

[BOUNDARY CONDITIONS]:
- Exactly 12 months active (0% discount) vs 13 months (10% discount).
- Exactly 36 months active (10% discount) vs 37 months (25% discount).
- Account with 0 months.
- Null voucher code or empty string (no discount applied, no exception).
- Floor rule triggering when discounts exceed base price.

[OUTPUT CONSTRAINTS]:
- Provide ONLY the JUnit 5 test class: `SubscriptionPricingServiceTest.java`.
- Package name: `com.rsl.training`.
- Do NOT generate production classes (SubscriptionPricingService, SubscriptionTier, InvalidVoucherException).
- Use @Test, @DisplayName, and standard assertion libraries (JUnit Jupiter / AssertJ).
```

---

## Task 2 — Test Audit & Critique Prompt (AUDIT Phase)

### Audit & Refactoring Prompt:

```text
[ROLE]: You are a Lead Software Quality Architect performing a rigorous audit on the AI-generated test suite `SubscriptionPricingServiceTest.java`.

[TASK]:
Audit the test suite against the AI Test Audit Matrix for:
1. Logical flaws or false positives (e.g., verifying a positive balance when testing the $0.00 floor rule).
2. Weak assertions (redundant assertNotNull, scale-sensitive BigDecimal comparisons).
3. Missing exception message contracts.
4. Missing exact boundary condition tests (12 vs 13 months, 36 vs 37 months).

Refactor the unit test class to use AssertJ fluent assertions (`assertThat`), enforce exact scale of 2 decimal places, and validate detailed exception messages.
```

---

## Task 3 — Minimal Implementation Prompt (GREEN Phase)

### Implementation Prompt:

```text
[ROLE]: You are a Software Engineer practicing strict TDD.

[INPUT SPECIFICATION]:
Here is the audited test specification `SubscriptionPricingServiceTest.java`.

[TASK]:
Write the minimal production Java code to satisfy all tests without modifying any test cases:
1. `SubscriptionTier.java`: Enum containing BASIC ($50.00), PRO ($150.00), ENTERPRISE ($500.00).
2. `InvalidVoucherException.java`: Custom checked exception conveying invalid voucher code details.
3. `SubscriptionPricingService.java`: Minimal service implementing `calculateMonthlyPrice(SubscriptionTier tier, int activeMonths, String voucherCode)`.
   - Apply base rate lookup.
   - Apply longevity discount (>12 months = 10%, >36 months = 25%).
   - Apply voucher discount ("SAVE20" -> flat $20 off, "HALFPRICE" -> 50% off, null/empty -> no discount, others -> throw InvalidVoucherException).
   - Enforce $0.00 floor and RoundingMode.HALF_UP with scale of 2.
```

---

## Task 4 — Refactoring Prompt (REFACTOR Phase)

### Refactoring Prompt:

```text
[ROLE]: You are a Principal Java Architect.

[TASK]:
Refactor `SubscriptionPricingService.java` to elevate it to production-grade, maintainable Java 17 architecture while operating under the passing test shield:
1. Modern Java 17 Features:
   - Modern switch expressions / pattern matching for voucher processing.
   - Decompose monolithic procedural calculations into clean, immutable discount transformation steps.
2. Maintainability & Clean Code:
   - Extract domain constants (`DECIMAL_SCALE`, `FLOOR_PRICE`, discount multiplier BigDecimals).
   - Enforce Single Responsibility Principle (SRP) by isolating longevity discount calculation and voucher discount application.
   - Maintain strict defensive programming with null checks.
3. Zero Regressions:
   - All existing tests must pass with 100% compliance.
```

---

## Task 5 — Adversarial Edge Case Expansion Prompt (TEST Phase)

### Adversarial Brainstorming & Test Expansion Prompt:

```text
[ROLE]: You are an Adversarial QA Engineer and Security/Reliability Tester.

[TASK]:
1. Brainstorm subtle edge cases, negative scenarios, boundary flaws, data injection, and rounding errors in `SubscriptionPricingService`.
2. Generate comprehensive JUnit 5 parameterized and edge-case unit tests to stress-test:
   - Negative active months (fail fast with IllegalArgumentException).
   - Null subscription tier input validation.
   - Whitespace trimming on valid vouchers vs. lowercase rejection.
   - Financial half-up rounding on fractional cents.
   - Parameterized boundary matrix for longevity thresholds (0, 1, 11, 12, 13, 35, 36, 37, 60, 120 months) across all tiers.
3. Provide rigorous engineering justifications for all added edge case tests.
```
