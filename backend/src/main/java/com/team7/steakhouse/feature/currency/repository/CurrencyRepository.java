package com.team7.steakhouse.feature.currency.repository;

import com.team7.steakhouse.feature.currency.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CurrencyRepository extends JpaRepository<Currency, UUID> {

    Optional<Currency> findByCode(String code);

    boolean existsByCode(String code);
}
