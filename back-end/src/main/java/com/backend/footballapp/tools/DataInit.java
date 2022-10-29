package com.backend.footballapp.tools;

import com.backend.footballapp.enums.Country;
import com.backend.footballapp.models.entities.Profile;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.repositories.TeamRepository;
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
    private final TeamRepository teamRepository;

    public DataInit(UserRepository userRepository, TeamRepository teamRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }

    private final List<User> users = Arrays.asList(
            new User("admin", new BCryptPasswordEncoder().encode("password"), true, "ADMIN", new Profile("+32 123 456 789", Country.BE, "https://minimaltoolkit.com/images/randomdata/male/1.jpg")),
            new User("user", new BCryptPasswordEncoder().encode("password"), true, "ORGANISER", new Profile("+32 123 456 789", Country.BE, "https://minimaltoolkit.com/images/randomdata/male/2.jpg")),
            new User("fred", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.BE, "https://minimaltoolkit.com/images/randomdata/male/3.jpg")),
            new User("remi", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.BE, "https://minimaltoolkit.com/images/randomdata/male/4.jpg")),
            new User("phillipe", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.BE, "https://minimaltoolkit.com/images/randomdata/male/5.jpg")),
            new User("luc", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.BE, "https://minimaltoolkit.com/images/randomdata/male/6.jpg")),
            new User("seba", new BCryptPasswordEncoder().encode("password"), true, "ORGANISER", new Profile("+32 123 456 789", Country.CL, "https://minimaltoolkit.com/images/randomdata/male/7.jpg")),
            new User("marcelo", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.CL, "https://minimaltoolkit.com/images/randomdata/male/8.jpg")),
            new User("pablo", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.CL, "https://minimaltoolkit.com/images/randomdata/male/9.jpg")),
            new User("mauricio", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.CL, "https://minimaltoolkit.com/images/randomdata/male/10.jpg")),
            new User("carlos", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("+32 123 456 789", Country.CL, "https://minimaltoolkit.com/images/randomdata/male/11.jpg"))
    );

    private final List<Team> teams = Arrays.asList(
            new Team("Belgium FC", Country.BE, users.get(1), Set.of(users.get(1), users.get(2), users.get(3), users.get(4), users.get(5))),
            new Team("Chile FC", Country.CL, users.get(6), Set.of(users.get(6), users.get(7), users.get(8), users.get(9), users.get(10)))
    );

    @Override
    public void afterPropertiesSet() {
        userRepository.saveAll(users);
        teamRepository.saveAll(teams);
    }
}
