package com.team7.steakhouse.feature.modifier.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ModifierGroupResponse(
        UUID id,
        String nameEn,
        String nameKm,
        int minChoice,
        Integer maxChoice,
        boolean active,
        List<ModifierOptionResponse> options,
        Instant createdAt,
        Instant updatedAt
) {
}
