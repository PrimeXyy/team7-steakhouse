package com.team7.steakhouse.feature.currency.mapper;

import com.team7.steakhouse.feature.currency.dto.ExchangeRateResponse;
import com.team7.steakhouse.feature.currency.entity.ExchangeRate;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExchangeRateMapper {

    default ExchangeRateResponse toResponse(ExchangeRate exchangeRate) {
        if (exchangeRate == null) {
            return null;
        }
        return new ExchangeRateResponse(
                exchangeRate.getId(),
                exchangeRate.getFromCurrency().getCode(),
                exchangeRate.getToCurrency().getCode(),
                exchangeRate.getRate(),
                exchangeRate.getEffectiveDate(),
                exchangeRate.getCreatedAt(),
                exchangeRate.getUpdatedAt()
        );
    }
}
