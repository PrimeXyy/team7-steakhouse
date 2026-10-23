package com.team7.steakhouse.feature.table.service;

import com.team7.steakhouse.feature.table.dto.GuestSessionRequest;
import com.team7.steakhouse.feature.table.dto.GuestSessionResponse;
import com.team7.steakhouse.feature.table.entity.TableSession;

import java.util.UUID;

public interface GuestSessionService {

    GuestSessionResponse resolve(GuestSessionRequest request);

    /**
     * Loads the ACTIVE session for the given id (from the guest token) and touches
     * its last-activity timestamp. Closed or unknown session -> 410 Gone.
     */
    TableSession requireActiveSession(UUID sessionId);
}
