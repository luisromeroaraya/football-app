package com.backend.footballapp.tools;

import com.backend.footballapp.enums.Country;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.repositories.UserRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class DataInit implements InitializingBean {
    private final UserRepository userRepository;

    public DataInit(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private List<User> users = Arrays.asList(
            new User("user", new BCryptPasswordEncoder().encode("password"), true, List.of("USER")),
            new User("admin", new BCryptPasswordEncoder().encode("password"), true, List.of("ADMIN"))
    );

    @Override
    public void afterPropertiesSet() throws Exception {
        userRepository.saveAll(users);
    }
}
