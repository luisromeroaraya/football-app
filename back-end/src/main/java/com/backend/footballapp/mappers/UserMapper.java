package com.backend.footballapp.mappers;

import com.backend.footballapp.models.dtos.UserDTO;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.models.forms.UserUpdateForm;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserDTO toDto(User entity) {
        if (entity == null)
            return null;
        if (entity.getMainTeam() != null) {
            return UserDTO.builder()
                    .id(entity.getId())
                    .username(entity.getUsername())
                    .enabled(entity.isEnabled())
                    .roles(entity.getRoles())
                    .profile(entity.getProfile())
                    .mainTeam(entity.getMainTeam().getId())
                    .teamsCreated(entity.getTeamsCreated().stream().map(Team::getId).collect(Collectors.toSet()))
                    .teams(entity.getTeams().stream().map(Team::getId).collect(Collectors.toSet()))
                    .build();
        }
        else {
            return UserDTO.builder()
                    .id(entity.getId())
                    .username(entity.getUsername())
                    .enabled(entity.isEnabled())
                    .roles(entity.getRoles())
                    .profile(entity.getProfile())
                    .teamsCreated(entity.getTeamsCreated().stream().map(Team::getId).collect(Collectors.toSet()))
                    .teams(entity.getTeams().stream().map(Team::getId).collect(Collectors.toSet()))
                    .build();
        }

    }

    public User toEntity(UserCreateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        return user;
    }

    public User toEntity(UserUpdateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        user.setEnabled(form.isEnabled());
        user.setRoles(form.getRoles());
//        user.setTeamsCreated(form.getTeamsCreated());
//        user.setTeams(form.getTeams());
        return user;
    }
}
