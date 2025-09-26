package com.sumeru.appraisal.repository;

import com.sumeru.appraisal.entity.Appraisal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppraisalRepository extends JpaRepository<Appraisal, Long> {
    
    List<Appraisal> findByEmployee_Id(Long employeeId);
    
    List<Appraisal> findByStatus(String status);
    
    @Query("SELECT a FROM Appraisal a WHERE a.employee.id = :employeeId ORDER BY a.appraisalDate DESC")
    List<Appraisal> findByEmployeeIdOrderByYearDesc(@Param("employeeId") Long employeeId);
}