package com.student.management;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try (Connection connection = DatabaseConnection.getConnection();
             Scanner scanner = new Scanner(System.in)) {

            StudentDAO studentDAO = new StudentDAO(connection);

            while (true) {
                System.out.println("\n===== Student Management System =====");
                System.out.println("1. Add Student");
                System.out.println("2. View All Students");
                System.out.println("3. Update Student");
                System.out.println("4. Delete Student");
                System.out.println("5. Exit");
                System.out.print("Enter choice: ");
                int choice = scanner.nextInt();

                switch (choice) {
                    case 1:
                        System.out.print("Enter Student ID: ");
                        int id = scanner.nextInt();
                        scanner.nextLine();  // Consume newline
                        System.out.print("Enter Name: ");
                        String name = scanner.nextLine();
                        System.out.print("Enter Age: ");
                        int age = scanner.nextInt();
                        scanner.nextLine();  // Consume newline
                        System.out.print("Enter Grade: ");
                        String grade = scanner.nextLine();

                        Student student = new Student(id, name, age, grade);
                        studentDAO.addStudent(student);
                        break;

                    case 2:
                        List<Student> students = studentDAO.getAllStudents();
                        if (students.isEmpty()) {
                            System.out.println("No students found.");
                        } else {
                            System.out.println("\n==== Student List ====");
                            for (Student s : students) {
                                System.out.println(s);
                            }
                        }
                        break;

                    case 3:
                        System.out.print("Enter Student ID to update: ");
                        int updateId = scanner.nextInt();
                        scanner.nextLine();  // Consume newline
                        System.out.print("Enter New Name: ");
                        String newName = scanner.nextLine();
                        System.out.print("Enter New Age: ");
                        int newAge = scanner.nextInt();
                        scanner.nextLine();  // Consume newline
                        System.out.print("Enter New Grade: ");
                        String newGrade = scanner.nextLine();

                        Student updatedStudent = new Student(updateId, newName, newAge, newGrade);
                        studentDAO.updateStudent(updatedStudent);
                        break;

                    case 4:
                        System.out.print("Enter Student ID to delete: ");
                        int deleteId = scanner.nextInt();
                        studentDAO.deleteStudent(deleteId);
                        break;

                    case 5:
                        System.out.println("Exiting Student Management System.");
                        return;

                    default:
                        System.out.println("Invalid choice. Try again.");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}