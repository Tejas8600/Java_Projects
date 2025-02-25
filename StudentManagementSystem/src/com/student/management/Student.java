package com.student.management;

public class Student {
    private int id; // Unique Student Id
    private String name;
    private int age;
    private String grade;

    //Constructor (Name should be same as class name + 1st line should be "this" OR "Super" keyword)
    public Student (int id,String name, int age, String grade){
        this.id=id;
        this.name=name;
        this.age=age;
        this.grade=grade;
    }

    // Getters and Setter Methods 	(Used to access and modify private fields.)

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getGrade() {
        return grade;
    }
    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    // Override toString() for easy debugging (Converts object data to a String for easy debugging.)

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", grade='" + grade + '\'' +
                '}';
    }

}
