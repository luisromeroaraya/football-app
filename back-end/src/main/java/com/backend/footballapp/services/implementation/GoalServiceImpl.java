package com.backend.footballapp.services.implementation;

import com.backend.footballapp.exceptions.ElementNotFoundException;
import com.backend.footballapp.mappers.GoalMapper;
import com.backend.footballapp.models.dtos.GoalDTO;
import com.backend.footballapp.models.entities.Goal;
import com.backend.footballapp.models.entities.Match;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.GoalCreateForm;
import com.backend.footballapp.models.forms.GoalUpdateForm;
import com.backend.footballapp.repositories.GoalRepository;
import com.backend.footballapp.repositories.MatchRepository;
import com.backend.footballapp.repositories.TeamRepository;
import com.backend.footballapp.repositories.UserRepository;
import com.backend.footballapp.services.GoalService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoalServiceImpl implements GoalService {
    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public GoalServiceImpl(GoalRepository goalRepository, GoalMapper goalMapper, UserRepository userRepository, TeamRepository teamRepository, MatchRepository matchRepository) {
        this.goalRepository = goalRepository;
        this.goalMapper = goalMapper;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    public GoalDTO create(GoalCreateForm goalCreateForm) {
        Goal goal = goalMapper.toEntity(goalCreateForm);
        goal.setPlayer(userRepository.findById(goalCreateForm.getPlayer())
                .orElseThrow(() -> new ElementNotFoundException(User.class, goalCreateForm.getPlayer())));
        goal.setTeam(teamRepository.findById(goalCreateForm.getTeam())
                .orElseThrow(() -> new ElementNotFoundException(Team.class, goalCreateForm.getTeam())));
        goal.setMatch(matchRepository.findById(goalCreateForm.getMatch())
                .orElseThrow(() -> new ElementNotFoundException(Match.class, goalCreateForm.getMatch())));
        goal = goalRepository.save(goal);
        return goalMapper.toDto(goal);
    }

    @Override
    public List<GoalDTO> readAll() {
        return goalRepository.findAll().stream()
                .map(goalMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<GoalDTO> readAllByUsername(String username) {
        return goalRepository.findAllByUsername(username).stream()
                .map(goalMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public GoalDTO readOne(Long id) {
        return goalRepository.findById(id)
                .map(goalMapper::toDto)
                .orElseThrow(() -> new ElementNotFoundException(Goal.class, id));
    }

    @Override
    public GoalDTO update(Long id, GoalUpdateForm goalUpdateForm) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Goal.class, id));
        if (goalUpdateForm.getPlayer() != null)
            goal.setPlayer(userRepository.findById(goalUpdateForm.getPlayer())
                    .orElseThrow(() -> new ElementNotFoundException(User.class, goalUpdateForm.getPlayer())));
        if (goalUpdateForm.getTeam() != null)
            goal.setTeam(teamRepository.findById(goalUpdateForm.getTeam())
                    .orElseThrow(() -> new ElementNotFoundException(Team.class, goalUpdateForm.getTeam())));
        if (goalUpdateForm.getMatch() != null)
            goal.setMatch(matchRepository.findById(goalUpdateForm.getMatch())
                    .orElseThrow(() -> new ElementNotFoundException(Match.class, goalUpdateForm.getMatch())));
        if (goalUpdateForm.getGoalTime() != null)
            goal.setGoalTime(goalUpdateForm.getGoalTime());
        goal = goalRepository.save(goal);
        return goalMapper.toDto(goal);
    }

    @Override
    public void delete(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Goal.class, id));
        goalRepository.delete(goal);
    }
}
