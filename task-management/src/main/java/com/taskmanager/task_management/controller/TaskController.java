package com.taskmanager.task_management.controller;

import com.taskmanager.task_management.model.Task;
import com.taskmanager.task_management.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController //Marks this class as a REST API controller.
@RequestMapping("/tasks") //Base URL for all task-related operations.

public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() //Calls taskService.getAllTasks() to fetch all tasks from the database.
    {
        return taskService.getAllTask(); //Returns a list of tasks.
    }

    @PostMapping
    public Task createTask(@RequestBody Task task ) //Accepts a JSON request body containing task details.Calls taskService.createTask(task) to save the task in the database.
    {
        return taskService.createTask(task); //Returns the created task.
    }

    @GetMapping("/categories")
    public Set<String> getUniqueCategories() //Calls taskService.getUniqueCategories() to get unique categories from all tasks.
    {
        return taskService.getUniqueCategories(); //Returns a set of unique category names.
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){
        taskService.deleteTask(id); //Calls taskService.deleteTask(id) to delete the task with the given id.
        return "Task Successfully Deleted"; //Returns a confirmation message.
    }


}
