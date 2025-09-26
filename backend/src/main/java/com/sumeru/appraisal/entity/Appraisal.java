package com.sumeru.appraisal.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "appraisals")
public class Appraisal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;      // Employee relationship

    private String status;          // e.g., "Pending", "Completed"
    private String comments;
    private LocalDate appraisalDate;

    public Appraisal() {}

    public Appraisal(Employee employee, String status, String comments, LocalDate appraisalDate) {
        this.employee = employee;
        this.status = status;
        this.comments = comments;
        this.appraisalDate = appraisalDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDate getAppraisalDate() { return appraisalDate; }
    public void setAppraisalDate(LocalDate appraisalDate) { this.appraisalDate = appraisalDate; }
}
