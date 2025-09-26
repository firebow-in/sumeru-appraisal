package com.sumeru.appraisal.controller;

import com.sumeru.appraisal.entity.Employee;
import com.sumeru.appraisal.entity.Feedback;
import com.sumeru.appraisal.repository.EmployeeRepository;
import com.sumeru.appraisal.repository.FeedbackRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees/{employeeId}/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;
    private final EmployeeRepository employeeRepository;

    public FeedbackController(FeedbackRepository feedbackRepository, EmployeeRepository employeeRepository) {
        this.feedbackRepository = feedbackRepository;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping
    public List<Feedback> getFeedbackByEmployee(@PathVariable Long employeeId) {
        return feedbackRepository.findByEmployeeEmployeeId(employeeId);
    }

    @PostMapping
    public Feedback addFeedback(@PathVariable Long employeeId, @RequestBody Feedback feedback) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        feedback.setEmployee(employee);
        return feedbackRepository.save(feedback);
    }
}
