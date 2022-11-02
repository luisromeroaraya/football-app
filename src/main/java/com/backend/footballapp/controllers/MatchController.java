package com.backend.footballapp.controllers;

import com.backend.footballapp.models.dtos.MatchDTO;
import com.backend.footballapp.models.forms.MatchCreateForm;
import com.backend.footballapp.models.forms.MatchUpdateForm;
import com.backend.footballapp.services.MatchService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/match")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public MatchDTO create(@Valid @RequestBody MatchCreateForm matchCreateForm) {
        return matchService.create(matchCreateForm);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<MatchDTO> readAll() {
        return matchService.readAll();
    }

    @GetMapping("/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.OK)
    public MatchDTO readOne(@PathVariable Long id) {
        return matchService.readOne(id);
    }

    @PatchMapping("/update/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public MatchDTO update(@Valid @PathVariable Long id, @Valid @RequestBody MatchUpdateForm matchUpdateForm) {
        return matchService.update(id, matchUpdateForm);
    }

    @DeleteMapping("/delete/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public void delete(@Valid @PathVariable Long id) {
        matchService.delete(id);
    }
}
