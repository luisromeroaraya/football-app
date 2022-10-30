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
    private final Long teamAId;
    private final Long teamBId;
    private final Integer teamAScore;
    private final Integer teamBScore;
    private final Integer playersNumber;
    private final Instant matchDate;
    private final String matchResult;
    private final Instant startTime;
    private final Instant endTime;
    private final String location;
    private final Instant createdAt;
    private final Instant updatedAt;
    private final Long organisedById;
    private final Set<Long> playerIds;
    private final Set<Long> goalIds;
}