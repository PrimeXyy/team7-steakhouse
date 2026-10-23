package com.team7.steakhouse.feature.currency.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExchangeRateUpdateRequest(
        @NotNull @Positive BigDecimal rate,
        @NotNull LocalDate effectiveDate
) {
}
