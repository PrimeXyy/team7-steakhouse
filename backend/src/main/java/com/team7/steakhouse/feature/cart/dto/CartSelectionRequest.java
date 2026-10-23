package com.team7.steakhouse.feature.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CartSelectionRequest(
        @NotNull UUID modifierOptionId,
        @NotNull @Min(1) Integer quantity
) {
}
