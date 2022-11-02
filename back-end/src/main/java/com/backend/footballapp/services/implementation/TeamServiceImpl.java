package com.backend.footballapp.services.implementation;

import com.backend.footballapp.exceptions.CannotEditException;
import com.backend.footballapp.exceptions.ElementNotFoundException;
import com.backend.footballapp.mappers.TeamMapper;
import com.backend.footballapp.models.dtos.TeamDTO;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.TeamCreateForm;
import com.backend.footballapp.models.forms.TeamUpdateForm;
import com.backend.footballapp.repositories.TeamRepository;
import com.backend.footballapp.repositories.UserRepository;
import com.backend.footballapp.services.TeamService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final UserRepository userRepository;

    public TeamServiceImpl(TeamRepository teamRepository, TeamMapper teamMapper, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.teamMapper = teamMapper;
        this.userRepository = userRepository;
    }

    @Override
    public TeamDTO create(TeamCreateForm teamCreateForm) {
        Team team = teamMapper.toEntity(teamCreateForm);
        team.setCreatedBy(userRepository.findById(teamCreateForm.getCreatedBy())
                .orElseThrow(() -> new ElementNotFoundException(User.class, teamCreateForm.getCreatedBy())));
        Set<User> players = new HashSet<>();
        userRepository.findAllById(teamCreateForm.getPlayers()).forEach(players::add);
        team.setPlayers(players);
        team = teamRepository.save(team);
        return teamMapper.toDto(team);
    }

    @Override
    public List<TeamDTO> readAll() {
        return teamRepository.findAll().stream()
                .map(teamMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TeamDTO readOne(Long id) {
        return teamRepository.findById(id)
                .map(teamMapper::toDto)
                .orElseThrow(() -> new ElementNotFoundException(Team.class, id));
    }

    @Override
    public TeamDTO update(Long id, TeamUpdateForm teamUpdateForm) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Team.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = team.getCreatedBy().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new CannotEditException(Team.class, team.getTeamName(), authentication.getName());
        if (teamUpdateForm.getTeamName() != null)
            team.setTeamName(teamUpdateForm.getTeamName());
        if (teamUpdateForm.getNationality() != null)
            team.setNationality(teamUpdateForm.getNationality());
        if (teamUpdateForm.getCreatedBy() != null)
            team.setCreatedBy(userRepository.findById(teamUpdateForm.getCreatedBy())
                    .orElseThrow(() -> new ElementNotFoundException(User.class, teamUpdateForm.getCreatedBy())));
        if (teamUpdateForm.getPlayers() != null) {
            Set<User> players = new HashSet<>();
            userRepository.findAllById(teamUpdateForm.getPlayers()).forEach(players::add);
            team.setPlayers(players);
        }
        team = teamRepository.save(team);
        return teamMapper.toDto(team);
    }

    @Override
    public void delete(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Team.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = team.getCreatedBy().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new CannotEditException(Team.class, team.getId(), authentication.getName());
        teamRepository.delete(team);
    }
}
