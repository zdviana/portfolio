package dev.daviviana.portfolio.service;

import java.time.Instant;

public record ContactMessageCreated(Long id, String name, String email, String message, Instant createdAt) {
}
