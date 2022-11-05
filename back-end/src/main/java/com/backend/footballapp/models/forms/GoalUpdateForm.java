package com.backend.footballapp.models.forms;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
public class GoalUpdateForm {
    private Long player;
    private Long team;
    private Long match;
    private Instant goalTime;
}
