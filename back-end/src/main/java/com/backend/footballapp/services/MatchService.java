package com.backend.footballapp.services;

import com.backend.footballapp.models.dtos.MatchDTO;
import com.backend.footballapp.models.forms.MatchCreateForm;
import com.backend.footballapp.models.forms.MatchUpdateForm;

public interface MatchService extends CrudService<MatchDTO, Long, MatchCreateForm, MatchUpdateForm> {
}
