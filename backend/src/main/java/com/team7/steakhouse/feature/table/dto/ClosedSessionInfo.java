package com.team7.steakhouse.feature.table.dto;
import java.util.UUID;
public record ClosedSessionInfo(UUID tableId, UUID sessionId, boolean hasReceipt) {}
