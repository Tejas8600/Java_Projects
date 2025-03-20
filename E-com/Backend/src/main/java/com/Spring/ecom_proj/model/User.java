package com.Spring.ecom_proj.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String  password;

    @Column(nullable = false)
    private String role = "USER"; // Default value

    public void setRole(String role) {
        // Ensure only "USER" or "ADMIN" is stored in the DB (strip prefix)
        if (role.startsWith("ROLE_")) {
            role = role.substring(5); // Remove "ROLE_" prefix
        }
        this.role = role.toUpperCase(); //  Convert role to uppercase before saving

}
}
