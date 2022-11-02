package com.backend.footballapp.mappers;

import com.backend.footballapp.models.dtos.MatchDTO;
import com.backend.footballapp.models.entities.Goal;
import com.backend.footballapp.models.entities.Match;
import com.backend.footballapp.models.forms.MatchCreateForm;
import com.backend.footballapp.repositories.TeamRepository;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MatchMapper {
    private final TeamRepository teamRepository;

    public MatchMapper(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public MatchDTO toDto(Match entity) {
        if (entity == null)
            return null;
        return MatchDTO.builder()
                .id(entity.getId())
                .teamA(entity.getTeamA().getId())
                .teamB(entity.getTeamB().getId())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .location(entity.getLocation())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .organisedBy(entity.getOrganisedBy().getId())
                .goals(entity.getGoals().stream().map(Goal::getId).collect(Collectors.toSet()))
                .build();
    }

    public Match toEntity(MatchCreateForm form) {
        Match match = new Match();
        match.setStartTime(form.getStartTime());
        match.setEndTime(form.getEndTime());
        match.setLocation(form.getLocation());
        return match;
    }
}
