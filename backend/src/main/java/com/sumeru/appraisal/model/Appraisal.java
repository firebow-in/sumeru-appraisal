package com.sumeru.appraisal.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "appraisals")
public class Appraisal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appraisalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private Integer rating; // 1-5 scale
    private String comments;
    private Integer year;
    private String status; // Pending, Completed, In Review
    private LocalDate appraisalDate;

    public Appraisal() {}

    public Appraisal(Employee employee, Integer rating, String comments, Integer year, String status, LocalDate appraisalDate) {
        this.employee = employee;
        this.rating = rating;
        this.comments = comments;
        this.year = year;
        this.status = status;
        this.appraisalDate = appraisalDate;
    }

    // Getters and setters
    public Long getAppraisalId() { return appraisalId; }
    public void setAppraisalId(Long appraisalId) { this.appraisalId = appraisalId; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getAppraisalDate() { return appraisalDate; }
    public void setAppraisalDate(LocalDate appraisalDate) { this.appraisalDate = appraisalDate; }
}
