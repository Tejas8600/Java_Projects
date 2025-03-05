//The Repository Layer is responsible for database operations.

package com.workspace.smart.repository;

import com.workspace.smart.model.User;
import org.springframework.data.jpa.repository.JpaRepository; // simplifies database access with JpaRepository, so we don’t need to write SQL queries.
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> //Manages User entity with Long as the primary key.
{
    Optional<User> findByEmail(String email); //Fetches users by email.
//    Optional<User> findByUsername(String username); // Fetches users by username (Required for Spring Security)

}
