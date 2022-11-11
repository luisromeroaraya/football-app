package com.backend.footballapp.services;

import com.backend.footballapp.models.dtos.GoalDTO;
import com.backend.footballapp.models.forms.GoalCreateForm;
import com.backend.footballapp.models.forms.GoalUpdateForm;

import java.util.List;

public interface GoalService extends CrudService<GoalDTO, Long, GoalCreateForm, GoalUpdateForm> {
    List<GoalDTO> readAllByUsername(String username);
}
