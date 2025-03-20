package com.Spring.ecom_proj.controller;

public class LoginRequest {
    private String email;
    private String password;
    private String role; // ✅ Added role field

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private String adminKey; // ✅ Added admin key field

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdminKey() {
        return adminKey;
    }

    public void setAdminKey(String adminKey) {
        this.adminKey = adminKey;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}