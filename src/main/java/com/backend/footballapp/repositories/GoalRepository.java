package com.backend.footballapp.repositories;

import com.backend.footballapp.models.entities.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    @Query("select g from Goal g where upper(g.player.username) like upper(?1)")
    List<Goal> findAllByUsername(String username);

}
