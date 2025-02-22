package com.taskmanager.task_management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="tasks")
@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor

public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status;
    private Date dueDate;

    @ElementCollection
    private Set<String> categories = new HashSet<>();



    // Default Constructor
    public Task() {
    }

    // Parameterized Constructor
    public Task(String title, String description, String status, Date dueDate, Set<String> categories) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.categories = categories;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    //Even though Lombok’s @Getter should generate the method automatically, sometimes IDEs or the compiler do not detect it properly.
    //Adding this method manually ensures that your TaskService class can call task.getCategories() without any issues.
    public Set<String> getCategories() {
        return categories;

    }

    public void setCategories(Set<String> categories) {
        this.categories = categories;
    }
}

