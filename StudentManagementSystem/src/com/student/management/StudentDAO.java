package com.student.management;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
    private Connection connection; // Variable

    // Constructor to initialize DB connection
    public StudentDAO (Connection connection){
        this.connection=connection;
    }

    // CREATE (Insert Student)
    public void addStudent(Student student) throws SQLException {
        String query = "INSERT INTO students (id, name, age, grade) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(query)) {
            pstmt.setInt(1, student.getId());
            pstmt.setString(2, student.getName());
            pstmt.setInt(3, student.getAge());
            pstmt.setString(4, student.getGrade());
            pstmt.executeUpdate();
            System.out.println("Student added successfully!");
        }
    }


    // READ (Fetch All Students)
    public List<Student> getAllStudents() throws SQLException {
        List<Student> students = new ArrayList<>();
        String query = "SELECT * FROM students";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                students.add(new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getInt("age"),
                        rs.getString("grade")
                ));
            }
        }
        return students;
    }


    // UPDATE (Modify Student Record)
    public void updateStudent(Student student) throws SQLException {
        String query = "UPDATE students SET name=?, age=?, grade=? WHERE id=?";
        try (PreparedStatement pstmt = connection.prepareStatement(query)) {
            pstmt.setString(1, student.getName());
            pstmt.setInt(2, student.getAge());
            pstmt.setString(3, student.getGrade());
            pstmt.setInt(4, student.getId());
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student updated successfully!");
            } else {
                System.out.println("Student not found!");
            }
        }
    }


    // DELETE (Remove Student)
    public void deleteStudent(int id) throws SQLException {
        String query = "DELETE FROM students WHERE id=?";
        try (PreparedStatement pstmt = connection.prepareStatement(query)) {
            pstmt.setInt(1, id);
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Student deleted successfully!");
            } else {
                System.out.println("Student not found!");
            }
        }
    }
}
