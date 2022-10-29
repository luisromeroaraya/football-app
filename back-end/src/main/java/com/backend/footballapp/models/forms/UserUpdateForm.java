package com.backend.footballapp.models.forms;

import com.backend.footballapp.models.entities.Profile;
import lombok.Data;

import java.util.Set;

@Data
public class UserUpdateForm {
    private String username;
    private String password;
    private boolean enabled;
    private String role;
    private Profile profile;
    private Long mainTeam;
    private Set<Long> teamsCreated;
    private Set<Long> teams;
}
