package com.example.ToDoJava.repositories;

import com.example.ToDoJava.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}