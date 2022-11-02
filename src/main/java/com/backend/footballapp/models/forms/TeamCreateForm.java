package com.backend.footballapp.models.forms;

import com.backend.footballapp.enums.Country;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class TeamCreateForm {
    @NotBlank
    private String teamName;
    @NotNull
    private Country nationality;
    @NotNull
    private Long createdBy;
    private Set<Long> players;
}
