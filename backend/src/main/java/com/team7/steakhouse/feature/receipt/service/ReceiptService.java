package com.team7.steakhouse.feature.receipt.service;

import com.team7.steakhouse.feature.payment.entity.Payment;
import com.team7.steakhouse.feature.receipt.dto.ReceiptPdf;
import com.team7.steakhouse.feature.receipt.entity.Receipt;
import com.team7.steakhouse.feature.payment.dto.ReceiptResponse;

import java.util.UUID;

public interface ReceiptService {

    /** Called by the payment flow inside the payment transaction. */
    Receipt createForPayment(Payment payment);

    /** Full receipt payload (same shape the pay endpoint returns) — reprint view. */
    ReceiptResponse get(UUID receiptId);

    /** Reprint lookup when only the session is known (e.g. from the status board). */
    ReceiptResponse getBySession(UUID sessionId);

    ReceiptPdf pdf(UUID receiptId);
}
