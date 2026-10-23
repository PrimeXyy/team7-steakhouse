package com.team7.steakhouse.feature.cart.service;

import com.team7.steakhouse.feature.cart.dto.CartLineAddRequest;
import com.team7.steakhouse.feature.cart.dto.CartLineUpdateRequest;
import com.team7.steakhouse.feature.cart.dto.CartResponse;

import java.util.UUID;

public interface GuestCartService {

    CartResponse getCart(UUID sessionId, UUID deviceId);

    CartResponse addLine(UUID sessionId, UUID deviceId, CartLineAddRequest request);

    CartResponse updateLine(UUID sessionId, UUID deviceId, UUID lineId, CartLineUpdateRequest request);

    CartResponse removeLine(UUID sessionId, UUID deviceId, UUID lineId);

    CartResponse clear(UUID sessionId, UUID deviceId);
}
