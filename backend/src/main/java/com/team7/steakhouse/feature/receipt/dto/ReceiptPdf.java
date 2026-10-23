package com.team7.steakhouse.feature.receipt.dto;

/** Rendered PDF plus the filename to serve it under. */
public record ReceiptPdf(String filename, byte[] content) {
}
