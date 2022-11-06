package com.backend.footballapp.models.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "users") // a table named "user" can't be created, you have to rename it "users" here
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    private boolean enabled = true;
    private String role = "USER";
    @Embedded
    private Profile profile = new Profile();
    @CreationTimestamp
    private Instant createdAt;
    @ManyToOne
    @JoinColumn(name = "main_team_id")
    private Team mainTeam;
    @ManyToMany(mappedBy = "players", fetch = FetchType.LAZY)
    private Set<Team> teams = new HashSet<>();
    @OneToMany(mappedBy = "createdBy", fetch = FetchType.LAZY)
    private Set<Team> teamsCreated = new HashSet<>();
    @OneToMany(mappedBy = "player", fetch = FetchType.LAZY)
    private Set<Goal> goals = new HashSet<>();

    public User(String username, String password, boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public User(String username, String password, boolean enabled, String role) {
        this(username, password, enabled);
        this.role = role;
    }

    public User(String username, String password, boolean enabled, String role, Profile profile) {
        this(username, password, enabled, role);
        this.profile = profile;
    }

    public User(String username, String password, boolean enabled, String role, Profile profile, Team mainTeam) {
        this(username, password, enabled, role, profile);
        this.mainTeam = mainTeam;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role));
    }

    @Override
    public boolean isAccountNonExpired() {
        return isEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isEnabled();
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public Long getGoalsTotal() {
        return (long) goals.size();
    }
}
