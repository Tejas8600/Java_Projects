package com.workspace.smart.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // marks the class as a database table.
@Table(name = "users") // sets the table name.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id //make id the primary key and auto-generate its values.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) // @Column ensures data constraints (e.g., nullable = false prevents empty values).
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Enumerated //is used for the Role enum, storing values as strings in the database.
            (EnumType.STRING)
    private Role role; // ADMIN, EMPLOYEE

}

enum Role {
    ADMIN,
    EMPLOYEE
}
