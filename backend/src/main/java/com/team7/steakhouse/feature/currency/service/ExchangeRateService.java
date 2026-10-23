package com.team7.steakhouse.feature.currency.service;

import com.team7.steakhouse.feature.currency.dto.ExchangeRateCreateRequest;
import com.team7.steakhouse.feature.currency.dto.ExchangeRateResponse;
import com.team7.steakhouse.feature.currency.dto.ExchangeRateUpdateRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ExchangeRateService {

    List<ExchangeRateResponse> getAll();

    ExchangeRateResponse create(ExchangeRateCreateRequest request);

    ExchangeRateResponse update(UUID id, ExchangeRateUpdateRequest request);

    BigDecimal convert(BigDecimal amount, String fromCurrencyCode, String toCurrencyCode);
}
