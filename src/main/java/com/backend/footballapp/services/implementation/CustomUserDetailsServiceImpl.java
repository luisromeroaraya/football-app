package com.backend.footballapp.services.implementation;

import com.backend.footballapp.exceptions.AlreadyExistsException;
import com.backend.footballapp.exceptions.CannotDeleteAdminException;
import com.backend.footballapp.exceptions.CannotEditException;
import com.backend.footballapp.exceptions.ElementNotFoundException;
import com.backend.footballapp.mappers.UserMapper;
import com.backend.footballapp.models.dtos.UserDTO;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.models.forms.UserUpdateForm;
import com.backend.footballapp.repositories.TeamRepository;
import com.backend.footballapp.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;
    private final TeamRepository teamRepository;

    public CustomUserDetailsServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder encoder, TeamRepository teamRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.encoder = encoder;
        this.teamRepository = teamRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ElementNotFoundException(User.class, username));
    }

    public void createUser(UserCreateForm form) {
        boolean userAlreadyExists = userRepository.findByUsername(form.getUsername()).isPresent();
        if (userAlreadyExists)
            throw new AlreadyExistsException("mail", form.getUsername());
        User user = userMapper.toEntity(form);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public List<UserDTO> readAll() {
        return userRepository.readAll().stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<UserDTO> readAllByTeamId(Long id) {
        return userRepository.readAllByTeamId(id).stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public UserDTO readOne(Long id) {
        return userMapper.toDto(userRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(User.class, id)));
    }

    public UserDTO readProfile(String username) {
        return userMapper.toDto(userRepository.findByUsername(username)
                .orElseThrow(() -> new ElementNotFoundException(User.class, username)));
    }

    public UserDTO update(Long id, UserUpdateForm form) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(User.class, id));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        boolean isOwner = user.getUsername().equals(authentication.getName());
        if (!isAdmin && !isOwner)
            throw new CannotEditException(User.class, user.getUsername(), authentication.getName());
        if (form.getUsername() != null)
            user.setUsername(form.getUsername());
        if (form.getPassword() != null)
            user.setPassword(encoder.encode(form.getPassword()));
        if (!form.isEnabled() && user.isEnabled())
            user.setEnabled(false);
        if (form.getRole() != null)
            user.setRole(form.getRole());
        if (form.getProfile() != null)
            user.setProfile(form.getProfile());
        if (form.getMainTeam() != null)
            user.setMainTeam(teamRepository.findById(form.getMainTeam())
                    .orElseThrow(() -> new ElementNotFoundException(Team.class, form.getMainTeam())));
        if (form.getTeamsCreated() != null) {
            Set<Team> teamsCreated = new HashSet<>();
            teamRepository.findAllById(form.getTeamsCreated()).forEach(teamsCreated::add);
            user.setTeamsCreated(teamsCreated);
        }
        if (form.getTeams() != null) {
            Set<Team> teams = new HashSet<>();
            teamRepository.findAllById(form.getTeams()).forEach(teams::add);
            user.setTeamsCreated(teams);
        }
        try {
            userRepository.save(user);
        }
        catch(Exception exception) {
            throw new AlreadyExistsException(form.getUsername(), "username");
        }
        return userMapper.toDto(user);
    }

    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ElementNotFoundException(User.class, id));
        boolean isAdmin = user.getAuthorities().stream().anyMatch(e -> e.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin)
            throw new CannotDeleteAdminException(User.class, id);
        userRepository.delete(user);
    }
}