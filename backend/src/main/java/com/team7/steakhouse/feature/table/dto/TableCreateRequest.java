package com.team7.steakhouse.feature.table.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TableCreateRequest(
        @NotBlank @Size(max = 20) String tableNumber
) {
}
