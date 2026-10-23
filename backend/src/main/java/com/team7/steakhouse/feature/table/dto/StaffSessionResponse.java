package com.team7.steakhouse.feature.table.dto;

import com.team7.steakhouse.feature.table.entity.SessionStatus;

import java.time.Instant;
import java.util.UUID;

/** Cashier-opened (or found) session — same session guests share via QR scan. */
public record StaffSessionResponse(
        UUID sessionId,
        UUID tableId,
        String tableNumber,
        SessionStatus status,
        Instant createdAt
) {
}
