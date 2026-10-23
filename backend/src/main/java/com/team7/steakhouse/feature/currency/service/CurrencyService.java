package com.team7.steakhouse.feature.currency.service;

import com.team7.steakhouse.feature.currency.dto.CurrencyResponse;

import java.util.List;

public interface CurrencyService {

    List<CurrencyResponse> getAll();
}
