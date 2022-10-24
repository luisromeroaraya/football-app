package com.backend.footballapp.models.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

/**
 * A DTO for the {@link com.backend.footballapp.models.entities.Goal} entity
 */
@Data
@Builder
public class GoalDTO {
    private final Long id;
    private final Long playerId;
    private final Long matchId;
    private final Long teamId;
    private final Instant goalTime;
    private final Instant createdAt;
    private final Instant updatedAt;
}