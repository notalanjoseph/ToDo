package com.example.ToDoJava.repositories;

import com.example.ToDoJava.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}