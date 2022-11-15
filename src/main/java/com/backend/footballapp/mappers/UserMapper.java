package com.backend.footballapp.mappers;

import com.backend.footballapp.models.dtos.UserDTO;
import com.backend.footballapp.models.entities.Goal;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.UserCreateForm;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
    private final TeamMapper teamMapper;

    public UserMapper(TeamMapper teamMapper) {
        this.teamMapper = teamMapper;
    }

    public UserDTO toDto(User entity) {
        if (entity == null)
            return null;
        if (entity.getMainTeam() != null) {
            return UserDTO.builder()
                    .id(entity.getId())
                    .username(entity.getUsername())
                    .enabled(entity.isEnabled())
                    .role(entity.getRole())
                    .profile(entity.getProfile())
                    .mainTeam(teamMapper.toDto(entity.getMainTeam()))
                    .teams(entity.getTeams().stream().map(Team::getId).collect(Collectors.toSet()))
                    .goals(entity.getGoals().stream().map(Goal::getId).collect(Collectors.toSet()))
                    .goalsTotal(entity.getGoalsTotal())
                    .build();
        }
        else {
            return UserDTO.builder()
                    .id(entity.getId())
                    .username(entity.getUsername())
                    .enabled(entity.isEnabled())
                    .role(entity.getRole())
                    .profile(entity.getProfile())
                    .teams(entity.getTeams().stream().map(Team::getId).collect(Collectors.toSet()))
                    .goals(entity.getGoals().stream().map(Goal::getId).collect(Collectors.toSet()))
                    .goalsTotal(entity.getGoalsTotal())
                    .build();
        }
    }

    public User toEntity(UserCreateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        return user;
    }
}
