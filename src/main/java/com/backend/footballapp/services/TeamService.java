package com.backend.footballapp.services;

import com.backend.footballapp.models.dtos.TeamDTO;
import com.backend.footballapp.models.forms.TeamCreateForm;
import com.backend.footballapp.models.forms.TeamUpdateForm;

import java.util.List;

public interface TeamService extends CrudService<TeamDTO, Long, TeamCreateForm, TeamUpdateForm> {
    List<TeamDTO> readAllByUserId(Long id);
}
