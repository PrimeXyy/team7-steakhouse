package com.team7.steakhouse.feature.order.entity;

/**
 * Round lifecycle (cashier spec §1):
 * SENT -> READY -> COMPLETED, with SENT/READY -> CANCELLED as the exit path.
 * Status transitions are the acknowledgment — no separate acknowledged flag.
 */
public enum RoundStatus {
    SENT,
    READY,
    COMPLETED,
    CANCELLED
}
