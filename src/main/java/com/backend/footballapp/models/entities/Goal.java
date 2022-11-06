package com.backend.footballapp.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "goals") // a table named "user" can't be created, you have to rename it "users" here
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User player;
    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;
    @ManyToOne
    @JoinColumn(name="match_id")
    private Match match;
    private Instant goalTime;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;

    public Goal(User player, Team team, Match match, Instant goalTime) {
        this.player = player;
        this.team = team;
        this.match = match;
        this.goalTime = goalTime;
    }
}
