package com.backend.footballapp.services.implementation;

import com.backend.footballapp.mappers.UserMapper;
import com.backend.footballapp.models.dtos.UserDTO;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.models.forms.UserUpdateForm;
import com.backend.footballapp.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserMapper userMapper;

    public CustomUserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder encoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    public void addUser(UserCreateForm form) {
        User user = userMapper.toEntity(form);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public List<UserDTO> getAll() {
        return userRepository.getUsers().stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public UserDTO getOne(Long id) {
        return userMapper.toDto(userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found.")));
    }

    public UserDTO update(Long id, UserUpdateForm form) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
        if (form.getUsername() != null)
            user.setUsername(form.getUsername());
        if (form.getPassword() != null)
            user.setPassword(encoder.encode(form.getPassword()));
        if (!form.isEnabled() && user.isEnabled())
            user.setEnabled(false);
        if (form.getRoles() != null)
            user.setRoles(form.getRoles());
        if (form.getProfile() != null)
            user.setProfile(form.getProfile());
//        if (form.getMainTeam() != null)
//            user.setMainTeam(form.getMainTeam());
//        if (form.getTeamsCreated() != null)
//            user.setTeamsCreated(form.getTeamsCreated());
//        if (form.getTeams() != null)
//            user.setTeams(form.getTeams());
        userRepository.save(user);
        return userMapper.toDto(user);
    }
}