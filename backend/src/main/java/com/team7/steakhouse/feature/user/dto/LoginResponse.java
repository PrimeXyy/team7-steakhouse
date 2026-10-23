package com.team7.steakhouse.feature.user.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        long expiresInMs
) {
    public LoginResponse(String accessToken, long expiresInMs) {
        this(accessToken, "Bearer", expiresInMs);
    }
}
