package com.team7.steakhouse.feature.table.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record TransferSessionRequest(
    @NotNull(message = "Target table ID is required")
    UUID targetTableId
) {}
