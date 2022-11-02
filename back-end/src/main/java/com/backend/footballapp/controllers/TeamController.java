package com.backend.footballapp.controllers;

import com.backend.footballapp.models.dtos.TeamDTO;
import com.backend.footballapp.models.forms.TeamCreateForm;
import com.backend.footballapp.models.forms.TeamUpdateForm;
import com.backend.footballapp.services.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/team")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public TeamDTO create(@Valid @RequestBody TeamCreateForm teamCreateForm) {
        return teamService.create(teamCreateForm);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<TeamDTO> readAll() {
        return teamService.readAll();
    }

    @GetMapping("/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.OK)
    public TeamDTO readOne(@PathVariable Long id) {
        return teamService.readOne(id);
    }

    @PatchMapping("/update/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public TeamDTO update(@Valid @PathVariable Long id, @Valid @RequestBody TeamUpdateForm teamUpdateForm) {
        return teamService.update(id, teamUpdateForm);
    }

    @DeleteMapping("/delete/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public void delete(@Valid @PathVariable Long id) {
        teamService.delete(id);
    }
}
