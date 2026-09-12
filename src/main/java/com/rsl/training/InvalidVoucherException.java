package com.rsl.training;

public class InvalidVoucherException extends Exception {
    private final String voucherCode;

    public InvalidVoucherException(String voucherCode) {
        super("Invalid or expired promotional voucher code: '" + voucherCode + "'");
        this.voucherCode = voucherCode;
    }

    public String getVoucherCode() {
        return voucherCode;
    }
}
