package com.backend.footballapp.models.entities;

import com.backend.footballapp.enums.Country;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.Instant;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = List.of("USER");
    @Embedded
    private Profile profile = new Profile();
    @CreationTimestamp
    private Instant createdAt;
    @ManyToOne
    @JoinColumn(name = "main_team_id")
    private Team mainTeam;
    @OneToMany(mappedBy = "createdBy")
    private Set<Team> teamsCreated = new HashSet<>();
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Team> teams = new HashSet<>();

    public User(String username, String password, boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public User(String username, String password, boolean enabled, List<String> roles) {
        this(username, password, enabled);
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map((role) -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
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
        return this.enabled;
    }
}
