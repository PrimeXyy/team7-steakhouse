package com.team7.steakhouse.feature.promo.repository;

import com.team7.steakhouse.feature.promo.entity.GuestPromo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GuestPromoRepository extends JpaRepository<GuestPromo, Long> {
    Optional<GuestPromo> findByIsActiveTrue();
}
