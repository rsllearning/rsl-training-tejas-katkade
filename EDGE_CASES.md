# Adversarial QA Edge Case Brainstorming & Engineering Justifications

This document records the adversarial edge cases brainstormed during Task 5, along with the detailed engineering justifications for the selected test cases.

---

## 🧠 Complete Adversarial Brainstorming List

1. **Negative Active Months**: Accounts with negative active duration (e.g., `-1`, `-12`) caused by upstream data corruption or replay attacks.
2. **Null Subscription Tier**: Method invoked with a null tier reference.
3. **Voucher Whitespace Resilience**: Promotional codes containing leading/trailing spaces from user copy-paste (e.g., `"  SAVE20  "`).
4. **Voucher Case Sensitivity & Tampering**: Promotional codes in lowercase or mixed case (e.g., `"save20"`, `"HalfPrice"`) should be strictly rejected if promotions are case-sensitive.
5. **Multi-Step Fractional Cent Half-Up Rounding**: Combinations of percentage discounts yielding fractional third-decimal cents (e.g., `.005`) to verify strict `RoundingMode.HALF_UP` behavior.
6. **Boundary Off-By-One Transitions**: Exhaustive testing of months `[0, 1, 11, 12, 13, 35, 36, 37, 120]`.
7. **Discounts Exceeding Base Rate ($0 Floor Rule)**: Edge cases where combined discounts or flat deductions equal or exceed the total tier price.

---

## 🎯 Selected 4+ Non-Trivial Edge Cases & Engineering Justifications

### 1. Negative Active Months Input Validation
- **Test**: `testNegativeActiveMonthsThrowsException(int negativeMonths)` (Parameterized: `-1`, `-12`, `-100`)
- **Engineering Justification**: Negative duration is physically impossible and indicates corrupted upstream billing data or malformed API requests. The service must fail fast with `IllegalArgumentException` rather than silently computing rates or producing undefined discount behavior.

### 2. Null Tier Contract Guard
- **Test**: `testNullSubscriptionTierThrowsException()`
- **Engineering Justification**: Prevents obscure `NullPointerException` crashes in downstream business pipelines by enforcing strict precondition checks with informative diagnostic messages (`Objects.requireNonNull`).

### 3. Whitespace-Padded Vouchers vs. Case Sensitivity
- **Test**: `testWhitespacePaddedVoucherAccepted()` and `testLowerCaseVoucherThrowsException()`
- **Engineering Justification**: Real-world users frequently copy-paste promo codes with extraneous leading/trailing whitespace (`"  SAVE20  "`). Trimming avoids unnecessary checkout friction, while strictly enforcing uppercase code matching prevents ambiguous code collisions and unauthorized promotion reuse.

### 4. Comprehensive Parameterized Longevity Boundary Matrix
- **Test**: `testLongevityDiscountBoundaryMatrix(SubscriptionTier tier, int months, BigDecimal expectedPrice)`
- **Engineering Justification**: Boundary inflection points (exact 12 vs 13 months, exact 36 vs 37 months) are the most common source of billing regression bugs. A parameterized test spanning the entire boundary matrix guarantees boundary inequalities (`> 12` and `> 36`) across all three subscription tiers.

### 5. Multi-Step Half-Up Financial Rounding Precision
- **Test**: `testHalfUpRoundingOnFractionalCents()`
- **Engineering Justification**: Currency calculations in multi-step percentage deductions can accumulate rounding errors if intermediate states are prematurely truncated. Validating the exact scale (2 decimal places) and Half-Up rounding ensures strict compliance with financial accounting standards (GAAP/IFRS).
