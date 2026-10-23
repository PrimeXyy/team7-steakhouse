package com.team7.steakhouse.feature.payment.repository;

import com.team7.steakhouse.feature.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findBySessionIdOrderByPaidAtAsc(UUID sessionId);

    boolean existsByPaidById(UUID userId);
}
