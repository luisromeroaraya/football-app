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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User player;
    @ManyToOne
    private Match match;
    @ManyToOne
    private Team team;
    private Instant goalTime;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;

}
