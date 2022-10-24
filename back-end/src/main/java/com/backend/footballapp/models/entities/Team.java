package com.backend.footballapp.models.entities;

import com.backend.footballapp.enums.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "teams") // a table named "user" can't be created, you have to rename it "users" here
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String teamName;
    private Country nationality;
    private boolean isDefault = false;
    @CreationTimestamp
    private Instant createdAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    @ManyToMany
    private Set<User> players;
}