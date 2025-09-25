package com.sumeru.appraisal.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "appraisals")
public class Appraisal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;        // Employee reference
    private String status;          // e.g., "Pending", "Completed"
    private String comments;
    private LocalDate appraisalDate;

    public Appraisal() {}

    public Appraisal(Long employeeId, String status, String comments, LocalDate appraisalDate) {
        this.employeeId = employeeId;
        this.status = status;
        this.comments = comments;
        this.appraisalDate = appraisalDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDate getAppraisalDate() { return appraisalDate; }
    public void setAppraisalDate(LocalDate appraisalDate) { this.appraisalDate = appraisalDate; }
}
