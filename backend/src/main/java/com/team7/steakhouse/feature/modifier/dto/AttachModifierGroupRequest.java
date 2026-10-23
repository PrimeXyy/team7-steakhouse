package com.team7.steakhouse.feature.modifier.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.UUID;

public record AttachModifierGroupRequest(
        @NotNull UUID modifierGroupId,
        @NotNull @PositiveOrZero Integer sortOrder
) {
}
