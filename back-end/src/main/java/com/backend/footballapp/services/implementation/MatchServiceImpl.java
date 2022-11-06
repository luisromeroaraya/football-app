package com.backend.footballapp.services.implementation;

import com.backend.footballapp.exceptions.CannotEditException;
import com.backend.footballapp.exceptions.ElementNotFoundException;
import com.backend.footballapp.mappers.MatchMapper;
import com.backend.footballapp.models.dtos.MatchDTO;
import com.backend.footballapp.models.entities.Match;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.MatchCreateForm;
import com.backend.footballapp.models.forms.MatchUpdateForm;
import com.backend.footballapp.repositories.MatchRepository;
import com.backend.footballapp.repositories.TeamRepository;
import com.backend.footballapp.repositories.UserRepository;
import com.backend.footballapp.services.MatchService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchServiceImpl implements MatchService {
    private final MatchRepository matchRepository;
    private final MatchMapper matchMapper;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    public MatchServiceImpl(MatchRepository matchRepository, MatchMapper matchMapper, UserRepository userRepository, TeamRepository teamRepository) {
        this.matchRepository = matchRepository;
        this.matchMapper = matchMapper;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public MatchDTO create(MatchCreateForm matchCreateForm) {
        Match match = matchMapper.toEntity(matchCreateForm);
        match.setOrganisedBy(userRepository.findById(matchCreateForm.getOrganisedBy())
                .orElseThrow(() -> new ElementNotFoundException(User.class, matchCreateForm.getOrganisedBy())));
        match.setTeamA(teamRepository.findById(matchCreateForm.getTeamA())
                .orElseThrow(() -> new ElementNotFoundException(Team.class, matchCreateForm.getTeamA())));
        match.setTeamB(teamRepository.findById(matchCreateForm.getTeamB())
                .orElseThrow(() -> new ElementNotFoundException(Team.class, matchCreateForm.getTeamB())));
        match = matchRepository.save(match);
        return matchMapper.toDto(match);
    }

    @Override
    public List<MatchDTO> readAll() {
        return matchRepository.findAll().stream()
                .map(matchMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MatchDTO readOne(Long id) {
        return matchRepository.findById(id)
                .map(matchMapper::toDto)
                .orElseThrow(() -> new ElementNotFoundException(Match.class, id));
    }

    @Override
    public MatchDTO update(Long id, MatchUpdateForm matchUpdateForm) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Match.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = match.getOrganisedBy().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new CannotEditException(Match.class, match.getId(), authentication.getName());
        if (matchUpdateForm.getTeamA() != null)
            match.setTeamA(teamRepository.findById(matchUpdateForm.getTeamA())
                    .orElseThrow(() -> new ElementNotFoundException(Team.class, matchUpdateForm.getTeamA())));
        if (matchUpdateForm.getTeamB() != null)
            match.setTeamB(teamRepository.findById(matchUpdateForm.getTeamB())
                    .orElseThrow(() -> new ElementNotFoundException(Team.class, matchUpdateForm.getTeamB())));
        if (matchUpdateForm.getStartTime() != null)
            match.setStartTime(matchUpdateForm.getStartTime());
        if (matchUpdateForm.getEndTime() != null)
            match.setEndTime(matchUpdateForm.getEndTime());
        if (matchUpdateForm.getLocation() != null)
            match.setLocation(matchUpdateForm.getLocation());
        if (matchUpdateForm.getOrganisedBy() != null)
            match.setOrganisedBy(userRepository.findById(matchUpdateForm.getOrganisedBy())
                    .orElseThrow(() -> new ElementNotFoundException(User.class, matchUpdateForm.getOrganisedBy())));
//        if (matchUpdateForm.getGoals() != null) {
//            Set<Goal> goals = new HashSet<>();
//            goalRepository.findAllById(matchUpdateForm.getGoals()).forEach(goals::add);
//            match.setGoals(goals);
//        }
        match = matchRepository.save(match);
        return matchMapper.toDto(match);
    }

    @Override
    public void delete(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(Match.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = match.getOrganisedBy().getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new CannotEditException(Match.class, match.getId(), authentication.getName());
        matchRepository.delete(match);
    }
}
