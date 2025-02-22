package com.taskmanager.task_management.service;

import com.taskmanager.task_management.model.Task;
import com.taskmanager.task_management.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service //Marks this class as a service layer.

public class TaskService {

    @Autowired //Spring Boot automatically injects an implementation of it at runtime.This is done using the @Autowired annotation

    private TaskRepository taskRepository;
    //This is an instance variable of type TaskRepository, which allows the TaskService class to use repository methods to interact with the database.

    List<Task> taskList = new ArrayList<>(); // Using List to store tasks temporarily


    //Get all tasks
    public List<Task> getAllTask() {
        return taskRepository.findAll();
    }

    // Create a new task
    public Task createTask(Task task) {
        taskList.add(task); // Adding to List before saving
        return taskRepository.save(task);
    }

    // Get unique categories using Set
    public Set<String> getUniqueCategories() {
        Set<String> uniqueCategories = new HashSet<>();
        for (Task task : taskList) {
            uniqueCategories.addAll(task.getCategories());
        }
        return uniqueCategories;
    }
        // Delete a task by ID
        public void deleteTask(Long id) {
            taskRepository.deleteById(id);

    }

    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id).map(task -> {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setDueDate(updatedTask.getDueDate());
            task.setCategories(updatedTask.getCategories());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));
    }

}
