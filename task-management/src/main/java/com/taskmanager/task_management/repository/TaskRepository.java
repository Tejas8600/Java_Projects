package com.taskmanager.task_management.repository;

import com.taskmanager.task_management.model.Task;
//Imports the Task entity so the repository can manage Task objects.

import org.springframework.data.jpa.repository.JpaRepository;
//JpaRepository is a built-in Spring Data JPA interface that provides CRUD operations (Create, Read, Update, Delete) for a specific entity.

import org.springframework.stereotype.Repository;
//Marks this interface as a Spring Bean so Spring Boot can automatically recognize and manage it.

@Repository //Indicates that this interface is a repository.

public interface TaskRepository extends JpaRepository<Task, Long> //This extends JpaRepository, inheriting all CRUD operations for the Task entity. Generic Parameters in JpaRepository<Task, Long>:
{

}
