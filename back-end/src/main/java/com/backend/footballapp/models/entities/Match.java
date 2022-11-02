package com.backend.footballapp.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "matches") // a table named "user" can't be created, you have to rename it "users" here
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Team teamA;
    @OneToOne
    private Team teamB;
    private Instant startTime;
    private Instant endTime;
    private String location;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User organisedBy;
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Goal> goals = new HashSet<>();

    public Match(Team teamA, Team teamB, Instant startTime, Instant endTime, String location, User organisedBy) {
        this.teamA = teamA;
        this.teamB = teamB;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.organisedBy = organisedBy;
    }
}
