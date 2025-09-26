package com.sumeru.appraisal.repository;

import com.sumeru.appraisal.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByEmployeeEmployeeId(Long employeeId);
}
