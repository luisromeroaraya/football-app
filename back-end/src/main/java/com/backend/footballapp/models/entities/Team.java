package com.backend.footballapp.models.entities;

import com.backend.footballapp.enums.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "teams") // a table named "user" can't be created, you have to rename it "users" here
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String teamName;
    private Country nationality = Country.BE;
    @CreationTimestamp
    private Instant createdAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "teams_players",
            joinColumns = { @JoinColumn(name = "team_id") },
            inverseJoinColumns = { @JoinColumn(name = "player_id") }
    )
    private Set<User> players = new HashSet<>();

    public Team(String teamName, Country nationality, User createdBy, Set<User> players) {
        this.teamName = teamName;
        this.nationality = nationality;
        this.createdBy = createdBy;
        this.players = players;
    }
}