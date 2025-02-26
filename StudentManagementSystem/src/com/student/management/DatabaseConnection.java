package com.student.management;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/StudentDB"; // Database URL
    private static final String USER = "root"; // Your MySQL username
    private static final String PASSWORD = "Your Password"; // Your MySQL password

    public static Connection getConnection() {
        Connection conn = null;
        try {
            // Step 1: Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Step 2: Establish connection with MySQL
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✅ Connected to Database Successfully!");
        } catch (ClassNotFoundException e) {
            System.out.println("❌ MySQL Driver not found. Check if JAR is added.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("❌ Connection failed. Check MySQL details.");
            e.printStackTrace();
        }
        return conn;
    }
}