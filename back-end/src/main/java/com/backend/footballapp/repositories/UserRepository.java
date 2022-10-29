package com.backend.footballapp.repositories;

import com.backend.footballapp.models.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query("select u from User u where u.username = ?1")
    Optional<User> findByUsername(String username);

    @Query("select u from User u")
    List<User> getUsers();


}
