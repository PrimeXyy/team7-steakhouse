package com.team7.steakhouse.feature.table.dto;

import java.util.UUID;

public record GuestSessionResponse(
        String accessToken,
        long expiresInMs,
        UUID sessionId,
        String tableNumber
) {
}
