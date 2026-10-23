package com.team7.steakhouse.feature.user.dto;

import com.team7.steakhouse.feature.user.entity.RoleName;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String username,
        String email,
        boolean enabled,
        Set<RoleName> roles,
        Instant createdAt,
        Instant updatedAt
) {
}
