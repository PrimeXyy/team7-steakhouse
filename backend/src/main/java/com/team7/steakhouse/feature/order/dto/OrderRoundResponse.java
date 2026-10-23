package com.team7.steakhouse.feature.order.dto;

import com.team7.steakhouse.feature.order.entity.PaymentStatus;
import com.team7.steakhouse.feature.order.entity.FulfillmentStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record OrderRoundResponse(
        UUID id,
        int roundNumber,
        PaymentStatus paymentStatus,
        FulfillmentStatus fulfillmentStatus,
        BigDecimal subtotal,
        BigDecimal vatRate,
        BigDecimal vatAmount,
        BigDecimal grandTotal,
        Instant sentAt,
        List<OrderRoundLineResponse> lines
) {
}
