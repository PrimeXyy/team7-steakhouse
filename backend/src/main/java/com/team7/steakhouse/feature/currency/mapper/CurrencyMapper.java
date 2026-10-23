package com.team7.steakhouse.feature.currency.mapper;

import com.team7.steakhouse.feature.currency.dto.CurrencyResponse;
import com.team7.steakhouse.feature.currency.entity.Currency;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CurrencyMapper {

    default CurrencyResponse toResponse(Currency currency) {
        if (currency == null) {
            return null;
        }
        return new CurrencyResponse(
                currency.getId(),
                currency.getCode(),
                currency.getName(),
                currency.getSymbol(),
                currency.isDefaultCurrency(),
                currency.getCreatedAt(),
                currency.getUpdatedAt()
        );
    }
}
