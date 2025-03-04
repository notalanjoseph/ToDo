package com.example.ToDoJava.repositories;

import com.example.ToDoJava.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}