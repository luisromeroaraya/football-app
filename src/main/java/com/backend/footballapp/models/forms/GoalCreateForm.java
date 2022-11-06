package com.backend.footballapp.models.forms;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
public class GoalCreateForm {
    @NotNull
    private Long player;
    @NotNull
    private Long team;
    @NotNull
    private Long match;
    @NotNull
    private Instant goalTime;
}
