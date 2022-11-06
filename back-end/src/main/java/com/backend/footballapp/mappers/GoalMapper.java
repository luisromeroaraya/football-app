package com.backend.footballapp.mappers;

import com.backend.footballapp.models.dtos.GoalDTO;
import com.backend.footballapp.models.entities.Goal;
import com.backend.footballapp.models.forms.GoalCreateForm;
import org.springframework.stereotype.Component;

@Component
public class GoalMapper {
    public GoalDTO toDto(Goal entity) {
        if (entity == null)
            return null;
        return GoalDTO.builder()
                .id(entity.getId())
                .player(entity.getPlayer().getId())
                .team(entity.getTeam().getId())
                .match(entity.getMatch().getId())
                .goalTime(entity.getGoalTime())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public Goal toEntity(GoalCreateForm form) {
        Goal goal = new Goal();
        goal.setGoalTime(form.getGoalTime());
        return goal;
    }
}
