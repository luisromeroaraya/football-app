package com.backend.footballapp.models.dtos;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * A DTO for the {@link com.backend.footballapp.models.entities.User} entity
 */
@Data
@Builder
public class UserDTO {
    private final Long id;
    private final String username;
    private final boolean enabled;
    private final List<String> roles;
}