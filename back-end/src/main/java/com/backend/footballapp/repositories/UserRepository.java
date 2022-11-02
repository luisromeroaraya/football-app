package com.backend.footballapp.repositories;

import com.backend.footballapp.models.entities.Team;
import com.backend.footballapp.models.entities.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query("select u from User u where u.username = ?1")
    Optional<User> findByUsername(String username);

    @Query("select u from User u")
    List<User> readAll();

    @Transactional
    @Modifying
    @Query("update User u set u.mainTeam = ?1 where u.id = ?2")
    void updateMainTeamById(Optional<Team> mainTeam, Long id);


}
