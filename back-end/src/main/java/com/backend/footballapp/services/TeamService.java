package com.backend.footballapp.services;

import com.backend.footballapp.models.dtos.TeamDTO;
import com.backend.footballapp.models.forms.TeamCreateForm;
import com.backend.footballapp.models.forms.TeamUpdateForm;

public interface TeamService extends CrudService<TeamDTO, Long, TeamCreateForm, TeamUpdateForm> {
}
