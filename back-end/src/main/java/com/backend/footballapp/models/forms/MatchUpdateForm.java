package com.backend.footballapp.models.forms;

import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class MatchUpdateForm {
    private Long teamA;
    private Long teamB;
    private Instant startTime;
    private Instant endTime;
    private String location;
    private Long organisedBy;
    private Set<Long> goals;
}
