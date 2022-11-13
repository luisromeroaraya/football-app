package com.backend.footballapp.models.dtos;

import com.backend.footballapp.models.entities.Goal;
import com.backend.footballapp.models.entities.Profile;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

/**
 * A DTO for the {@link com.backend.footballapp.models.entities.User} entity
 */
@Data
@Builder
public class UserDTO {
    private final Long id;
    private final String username;
    private final boolean enabled;
    private final String role;
    private Profile profile;
    private TeamDTO mainTeam;
    private Set<Long> teams;
    private Set<Long> goals;
    private Long goalsTotal;
}