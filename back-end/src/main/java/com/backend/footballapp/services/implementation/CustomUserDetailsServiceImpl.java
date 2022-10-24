package com.backend.footballapp.services.implementation;

import com.backend.footballapp.mappers.UserMapper;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserMapper mapper;

    public CustomUserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder encoder, UserMapper mapper) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.mapper = mapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Connection not possible."));
    }

    public void addUser(UserCreateForm form) {
        User user = mapper.toEntity(form);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}