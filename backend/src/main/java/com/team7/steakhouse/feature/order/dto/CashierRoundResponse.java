package com.team7.steakhouse.feature.order.dto;

import com.team7.steakhouse.feature.order.entity.PaymentStatus;
import com.team7.steakhouse.feature.order.entity.FulfillmentStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** Staff view of a round: guest fields plus table/session context and cancel info. */
public record CashierRoundResponse(
        UUID id,
        UUID sessionId,
        String tableNumber,
        int roundNumber,
        PaymentStatus paymentStatus,
        FulfillmentStatus fulfillmentStatus,
        BigDecimal subtotal,
        BigDecimal vatRate,
        BigDecimal vatAmount,
        BigDecimal grandTotal,
        Instant sentAt,
        Instant cancelledAt,
        String cancelReason,
        List<OrderRoundLineResponse> lines
) {
}
