package com.backend.footballapp.repositories;

import com.backend.footballapp.models.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query("select t from Team t inner join t.players players where players.id = ?1")
    List<Team> findAllByUserId(Long id);

}
