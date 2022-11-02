package com.backend.footballapp.models.forms;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
public class MatchCreateForm {
    @NotNull
    private Long teamA;
    @NotNull
    private Long teamB;
    @NotNull
    private Instant startTime;
    @NotNull
    private Instant endTime;
    @NotBlank
    private String location;
    @NotNull
    private Long organisedBy;
}
