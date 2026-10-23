package com.team7.steakhouse.feature.currency.service.impl;

import com.team7.steakhouse.feature.currency.dto.CurrencyResponse;
import com.team7.steakhouse.feature.currency.mapper.CurrencyMapper;
import com.team7.steakhouse.feature.currency.repository.CurrencyRepository;
import com.team7.steakhouse.feature.currency.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {

    private final CurrencyRepository currencyRepository;
    private final CurrencyMapper currencyMapper;

    @Override
    public List<CurrencyResponse> getAll() {
        return currencyRepository.findAll().stream()
                .map(currencyMapper::toResponse)
                .collect(Collectors.toList());
    }
}
