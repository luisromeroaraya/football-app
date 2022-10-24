package com.backend.footballapp.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "matches") // a table named "user" can't be created, you have to rename it "users" here
@Getter
@Setter
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
    private Integer teamAScore = 0;
    private Integer teamBScore = 0;
    private Integer playersNumber = 0;
    private Instant matchDate;
    private String matchResult = "draw";
    private Instant startTime;
    private Instant endTime;
    private String location;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    @ManyToOne
    private User organisedBy;
    @OneToMany
    private Set<User> players;
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Goal> goals;
}
