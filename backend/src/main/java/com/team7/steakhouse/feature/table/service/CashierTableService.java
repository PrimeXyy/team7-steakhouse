package com.team7.steakhouse.feature.table.service;

import com.team7.steakhouse.feature.table.dto.StaffSessionResponse;
import com.team7.steakhouse.feature.table.dto.TableOverviewResponse;

import java.util.List;
import java.util.UUID;

/** Cashier table board and manual session opening (cashier spec §2, §5). */
public interface CashierTableService {

    /** One cheap query for the polled status board — every active table with derived state. */
    List<TableOverviewResponse> getOverview();

    /** Find-or-create the ACTIVE session — the guest QR-scan logic minus the guest token. */
    StaffSessionResponse openSession(UUID tableId);

    void transferSession(UUID sessionId, UUID targetTableId);
}
