package com.backend.footballapp.models.forms;

import com.backend.footballapp.enums.Country;
import lombok.Data;

import java.util.Set;

@Data
public class TeamUpdateForm {
    private String teamName;
    private Country nationality;
    private Long createdBy;
    private Set<Long> players;
}
