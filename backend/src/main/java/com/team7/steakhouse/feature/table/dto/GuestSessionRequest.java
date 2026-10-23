package com.team7.steakhouse.feature.table.dto;

import jakarta.validation.constraints.NotBlank;

public record GuestSessionRequest(
        @NotBlank String qrToken
) {
}
