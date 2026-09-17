package com.ada.removebg.repository;

import com.ada.removebg.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByClerkId(String clerkId);

    Optional<UserEntity> findByClerkId(String clerkId);
}
