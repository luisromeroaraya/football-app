package com.backend.footballapp.models.forms;

import com.backend.footballapp.enums.Country;
import com.backend.footballapp.models.entities.Profile;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UserUpdateForm {
    private String username;
    private String password;
    private boolean enabled;
    private List<String> roles;
    private Profile profile;
    private Long mainTeam;
    private Set<Long> teamsCreated;
    private Set<Long> teams;
}
