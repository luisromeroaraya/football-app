package com.backend.footballapp.tools;

import com.backend.footballapp.enums.Country;
import com.backend.footballapp.enums.Position;
import com.backend.footballapp.models.entities.Match;
import com.backend.footballapp.models.entities.Profile;
import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.repositories.MatchRepository;
import com.backend.footballapp.repositories.TeamRepository;
import com.backend.footballapp.repositories.UserRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Service
public class DataInit implements InitializingBean {
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public DataInit(UserRepository userRepository, TeamRepository teamRepository, MatchRepository matchRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    private final List<User> users = Arrays.asList(
            new User("admin", new BCryptPasswordEncoder().encode("password"), true, "ADMIN", new Profile("Administrator", "https://minimaltoolkit.com/images/randomdata/male/1.jpg", Position.GK, Country.BE, LocalDate.of(1980,1,1), "+32 123 456 789", "Cool guy")),
            new User("user", new BCryptPasswordEncoder().encode("password"), true, "ORGANISER", new Profile("User", "https://minimaltoolkit.com/images/randomdata/male/2.jpg", Position.CM, Country.BE, LocalDate.of(1998,1,1), "+32 123 456 789", "Great midfielder")),
            new User("fred", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Frederic", "https://minimaltoolkit.com/images/randomdata/male/3.jpg", Position.GK, Country.BE, LocalDate.of(1994,1,1), "+32 123 456 789", "Awesome goalie")),
            new User("remi", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Remi", "https://minimaltoolkit.com/images/randomdata/male/4.jpg", Position.CB, Country.BE, LocalDate.of(1988,1,1), "+32 123 456 789", "Nice defender")),
            new User("phil", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Phillipe", "https://minimaltoolkit.com/images/randomdata/male/5.jpg", Position.CDM, Country.BE, LocalDate.of(2000,1,1), "+32 123 456 789", "Very talented")),
            new User("luc", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Luc", "https://minimaltoolkit.com/images/randomdata/male/6.jpg", Position.CF, Country.BE, LocalDate.of(1986,1,1), "+32 123 456 789", "Excellent attacker")),
            new User("seba", new BCryptPasswordEncoder().encode("password"), true, "ORGANISER", new Profile("Sebastian", "https://minimaltoolkit.com/images/randomdata/male/7.jpg", Position.CAM, Country.CL, LocalDate.of(1998,1,1), "+32 123 456 789", "The soul of every team")),
            new User("marcelo", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Marcelo", "https://minimaltoolkit.com/images/randomdata/male/8.jpg", Position.LW, Country.CL, LocalDate.of(1981,1,1), "+32 123 456 789", "Not bad")),
            new User("pablo", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Pablo", "https://minimaltoolkit.com/images/randomdata/male/9.jpg", Position.CB, Country.CL, LocalDate.of(1990,1,1), "+32 123 456 789", "A wall")),
            new User("mauricio", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Mauricio", "https://minimaltoolkit.com/images/randomdata/male/10.jpg", Position.RWB, Country.CL, LocalDate.of(1995,1,1), "+32 123 456 789", "Incredible speed and energy")),
            new User("carlos", new BCryptPasswordEncoder().encode("password"), true, "USER", new Profile("Carlos", "https://minimaltoolkit.com/images/randomdata/male/11.jpg", Position.ST, Country.CL, LocalDate.of(1999,1,1), "+32 123 456 789", "Turns coal to gold"))
    );

    private final List<Team> teams = Arrays.asList(
            new Team("Belgium FC", Country.BE, users.get(1), Set.of(users.get(1), users.get(2), users.get(3), users.get(4), users.get(5))),
            new Team("Chile FC", Country.CL, users.get(6), Set.of(users.get(6), users.get(7), users.get(8), users.get(9), users.get(10)))
    );

    private final List<Match> matches = Arrays.asList(
            new Match(teams.get(0), teams.get(1), Instant.parse("2022-12-01T20:00:00Z"), Instant.parse("2022-12-01T21:00:00Z"), "FitFive Laeken", users.get(1))
    );

    @Override
    public void afterPropertiesSet() {
        userRepository.saveAll(users);
        teamRepository.saveAll(teams);
        matchRepository.saveAll(matches);
        Optional<Team> teamA = teamRepository.findById(1L);
        Optional<Team> teamB = teamRepository.findById(2L);
        Set<User> finalUsers = new HashSet<>();
        userRepository.findAll().forEach(finalUsers::add);
        finalUsers.forEach(user -> {
            if (user.getId() > 1 && user.getId() < 7)
                userRepository.updateMainTeamById(teamA, user.getId());
            if (user.getId() > 1 && user.getId() > 6)
                userRepository.updateMainTeamById(teamB, user.getId());
        });
    }
}
