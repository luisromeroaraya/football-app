package com.backend.footballapp.mappers;

import com.backend.footballapp.models.dtos.TeamDTO;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.TeamCreateForm;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TeamMapper {
    public TeamDTO toDto(Team entity) {
        if (entity == null)
            return null;
        return TeamDTO.builder()
                .id(entity.getId())
                .teamName(entity.getTeamName())
                .logo(entity.getLogo())
                .nationality(entity.getNationality())
                .createdAt(entity.getCreatedAt())
                .createdBy(entity.getCreatedBy().getId())
                .players(entity.getPlayers().stream().map(User::getId).collect(Collectors.toSet()))
                .build();
    }

    public Team toEntity(TeamCreateForm form) {
        Team team = new Team();
        team.setTeamName(form.getTeamName());
        team.setNationality(form.getNationality());
        return team;
    }
}
