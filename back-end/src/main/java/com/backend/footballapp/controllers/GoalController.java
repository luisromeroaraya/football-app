package com.backend.footballapp.controllers;

import com.backend.footballapp.models.dtos.GoalDTO;
import com.backend.footballapp.models.forms.GoalCreateForm;
import com.backend.footballapp.models.forms.GoalUpdateForm;
import com.backend.footballapp.services.GoalService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/goal")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public GoalDTO create(@Valid @RequestBody GoalCreateForm goalCreateForm) {
        return goalService.create(goalCreateForm);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public List<GoalDTO> readAll() {
        return goalService.readAll();
    }

    @GetMapping("/all/{username:[A-Za-z]+}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public List<GoalDTO> readAllByUsername(@Valid @PathVariable String username) {
        return goalService.readAllByUsername(username);
    }

    @GetMapping("/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public GoalDTO readone(@PathVariable Long id) {
        return goalService.readOne(id);
    }

    @PatchMapping("/update/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public GoalDTO update(@Valid @PathVariable Long id, @Valid @RequestBody GoalUpdateForm goalUpdateForm) {
        return goalService.update(id, goalUpdateForm);
    }

    @DeleteMapping("/delete/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public void delete(@Valid @PathVariable Long id) {
        goalService.delete(id);
    }
}
