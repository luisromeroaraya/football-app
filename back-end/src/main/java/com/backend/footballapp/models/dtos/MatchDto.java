package com.backend.footballapp.models.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

/**
 * A DTO for the {@link com.backend.footballapp.models.entities.Match} entity
 */
@Data
@Builder
public class MatchDTO {
    private final Long id;
    private final Long teamA;
    private final Long teamB;
    private final Instant startTime;
    private final Instant endTime;
    private final String location;
    private final Instant createdAt;
    private final Instant updatedAt;
    private final Long organisedBy;
    private final Set<Long> goals;
}