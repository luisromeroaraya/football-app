package com.backend.footballapp.models.dtos;

import com.backend.footballapp.enums.Country;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

/**
 * A DTO for the {@link com.backend.footballapp.models.entities.Team} entity
 */
@Data
@Builder
public class TeamDTO {
    private final Long id;
    private final String teamName;
    private final Country nationality;
    private final Instant createdAt;
    private final Long createdById;
    private final Set<Long> playerIds;
}