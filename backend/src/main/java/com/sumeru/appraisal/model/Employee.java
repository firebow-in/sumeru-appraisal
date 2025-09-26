package com.sumeru.appraisal.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    private String name;
    private String email;
    private String designation;
    private String department;
    private LocalDate dateOfJoining;
    private String status;

    public Employee() {}

    public Employee(String name, String email, String designation, String department, LocalDate dateOfJoining, String status) {
        this.name = name;
        this.email = email;
        this.designation = designation;
        this.department = department;
        this.dateOfJoining = dateOfJoining;
        this.status = status;
    }

    // Getters and Setters
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public LocalDate getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(LocalDate dateOfJoining) { this.dateOfJoining = dateOfJoining; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
